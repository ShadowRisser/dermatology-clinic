     1|import type { NextConfig } from "next";
     2|
     3|const nextConfig: NextConfig = {
     4|  output: "export",
     5|  /* config options here */
     6|  typescript: {
     7|    ignoreBuildErrors: true,
     8|  },
     9|  reactStrictMode: false,
    10|  basePath: "/dermatology-clinic",
  assetPrefix: "/dermatology-clinic/",
  images: { unoptimized: true },
};
    11|
    12|export default nextConfig;
    13|