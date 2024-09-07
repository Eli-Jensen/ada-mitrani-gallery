'use client';

import React from 'react';
import RunningMan from '../components/RunningMan';
import Bunny from '../components/Bunny';
import PregnantMother from '../components/PregnantMother';
import Dog from '../components/Dog';
import Angel from '../components/Angel';

export default function Categories() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          zIndex: 10,
          gap: '20px', // Space between rows/icons
        }}
      >
        {/* Row of clickable icons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <Dog />
          <Angel />
          <PregnantMother />
          <Bunny />
          {/* Add two more clickable icons here */}
        </div>

        {/* RunningMan spans the full width of the viewport */}
        <div
          style={{
            width: '100%', // Make RunningMan span full width
            position: 'relative', // Allows the rocks to sit at the bottom
            height: '50vh', // Adjust height based on your design
          }}
        >
          <RunningMan />
        </div>
      </div>
    </main>
  );
}
