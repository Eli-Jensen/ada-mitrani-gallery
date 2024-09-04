'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, MotionStyle } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Bunny = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [bunnyHeight, setBunnyHeight] = useState<number | null>(null);
  const bunnyRef = useRef<HTMLImageElement | null>(null);

  // Use the environment variable for the Cloudflare R2 bucket URL
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  // Adjust Bunny width based on screen size
  let bunnyWidth;
  if (isSmallScreen) {
    bunnyWidth = 100; // Small size for small screens
  } else if (isMediumScreen) {
    bunnyWidth = 150; // Medium size for medium screens
  } else if (isLargeScreen) {
    bunnyWidth = 250; // Large size for large screens
  }

  const fontSize = isSmallScreen ? '0.8rem' : '1rem'; // Font size for the label

  const labelStyle: MotionStyle = {
    fontSize: fontSize,
    color: 'black',
    textAlign: 'center' as MotionStyle['textAlign'],
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  // Calculate the Bunny's height dynamically once it's loaded
  useEffect(() => {
    if (bunnyRef.current) {
      setBunnyHeight(bunnyRef.current.clientHeight);
    }
  }, [bunnyWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 10 }}>
      <Link href="/bio-contact">
        <motion.div
          style={{
            position: 'relative',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          {/* Bio/Contact text placed dynamically above the Bunny */}
          {bunnyHeight !== null && (
            <motion.div
              style={{
                ...labelStyle,
                position: 'absolute',
                bottom: `${bunnyHeight + 10}px`,
                left: '35%',
                transform: 'translateX(-50%)', // Center the text above the Bunny's head
              }}
              animate={{
                y: isJumping ? -50 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 10,
              }}
            >
              Bio/Contact
            </motion.div>
          )}

          {/* Bunny image */}
          <motion.img
            ref={bunnyRef}
            src={`${bucketUrl}/icons/bunny.webp`}
            alt="Bunny"
            style={{
              width: `${bunnyWidth}px`,
              height: 'auto',
            }}
            animate={{
              y: isJumping ? -50 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 10,
            }}
          />
        </motion.div>
      </Link>
    </div>
  );
};

export default Bunny;
