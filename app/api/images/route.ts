// app/api/images/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getAllImages = (dirPath: string): string[] => {
  let results: string[] = [];
  const list = fs.readdirSync(dirPath);

  list.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllImages(filePath)); // Recursively get images
    } else if (/\.(jpg|jpeg|png|gif)$/.test(file)) {
      results.push(filePath.replace(process.cwd() + '/public/', ''));
    }
  });

  return results;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const folder = url.searchParams.get('folder') || '';
  const dirPath = path.join(process.cwd(), 'public', 'images', folder);

  try {
    const images = getAllImages(dirPath);
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}
