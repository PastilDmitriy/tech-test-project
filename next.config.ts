import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imageapi.bpsgameserver.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
