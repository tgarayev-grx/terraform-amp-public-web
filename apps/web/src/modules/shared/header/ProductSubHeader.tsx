"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Link,
  usePathname,
} from "@/modules/cross-cutting-concerns/i18n/navigation";
import { useScrollDirection } from "./useScrollDirection";
import { isPayFaqPath } from "@/lib/dark-theme";
import clsx from "clsx";

export type HeaderTheme = "light" | "dark";

export type ProductSubHeaderLabelKey =
  | "ProductSubHeader.overview"
  | "ProductSubHeader.pricing"
  | "ProductSubHeader.partners"
  | "ProductSubHeader.faq"
  | "ProductSubHeader.aboutProduct";

interface ProductSubHeaderItem {
  labelKey: ProductSubHeaderLabelKey;
  href: string;
  exact?: boolean;
}

interface ProductSubHeaderProps {
  theme?: HeaderTheme;
  productName: string;
  items: Array<ProductSubHeaderItem>;
}

const themeClasses = {
  light: {
    bar: "bg-neutral border-neutral-200",
    link: "text-neutral-700 hover:text-neutral-900",
    linkActive: "text-neutral-900 font-medium border-b-2 border-neutral-900",
  },
  dark: {
    bar: "bg-neutral-900 border-neutral-800",
    link: "text-neutral-300 hover:text-neutral",
    linkActive: "text-neutral font-medium border-b-2 border-neutral",
  },
} as const;

const SCROLL_TOP_THRESHOLD = 20;

export function ProductSubHeader({
  theme = "light",
  productName,
  items,
}: ProductSubHeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);
  const effectiveTheme = isPayFaqPath(pathname) ? "dark" : theme;
  const tc = themeClasses[effectiveTheme];

  useEffect(() => {
    const checkScrollTop = () => {
      setIsAtTop(window.scrollY < SCROLL_TOP_THRESHOLD);
    };
    checkScrollTop();
    window.addEventListener("scroll", checkScrollTop, { passive: true });
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  const isVisible =
    isAtTop || scrollDirection === null || scrollDirection === "up";

  return (
    <div
      className={clsx(
        "sticky top-16 z-40 w-full border-b transition-transform duration-300 ease-out",
        tc.bar,
        !isVisible && "-translate-y-full"
      )}
    >
      <div className="mx-auto max-w-[1180px]">
        <nav
          className={clsx(
            "flex items-center gap-8 py-3 px-4",
            "overflow-x-auto overflow-y-hidden scrollbar-none",
            "md:overflow-x-visible md:flex-wrap md:justify-start",
            "scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
          )}
          style={{ scrollbarWidth: "none" }}
          aria-label="Product navigation"
        >
          {items.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "whitespace-nowrap font-medium text-sm transition-colors py-1 border-b-2 border-transparent",
                  isActive ? tc.linkActive : tc.link
                )}
              >
                {item.labelKey === "ProductSubHeader.aboutProduct"
                  ? t("ProductSubHeader.aboutProduct", { product: productName })
                  : t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
