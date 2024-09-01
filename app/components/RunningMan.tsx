'use client';

import { useLayoutEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const RunningMan = () => {
  const [position, setPosition] = useState(100);
  const [runningManHeight, setRunningManHeight] = useState<number | null>(null); // Initial value is null
  const mousePositionRef = useRef(100);
  const runningManRef = useRef<HTMLImageElement | null>(null); // Type the ref for an HTMLImageElement
  const groundWidth = useRef(0);
  const groundStart = useRef(0);
  const runningManWidth = 400;
  const groundHeight = 50;
  const textHeightOffset = 10; // Adjust this value to control the distance between the text and the running man
  const leftGap = 0.075;
  const rightGap = 0.3;
  const speed = 0.5; // Higher is faster running man
  const stopThreshold = runningManWidth / 4; // Number of pixels within which the running man stops

  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL; // Use the Cloudflare R2 bucket URL

  useLayoutEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      groundStart.current = viewportWidth * leftGap;
      groundWidth.current = viewportWidth * (1 - leftGap - rightGap);
      setPosition(groundStart.current + groundWidth.current / 2 - runningManWidth / 2);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [leftGap, rightGap, runningManWidth]);

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = Math.max(
        groundStart.current,
        Math.min(event.clientX - runningManWidth / 2, groundStart.current + groundWidth.current - runningManWidth)
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    // Measure the height of the running man image after it loads
    if (runningManRef.current) {
      const updateHeight = () => setRunningManHeight(runningManRef.current!.clientHeight);
      if (runningManRef.current.complete) {
        updateHeight();
      } else {
        runningManRef.current.onload = updateHeight;
      }
    }
  }, [runningManRef.current]); // Runs when the image ref is set

  const flipDirection = `scaleX(${mousePositionRef.current < position ? '1' : '-1'})`;

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Link href="/children-book-illustrations" passHref>
        {runningManHeight !== null && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: `${groundHeight + runningManHeight + textHeightOffset}px`, // Positioning above the running man
              left: `${position + runningManWidth/2.25}px`,
              width: 'max-content',
              transform: 'translateX(-50%)', // Center the text horizontally above the running man
              cursor: 'pointer',
              color: 'black', // Adjust text color as needed
              textDecoration: 'underline', // Makes it clear that the text is a link
              textAlign: 'center', // Ensure the text is centered
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
          backgroundImage: `url(${bucketUrl}/icons/rocks.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-x',
          borderRadius: '25px', // Rounded corners
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', // Fading edges
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', // Safari support
        }}
      ></div>
      <Link href="/children-book-illustrations" passHref>
        <motion.img
          ref={runningManRef} // Attach the ref to the image
          src={`${bucketUrl}/icons/running-man.png`} // Use the R2 bucket URL for the image source
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
