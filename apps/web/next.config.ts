import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/modules/cross-cutting-concerns/i18n/request.ts",
  experimental: {
    createMessagesDeclaration:
      "./src/modules/cross-cutting-concerns/i18n/locales/en.json",
  },
});

const SERVER_EXTERNAL_PACKAGES = ["http", "https", "pino", "pino-pretty"];

// K8s/Docker: output "standalone" for Node.js server (pnpm start).
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  output: "standalone",
  images: { unoptimized: true },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  devIndicators: {
    position: "bottom-right",
  },
  transpilePackages: ["@grx/ui"],
  trailingSlash: true,
  logging: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.externals)) {
        config.externals.push(...SERVER_EXTERNAL_PACKAGES);
      } else {
        config.externals = [...SERVER_EXTERNAL_PACKAGES];
      }
    }
    return config;
  },
  // For some reason, this option doesn't work
  // even worse, it breaks webpack patch
  // serverExternalPackages: SERVER_EXTERNAL_PACKAGES,
};

export default withNextIntl(nextConfig);
