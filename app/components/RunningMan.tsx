'use client';

import { useLayoutEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const RunningMan = () => {
  const [position, setPosition] = useState(100);
  const [runningManWidth, setRunningManWidth] = useState(400);
  const [runningManHeight, setRunningManHeight] = useState<number | null>(null);
  const mousePositionRef = useRef(100);
  const runningManRef = useRef<HTMLImageElement | null>(null);
  const groundWidth = useRef(0);
  const groundStart = useRef(0);
  const groundHeight = 50;
  const leftGap = 0.075;
  const rightGap = 0.3;
  const speed = 0.5;
  const stopThreshold = runningManWidth / 4;

  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  useLayoutEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const newRunningManWidth = Math.max(100, viewportWidth * 0.15); // Responsive width between 100px and 15% of viewport width
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
      const updateHeight = () => setRunningManHeight(runningManRef.current!.clientHeight);
      if (runningManRef.current.complete) {
        updateHeight();
      } else {
        runningManRef.current.onload = updateHeight;
      }
    }
  }, [runningManRef.current]);

  const flipDirection = `scaleX(${mousePositionRef.current < position ? '1' : '-1'})`;

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Link href="/children-book-illustrations" passHref>
        {runningManHeight !== null && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: `${groundHeight + runningManHeight}px`, // Position the text directly on top of the running man
              left: `${position + runningManWidth / 2.25}px`,
              width: 'max-content',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              color: 'black',
              textDecoration: 'underline',
              textAlign: 'center',
              fontSize: `${runningManWidth * 0.1}px`, // Font size based on runningManWidth
            }}
          >
            <span style={{ display: 'block' }}>Children Book Illustrations</span>
          </motion.div>
        )}
      </Link>
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
      <Link href="/children-book-illustrations" passHref>
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
