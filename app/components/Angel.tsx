'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Angel = () => {
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const imageWidth = isSmallScreen ? '40vw' : isMediumScreen ? '25vw' : '20vw';
  const fontSize = isSmallScreen ? '1rem' : isMediumScreen ? '1.25rem' : '1.5rem';

  return (
    <motion.div
      style={{
        textAlign: 'center',
        width: 'fit-content',
      }}
    >
      <Link href="/prints">
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
            Prints
          </motion.div>
        </motion.div>
      </Link>

      {/* Angel Image with Floating Animation */}
      <Link href="/prints">
        <motion.img
          src={`${bucketUrl}/icons/angel.webp`}
          alt="angel"
          style={{
            width: imageWidth,
            height: 'auto',
            cursor: 'pointer',
          }}
          animate={{
            y: [0, -15, 0], // Smooth floating effect
            opacity: [1, 0.9, 1], // Slight fade to enhance the floating effect
          }}
          transition={{
            duration: 4, // Longer duration for a gentle float
            ease: 'easeInOut',
            repeat: Infinity, // Infinite floating
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
    </motion.div>
  );
};

export default Angel;
