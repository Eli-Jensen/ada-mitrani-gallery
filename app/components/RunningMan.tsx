'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RunningMan = () => {
  const [position, setPosition] = useState(100); // Initial position
  const [targetPosition, setTargetPosition] = useState(100); // Mouse target position
  const [groundWidth, setGroundWidth] = useState(0); // Ground width initialized to 0
  const [maxPosition, setMaxPosition] = useState(0); // Max position for the running man initialized to 0
  const [groundStart, setGroundStart] = useState(0); // Ground starting position initialized to 0
  const lag = 0.0005; // Lower = more lag, Higher = less lag
  const deadzone = 50; // Pixels away from the mouse where the man stops
  const runningManWidth = 200;
  const groundHeight = 50;
  
  // Define the gaps
  const leftGap = 0.25; // 10% from the left of the screen
  const rightGap = 0.15; // 15% from the right of the screen

  useEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const newGroundStart = viewportWidth * leftGap;
      const newGroundWidth = viewportWidth * (1 - leftGap - rightGap); // Adjusted for both left and right gaps
      const newMaxPosition = newGroundWidth - runningManWidth;

      setGroundStart(newGroundStart);
      setGroundWidth(newGroundWidth);
      setMaxPosition(newMaxPosition);
    };

    // Initial dimension update
    updateDimensions();

    // Update dimensions on window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [runningManWidth, leftGap, rightGap]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX - groundStart; // Adjust mouse position relative to ground start
      setTargetPosition(mouseX);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [groundStart]);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      const imageCenter = position + runningManWidth / 2;
      const distance = targetPosition - imageCenter;

      if (Math.abs(distance) > deadzone) {
        // Move towards the target position with some lag
        const step = distance * lag;

        setPosition((prevPosition) => {
          // Ensure the position is within bounds
          const newPosition = prevPosition + step;
          return Math.min(Math.max(newPosition, 0), maxPosition);
        });
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition(); // Start the animation loop

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPosition, position, lag, deadzone, maxPosition]);

  // Determine the flip direction based on mouse position
  const flipDirection = targetPosition > position + runningManWidth / 2 ? 'scaleX(-1)' : 'none';

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: `${groundStart}px`, // Ground starts with left gap
          width: `${groundWidth}px`, // Ground width adjusted for both gaps
          height: `${groundHeight}px`,
          backgroundColor: '#8B4513', // Brown color for the ground
        }}
      >
        {/* Optional: Add grass, texture, or other decorations */}
      </div>

      {/* Running Man */}
      <motion.img
        src="/icons/running-man.png"
        alt="Running Man"
        style={{
          position: 'absolute',
          bottom: `${groundHeight}px`, // Position the man right above the ground
          left: position + groundStart, // Adjust position based on ground start
          width: `${runningManWidth}px`,
          height: 'auto',
          cursor: 'pointer',
          transform: flipDirection, // Flip the image based on mouse position
          transition: 'transform 0.2s ease-in-out', // Smooth transition for flipping
        }}
      />
    </div>
  );
};

export default RunningMan;
