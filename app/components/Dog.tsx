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

  const imageWidth = isSmallScreen ? 100 : isMediumScreen ? 250 : 450;
  const fontSize = isSmallScreen ? '1rem' : isMediumScreen ? '1.25rem' : '1.5rem';

  return (
    <motion.div
      style={{
        textAlign: 'center',
        width: 'fit-content',
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

      {/* Dog Image with Clockwise Bark Rotation from Hind Legs */}
      <Link href="/drawings">
        <motion.img
          src={`${bucketUrl}/icons/dog_II.webp`}
          alt="dog_II"
          style={{
            width: `${imageWidth}px`,
            height: 'auto',
            cursor: 'pointer',
            transformOrigin: 'bottom right', // Rotate around hind legs (bottom-right corner)
          }}
          animate={{
            rotate: [0, 10, 0, 10, 0], // Clockwise rotation
            x: [0, -25, 0, -25, 0], // Aggressive forward motion
            y: [0, -15, 0, -15, 0], // Up and down movement
          }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
            times: [0, 0.2, 0.4, 0.6, 1],
            repeat: Infinity,
            repeatDelay: 2, // Pause between bark cycles
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
    </motion.div>
  );
};

export default Dog;
