'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const PregnantMother = () => {
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const [imageLoaded, setImageLoaded] = useState(false); // State to track if the image is loaded

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  // Adjust image size and positioning based on screen size
  const imageWidth = isSmallScreen ? 100 : isMediumScreen ? 150 : 250;
  const fontSize = isSmallScreen ? '1rem' : isMediumScreen ? '1.25rem' : '1.5rem';
  const topPosition = isSmallScreen ? '100px' : isMediumScreen ? '120px' : '150px';
  const rightPosition = isSmallScreen ? '50px' : isMediumScreen ? '100px' : '200px';

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: topPosition,
        right: rightPosition,
        zIndex: 10,
        textAlign: 'center',
      }}
    >
      {/* Link to /ink-drawings */}
      <Link href="/ink-drawings">
        <motion.div
          style={{
            cursor: 'pointer',
            marginBottom: '10px', // Space between the text and the image
            visibility: imageLoaded ? 'visible' : 'visible', // Text is always visible
          }}
        >
          {/* Text above the image */}
          <motion.div
            style={{
              fontSize: fontSize,
              color: 'black',
              textDecoration: 'underline',
            }}
            whileHover={{ scale: 1.05 }} // Small hover effect for the text
          >
            Ink Drawings
          </motion.div>
        </motion.div>
      </Link>

      {/* Pregnant Mother Image */}
      <Link href="/ink-drawings">
        <motion.img
          src={`${bucketUrl}/icons/pregnant_mother_of_three_white.webp`}
          alt="PregnantMotherOfThree"
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

export default PregnantMother;
