import { setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Nunito_Sans, Unbounded } from "next/font/google";
import { Metadata } from "next";

import "@grx/ui/theme/theme.css";
import "../globals.css";

import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";
import { CookieBanner } from "@/modules/cross-cutting-concerns/cookie-preference";
import { CommonHeader } from "@/modules/shared/header";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Golden Ratio Exchange",
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito-sans",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={clsx(nunitoSans.variable, unbounded.variable)}
    >
      <body>
        <NextIntlClientProvider>
          <CommonHeader theme="light" />
          {children}

          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
