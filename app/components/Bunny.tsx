'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Bunny = () => {
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Responsive image width
  const imageWidth = isSmallScreen ? '20vw' : isMediumScreen ? '15vw' : '10vw';
  const fontSize = isSmallScreen ? '1em' : isMediumScreen ? '1.25em' : '1.5em';

  return (
    <motion.div
      style={{
        textAlign: 'center',
        width: 'fit-content',
      }}
    >
      <Link href="/bio-contact">
        <motion.div
          style={{
            cursor: 'pointer',
            marginBottom: '10px',
            visibility: imageLoaded ? 'visible' : 'visible',
          }}
        >
          <motion.div
            style={{
              fontSize: fontSize, // Responsive font size
              color: 'black',
              textDecoration: 'underline',
            }}
            whileHover={{ scale: 1.05 }}
          >
            Bio/Contact
          </motion.div>
        </motion.div>
      </Link>

      {/* Bunny Image with Bounce Animation */}
      <Link href="/bio-contact">
        <motion.img
          src={`${bucketUrl}/icons/bunny.webp`}
          alt="Bunny"
          style={{
            width: imageWidth, // Responsive width
            height: 'auto',
            cursor: 'pointer',
          }}
          animate={{
            y: [-10, 0], // Bounce effect
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse', // Repeat back and forth
          }}
          onLoad={() => setImageLoaded(true)} // Mark image as loaded
        />
      </Link>
    </motion.div>
  );
};

export default Bunny;
