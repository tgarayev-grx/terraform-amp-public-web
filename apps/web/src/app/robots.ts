import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/_next/", // Don't index Next.js internals
      ],
    },
    sitemap: "https://goldenratio.exchange/sitemap.xml",
  };
}
