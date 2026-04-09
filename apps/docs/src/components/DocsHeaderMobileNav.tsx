"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import { MenuIcon } from "@grx/ui/icons/MenuIcon";

import { useDocsMobileNav } from "@/components/DocsMobileNavContext";

function isProductVersionRoute(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length >= 2;
}

export function DocsHeaderMobileNav() {
  const pathname = usePathname();
  const { open, setOpen } = useDocsMobileNav();

  if (!isProductVersionRoute(pathname)) {
    return null;
  }

  return (
    <button
      type="button"
      className={clsx(
        "md:hidden flex justify-center items-center shrink-0",
        "w-10 h-10 text-icon-base-500 hover:text-icon-subtle-700 transition-colors"
      )}
      aria-expanded={open}
      aria-controls="docs-mobile-nav"
      aria-label="Open navigation menu"
      onClick={() => setOpen(true)}
    >
      <MenuIcon className="w-6 h-6" />
    </button>
  );
}
