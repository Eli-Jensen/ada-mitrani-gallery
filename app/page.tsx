import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  // Use the environment variable for the Cloudflare R2 bucket URL
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  return (
    <div style={{ backgroundColor: 'black', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px' }}>
        <Link href="/options">
          <div style={{ maxWidth: '30vw', maxHeight: '90vh', width: '100%', height: 'auto' }}>
            <Image
              src={`${bucketUrl}/icons/self-portrait.jpg`} // Use the R2 bucket URL with the /icons prefix
              alt="Self Portrait"
              width={5433}
              height={6496}
              layout="responsive"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}