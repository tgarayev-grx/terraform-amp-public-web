import type { Locale } from "@/modules/cross-cutting-concerns/i18n/config";
import messages from "@/modules/cross-cutting-concerns/i18n/locales/en.json";

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
