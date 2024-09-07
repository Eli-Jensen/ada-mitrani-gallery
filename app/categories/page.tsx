'use client';

import React from 'react';
import RunningMan from '../components/RunningMan';
import Bunny from '../components/Bunny';
import PregnantMother from '../components/PregnantMother';
import Dog from '../components/Dog';
import Angel from '../components/Angel';

export default function Categories() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '60vh', // Allocate 60% of viewport height for clickable icons
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
        </div>
      </div>

      {/* RunningMan spans the remaining 40% of the viewport */}
      <div
        style={{
          width: '100%', 
          position: 'relative', 
          height: '40vh', // Allocate 40% of viewport height for RunningMan and rocks
        }}
      >
        <RunningMan />
      </div>
    </main>
  );
}
