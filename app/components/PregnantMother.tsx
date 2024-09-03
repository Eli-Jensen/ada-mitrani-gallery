'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PregnantMother = () => {
  const [isShaking, setIsShaking] = useState(false);

  // Use the environment variable for the Cloudflare R2 bucket URL
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/ink-drawings" passHref>
      <motion.img
        src={`${bucketUrl}/icons/pregnant_mother_of_three_white.webp`}
        alt="PregnantMotherOfThree"
        style={{
          width: '150px',
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
  );
};

export default PregnantMother;
