"use client";

import * as Popover from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
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
            "z-50 min-w-[342px] rounded-xl border border-neutral-700 bg-neutral-900 p-2 shadow-[0px_3px_8px_0px_rgba(0,0,0,0.35),0px_1px_3px_0px_rgba(0,0,0,0.5),inset_0px_0px_0.5px_0px_rgba(255,255,255,0.30),inset_0px_0.5px_0px_0px_rgba(255,255,255,0.08)] [transform-origin:var(--radix-popover-content-transform-origin)]",
            "data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in",
            "dark:border-neutral-700 dark:bg-neutral-900"
          )}
          sideOffset={8}
          align="start"
        >
          <Link
            href={ROUTES.pay}
            className="mt-0.5 block rounded-xl px-2 py-3 text-neutral outline-none transition-colors hover:bg-neutral-800"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium leading-5">GRX Pay</span>
            </div>
            <span className="text-xs font-normal leading-4 text-neutral-400">
              {t("CommonHeader.products.grxPay.description")}
            </span>
          </Link>

          <Link
            href={ROUTES.exchange}
            className="mt-0.5 block rounded-xl px-2 py-3 text-neutral outline-none transition-colors hover:bg-neutral-800"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium leading-5">
                GRX Exchange
              </span>
              <span className="rounded-[6px] bg-[#322607] px-1.5 py-0.5 text-xs font-medium leading-4 text-[#E1AA1F]">
                {t("CommonHeader.products.comingSoon")}
              </span>
            </div>
            <span className="text-xs font-normal leading-4 text-neutral-400">
              {t("CommonHeader.products.grxExchange.description")}
            </span>
          </Link>

          <Link
            href={ROUTES.rwa}
            className="mt-0.5 block rounded-xl px-2 py-3 text-neutral outline-none transition-colors hover:bg-neutral-800"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium leading-5">
                GRX RWA (Real World Assets)
              </span>
              <span className="rounded-[6px] bg-[#172554] px-1.5 py-0.5 text-xs font-medium leading-4 text-[#3B82F6]">
                {t("CommonHeader.products.underDevelopment")}
              </span>
            </div>
            <span className="text-xs font-normal leading-4 text-neutral-400">
              {t("CommonHeader.products.grxRwa.description")}
            </span>
          </Link>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
