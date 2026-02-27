import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";

const DARK_THEME_BASE_PATHS = new Set([
  "/",
  "/about-us",
  "/pay/faq",
  "/cookie-policy",
  "/privacy-policy",
  "/terms-of-use",
  "/aml-policy",
]);

const LEGAL_PATH_SEGMENTS = [
  "cookie-policy",
  "privacy-policy",
  "terms-of-use",
  "aml-policy",
] as const;

export function isPayFaqPath(pathname: string): boolean {
  if (pathname === "/pay/faq" || pathname.startsWith("/pay/faq/")) {
    return true;
  }
  return routing.locales.some(
    (locale) =>
      pathname === `/${locale}/pay/faq` ||
      pathname.startsWith(`/${locale}/pay/faq/`)
  );
}

export function isLegalPath(pathname: string): boolean {
  if (
    LEGAL_PATH_SEGMENTS.some(
      (s) => pathname === `/${s}` || pathname === `/${s}/`
    )
  ) {
    return true;
  }
  return routing.locales.some((locale) =>
    LEGAL_PATH_SEGMENTS.some(
      (s) =>
        pathname === `/${locale}/${s}` ||
        pathname.startsWith(`/${locale}/${s}/`)
    )
  );
}

export function isDarkThemePath(pathname: string): boolean {
  if (DARK_THEME_BASE_PATHS.has(pathname)) return true;
  if (isPayFaqPath(pathname)) return true;
  if (isLegalPath(pathname)) return true;
  return routing.locales
    .filter((l) => l !== routing.defaultLocale)
    .some(
      (locale) =>
        pathname === `/${locale}` || pathname === `/${locale}/about-us`
    );
}
