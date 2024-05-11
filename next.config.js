// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'embrave-blob.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
