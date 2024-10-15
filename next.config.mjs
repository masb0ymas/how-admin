/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  env: {
    API_URL: process.env.API_URL,
    IPFS_API_URL: process.env.IPFS_API_URL,
  },
  output: "standalone",
};

export default nextConfig;
