"use client";

import * as Popover from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ComingSoonBadge } from "./ComingSoonBadge";
import { ShevronDownIcon } from "../../icons";
import { ROUTES } from "../routes";
import clsx from "clsx";

export type HeaderTheme = "light" | "dark";

const themeClasses = {
  light: {
    navLink: "text-neutral-700 hover:text-neutral-900",
    dropdown: "bg-neutral border-neutral-200",
    dropdownItem: "hover:bg-neutral-100 text-neutral-1000",
    dropdownItemDisabled: "text-neutral-500 cursor-not-allowed",
  },
  dark: {
    navLink: "text-neutral-300 hover:text-neutral",
    dropdown: "bg-neutral-900 border-neutral-800",
    dropdownItem: "hover:bg-neutral-800 text-neutral",
    dropdownItemDisabled: "text-neutral-500 cursor-not-allowed",
  },
} as const;

interface ProductsDropdownProps {
  theme: HeaderTheme;
}

export function ProductsDropdown({ theme }: ProductsDropdownProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const tc = themeClasses[theme];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={clsx(
            "group flex items-center gap-1.5 font-medium text-sm transition-colors",
            tc.navLink
          )}
        >
          {t("CommonHeader.nav.products")}
          <ShevronDownIcon className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={clsx(
            "z-50 shadow-lg p-2 border rounded-xl min-w-[280px] [transform-origin:var(--radix-popover-content-transform-origin)]",
            "data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in",
            tc.dropdown
          )}
          sideOffset={8}
          align="start"
        >
          <Link
            href={ROUTES.pay}
            className={clsx(
              "flex flex-col gap-0.5 p-3 rounded-lg cursor-pointer outline-none transition-colors block",
              tc.dropdownItem
            )}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">GRX Pay</span>
            </div>
            <span className="text-sm opacity-80">
              {t("CommonHeader.products.grxPay.description")}
            </span>
          </Link>

          <div
            className={clsx(
              "flex flex-col gap-0.5 p-3 rounded-lg",
              tc.dropdownItemDisabled
            )}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">GRX Exchange</span>
              <ComingSoonBadge>
                {t("CommonHeader.products.comingSoon")}
              </ComingSoonBadge>
            </div>
            <span className="text-sm opacity-80">
              {t("CommonHeader.products.grxExchange.description")}
            </span>
          </div>

          <div
            className={clsx(
              "flex flex-col gap-0.5 p-3 rounded-lg",
              tc.dropdownItemDisabled
            )}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">GRX RWA (Real World Assets)</span>
              <ComingSoonBadge>
                {t("CommonHeader.products.comingSoon")}
              </ComingSoonBadge>
            </div>
            <span className="text-sm opacity-80">
              {t("CommonHeader.products.grxRwa.description")}
            </span>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
