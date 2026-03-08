import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

// Load .env.local
const envPath = resolve(process.cwd(), '.env.local');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  console.log('No .env.local found, using existing env vars');
}

import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import imageSize from 'image-size';

const CATEGORIES = [
  'drawings/',
  'book-covers/',
  'children-book-illustrations/',
  'ink-drawings/',
  'poetry-illustrations/',
  'prints/',
];

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
const MANIFESTS_DIR = resolve(process.cwd(), 'data/manifests');

async function getImageDimensions(key: string): Promise<{ width: number; height: number }> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  const response = await s3Client.send(command);
  const chunks: Uint8Array[] = [];
  for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const dimensions = imageSize(buffer);
  if (!dimensions.width || !dimensions.height) {
    throw new Error(`Could not determine dimensions for ${key}`);
  }
  return { width: dimensions.width, height: dimensions.height };
}

async function generateManifestForCategory(folder: string) {
  console.log(`Processing ${folder}...`);

  const listCommand = new ListObjectsV2Command({ Bucket: BUCKET, Prefix: folder });
  const listResponse = await s3Client.send(listCommand);

  if (!listResponse.Contents || listResponse.Contents.length === 0) {
    console.log(`  No images found in ${folder}, skipping.`);
    return;
  }

  const imageKeys = listResponse.Contents
    .map((item) => item.Key!)
    .filter((key) => /\.(jpg|jpeg|png|webp|gif|bmp|tiff?)$/i.test(key));

  console.log(`  Found ${imageKeys.length} images.`);

  const images: { key: string; width: number; height: number }[] = [];

  for (const key of imageKeys) {
    try {
      const dims = await getImageDimensions(key);
      images.push({ key, ...dims });
      console.log(`  ${key}: ${dims.width}x${dims.height}`);
    } catch (err) {
      console.error(`  Failed to get dimensions for ${key}:`, err);
    }
  }

  const manifest = JSON.stringify({ images }, null, 2);
  // Use folder name without trailing slash as filename
  const folderName = folder.replace(/\/$/, '');
  const manifestPath = resolve(MANIFESTS_DIR, `${folderName}.json`);

  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(manifestPath, manifest, 'utf-8');
  console.log(`  Wrote ${manifestPath} (${images.length} entries)`);
}

async function main() {
  console.log('Generating image dimension manifests...\n');

  for (const category of CATEGORIES) {
    await generateManifestForCategory(category);
    console.log();
  }

  console.log('Done!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
