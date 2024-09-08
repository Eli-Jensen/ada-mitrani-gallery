'use client';

import Link from 'next/link';
import BackToCategoriesButton from '../components/BackToCategoriesButton';

export default function BioContact() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <Link href="/categories">
          <BackToCategoriesButton />
        </Link>
        <h1 style={{ textAlign: 'center', flex: '1', fontSize: '2rem' }}>Bio and Contact</h1>
      </div>
      <div style={{ padding: '20px', textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
        <p>
          ----- Bio placeholder -----
        </p>
        <p>
          <strong>Ada Mitrani</strong> is a Bulgarian American artist.
        </p>
        <p>
          Contact: -----
        </p>
      </div>
    </div>
  );
}
