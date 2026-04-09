"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { HeaderLogo } from "@grx/ui/icons/HeaderLogo";
import { ThemeSwitcher } from "@grx/ui/components/theme-switcher";
import { MobileMenu } from "./components/MobileMenu";
import { ProductsDropdown } from "./components/ProductsDropdown";
import { LocalizationSelect } from "./components/LocalizationSelect";
import { ROUTES } from "./routes";
import { HeaderNavLink } from "./NavLink";

export function Header() {
  const t = useTranslations();

  return (
    <header className="top-0 z-50 sticky bg-surface-base border-stroke-soft-200 border-b w-full">
      <div className="px-4 sm:px-8">
        <div className="flex justify-between items-center mx-auto max-w-[1180px] h-16">
          <div className="flex justify-start items-center gap-8">
            <Link
              href={ROUTES.home}
              className="flex items-center text-neutral-900 dark:text-neutral shrink-0"
            >
              <HeaderLogo className="w-auto h-8 text-neutral-900 dark:text-neutral" />
            </Link>

            <nav className="hidden lg:flex justify-center items-center gap-6">
              <ProductsDropdown />

              <HeaderNavLink href={ROUTES.aboutUs}>
                {t("CommonHeader.nav.aboutUs")}
              </HeaderNavLink>
            </nav>
          </div>

          <div className="hidden lg:flex justify-end items-center">
            <LocalizationSelect />
          </div>

          <div className="lg:hidden flex justify-end items-center gap-1">
            {/* <ThemeSwitcher className="w-10 h-10" /> */}

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
