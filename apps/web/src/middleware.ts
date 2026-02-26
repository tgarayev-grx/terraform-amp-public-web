import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const DARK_THEME_BASE_PATHS = new Set(["/", "/about-us"]);

function isDarkThemeRoute(pathname: string): boolean {
  const nonDefaultLocales = routing.locales.filter(
    (l) => l !== routing.defaultLocale
  );

  if (DARK_THEME_BASE_PATHS.has(pathname)) return true;

  return nonDefaultLocales.some(
    (locale) => pathname === `/${locale}` || pathname === `/${locale}/about-us`
  );
}

export default function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  if (!isDarkThemeRoute(request.nextUrl.pathname)) {
    return intlResponse;
  }

  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-force-theme", "dark");

  const nextResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });

  intlResponse.cookies.getAll().forEach((cookie) => {
    nextResponse.cookies.set(cookie.name, cookie.value, cookie);
  });
  intlResponse.headers.forEach((value, key) => {
    if (key !== "set-cookie") {
      nextResponse.headers.set(key, value);
    }
  });

  return nextResponse;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
