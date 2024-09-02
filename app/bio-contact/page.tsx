'use client';

import Link from 'next/link';
import BackToCategoriesButton from '../components/BackToCategoriesButton';

export default function BioContact() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <Link href="/categories">
          <BackToCategoriesButton />
        </Link>
        <h1 style={{ textAlign: 'center', flex: '1', fontSize: '2rem' }}>"Bio and contact goes here"</h1>
      </div>
    </div>
  )
};