'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Bunny = () => {
  const [isJumping, setIsJumping] = useState(false);

  // Use the environment variable for the Cloudflare R2 bucket URL
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  useEffect(() => {
    console.log('Bucket URL:', bucketUrl); // Add this line for debugging
    const interval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [bucketUrl]);

  return (
    <Link href="/app/black-and-white-drawings/page" passHref>
      <motion.img
        src={`${bucketUrl}/icons/bunny.png`}
        alt="Bunny"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '150px',
          height: 'auto',
          cursor: 'pointer',
        }}
        animate={{
          y: isJumping ? -50 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10,
        }}
      />
    </Link>
  );
};

export default Bunny;
