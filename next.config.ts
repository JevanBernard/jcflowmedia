import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // NEXT_DIST_DIR opsional: build ke folder lain agar tidak bentrok dengan "npm run dev"
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
