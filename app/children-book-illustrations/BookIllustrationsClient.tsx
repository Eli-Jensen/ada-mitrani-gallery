'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { getImageDimensions } from '../../utils/imageUtils';

interface BookIllustrationsClientProps {
  initialImageKeys: string[];
}

export default function BookIllustrationsClient({ initialImageKeys }: BookIllustrationsClientProps) {
  const [imageKeys, setImageKeys] = useState<string[]>(initialImageKeys);
  const [imageDimensions, setImageDimensions] = useState<{ [key: string]: { width: number; height: number } }>({});

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
    };

    fetchImageDimensions();
  }, [imageKeys]);

  useEffect(() => {
    if (Object.keys(imageDimensions).length === imageKeys.length) {
      initializePhotoSwipe();
    }
  }, [imageDimensions, imageKeys, initializePhotoSwipe]);

  return (
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
  );
}
