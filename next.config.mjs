/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_R2_DEV_HOSTNAME, // Dev bucket hostname from env
          port: '', 
          pathname: '/**', 
        },
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_R2_PROD_HOSTNAME, // Production bucket hostname from env
          port: '', 
          pathname: '/**', 
        },
      ],
    },
  };
  
  export default nextConfig;  