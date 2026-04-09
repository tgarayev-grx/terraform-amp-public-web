import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  transpilePackages: ["@grx/ui", "next-mdx-remote"],
  trailingSlash: true,
};

export default nextConfig;
