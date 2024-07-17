/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};

export default nextConfig;
