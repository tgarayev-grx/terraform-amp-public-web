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

export type HeaderTheme = "light" | "dark";

interface CommonHeaderProps {
  theme?: HeaderTheme;
}

const themeClasses = {
  light: {
    header: "bg-neutral border-neutral-200 text-neutral-900",
    navLink: "text-neutral-700 hover:text-neutral-900",
    logo: "text-neutral-900",
  },
  dark: {
    header: "bg-neutral-1000 border-neutral-800 text-neutral",
    navLink: "text-neutral-300 hover:text-neutral",
    logo: "text-neutral",
  },
} as const;

export function CommonHeader({ theme = "light" }: CommonHeaderProps) {
  const t = useTranslations();
  const tc = themeClasses[theme];

  return (
    <header className={clsx("top-0 z-50 sticky border-b w-full", tc.header)}>
      <div className="flex justify-between items-center mx-auto px-4 max-w-[1180px] h-16">
        <Link href={ROUTES.home} className={clsx("flex items-center", tc.logo)}>
          <FooterLogo className={clsx("w-auto h-8", tc.logo)} />
        </Link>

        <nav className="hidden lg:flex justify-center items-center gap-8">
          <ProductsDropdown theme={theme} />

          <Link
            href={ROUTES.payPricing}
            className={clsx(
              "font-medium text-sm transition-colors",
              tc.navLink
            )}
          >
            {t("CommonHeader.nav.pricing")}
          </Link>
          <Link
            href={ROUTES.payPartnerProgram}
            className={clsx(
              "font-medium text-sm transition-colors",
              tc.navLink
            )}
          >
            {t("CommonHeader.nav.partners")}
          </Link>
          <Link
            href={ROUTES.aboutUs}
            className={clsx(
              "font-medium text-sm transition-colors",
              tc.navLink
            )}
          >
            {t("CommonHeader.nav.aboutUs")}
          </Link>
        </nav>

        <div className="hidden lg:flex justify-end items-center gap-6">
          <LocalizationSelect theme={theme} />

          <div className="flex items-center gap-3">
            <ButtonRoot
              asChild
              palette="secondary"
              variant="contained"
              size="sm"
            >
              <Link href={ROUTES.signIn} target="_blank">
                <ButtonText>{t("CommonHeader.nav.signIn")}</ButtonText>
              </Link>
            </ButtonRoot>

            <ButtonRoot asChild palette="primary" variant="contained" size="sm">
              <Link href={ROUTES.createAccount} target="_blank">
                <ButtonText>{t("CommonHeader.nav.createAccount")}</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>

        <div className="lg:hidden flex justify-end">
          <MobileMenu theme={theme} />
        </div>
      </div>
    </header>
  );
}
