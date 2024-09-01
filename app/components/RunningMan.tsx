'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const RunningMan = () => {
  const [position, setPosition] = useState(100);
  const mousePositionRef = useRef(100);
  const groundWidth = useRef(0);
  const groundStart = useRef(0);
  const runningManWidth = 400;
  const groundHeight = 50;
  const leftGap = 0.075;
  const rightGap = 0.3;
  const speed = 0.7; // Higher is faster running man

  useEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      groundStart.current = viewportWidth * leftGap;
      groundWidth.current = viewportWidth * (1 - leftGap - rightGap);
      setPosition(groundStart.current + (groundWidth.current / 2) - (runningManWidth / 2));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [leftGap, rightGap, runningManWidth]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = Math.max(groundStart.current, Math.min(event.clientX - (runningManWidth / 2), groundStart.current + groundWidth.current - runningManWidth));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      const delta = mousePositionRef.current - position;
      const direction = delta > 0 ? 1 : -1;

      if (Math.abs(delta) > 1) {
        setPosition(prevPosition => {
          const newPosition = prevPosition + direction * Math.min(Math.abs(delta), 10) * speed;
          return Math.min(Math.max(newPosition, groundStart.current), groundStart.current + groundWidth.current - runningManWidth);
        });
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [position, speed]);

  const flipDirection = `scaleX(${mousePositionRef.current < position ? '1' : '-1'})`;

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: `${groundStart.current}px`,
          width: `${groundWidth.current}px`,
          height: `${groundHeight}px`,
          backgroundColor: '#8B4513',
        }}
      ></div>
      <Link href="/book-illustrations" passHref>
        <motion.img
          src="/icons/running-man.png"
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
