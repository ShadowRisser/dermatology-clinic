import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  basePath: "/dermatology-clinic",
  assetPrefix: "/dermatology-clinic/",
  images: { unoptimized: true },
};

export default nextConfig;
