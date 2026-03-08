'use client';

import React, { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import RunningMan from '../components/RunningMan';
import Bunny from '../components/Bunny';
import PregnantMother from '../components/PregnantMother';
import Dog from '../components/Dog';
import Angel from '../components/Angel';
import BookCover from '../components/BookCover';
import CatLeftPage from '../components/CatLeftPage';

export default function Categories() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        minHeight: '100dvh',
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
          padding: isSmallScreen ? '10px' : '20px',
          gap: isSmallScreen ? '10px' : '20px',
          flex: '1 1 auto',
          minHeight: '55vh',
          paddingBottom: isSmallScreen ? '35vh' : '40vh',
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
          height: isSmallScreen ? '30vh' : '40vh',
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
