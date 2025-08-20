import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: process.env.NEXT_PUBLIC_IMAGES_URL
      ? [new URL(process.env.NEXT_PUBLIC_IMAGES_URL)]
      : undefined,
  },
};

export default nextConfig;
