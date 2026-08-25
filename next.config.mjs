// npm run export -> static HTML in export/ (next/image default loader is unsupported there). dev/build/start unchanged.
const isExport = process.env.npm_lifecycle_event === "export";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isExport && { output: "export", distDir: "export" }),
  // Spec URLs are all /slug/ — keep them canonical and identical between SSR and client.
  trailingSlash: true,
  // Dev only: allow LAN devices (phone) to load /_next assets when browsing via the PC's IP.
  allowedDevOrigins: ["192.168.29.*"],
  images: {
    ...(isExport && { unoptimized: true }),
    // content/images.ts manifest sources (Unsplash License). Swap to local files when client photos land.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [70, 75],
  },
};

export default nextConfig;
