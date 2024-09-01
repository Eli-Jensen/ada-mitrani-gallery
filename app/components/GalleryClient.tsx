'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { getImageDimensions } from '../../utils/imageUtils';
import Link from 'next/link';
import BackToCategoriesButton from './BackToCategoriesButton';

interface GalleryClientProps {
  initialImageKeys: string[];
  title: string;
}

export default function GalleryClient({ initialImageKeys, title }: GalleryClientProps) {
  const [imageKeys, setImageKeys] = useState<string[]>(initialImageKeys);
  const [imageDimensions, setImageDimensions] = useState<{ [key: string]: { width: number; height: number } }>({});
  const [loading, setLoading] = useState(true); // Step 1: Add loading state

  const initializePhotoSwipe = useCallback(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
      padding: { top: 20, bottom: 20, left: 20, right: 20 }, // Optional padding
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
      setLoading(false); // Step 2: Set loading to false once images are fetched
    };

    fetchImageDimensions();
  }, [imageKeys]);

  useEffect(() => {
    if (Object.keys(imageDimensions).length === imageKeys.length) {
      initializePhotoSwipe();
    }
  }, [imageDimensions, imageKeys, initializePhotoSwipe]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <Link href="/categories">
          <BackToCategoriesButton />
        </Link>
        <h1 style={{ textAlign: 'center', flex: '1', fontSize: '2rem' }}>{title}</h1>
        <div style={{ width: '120px' }}></div> {/* Spacer for centering the title */}
      </div>
      {loading ? ( // Step 3: Display loading spinner or message
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div className="spinner"></div> {/* Spinner or "Loading..." text */}
        </div>
      ) : (
        <div className="image-gallery" id="gallery">
          {imageKeys.map((key) => {
            const dimensions = imageDimensions[key];
            if (!dimensions) return null; // Skip rendering until dimensions are loaded

            return (
              <a
                href={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${key}`}
                data-pswp-width={dimensions.width}
                data-pswp-height={dimensions.height}
                key={key}
                className="image-container"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${key}`}
                  alt={key}
                  width={150}
                  height={150}
                  className="image"
                />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
