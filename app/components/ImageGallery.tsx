// app/components/ImageGallery.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Tab, Tabs, ImageList, ImageListItem } from '@mui/material';

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
      <ImageList cols={3} gap={12} variant="masonry">
        {images.length > 0 ? (
          images.map((image, index) => (
            <ImageListItem key={index} style={{ border: '2px solid #ccc', borderRadius: '5px' }}>
              <img
                src={`/${image}`} // Path is relative to the public folder
                alt={`Image ${index}`}
                loading="lazy" // Enable lazy loading for performance
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
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
