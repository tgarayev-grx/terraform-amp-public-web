"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ButtonRoot, ButtonText } from "@grx/ui";
import { FooterLogo } from "../icons";
import { MobileMenu } from "./components/MobileMenu";
import { ProductsDropdown } from "./components/ProductsDropdown";
import { LocalizationSelect } from "./components/LocalizationSelect";
import { ROUTES } from "./routes";
import clsx from "clsx";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";

export function CommonHeader() {
  const t = useTranslations();

  return (
    <header className="top-0 z-50 sticky border-b w-full bg-neutral dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral">
      <div className="px-4 sm:px-8">
        <div className="flex justify-between items-center mx-auto max-w-[1180px] h-16">
          <Link
            href={ROUTES.home}
            className="flex items-center text-neutral-900 dark:text-neutral"
          >
            <FooterLogo className="w-auto h-8 text-neutral-900 dark:text-neutral" />
          </Link>

          <nav className="hidden lg:flex justify-center items-center gap-8">
            <ProductsDropdown />

            <Link
              href={ROUTES.payPricing}
              className="font-medium text-sm transition-colors text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral"
            >
              {t("CommonHeader.nav.pricing")}
            </Link>
            <Link
              href={ROUTES.payPartnerProgram}
              className="font-medium text-sm transition-colors text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral"
            >
              {t("CommonHeader.nav.partners")}
            </Link>
            <Link
              href={ROUTES.aboutUs}
              className="font-medium text-sm transition-colors text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral"
            >
              {t("CommonHeader.nav.aboutUs")}
            </Link>
          </nav>

          <div className="hidden lg:flex justify-end items-center gap-6">
            <LocalizationSelect />

            <div className="flex items-center gap-3">
              <ButtonRoot
                asChild
                palette="secondary"
                variant="contained"
                size="sm"
              >
                <Link href={EXTERNAL_LINKS.Pay.signIn.href} target="_blank">
                  <ButtonText>{t("CommonHeader.nav.signIn")}</ButtonText>
                </Link>
              </ButtonRoot>

              <ButtonRoot asChild palette="primary" variant="contained" size="sm">
                <Link href={EXTERNAL_LINKS.Pay.signUp.href} target="_blank">
                  <ButtonText>{t("CommonHeader.nav.createAccount")}</ButtonText>
                </Link>
              </ButtonRoot>
            </div>
          </div>

          <div className="lg:hidden flex justify-end">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
