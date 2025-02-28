/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Ignores ALL lint errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Ignores type errors, letting you build anyway
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
