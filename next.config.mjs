/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add Firebase Storage domain here
  },
};

export default nextConfig;
