'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const PregnantMother = () => {
  const [isShaking, setIsShaking] = useState(false);

  // Use the environment variable for the Cloudflare R2 bucket URL
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  // Adjust image size based on screen size, making it larger than before
  const imageWidth = isSmallScreen ? 150 : isMediumScreen ? 200 : 300;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 1000);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '150px', // Move it closer to the middle of the page
        right: '200px', // Keep it in the top right, but closer to the center
        zIndex: 10,
        transform: 'rotate(-20deg)', // Rotate degrees counter-clockwise
      }}
    >
      <Link href="/ink-drawings" passHref>
        <motion.img
          src={`${bucketUrl}/icons/pregnant_mother_of_three_white.webp`}
          alt="PregnantMotherOfThree"
          style={{
            width: `${imageWidth}px`, // Adjust the width based on screen size
            height: 'auto',
            cursor: 'pointer',
          }}
          animate={{
            x: isShaking ? [-10, 10, -10, 10, 0] : 0, // Shaking horizontally
            rotate: isShaking ? [-5, 5, -5, 5, 0] : 0, // Rotating slightly
          }}
          transition={{
            duration: 0.5, // Duration of the shaking and rotating effect
          }}
        />
      </Link>
    </motion.div>
  );
};

export default PregnantMother;