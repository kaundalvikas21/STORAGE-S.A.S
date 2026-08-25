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
    // Next 16 requires an explicit allowlist; anything else is coerced back to the default.
    // 70 for photography, 65 for the closing band which sits behind a 60% scrim anyway.
    qualities: [65, 70],
    // Placeholder photography until the client's own sede photos land (content/images.ts).
    // `search` is an exact match, so every manifest entry uses the identical query string.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-**",
        search: "?fm=jpg&fit=crop&w=2000&q=80",
      },
    ],
  },
};

export default nextConfig;
