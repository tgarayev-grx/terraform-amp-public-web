"use client";

import * as Popover from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ProductItem } from "./ProductItem";
import { ShevronDownIcon } from "../../icons";
import { ROUTES } from "../routes";

export function ProductsDropdown() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="group flex items-center gap-1.5 text-body-md-medium text-text-subtle-700 hover:text-text-strong-1000 transition-colors">
          {t("CommonHeader.nav.products")}

          <ShevronDownIcon className="w-4 h-4 text-icon-base-500 group-hover:text-icon-strong-1000 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={clsx(
            "z-50 min-w-[342px] shadow-lg p-2 border rounded-xl [transform-origin:var(--radix-popover-content-transform-origin)]",
            "data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in",
            "bg-neutral dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
          )}
          sideOffset={8}
          align="start"
        >
          <ProductItem
            title="GRX Pay"
            description={t("CommonHeader.products.grxPay.description")}
            href={ROUTES.pay}
            className="mt-0.5 rounded-xl text-neutral outline-none transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-800"
          />

          <ProductItem
            title="GRX Exchange"
            description={t("CommonHeader.products.grxExchange.description")}
            comingSoon
            href={ROUTES.exchange}
            className="mt-0.5 rounded-xl text-neutral outline-none transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-800"
          />

          <ProductItem
            title="GRX RWA (Real World Assets)"
            description={t("CommonHeader.products.grxRwa.description")}
            underDevelopment
            href={ROUTES.rwa}
            className="mt-0.5 rounded-xl text-neutral outline-none transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-800"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
