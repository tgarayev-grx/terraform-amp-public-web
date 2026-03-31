import { setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import clsx from "clsx";

import "@grx/ui/theme/theme.css";
import "../globals.css";

import { ToastProvider } from "@grx/ui/components/toast";
import { LOCAL_STORAGE_KEYS } from "@/config/localstorage";
import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";
import { CookieBanner } from "@/modules/cross-cutting-concerns/cookie-preference";
import { RecaptchaScript } from "@/lib/recaptcha/RecaptchaScript";
import { Header } from "@/modules/shared/header";
import { Footer } from "./Footer";

export const metadata: Metadata = {
  title: "Golden Ratio Exchange",
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito-sans",
});

const bounded = localFont({
  src: [
    {
      path: "../../../public/fonts/Bounded-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-bounded",
  display: "swap",
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
      className={clsx(nunitoSans.variable, bounded.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <RecaptchaScript />

        <NextIntlClientProvider>
          <ThemeProvider
            themes={["dark"]}
            attribute="data-theme"
            defaultTheme="dark"
            enableColorScheme
            enableSystem
            storageKey={LOCAL_STORAGE_KEYS.THEME}
          >
            <ToastProvider>
              <Header />
              {children}
              <Footer />

              <CookieBanner />
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
