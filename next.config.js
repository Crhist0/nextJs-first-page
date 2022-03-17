/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  env: {
    USER: process.env.USER,
  },
};

module.exports = nextConfig;
