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
import Typography from '@mui/material/Typography';
import type { ImageEntry } from '../actions/fetchImages';

interface GalleryClientProps {
  images: ImageEntry[];
  title: string;
}

export default function GalleryClient({ images, title }: GalleryClientProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const fontSize = isSmallScreen ? '1.5rem' : isMediumScreen ? '2rem' : '2.5rem';

  // Check if dimensions are pre-computed (manifest was available)
  const hasDimensions = images.length > 0 && images[0].width > 0;

  // Fallback: fetch dimensions client-side if manifest was missing
  const [fallbackDimensions, setFallbackDimensions] = useState<{ [key: string]: { width: number; height: number } }>({});
  const [fallbackLoading, setFallbackLoading] = useState(!hasDimensions);

  const initializePhotoSwipe = useCallback(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
      padding: { top: 0, bottom: 20, left: 20, right: 20 },
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  // Fallback: parallel dimension fetching when manifest is missing
  useEffect(() => {
    if (hasDimensions) return;

    const fetchAllDimensions = async () => {
      const BATCH_SIZE = 6;
      const dims: { [key: string]: { width: number; height: number } } = {};

      for (let i = 0; i < images.length; i += BATCH_SIZE) {
        const batch = images.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(
          batch.map(async (image) => {
            const src = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${image.key}`;
            const d = await getImageDimensions(src);
            return { key: image.key, ...d };
          })
        );
        results.forEach((r) => {
          dims[r.key] = { width: r.width, height: r.height };
        });
        // Update state after each batch so images render progressively
        setFallbackDimensions({ ...dims });
      }
      setFallbackLoading(false);
    };

    fetchAllDimensions();
  }, [images, hasDimensions]);

  // Initialize PhotoSwipe when images are ready
  useEffect(() => {
    const ready = hasDimensions || Object.keys(fallbackDimensions).length === images.length;
    if (ready && images.length > 0) {
      return initializePhotoSwipe();
    }
  }, [hasDimensions, fallbackDimensions, images, initializePhotoSwipe]);

  let cols = 5;
  if (isMediumScreen) {
    cols = 3;
  } else if (isSmallScreen) {
    cols = 3;
  }

  // Build the list of renderable images with dimensions
  const renderableImages = hasDimensions
    ? images
    : images.filter((img) => fallbackDimensions[img.key]);

  const getDimensions = (image: ImageEntry) => {
    if (hasDimensions) return { width: image.width, height: image.height };
    return fallbackDimensions[image.key] || { width: 0, height: 0 };
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>
        <Link href="/categories">
          <BackToCategoriesButton />
        </Link>
        <Typography variant="h1" style={{ textAlign: 'center', flex: '1', fontSize: fontSize, margin: '0' }}>
          {title}
        </Typography>
        <div style={{ width: '7.5rem' }}></div>
      </div>
      {fallbackLoading && renderableImages.length === 0 ? (
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <ImageList
          variant="masonry"
          id="gallery"
          cols={cols}
          gap={10}
          style={{ flex: '1', padding: theme.spacing(6) }}
        >
          {renderableImages.map((image, index) => {
            const dimensions = getDimensions(image);
            if (!dimensions.width) return null;

            return (
              <ImageListItem key={image.key} cols={1}>
                <a
                  href={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${image.key}`}
                  data-pswp-width={dimensions.width}
                  data-pswp-height={dimensions.height}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${image.key}`}
                    alt={image.key}
                    width={dimensions.width}
                    height={dimensions.height}
                    sizes="(max-width: 600px) 33vw, (max-width: 1200px) 33vw, 20vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: theme.shape.borderRadius,
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
