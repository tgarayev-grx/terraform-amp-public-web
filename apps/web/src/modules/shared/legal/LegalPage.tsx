import type { ComponentType } from "react";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { parseMarkdownFile } from "@/lib/markdown";
import { LegalMarkdown } from "./LegalMarkdown";
import { LegalPageLayout } from "./LegalPageLayout";

const LEGAL_NAMESPACES = ["Pay.PrivacyPolicy", "Pay.TermsOfUse"] as const;

type LegalPageConfig = {
  contentDir: string;
  namespace: (typeof LEGAL_NAMESPACES)[number];
};

type LegalPageProps = {
  config: LegalPageConfig;
  MarkdownComponent?: ComponentType<{ content: string }>;
};

export async function getLegalPageMetadata(
  config: LegalPageConfig
): Promise<Metadata> {
  const locale = await getLocale();
  const { data } = parseMarkdownFile(config.contentDir, `${locale}.md`);
  const t = await getTranslations(config.namespace);

  return {
    title: data.title ?? t("meta.title"),
    description: data.description ?? t("meta.description"),
    openGraph: {
      title: data.title ?? t("meta.title"),
      description: data.description ?? t("meta.description"),
    },
  };
}

export async function LegalPage({
  config,
  MarkdownComponent = LegalMarkdown,
}: LegalPageProps) {
  const locale = await getLocale();
  const t = await getTranslations(config.namespace);
  const format = await getFormatter();
  const { content, data } = parseMarkdownFile(
    config.contentDir,
    `${locale}.md`
  );

  const lastUpdatedAt = data.lastUpdatedAt ?? data.createdAt;
  if (!lastUpdatedAt) {
    throw new Error(
      `Legal document at ${config.contentDir} is missing lastUpdatedAt and createdAt`
    );
  }
  const formattedDate = format.dateTime(new Date(lastUpdatedAt), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <LegalPageLayout
      title={data.title ?? t("title")}
      lastUpdated={t("lastUpdated", { lastUpdated: formattedDate })}
    >
      <MarkdownComponent content={content} />
    </LegalPageLayout>
  );
}
