import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";
import { PrivacyMarkdown } from "./PrivacyMarkdown";

function getPrivacyContent(locale: string): string {
  const contentPath = join(
    process.cwd(),
    "content",
    "privacy-policy",
    `${locale}.md`
  );
  return readFileSync(contentPath, "utf-8");
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Pay.PrivacyPolicy");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: PageProps<"/[locale]/pay/privacy-policy">) {
  const { locale } = await params;
  const resolvedLocale = routing.locales.includes(
    locale as (typeof routing.locales)[number]
  )
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations("Pay.PrivacyPolicy");
  const content = getPrivacyContent(resolvedLocale);

  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full px-4 sm:px-8 py-20 lg:py-24">
        <div className="flex flex-col gap-10 w-full max-w-[780px] mx-auto">
          <header className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl leading-10 text-neutral-1000">
              {t("title")}
            </h1>
            <p className="text-xs text-neutral-500 leading-4">
              {t("lastUpdated")}
            </p>
          </header>

          <section className="flex flex-col gap-6">
            <PrivacyMarkdown content={content} />
          </section>
        </div>
      </div>
    </main>
  );
}
