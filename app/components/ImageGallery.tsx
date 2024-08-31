// app/components/ImageGallery.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Tab, Tabs, ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image'; // Import next/image

const fetchImages = async (folder: string): Promise<string[]> => {
  const res = await fetch(`/api/images?folder=${folder}`);
  const data = await res.json();
  return data.images || [];
};

const ImageGallery = () => {
  const [selectedTab, setSelectedTab] = useState('book-illustrations');
  const [images, setImages] = useState<string[]>([]);
  const [cachedImages, setCachedImages] = useState<Record<string, string[]>>({});
  
  // Pre-fetch images for all tabs when component mounts
  useEffect(() => {
    const preFetchImages = async () => {
      const folders = ['book-illustrations', 'drawings', 'printmaking'];
      const promises = folders.map(folder => fetchImages(folder));
      const results = await Promise.all(promises);
      const imagesCache = folders.reduce((acc, folder, index) => {
        acc[folder] = results[index];
        return acc;
      }, {} as Record<string, string[]>);
      setCachedImages(imagesCache);
      setImages(imagesCache[selectedTab]);
    };

    preFetchImages();
  }, [selectedTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    setImages(cachedImages[newValue] || []);
  };

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Image Categories"
      >
        <Tab label="Book Illustrations" value="book-illustrations" />
        <Tab label="Drawings" value="drawings" />
        <Tab label="Printmaking" value="printmaking" />
      </Tabs>
      <ImageList cols={10} gap={16}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <ImageListItem key={index} style={{ position: 'relative', overflow: 'hidden' }}>
              <Image
                src={`/${image}`} // Path is relative to the public folder
                alt={`Image ${index}`}
                layout="responsive" // Ensure proper layout
                width={500} // Adjust the width according to your needs
                height={300} // Adjust the height according to your needs
                objectFit="contain" // Ensure the entire image is visible
                placeholder="blur" // Optional blur-up effect while loading
                blurDataURL={`/${image}?w=10&h=10`} // Low-res placeholder for blur-up effect
                style={{
                  borderRadius: 'inherit', // Match the border radius of the parent container
                }}
              />
            </ImageListItem>
          ))
        ) : (
          <p>No images found</p>
        )}
      </ImageList>
    </div>
  );
};

export default ImageGallery;
