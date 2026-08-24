/** @type {import('next').NextConfig} */
const nextConfig = {
  // Spec URLs are all /slug/ — keep them canonical and identical between SSR and client.
  trailingSlash: true,
  // Dev only: allow LAN devices (phone) to load /_next assets when browsing via the PC's IP.
  allowedDevOrigins: ["192.168.29.*"],
  // Placeholder photography host (content/images.ts). No `search` restriction: Unsplash URLs carry
  // sizing query params. Swap/remove when the client's real sede photos land.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
