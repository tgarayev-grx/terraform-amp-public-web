import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { parseMarkdownFile } from "@/lib/markdown";
import { TermsMarkdown } from "./TermsMarkdown";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { data } = parseMarkdownFile("content/terms-of-use", `${locale}.md`);
  const t = await getTranslations("Pay.TermsOfUse");

  return {
    title: data.title ?? t("meta.title"),
    description: data.description ?? t("meta.description"),
    openGraph: {
      title: data.title ?? t("meta.title"),
      description: data.description ?? t("meta.description"),
    },
  };
}

export default async function TermsOfUsePage() {
  const locale = await getLocale();
  const t = await getTranslations("Pay.TermsOfUse");
  const format = await getFormatter();
  const { content, data } = parseMarkdownFile(
    "content/terms-of-use",
    `${locale}.md`
  );

  const lastUpdatedDate = data.lastUpdatedAt ?? data.createdAt ?? "2026-02-16";
  const formattedDate = format.dateTime(new Date(lastUpdatedDate), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full px-4 sm:px-8 py-20 lg:py-24">
        <div className="flex flex-col gap-10 w-full max-w-[780px] mx-auto">
          <header className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl leading-10 text-neutral-1000">
              {data.title ?? t("title")}
            </h1>
            <p className="text-xs text-neutral-500 leading-4">
              {t("lastUpdated", { date: formattedDate })}
            </p>
          </header>

          <section className="flex flex-col gap-6">
            <TermsMarkdown content={content} />
          </section>
        </div>
      </div>
    </main>
  );
}
