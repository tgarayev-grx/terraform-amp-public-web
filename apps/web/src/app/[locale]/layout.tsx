import { setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Nunito_Sans, Unbounded } from "next/font/google";
import { Metadata } from "next";
import clsx from "clsx";

import "@grx/ui/theme/theme.css";
import "../globals.css";

import { ToastProvider } from "@grx/ui/components/toast";
import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";
import { CookieBanner } from "@/modules/cross-cutting-concerns/cookie-preference";
import { CommonHeader } from "@/modules/shared/header";
import { Footer } from "./Footer";
import { DarkThemeSync } from "@/components/theme/DarkThemeSync";

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

  const headersList = await headers();
  const isDark = headersList.get("x-force-theme") === "dark";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={clsx(nunitoSans.variable, unbounded.variable, {
        dark: isDark,
      })}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=location.pathname;var legal=/^\\/(cookie-policy|privacy-policy|terms-of-use|aml-policy)(\\/|$)/.test(p)||/^\\/[a-z]{2}\\/(cookie-policy|privacy-policy|terms-of-use|aml-policy)(\\/|$)/.test(p);var d=p==='/'||p==='/about-us'||p==='/about-us/'||/^\\/[a-z]{2}(\\/about-us)?\\/?$/.test(p)||p==='/pay/faq'||p.startsWith('/pay/faq/')||/^\\/[a-z]{2}\\/pay\\/faq(\\/|$)/.test(p)||legal;if(d)document.documentElement.classList.add('dark');})();`,
          }}
        />
        <NextIntlClientProvider>
          <DarkThemeSync />
          <ToastProvider>
            <CommonHeader />
            {children}
            <Footer />

            <CookieBanner />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
