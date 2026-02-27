"use client";

import { usePathname } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { useLayoutEffect } from "react";
import { isDarkThemePath } from "@/lib/dark-theme";

export function DarkThemeSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (isDarkThemePath(pathname)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [pathname]);

  return null;
}
