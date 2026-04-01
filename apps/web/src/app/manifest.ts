import type { MetadataRoute } from "next";
import { MANIFEST_BACKGROUND_HEX, MANIFEST_THEME_HEX } from "@grx/ui/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Golden Ratio Exchange",
    short_name: "GRX",
    description: "Golden Ratio Exchange - Your trusted exchange platform",
    start_url: "/",
    display: "standalone",
    background_color: MANIFEST_BACKGROUND_HEX,
    theme_color: MANIFEST_THEME_HEX,
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
