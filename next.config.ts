import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: [
    "172.21.13.174",
    "172.21.13.174:3000",
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000",
  ],
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/notes", destination: "/notes", permanent: true },
      { source: "/blog/pdfs", destination: "/notes", permanent: true },
      { source: "/blog/pdfs/:slug", destination: "/notes", permanent: true },
      { source: "/pdfs", destination: "/notes", permanent: true },
      { source: "/pdfs/:slug", destination: "/notes", permanent: true },
      { source: "/blog/:slug", destination: "/notes/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
