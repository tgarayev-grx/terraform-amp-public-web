import { formats } from "@/modules/cross-cutting-concerns/i18n/request";
import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";
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
    Locale: (typeof routing.locales)[number];
    Formats: typeof formats;
    Messages: typeof messages;
  }
}
