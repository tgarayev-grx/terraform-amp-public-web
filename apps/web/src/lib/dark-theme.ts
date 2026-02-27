import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";

const DARK_THEME_BASE_PATHS = new Set(["/", "/about-us", "/pay/faq"]);

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

export function isDarkThemePath(pathname: string): boolean {
  if (DARK_THEME_BASE_PATHS.has(pathname)) return true;
  if (isPayFaqPath(pathname)) return true;
  return routing.locales
    .filter((l) => l !== routing.defaultLocale)
    .some(
      (locale) =>
        pathname === `/${locale}` || pathname === `/${locale}/about-us`
    );
}
