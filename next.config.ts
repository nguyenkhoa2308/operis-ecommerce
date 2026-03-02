import type { NextConfig } from "next";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "https://admin.operis.vn";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Proxy /api/* → backend API so cookies are first-party (same-origin)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@react-three/drei",
      "recharts",
      "antd",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days — cache optimized images much longer
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "admin.operis.vn",
      },
      {
        protocol: "https",
        hostname: "lh3.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
