'use client';

import React from 'react';
import RunningMan from '../components/RunningMan';
import Bunny from '../components/Bunny';
import PregnantMother from '../components/PregnantMother';
import Dog from '../components/Dog';
import Angel from '../components/Angel';
import BookCover from '../components/BookCover';
import CatLeftPage from '../components/CatLeftPage';

export default function Categories() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Distribute space between icons and RunningMan
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Top section with clickable icons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '20px', // Add padding to prevent clipping at edges
          gap: '30px', // Increase gap between items to avoid overlap
          flex: '1 1 auto', // Allow this section to take up flexible space
        }}
      >
        <Dog />
        <CatLeftPage />
        <Angel />
        <PregnantMother />
        <BookCover />
        <Bunny />
      </div>

      {/* RunningMan section */}
      <div
        style={{
          width: '100%',
          height: '40vh', // Fixed height for RunningMan
          position: 'relative',
          zIndex: 1
        }}
      >
        <RunningMan />
      </div>
    </main>
  );
}
