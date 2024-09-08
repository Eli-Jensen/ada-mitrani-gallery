'use client';

import React, { useEffect } from 'react';
import RunningMan from '../components/RunningMan';
import Bunny from '../components/Bunny';
import PregnantMother from '../components/PregnantMother';
import Dog from '../components/Dog';
import Angel from '../components/Angel';
import BookCover from '../components/BookCover';
import CatLeftPage from '../components/CatLeftPage';

export default function Categories() {
  // Scroll to bottom on load
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top section with clickable icons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: '20px',
          gap: '20px',
          flex: '1 1 60vh', // Allow flexible space, but max at 60% of the viewport height
          maxHeight: '60vh', // Limit the section to 60% of viewport height
          width: '100%',
          zIndex: 1,
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
          height: '40vh',
          position: 'absolute',
          bottom: 0,
          zIndex: 10,
        }}
      >
        <RunningMan />
      </div>
    </main>
  );
}
