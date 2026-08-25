// npm run export -> static HTML in export/ (next/image default loader is unsupported there). dev/build/start unchanged.
const isExport = process.env.npm_lifecycle_event === "export";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isExport && { output: "export", distDir: "export" }),
  // Spec URLs are all /slug/ — keep them canonical and identical between SSR and client.
  trailingSlash: true,
  // Dev only: allow LAN devices (phone) to load /_next assets when browsing via the PC's IP.
  allowedDevOrigins: ["192.168.29.*"],
  // Placeholder photography host (content/images.ts). No `search` restriction: Unsplash URLs carry
  // sizing query params. Swap/remove when the client's real sede photos land.
  images: {
    ...(isExport && { unoptimized: true }),
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
