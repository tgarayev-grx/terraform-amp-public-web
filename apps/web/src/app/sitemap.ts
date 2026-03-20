import { MetadataRoute } from "next";

// 1. Define your base URL (match your AWS SST production domain)
const BASE_URL = "https://goldenratio.exchange";

// 2. Define your supported locales
const locales = ["en", "bg"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // --- STATIC ROUTES ---
  // Add your main pages here
  const staticPages = [
    "",
    "/pay",
    "/pay/pricing",
    "/pay/demo",
    "/exchange",
    "/rwa",
    "/about-us",
    "/privacy-policy",
    "/terms-of-use",
    "/aml-policy",
    "/imprint",
  ];

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}${page}`,
          bg: `${BASE_URL}/bg${page}`,
        },
      },
    }))
  );

  return [...staticEntries];
}
