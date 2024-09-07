'use client';

import { useLayoutEffect, useState, useRef } from 'react';
import { motion, MotionStyle } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const RunningMan = () => {
  const [position, setPosition] = useState(100);
  const [runningManWidth, setRunningManWidth] = useState(400);
  const [runningManHeight, setRunningManHeight] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Track when the image is loaded
  const mousePositionRef = useRef(100);
  const runningManRef = useRef<HTMLImageElement | null>(null);
  const groundWidth = useRef(0);
  const groundStart = useRef(0);
  const groundHeight = 50;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const fontSize = isSmallScreen ? '1rem' : '1.25rem'; // Shared font size
  const labelStyle: MotionStyle = {
    fontSize: fontSize,
    color: 'black',
    textAlign: 'center' as MotionStyle['textAlign'],
    textDecoration: 'underline',
    cursor: 'pointer',
    whiteSpace: isSmallScreen ? 'normal' : 'nowrap',
    width: isSmallScreen ? '100px' : 'auto',
    lineHeight: isSmallScreen ? '1.2rem' : 'normal',
  };

  // Update dimensions on window resize
  useLayoutEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const newRunningManWidth = Math.max(100, viewportWidth * 0.15);
      setRunningManWidth(newRunningManWidth);

      groundStart.current = 0;
      groundWidth.current = viewportWidth;
      setPosition(groundWidth.current / 2 - newRunningManWidth / 2); // Initial position centered
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle mouse movement and update RunningMan's position
  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newMouseX = Math.max(
        groundStart.current,
        Math.min(event.clientX - runningManWidth / 2, groundStart.current + groundWidth.current - runningManWidth)
      );
      mousePositionRef.current = newMouseX;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [runningManWidth]);

  // Animate the position of RunningMan based on mouse movement
  useLayoutEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      const delta = mousePositionRef.current - position;
      const speed = 0.05; // Controls how fast RunningMan follows the mouse
      if (Math.abs(delta) > 1) {
        setPosition((prevPosition) => prevPosition + delta * speed);
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  // Update height when image is loaded
  useLayoutEffect(() => {
    if (runningManRef.current) {
      const updateHeight = () => {
        setRunningManHeight(runningManRef.current!.clientHeight);
        setIsLoaded(true); // Mark image as loaded
      };
      if (runningManRef.current.complete) {
        updateHeight();
      } else {
        runningManRef.current.onload = updateHeight;
      }
    }
  }, [runningManRef.current]);

  const flipDirection = `scaleX(${mousePositionRef.current < position ? '1' : '-1'})`;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', zIndex: 5 }}>
      <Link href="/children-book-illustrations">
        {/* Render the text only after the image is loaded */}
        {isLoaded && runningManHeight !== null && (
          <motion.div
            style={{
              ...labelStyle,
              position: 'absolute',
              bottom: `${groundHeight + runningManHeight + 20}px`, // Keep it above RunningMan's head
              left: `${position + runningManWidth / 2.25}px`, // Dynamic position above RunningMan
              transform: 'translateX(0%)',
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Children <br /> Book <br /> Illustrations
          </motion.div>
        )}
      </Link>

      {/* RunningMan Image */}
      <Link href="/children-book-illustrations">
        <motion.img
          ref={runningManRef}
          src={`${bucketUrl}/icons/running-man.webp`}
          alt="Running Man"
          style={{
            position: 'absolute',
            bottom: `${groundHeight}px`, // Above the ground
            left: `${position}px`, // Dynamic position based on mouse movement
            width: `${runningManWidth}px`,
            height: 'auto',
            cursor: 'pointer',
            transform: flipDirection,
            transition: 'transform 0.2s ease-in-out',
          }}
        />
      </Link>

      {/* Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${groundHeight}px`,
          backgroundImage: `url(${bucketUrl}/icons/rocks.webp)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-x',
          borderRadius: '25px',
        }}
      ></div>
    </div>
  );
};

export default RunningMan;
