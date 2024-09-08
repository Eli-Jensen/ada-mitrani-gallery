'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const CatLeftPage = () => {
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Use relative units (vw) for the image width to make it responsive
  const imageWidth = isSmallScreen ? '20vw' : isMediumScreen ? '15vw' : '10vw';
  const fontSize = isSmallScreen ? '1em' : isMediumScreen ? '1.25em' : '1.5em'; // Use em for font size

  return (
    <motion.div
      style={{
        textAlign: 'center',
        width: 'fit-content',
      }}
    >
      <Link href="/poetry-illustrations">
        <motion.div
          style={{
            cursor: 'pointer',
            marginBottom: '10px',
            visibility: imageLoaded ? 'visible' : 'visible',
          }}
        >
          <motion.div
            style={{
              fontSize: fontSize, // Responsive font size using em
              color: 'black',
              textDecoration: 'underline',
            }}
          >
            Poetry<br />Illustrations
          </motion.div>
        </motion.div>
      </Link>

      {/* Cat Left Page Image with Responsive Width */}
      <Link href="/poetry-illustrations">
        <motion.img
          src={`${bucketUrl}/icons/cat_left_page.webp`}
          alt="Cat Page from Poetry Illustrations"
          style={{
            width: imageWidth, // Use vw for responsive width
            height: 'auto',
            cursor: 'pointer',
          }}
          animate={{
            rotate: [0, 1.5, 0, -1.5, 0], // Gentle tilting
            scale: [1, 1.05, 1], // Slight pulse to mimic curiosity
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror', // Smooth back-and-forth motion
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
    </motion.div>
  );
};

export default CatLeftPage;