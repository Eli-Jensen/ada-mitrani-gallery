'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { getImageDimensions } from '../../utils/imageUtils';
import Link from 'next/link';
import BackToCategoriesButton from './BackToCategoriesButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface GalleryClientProps {
  initialImageKeys: string[];
  title: string;
}

export default function GalleryClient({ initialImageKeys, title }: GalleryClientProps) {
  const [imageKeys, setImageKeys] = useState<string[]>(initialImageKeys);
  const [imageDimensions, setImageDimensions] = useState<{ [key: string]: { width: number; height: number } }>({});
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const initializePhotoSwipe = useCallback(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
      padding: { top: 20, bottom: 20, left: 20, right: 20 },
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchImageDimensions = async () => {
      const dimensions: { [key: string]: { width: number; height: number } } = {};
      for (const key of imageKeys) {
        const src = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${key}`;
        const { width, height } = await getImageDimensions(src);
        dimensions[key] = { width, height };
      }
      setImageDimensions(dimensions);
      setLoading(false);
    };

    fetchImageDimensions();
  }, [imageKeys]);

  useEffect(() => {
    if (Object.keys(imageDimensions).length === imageKeys.length) {
      initializePhotoSwipe();
    }
  }, [imageDimensions, imageKeys, initializePhotoSwipe]);

  let cols = 5; // Default for large screens
  if (isMediumScreen) {
    cols = 3; // Medium screens
  } else if (isSmallScreen) {
    cols = 3; // Small screens
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <Link href="/categories">
          <BackToCategoriesButton />
        </Link>
        <h1 style={{ textAlign: 'center', flex: '1', fontSize: '2rem' }}>{title}</h1>
        <div style={{ width: '120px' }}></div> {/* Spacer for centering the title */}
      </div>
      {loading ? (
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="spinner"></div> {/* Loading spinner */}
        </div>
      ) : (
        <ImageList
          id="gallery"
          cols={cols} // Dynamic columns based on screen size
          gap={10} // Add space between images
          style={{ flex: '1', padding: '100px' }}
        >
          {imageKeys.map((key) => {
            const dimensions = imageDimensions[key];
            if (!dimensions) return null; // Skip rendering until dimensions are loaded

            return (
              <ImageListItem key={key} cols={1}>
                <a
                  href={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${key}`}
                  data-pswp-width={dimensions.width}
                  data-pswp-height={dimensions.height}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${key}`}
                    alt={key}
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{
                      width: '100%', // Make the image responsive
                      height: 'auto', // Maintain aspect ratio
                      borderRadius: '8px', // Optional: Add rounded corners
                    }}
                  />
                </a>
              </ImageListItem>
            );
          })}
        </ImageList>
      )}
    </div>
  );
}
