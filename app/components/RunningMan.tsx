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

  const leftGap = isSmallScreen ? 0.025 : 0.025;
  const rightGap = isSmallScreen ? 0.3 : 0.2;
  const speed = 0.5;
  const stopThreshold = runningManWidth / 4;

  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const fontSize = isSmallScreen ? '1rem' : '1.25rem'; // Shared font size
  const labelStyle: MotionStyle = {
    fontSize: fontSize,
    color: 'black',
    textAlign: 'center' as MotionStyle['textAlign'], // Explicitly cast textAlign
    textDecoration: 'underline',
    cursor: 'pointer',
    whiteSpace: isSmallScreen ? 'normal' : 'nowrap', // Allow wrapping on small screens
    width: isSmallScreen ? '100px' : 'auto', // Adjust width for text wrapping
    lineHeight: isSmallScreen ? '1.2rem' : 'normal', // Increase line height for small screens
  };

  useLayoutEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const newRunningManWidth = Math.max(100, viewportWidth * 0.15);
      setRunningManWidth(newRunningManWidth);

      groundStart.current = viewportWidth * leftGap;
      groundWidth.current = viewportWidth * (1 - leftGap - rightGap);
      setPosition(groundStart.current + groundWidth.current / 2 - newRunningManWidth / 2);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [leftGap, rightGap]);

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = Math.max(
        groundStart.current,
        Math.min(event.clientX - runningManWidth / 2, groundStart.current + groundWidth.current - runningManWidth)
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [runningManWidth]);

  useLayoutEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      const delta = mousePositionRef.current - position;

      if (Math.abs(delta) > stopThreshold) {
        const direction = delta > 0 ? 1 : -1;
        setPosition((prevPosition) => {
          const newPosition = prevPosition + direction * Math.min(Math.abs(delta), 10) * speed;
          return Math.min(Math.max(newPosition, groundStart.current), groundStart.current + groundWidth.current - runningManWidth);
        });
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [position, speed, stopThreshold]);

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
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', zIndex: 5 }}>
      <Link href="/children-book-illustrations">
        {/* Render the text only after the image is loaded */}
        {isLoaded && runningManHeight !== null && (
          <motion.div
            style={{
              ...labelStyle, 
              position: 'absolute',
              bottom: `${groundHeight + runningManHeight + 10}px`,
              left: `${position + runningManWidth / 3}px`,  // Centering above the Running Man
              transform: 'translateX(0%)',  // Fine-tune centering
              transformOrigin: 'center', // Ensure scaling happens from the center
            }}
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.2 }} 
          >
            Children <br /> Book <br /> Illustrations
          </motion.div>
        )}
      </Link>

      {/* Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: `${groundStart.current}px`,
          width: `${groundWidth.current}px`,
          height: `${groundHeight}px`,
          backgroundImage: `url(${bucketUrl}/icons/rocks.webp)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-x',
          borderRadius: '25px',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      ></div>

      {/* RunningMan Image */}
      <Link href="/children-book-illustrations">
        <motion.img
          ref={runningManRef}
          src={`${bucketUrl}/icons/running-man.webp`}
          alt="Running Man"
          style={{
            position: 'absolute',
            bottom: `${groundHeight}px`,
            left: `${position}px`,
            width: `${runningManWidth}px`,
            height: 'auto',
            cursor: 'pointer',
            transform: flipDirection,
            transition: 'transform 0.2s ease-in-out',
          }}
        />
      </Link>
    </div>
  );
};

export default RunningMan;
