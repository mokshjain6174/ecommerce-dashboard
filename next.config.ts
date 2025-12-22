import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" }, // Allows the placeholder images
    ],
    dangerouslyAllowSVG: true, // Allows SVG icons
  },
  // 👇 This allows you to upload files up to 5MB (Default is only 1MB)
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;