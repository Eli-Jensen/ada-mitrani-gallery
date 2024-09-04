'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  return (
    <div style={{ backgroundColor: 'black', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px', flexDirection: 'column' }}>
        <Link href="/categories">
          <div className="portrait-container">
            <div className="image-wrapper">
              <Image
                src={`${bucketUrl}/icons/self-portrait.webp`}
                alt="Self Portrait"
                fill
                style={{ cursor: 'pointer', objectFit: 'contain' }}
              />
            </div>
            <div className="name-container">
              <Image
                src={`${bucketUrl}/icons/name_with_paint.webp`}
                alt="Paint Stroke with Name"
                width={600}
                height={150}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .portrait-container {
          max-width: 30vw;
          max-height: 90vh;
          width: 100%;
          height: auto;
          position: relative;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 100%; /* Aspect ratio placeholder to prevent layout shifts */
        }

        .name-container {
          margin-top: 20px;
          text-align: center;
          width: 100%;
        }

        @media (max-width: 768px) {
          .portrait-container {
            max-width: 50vw;
          }
        }

        @media (max-width: 480px) {
          .portrait-container {
            max-width: 70vw;
          }
        }
      `}</style>
    </div>
  );
}
