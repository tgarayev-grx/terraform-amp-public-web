import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bg", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
