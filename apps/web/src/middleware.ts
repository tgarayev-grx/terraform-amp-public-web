import createMiddleware from "next-intl/middleware";
import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
