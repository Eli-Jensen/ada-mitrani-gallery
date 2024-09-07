'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Bunny = () => {
  const [bunnyHeight, setBunnyHeight] = useState<number | null>(null);
  const bunnyRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const bunnyWidth = isSmallScreen ? 100 : isMediumScreen ? 150 : 250;
  const fontSize = isSmallScreen ? '1rem' : isMediumScreen ? '1.25rem' : '1.5rem';

  useEffect(() => {
    if (bunnyRef.current && bunnyRef.current.complete) {
      setBunnyHeight(bunnyRef.current.clientHeight);
      setIsLoaded(true);
    }
  }, [bunnyWidth]);

  const handleImageLoad = () => {
    if (bunnyRef.current) {
      setBunnyHeight(bunnyRef.current.clientHeight);
      setIsLoaded(true);
    }
  };

  return (
    <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
      <Link href="/bio-contact">
        <motion.div style={{ cursor: 'pointer' }}>
          {isLoaded && bunnyHeight !== null && (
            <motion.div
              style={{
                fontSize: fontSize,
                color: 'black',
                textDecoration: 'underline',
                marginBottom: '10px',
              }}
              whileHover={{ scale: 1.05 }}
            >
              Bio/Contact
            </motion.div>
          )}

          <motion.img
            ref={bunnyRef}
            src={`${bucketUrl}/icons/bunny.webp`}
            alt="Bunny"
            style={{
              width: `${bunnyWidth}px`,
              height: 'auto',
              cursor: 'pointer',
            }}
            onLoad={handleImageLoad}
            animate={{
              y: isLoaded ? [-10, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Bunny;
