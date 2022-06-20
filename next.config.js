/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ["img.dummyapi.io", "randomuser.me"],
    formats: ["image/avif", "image/webp"],
  },
};