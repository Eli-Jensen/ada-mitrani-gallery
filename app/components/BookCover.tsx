'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const BookCover = () => {
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const imageWidth = isSmallScreen ? '20vw' : isMediumScreen ? '15vw' : '10vw';
  const fontSize = isSmallScreen ? '1rem' : isMediumScreen ? '1.25rem' : '1.5rem';

  return (
    <motion.div
      style={{
        textAlign: 'center',
        width: 'fit-content',
      }}
    >
      <Link href="/book-covers">
        <motion.div
          style={{
            cursor: 'pointer',
            marginBottom: '10px',
            visibility: imageLoaded ? 'visible' : 'visible',
          }}
        >
          <motion.div
            style={{
              fontSize: fontSize,
              color: 'black',
              textDecoration: 'underline',
            }}
          >
            Book<br />Covers
          </motion.div>
        </motion.div>
      </Link>

      {/* Book Cover Image with Parallax Effect */}
      <Link href="/book-covers">
        <motion.img
          src={`${bucketUrl}/icons/Cover_EN.webp`}
          alt="Book Cover"
          style={{
            width: imageWidth,
            height: 'auto',
            cursor: 'pointer',
          }}
          animate={{
            x: [-5, 5, -5], // Horizontal parallax motion
            y: [-3, 3, -3], // Vertical parallax motion
            rotateY: [-3, 3, -3], // Small 3D tilt for a parallax effect
          }}
          transition={{
            duration: 6, // Slow alternating effect
            ease: 'easeInOut',
            repeat: Infinity, // Repeat forever
            repeatType: 'mirror', // Alternate back and forth
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
    </motion.div>
  );
};

export default BookCover;
