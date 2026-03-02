"use client";

import { useTranslations } from "next-intl";
import { ButtonRoot, ButtonText } from "@grx/ui";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";
import { ThemeSwitcher } from "@/modules/cross-cutting-concerns/theme";

import { FooterLogo } from "../icons";
import { MobileMenu } from "./components/MobileMenu";
import { ProductsDropdown } from "./components/ProductsDropdown";
import { LocalizationSelect } from "./components/LocalizationSelect";
import { ROUTES } from "./routes";

export function CommonHeader() {
  const t = useTranslations();

  return (
    <header className="top-0 z-50 sticky bg-surface-base border-stroke-soft-200 border-b w-full">
      <div className="px-4 sm:px-8">
        <div className="flex justify-between items-center mx-auto max-w-[1180px] h-16">
          <Link
            href={ROUTES.home}
            className="flex items-center text-text-strong-1000"
          >
            <FooterLogo className="w-auto h-8" />
          </Link>

          <nav className="hidden lg:flex justify-center items-center gap-8">
            <ProductsDropdown />

            <Link
              className="text-body-md-medium text-text-subtle-700 hover:text-text-strong-1000 transition-colors"
              href={ROUTES.payPricing}
            >
              {t("CommonHeader.nav.pricing")}
            </Link>

            <Link
              className="text-body-md-medium text-text-subtle-700 hover:text-text-strong-1000 transition-colors"
              href={ROUTES.payPartnerProgram}
            >
              {t("CommonHeader.nav.partners")}
            </Link>

            <Link
              className="text-body-md-medium text-text-subtle-700 hover:text-text-strong-1000 transition-colors"
              href={ROUTES.aboutUs}
            >
              {t("CommonHeader.nav.aboutUs")}
            </Link>
          </nav>

          <div className="hidden lg:flex justify-end items-center gap-3">
            <LocalizationSelect />
            <ThemeSwitcher className="w-10 h-10" />

            <div className="flex items-center gap-3">
              <ButtonRoot variant="secondary" size="sm" asChild>
                <Link href={EXTERNAL_LINKS.Pay.signIn.href} target="_blank">
                  <ButtonText>{t("CommonHeader.nav.signIn")}</ButtonText>
                </Link>
              </ButtonRoot>

              <ButtonRoot variant="primary" size="sm" asChild>
                <Link href={EXTERNAL_LINKS.Pay.signUp.href} target="_blank">
                  <ButtonText>{t("CommonHeader.nav.createAccount")}</ButtonText>
                </Link>
              </ButtonRoot>
            </div>
          </div>

          <div className="lg:hidden flex justify-end items-center gap-1">
            <ThemeSwitcher className="w-10 h-10" />

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
