"use client";

import { useState, useEffect } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ButtonRoot, ButtonText } from "@grx/ui";
import { useScrollDirection } from "./useScrollDirection";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";
import { ROUTES } from "./routes";
import clsx from "clsx";

export type ProductSubHeaderLabelKey =
  | "ProductSubHeader.forMerchants"
  | "ProductSubHeader.pricing";

interface ProductHeaderNavItem {
  labelKey: ProductSubHeaderLabelKey;
  href: string;
  exact?: boolean;
}

const GRX_PAY_NAV_ITEMS: Array<ProductHeaderNavItem> = [
  { labelKey: "ProductSubHeader.forMerchants", href: ROUTES.pay, exact: true },
  { labelKey: "ProductSubHeader.pricing", href: ROUTES.payPricing },
];

export type ProductHeaderProductSlug = "pay";

interface ProductHeaderProps {
  productName: string;
  productSlug: ProductHeaderProductSlug;
}

const SCROLL_TOP_THRESHOLD = 20;

function getNavItems(productSlug: ProductHeaderProductSlug) {
  switch (productSlug) {
    case "pay":
      return GRX_PAY_NAV_ITEMS;
    default:
      return [];
  }
}

function getPathFromSegments(segments: string[]): string {
  const pathSegments = segments[0]?.match(/^[a-z]{2}(-[A-Z]{2})?$/)
    ? segments.slice(1)
    : segments;
  return "/" + pathSegments.join("/");
}

function ProductHeaderNavLink({
  href,
  label,
  exact,
  pathFromSegments,
}: {
  href: string;
  label: string;
  exact?: boolean;
  pathFromSegments: string;
}) {
  const isActive = exact
    ? pathFromSegments === href
    : pathFromSegments === href || pathFromSegments.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={clsx(
        "whitespace-nowrap border-b-2 border-transparent px-2 py-1.5 text-sm transition-colors",
        isActive
          ? "text-body-md-semibold text-text-strong-1000 border-b-2 border-text-strong-1000"
          : "text-body-md-medium text-text-subtle-700 hover:text-text-strong-1000"
      )}
    >
      {label}
    </Link>
  );
}

export function ProductHeader({
  productName,
  productSlug,
}: ProductHeaderProps) {
  const t = useTranslations();
  const segments = useSelectedLayoutSegments();
  const pathFromSegments = getPathFromSegments(segments);
  const scrollDirection = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);
  const items = getNavItems(productSlug);

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

  const grxPayLogoStyle = {
    background:
      "linear-gradient(234deg, #F4BC4E -35.16%, #F5A70F 24.2%, #8A5A00 83.56%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as const;

  return (
    <div
      className={clsx(
        "top-16 z-40 sticky border-b w-full transition-transform duration-300 ease-out",
        "bg-bg-base border-stroke-soft-200",
        !isVisible && "-translate-y-full"
      )}
    >
      <div className="px-4 sm:px-8">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 py-3">
          <nav
            className={clsx(
              "flex items-center gap-6 overflow-x-auto overflow-y-hidden whitespace-nowrap",
              "scroll-smooth [&::-webkit-scrollbar]:hidden"
            )}
            style={{ scrollbarWidth: "none" }}
            aria-label="Product navigation"
          >
            <span
              className="font-unbounded text-sm uppercase tracking-[-0.56px]"
              style={grxPayLogoStyle}
            >
              {productName}
            </span>
            {items.map((item) => (
              <ProductHeaderNavLink
                key={item.href}
                href={item.href}
                label={(t as (key: string) => string)(item.labelKey)}
                exact={item.exact}
                pathFromSegments={pathFromSegments}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ButtonRoot asChild variant="secondary" size="sm">
              <Link href={EXTERNAL_LINKS.Pay.signIn.href} target="_blank">
                <ButtonText>
                  {(t as (key: string) => string)("CommonHeader.nav.signIn")}
                </ButtonText>
              </Link>
            </ButtonRoot>
            <ButtonRoot asChild variant="primary" size="sm">
              <Link href={EXTERNAL_LINKS.Pay.signUp.href} target="_blank">
                <ButtonText>
                  {(t as (key: string) => string)(
                    "CommonHeader.nav.createAccount"
                  )}
                </ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>
      </div>
    </div>
  );
}
