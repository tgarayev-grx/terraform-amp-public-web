import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/modules/cross-cutting-concerns/i18n/request.ts",
  experimental: {
    createMessagesDeclaration:
      "./src/modules/cross-cutting-concerns/i18n/locales/en.json",
  },
});

// Static export required for Cloudflare Pages: build outputs to out/ for wrangler pages deploy.
// Without output: "export" Next builds for Node (SSR) and Pages cannot serve it.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  devIndicators: {
    position: "bottom-right",
  },
  transpilePackages: ["@grx/ui"],
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
