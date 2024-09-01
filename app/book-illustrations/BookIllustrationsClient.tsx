'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

interface BookIllustrationsClientProps {
  initialImageKeys: string[];  // Explicitly type the prop as an array of strings
}

export default function BookIllustrationsClient({ initialImageKeys }: BookIllustrationsClientProps) {
  const [imageKeys, setImageKeys] = useState<string[]>(initialImageKeys);

  const initializePhotoSwipe = useCallback(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  useEffect(() => {
    if (imageKeys.length > 0) {
      initializePhotoSwipe();
    }
  }, [imageKeys, initializePhotoSwipe]);

  return (
    <div className="image-gallery" id="gallery">
      {imageKeys.map((key, index) => (
        <a
          href={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${key}`}
          data-pswp-width="1200"
          data-pswp-height="800"
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
      ))}
    </div>
  );
}
