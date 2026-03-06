"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ButtonRoot, ButtonText } from "@grx/ui";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";
import { ROUTES } from "./routes";
import { useScrollDirection } from "./useScrollDirection";
import { HeaderNavLink, useNavLink } from "./NavLink";

export type ProductSubHeaderLabelKey =
  | "ProductSubHeader.forMerchants"
  | "ProductSubHeader.pricing";

type ProductHeaderNavItem = {
  labelKey: ProductSubHeaderLabelKey;
  href: string;
  exact?: boolean;
};

const GRX_PAY_NAV_ITEMS: Array<ProductHeaderNavItem> = [
  { labelKey: "ProductSubHeader.forMerchants", href: ROUTES.pay, exact: true },
  { labelKey: "ProductSubHeader.pricing", href: ROUTES.payPricing },
];

export type ProductHeaderProductSlug = "pay";

type ProductHeaderProps = {
  productName: string;
  productSlug: ProductHeaderProductSlug;
};

function getNavItems(productSlug: ProductHeaderProductSlug) {
  switch (productSlug) {
    case "pay": {
      return GRX_PAY_NAV_ITEMS;
    }
    default: {
      const _: never = productSlug;

      return [];
    }
  }
}

export function ProductHeader({
  productName,
  productSlug,
}: ProductHeaderProps) {
  const t = useTranslations();
  const items = getNavItems(productSlug);
  const isVisible = useIsHeaderVisible();

  return (
    <div
      className={clsx(
        "top-16 z-40 sticky border-b w-full transition-transform duration-300 ease-out",
        "bg-bg-base border-stroke-soft-200",
        !isVisible && "-translate-y-full"
      )}
    >
      <div className="px-4 sm:px-8">
        <div className="flex justify-between items-center gap-4 mx-auto py-3 max-w-[1180px]">
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
              style={{
                background:
                  "linear-gradient(234deg, #F4BC4E -35.16%, #F5A70F 24.2%, #8A5A00 83.56%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {productName}
            </span>

            {items.map((item) => (
              <HeaderNavLink
                key={item.href}
                href={item.href}
                exact={item.exact}
              >
                {t(item.labelKey)}
              </HeaderNavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ButtonRoot asChild variant="secondary" size="sm">
              <Link href={EXTERNAL_LINKS.Pay.signIn.href} target="_blank">
                <ButtonText>{t("CommonHeader.nav.signIn")}</ButtonText>
              </Link>
            </ButtonRoot>
            <ButtonRoot asChild variant="primary" size="sm">
              <Link href={EXTERNAL_LINKS.Pay.signUp.href} target="_blank">
                <ButtonText>{t("CommonHeader.nav.createAccount")}</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>
      </div>
    </div>
  );
}

const SCROLL_TOP_THRESHOLD = 20;

function useIsHeaderVisible() {
  const [isAtTop, setIsAtTop] = useState(true);
  const scrollDirection = useScrollDirection();

  const isVisible =
    isAtTop || scrollDirection === null || scrollDirection === "up";

  useEffect(() => {
    const checkScrollTop = () => {
      setIsAtTop(window.scrollY < SCROLL_TOP_THRESHOLD);
    };
    checkScrollTop();
    window.addEventListener("scroll", checkScrollTop, { passive: true });
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  return isVisible;
}
