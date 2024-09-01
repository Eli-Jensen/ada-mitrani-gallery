// app/actions/fetchImages.ts
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function fetchImagesFromR2(folderName: string) {
  const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    },
  });

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Prefix: folderName,
    });

    const response = await s3Client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
      throw new Error('No objects found');
    }

    const imageKeys = response.Contents.map((item) => item.Key!);
    return imageKeys;
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
