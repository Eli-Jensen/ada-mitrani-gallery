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

      {/* Dog Image */}
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
            x: [0, -20, 0], // Move slightly to the left
            y: [0, -10, 0], // Move slightly up
            rotate: [0, -5, 0], // Small head tilt for barking effect
          }}
          transition={{
            duration: 1.5, // Total time for one bark motion
            ease: 'easeInOut',
            repeat: Infinity, // Repeat infinitely
            repeatDelay: 2, // Delay before repeating the motion
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
    </motion.div>
  );
};

export default Dog;
