import type { NextConfig } from "next";

// Static export required for Cloudflare Pages: build outputs to out/ for wrangler pages deploy.
// Without output: "export" Next builds for Node (SSR) and Pages cannot serve it.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@grx/ui"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    
    return config;
  },
};

export default nextConfig;
