'use client';

import Link from 'next/link';
import BackToCategoriesButton from '../components/BackToCategoriesButton';
import ContactForm from '../components/ContactForm';
import { Box, Typography } from '@mui/material';

export default function BioContact() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Top Section with Back to Categories and Centered Bio and Contact */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '20px',
          position: 'relative',
        }}
      >
        {/* Left-aligned Back to Categories Button */}
        <Box sx={{ position: 'absolute', left: '20px', top: { xs: '10px', sm: 'auto' } }}>
          <Link href="/categories">
            <BackToCategoriesButton />
          </Link>
        </Box>
        {/* Centered Bio and Contact Title */}
        <Typography variant="h3" align="center" sx={{ fontSize: { xs: '1.4rem', sm: '2rem' }, margin: 0 }}>
          Bio
        </Typography>
      </Box>

      {/* Main Content Section with Bio Placeholder and Contact Form */}
      <Box
        sx={{
          padding: '20px',
          textAlign: 'left',
          width: '100%',
          maxWidth: { xs: '80vw', sm: '70vw', md: '60vw' },
          margin: '0 auto',
        }}
      >
      <Typography variant="h3" align="left" sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' }, margin: 0 }}>
        Ada Mitrani is a Bulgarian-born artist and lawyer whose work spans both creative and legal realms. Trained in fine arts in Sofia, she initially pursued a career in illustration and design before moving to the United States, where she transitioned into law. Since 2006, she has worked as a defense attorney for the Department of Energy in Washington, D.C., specializing in cases involving lawsuits against the federal government. Despite her legal career, Mitrani&apos;s passion for art never faded, and she recently returned to her roots with a solo exhibition titled &quot;Beyond&quot; at Arte Gallery in Sofia.
        <br /><br />
        Mitrani&apos;s artistic journey began with a focus on prints, etchings, and lithographs, but her latest work embraces simplicity, using only paper and Indian ink to highlight clean lines and eliminate distractions. Her exhibition showcases pieces from the late 20th century alongside more recent works from 2013 and 2014, reflecting her connection to both Bulgaria and the U.S.
        <br /><br />
        Having studied at the National Academy of Arts in Sofia, Mitrani fondly recalls the vibrant and competitive artistic community she was part of. She contrasts this with the more dispersed art scene in the U.S., where artists often work in isolation. Her decision to return to art after nearly two decades of legal work marks a personal rediscovery of the joy and fulfillment that creativity brings.
        <br /><br />
        Mitrani&apos;s ability to bridge her experiences in law and art speaks to her unique perspective, blending structure and expression in ways that span not only professions but also cultures.
        <br /><br />
      </Typography>


        <ContactForm />
      </Box>
    </Box>
  );
}
