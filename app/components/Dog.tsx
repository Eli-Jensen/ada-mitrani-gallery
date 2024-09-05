'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Dog = () => {
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const imageWidth = isSmallScreen ? 100 : isMediumScreen ? 150 : 250;
  const fontSize = isSmallScreen ? '1rem' : isMediumScreen ? '1.25rem' : '1.5rem';
  const topPosition = isSmallScreen ? '100px' : isMediumScreen ? '120px' : '150px';
  const leftPosition = isSmallScreen ? '50px' : isMediumScreen ? '100px' : '150px'; // Positioned to the left

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: topPosition,
        left: leftPosition,
        zIndex: 10,
        textAlign: 'center',
      }}
    >
      <Link href="/drawings">
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
            whileHover={{ scale: 1.05 }}
          >
            Drawings
          </motion.div>
        </motion.div>
      </Link>

      <Link href="/drawings">
        <motion.img
          src={`${bucketUrl}/icons/dog_II.webp`}
          alt="dog_II"
          style={{
            width: `${imageWidth}px`,
            height: 'auto',
            cursor: 'pointer',
            }}
            animate={{
            rotate: [-10, 10], // Rotate between -10deg and 10deg
            }}
            transition={{
            duration: 2, // Duration of one full back and forth cycle
            ease: 'easeInOut', // Smooth easing for continuous motion
            repeat: Infinity, // Repeat infinitely
            repeatType: 'mirror', // Mirror the rotation back and forth
            }}
            onLoad={() => setImageLoaded(true)} // Set imageLoaded to true when the image finishes loading
        />
      </Link>
    </motion.div>
  );
};

export default Dog;
