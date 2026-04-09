import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import clsx from "clsx";

import "@grx/ui/theme/theme.css";
import "../globals.css";

import { ToastProvider } from "@grx/ui/components/toast";
import { LOCAL_STORAGE_KEYS } from "@/config/localstorage";
import { SITE_URL } from "@/config/site";
import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";
import {
  resolveICULocale,
  type Locale,
} from "@/modules/cross-cutting-concerns/i18n/config";
import { CookieBanner } from "@/modules/cross-cutting-concerns/cookie-preference";
import { RecaptchaScript } from "@/lib/recaptcha/RecaptchaScript";
import { GoogleAnalytics } from "@/lib/gtag/GoogleAnalytics";
import { GoogleAnalyticsPageTracker } from "@/lib/gtag/GoogleAnalyticsPageTracker";
import { GoogleAnalyticsConsentSync } from "@/lib/gtag/GoogleAnalyticsConsentSync";
import { Header } from "@/modules/shared/header";
import { Footer } from "./Footer";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Metadata",
  });

  return {
    title: {
      template: `%s | Golden Ratio`,
      default: t("title"),
    },
    description: t("description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        en: "/",
        bg: "/bg",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Golden Ratio Exchange",
      locale: resolveICULocale(locale),
    },
  };
}

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito-sans",
  display: "swap",
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
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <GoogleAnalyticsPageTracker />
        </Suspense>
        <GoogleAnalyticsConsentSync />

        <NextIntlClientProvider>
          <ThemeProvider
            themes={["light", "dark"]}
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
