import type { NextConfig } from "next";

/**
 * Dua mode:
 *  - GITHUB_PAGES=true → static export (folder `out/`) untuk GitHub Pages di sub-path /jcflowmedia.
 *    Rewrite & header server tidak tersedia; ID di "/" dibuat oleh scripts/finalize-export.mjs.
 *  - selain itu (dev / hosting Node) → ID di "/" lewat rewrite ke /id, plus header keamanan.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/jcflowmedia" : "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPages
    ? {
        output: "export",
        basePath,
        images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async rewrites() {
          // Bahasa Indonesia tanpa prefiks: / → /id, /karya → /id/karya (File statis & /en tidak disentuh)
          return [
            { source: "/", destination: "/id" },
            { source: "/:path((?!en$|en/|id$|id/|_next/|api/)[^.]*)", destination: "/id/:path" },
          ];
        },
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
      }),
};

export default nextConfig;
