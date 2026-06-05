/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // High-quality placeholder imagery is served from Unsplash.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
