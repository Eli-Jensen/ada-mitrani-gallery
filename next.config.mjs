/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "media.adamitrani.com",
          port: '', 
          pathname: '/**', 
        },
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_R2_DEV_HOSTNAME,
          port: '', 
          pathname: '/**', 
        },
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_R2_PROD_HOSTNAME,
          port: '', 
          pathname: '/**', 
        },
      ],
    },
  };
  
  export default nextConfig;  