import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds for faster deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during builds (optional)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
