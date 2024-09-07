import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ada Mitrani Art",
  description: "Drawings, prints, book covers, children book illustrations, ink drawings, poetry illustrations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use the environment variable for the Cloudflare R2 bucket URL
  const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;

  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
        style={{
          backgroundImage: `url('${bucketUrl}/navigation/textured_paper.webp')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {children}
      </body>
    </html>
  );
}
