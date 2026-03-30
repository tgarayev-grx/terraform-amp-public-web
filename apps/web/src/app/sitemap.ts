import { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";
import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { locales, defaultLocale } = routing;

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
      url: `${SITE_URL}${locale === defaultLocale ? "" : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}${page}`,
          bg: `${SITE_URL}/bg${page}`,
        },
      },
    }))
  );

  return [...staticEntries];
}
