import type { Metadata } from "next";
import { Nunito_Sans, Unbounded } from "next/font/google";
import "@grx/ui/theme/theme.css";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito-sans",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: "Golden Ratio Exchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${unbounded.variable}`}>
      <body>{children}</body>
    </html>
  );
}
