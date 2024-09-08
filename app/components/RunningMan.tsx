'use client';

import { useLayoutEffect, useState, useRef } from 'react';
import { motion, MotionStyle } from 'framer-motion';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const RunningMan = () => {
  const [position, setPosition] = useState(100);
  const [runningManWidth, setRunningManWidth] = useState(15); // Use vw as base width
  const [runningManHeight, setRunningManHeight] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false); 
  const [isMovingRight, setIsMovingRight] = useState(true); 
  const [isLoaded, setIsLoaded] = useState(false);
  const mousePositionRef = useRef(100);
  const runningManRef = useRef<HTMLImageElement | null>(null);
  const groundWidth = useRef(0);
  const groundStart = useRef(0);
  const groundHeight = 50;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  const fontSize = isSmallScreen ? '1rem' : '1.25rem'; 
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

  useLayoutEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
  }, []);

  useLayoutEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const newRunningManWidth = isSmallScreen ? 50 : isMediumScreen ? 30 : 15;
      setRunningManWidth(newRunningManWidth);

      groundStart.current = 0;
      groundWidth.current = viewportWidth;
      setPosition(groundWidth.current / 2 - (viewportWidth * newRunningManWidth) / 100 / 2); // Initial position centered
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [isSmallScreen]);

  useLayoutEffect(() => {
    if (!isTouchDevice) {
      const handleMouseMove = (event: MouseEvent) => {
        const newMouseX = Math.max(
          groundStart.current,
          Math.min(event.clientX - (window.innerWidth * runningManWidth) / 100 / 2, groundStart.current + groundWidth.current - (window.innerWidth * runningManWidth) / 100)
        );
        mousePositionRef.current = newMouseX;
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [runningManWidth, isTouchDevice]);

  useLayoutEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      if (isTouchDevice) {
        const speed = 0.5;
        setPosition((prevPosition) => {
          const newPosition = prevPosition + (isMovingRight ? speed : -speed);
          if (newPosition > groundWidth.current - (window.innerWidth * runningManWidth) / 100) {
            setIsMovingRight(false);
          }
          if (newPosition < 0) {
            setIsMovingRight(true);
          }
          return newPosition;
        });
      } else {
        const delta = mousePositionRef.current - position;
        const speed = 0.02;
        if (Math.abs(delta) > 1) {
          setPosition((prevPosition) => prevPosition + delta * speed);
        }
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice, isMovingRight]);

  useLayoutEffect(() => {
    if (runningManRef.current) {
      const updateHeight = () => {
        setRunningManHeight(runningManRef.current!.clientHeight);
        setIsLoaded(true);
      };
      if (runningManRef.current.complete) {
        updateHeight();
      } else {
        runningManRef.current.onload = updateHeight;
      }
    }
  }, [runningManRef.current]);

  const flipDirection = isTouchDevice
    ? isMovingRight
      ? 'scaleX(-1)'
      : 'scaleX(1)'
    : `scaleX(${mousePositionRef.current < position ? '1' : '-1'})`;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', zIndex: 5 }}>
      <Link href="/children-book-illustrations">
        {isLoaded && runningManHeight !== null && (
          <motion.div
            style={{
              ...labelStyle,
              position: 'absolute',
              bottom: `${groundHeight + runningManHeight + 20}px`,
              left: `${position + (window.innerWidth * runningManWidth) / 100 / 2.25}px`,
              transform: 'translateX(0%)',
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Children <br /> Book <br /> Illustrations
          </motion.div>
        )}
      </Link>

      <Link href="/children-book-illustrations">
        <motion.img
          ref={runningManRef}
          src={`${bucketUrl}/icons/running-man.webp`}
          alt="Running Man"
          style={{
            position: 'absolute',
            bottom: `${groundHeight}px`,
            left: `${position}px`,
            width: `${runningManWidth}vw`,
            height: 'auto',
            cursor: 'pointer',
            transform: flipDirection,
            transition: 'transform 0.2s ease-in-out',
          }}
        />
      </Link>

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
