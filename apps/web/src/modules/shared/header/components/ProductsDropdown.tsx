"use client";

import * as Popover from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { ProductItem } from "./ProductItem";
import { ROUTES } from "../routes";
import { ShevronDownIcon } from "@grx/ui/icons/ShevronDownIcon";

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
            "z-50 shadow-sm p-2 rounded-xl min-w-[342px] [transform-origin:var(--radix-popover-content-transform-origin)]",
            "data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in",
            "bg-surface-floating "
          )}
          sideOffset={8}
          align="start"
        >
          <ProductItem
            className="hover:bg-neutral-800 dark:hover:bg-neutral-800 mt-0.5 rounded-xl outline-none text-neutral transition-colors"
            href={ROUTES.pay}
            title="GRX Pay"
            description={t("CommonHeader.products.grxPay.description")}
          />

          <ProductItem
            className="hover:bg-neutral-800 dark:hover:bg-neutral-800 mt-0.5 rounded-xl outline-none text-neutral transition-colors"
            href={ROUTES.exchange}
            title="GRX Exchange"
            description={t("CommonHeader.products.grxExchange.description")}
            comingSoon
          />

          <ProductItem
            className="hover:bg-neutral-800 dark:hover:bg-neutral-800 mt-0.5 rounded-xl outline-none text-neutral transition-colors"
            href={ROUTES.rwa}
            title="GRX RWA (Real World Assets)"
            description={t("CommonHeader.products.grxRwa.description")}
            underDevelopment
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
