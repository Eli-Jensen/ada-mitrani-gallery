// app/actions/fetchImages.ts
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export type ImageEntry = {
  key: string;
  width: number;
  height: number;
};

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME!;

function loadManifest(folderName: string): ImageEntry[] | null {
  try {
    const name = folderName.replace(/\/$/, '');
    const manifestPath = resolve(process.cwd(), 'data/manifests', `${name}.json`);
    const content = readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(content);
    if (manifest.images && manifest.images.length > 0) {
      return manifest.images as ImageEntry[];
    }
  } catch {
    // Manifest file not found
  }
  return null;
}

export async function fetchImagesFromR2(folderName: string): Promise<ImageEntry[]> {
  try {
    // Try to load the pre-computed local manifest first
    const manifest = loadManifest(folderName);
    if (manifest) {
      return manifest;
    }

    console.log(`No manifest found for ${folderName}, falling back to R2 listing`);

    // Fallback: list objects and return with zero dimensions (client will probe)
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: folderName,
    });

    const response = await s3Client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
      throw new Error('No objects found');
    }

    return response.Contents.map((item) => ({
      key: item.Key!,
      width: 0,
      height: 0,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching images from R2:', error.message);
      throw new Error(`Failed to fetch images: ${error.message}`);
    } else {
      console.error('Unknown error fetching images from R2:', error);
      throw new Error('Failed to fetch images due to an unknown error');
    }
  }
}
