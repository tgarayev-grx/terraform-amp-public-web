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

// 1. Dynamic Metadata for International SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://goldenratio.exchange";

  // Define localized titles/descriptions (or fetch them from your i18n messages)
  const titles: Record<string, string> = {
    en: "Golden Ratio Exchange | Fast & Secure Crypto Swap",
    bg: "Golden Ratio Exchange | Бърза и сигурна крипто борса",
  };

  const descriptions: Record<string, string> = {
    en: "The premium destination for secure cryptocurrency exchanges and swaps.",
    bg: "Премиум дестинация за сигурен обмен и суап на криптовалути.",
  };

  return {
    title: {
      template: `%s | Golden Ratio`,
      default: titles[locale] || titles.en,
    },
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: {
        en: "/",
        bg: "/bg",
        "x-default": "/", // Tells Google to use English for any other language
      },
    },
    // Adding OpenGraph for social sharing
    openGraph: {
      type: "website",
      siteName: "Golden Ratio Exchange",
      locale: locale === "bg" ? "bg_BG" : "en_US",
    },
  };
}

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito-sans",
  display: "swap", // Prevents layout shift (CLS)
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
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
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
              <main>{children}</main>{" "}
              {/* Wrapping children in main is better for accessibility/SEO */}
              <Footer />
              <CookieBanner />
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
