import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  distDir: ".next-cache",
};

export default nextConfig;
