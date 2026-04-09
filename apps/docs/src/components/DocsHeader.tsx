import Link from "next/link";

import { HeaderLogo } from "@grx/ui/icons/HeaderLogo";
import { ThemeSwitcher } from "@grx/ui/components/theme-switcher";

import { DocsHeaderMobileNav } from "@/components/DocsHeaderMobileNav";
import { DocsHeaderMobileSearch } from "@/components/DocsHeaderMobileSearch";

export function DocsHeader() {
  return (
    <header className="top-0 z-50 sticky bg-surface-base border-stroke-soft-200 border-b w-full">
      <div className="px-4 sm:px-8">
        <div className="flex justify-between items-center gap-2 h-16 min-w-0">
          <Link
            href="/"
            className="flex items-center text-text-strong-1000 shrink-0"
          >
            <HeaderLogo className="w-auto h-8" />
          </Link>

          <div className="flex justify-end items-center gap-1 shrink-0">
            <DocsHeaderMobileSearch />
            <ThemeSwitcher className="size-10" />
            <DocsHeaderMobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
