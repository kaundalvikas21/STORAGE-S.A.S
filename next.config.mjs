/** @type {import('next').NextConfig} */
const nextConfig = {
  // Spec URLs are all /slug/ — keep them canonical and identical between SSR and client.
  trailingSlash: true,
  // Dev only: allow LAN devices (phone) to load /_next assets when browsing via the PC's IP.
  allowedDevOrigins: ["192.168.29.*"],
};

export default nextConfig;
