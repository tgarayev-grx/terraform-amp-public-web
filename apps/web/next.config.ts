import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/modules/cross-cutting-concerns/i18n/request.ts",
  experimental: {
    createMessagesDeclaration:
      "./src/modules/cross-cutting-concerns/i18n/locales/en.json",
  },
});

// K8s/Docker: output "standalone" for Node.js server (pnpm start).
const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  devIndicators: {
    position: "bottom-right",
  },
  transpilePackages: ["@grx/ui"],
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
