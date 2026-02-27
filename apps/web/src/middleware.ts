import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";
import { isDarkThemePath } from "@/lib/dark-theme";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  if (!isDarkThemePath(request.nextUrl.pathname)) {
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
