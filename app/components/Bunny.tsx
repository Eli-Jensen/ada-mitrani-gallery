'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Import Link from Next.js

const Bunny = () => {
  const [isJumping, setIsJumping] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/app/black-and-white-drawings/page" passHref>
      <motion.img
        src="/icons/bunny.png"
        alt="Bunny"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '100px',
          height: 'auto',
          cursor: 'pointer',
          // Apply the CSS directly to the img element.
        }}
        animate={{
          y: isJumping ? -50 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 10
        }}
      />
    </Link>
  );
};

export default Bunny;
