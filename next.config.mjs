/** @type {import('next').NextConfig} */
const nextConfig = {
  // Spec URLs are all /slug/ — keep them canonical and identical between SSR and client.
  trailingSlash: true,
};

export default nextConfig;
