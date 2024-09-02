import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  // Use the environment variable for the Cloudflare R2 bucket URL
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  return (
    <div style={{ backgroundColor: 'black', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px', flexDirection: 'column' }}>
        <Link href="/categories">
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
        <Link href="/categories">
        <div style={{ position: 'relative', marginTop: '20px', textAlign: 'center' }}>
          <Image
            src={`${bucketUrl}/icons/name_with_paint.png`} // Updated path to name_with_paint.png
            alt="Paint Stroke with Name"
            width={600}
            height={150}
            layout="intrinsic"
          />
        </div>
        </Link>
      </div>
    </div>
  );
}
