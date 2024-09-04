'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Bunny = () => {
  const [bunnyHeight, setBunnyHeight] = useState<number | null>(null);
  const bunnyRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use the environment variable for the Cloudflare R2 bucket URL
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  // Adjust Bunny width based on screen size
  const bunnyWidth = isSmallScreen ? 100 : isMediumScreen ? 150 : 250;
  const fontSize = isSmallScreen ? '1rem' : isMediumScreen ? '1.25rem' : '1.5rem'; // Font size for the label

  // Set the bunny height after the image has loaded
  useEffect(() => {
    if (bunnyRef.current && bunnyRef.current.complete) {
      setBunnyHeight(bunnyRef.current.clientHeight);
      setIsLoaded(true); // Image has loaded
    }
  }, [bunnyWidth]);

  const handleImageLoad = () => {
    if (bunnyRef.current) {
      setBunnyHeight(bunnyRef.current.clientHeight);
      setIsLoaded(true); // Image is fully loaded
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 10,
        textAlign: 'center', // Center the text above the image
      }}
    >
      <Link href="/bio-contact">
        <motion.div
          style={{
            cursor: 'pointer',
          }}
        >
          {/* Text above Bunny's head */}
          {isLoaded && bunnyHeight !== null && (
            <motion.div
              style={{
                fontSize: fontSize,
                color: 'black',
                textDecoration: 'underline',
                marginBottom: '10px', // Add space between text and bunny
              }}
              whileHover={{ scale: 1.05 }} // Add a slight hover effect
            >
              Bio/Contact
            </motion.div>
          )}

          {/* Bunny Image */}
          <motion.img
            ref={bunnyRef}
            src={`${bucketUrl}/icons/bunny.webp`}
            alt="Bunny"
            style={{
              width: `${bunnyWidth}px`,
              height: 'auto',
              cursor: 'pointer',
            }}
            onLoad={handleImageLoad} // Set height after image is loaded
            animate={{
              y: isLoaded ? [-10, 0] : 0, // Slight bounce effect after loading,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse', // Bounce animation
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Bunny;
