import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";

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
