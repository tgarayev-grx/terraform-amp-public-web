/** Supported locales — single source of truth for the entire app. */
export const LOCALES = ["en", "bg"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie name used by next-intl middleware to persist the user's locale choice. */
export const LOCALE_COOKIE_NAME = "APP_LOCALE";

const ICU_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  bg: "bg_BG",
};

export function resolveICULocale(locale: string): string {
  return ICU_LOCALE_MAP[locale as Locale] ?? ICU_LOCALE_MAP[DEFAULT_LOCALE];
}
