import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Nunito_Sans, Fira_Code } from "next/font/google";
import localFont from "next/font/local";
import clsx from "clsx";
import { ThemeProvider } from "next-themes";

import "@grx/ui/theme/theme.css";
import "./globals.css";

import { DocsHeader } from "@/components/DocsHeader";
import { DocsMobileNavProvider } from "@/components/DocsMobileNavContext";

const LOCAL_STORAGE_KEYS = {
  THEME: "APP_THEME",
} as const;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3001");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito-sans",
});

const bounded = localFont({
  src: [
    {
      path: "../../public/fonts/Bounded-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-bounded",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(nunitoSans.variable, bounded.variable, firaCode.variable)}
      suppressHydrationWarning
    >
      <body className="bg-bg-base min-h-screen text-neutral antialiased">
        <ThemeProvider
          themes={["light", "dark"]}
          attribute="data-theme"
          defaultTheme="system"
          enableColorScheme
          enableSystem
          storageKey={LOCAL_STORAGE_KEYS.THEME}
        >
          <DocsMobileNavProvider>
            <DocsHeader />

            {children}
          </DocsMobileNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
