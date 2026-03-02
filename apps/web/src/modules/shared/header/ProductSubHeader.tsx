"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Link,
  usePathname,
} from "@/modules/cross-cutting-concerns/i18n/navigation";
import { useScrollDirection } from "./useScrollDirection";
import clsx from "clsx";

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
  productName: string;
  items: Array<ProductSubHeaderItem>;
}

const SCROLL_TOP_THRESHOLD = 20;

export function ProductSubHeader({
  productName,
  items,
}: ProductSubHeaderProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);

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
        "top-16 z-40 sticky border-b w-full transition-transform duration-300 ease-out",
        "bg-bg-base border-stroke-soft-200",
        !isVisible && "-translate-y-full"
      )}
    >
      <div className="mx-auto max-w-[1180px]">
        <nav
          className={clsx(
            "flex items-center gap-8 px-4 py-3",
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
                  "py-1 whitespace-nowrap transition-colors",
                  isActive
                    ? "text-body-md-semibold text-text-strong-1000 "
                    : "text-body-md-medium text-text-subtle-700  hover:text-text-strong-1000"
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
