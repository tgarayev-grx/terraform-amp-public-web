import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { DirectionRightIcon } from "@grx/ui/icons/DirectionRightIcon";
import { FAQ_ARTICLES } from "../data";
import { ArticleSidebarNav } from "./ArticleSidebarNav";
import {
  getArticleBody,
  getArticleLastUpdated,
  headingToId,
  type ArticleSection,
  type InlinePart,
} from "./article-content";

import { routing } from "@/modules/cross-cutting-concerns/i18n/routing";

type ArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    FAQ_ARTICLES.map((article) => ({ locale, slug: article.slug }))
  );
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = FAQ_ARTICLES.find((a) => a.slug === slug);
  const title = article
    ? `${article.title} | FAQ | GRX Pay`
    : "FAQ Article | GRX Pay";
  const description = article
    ? `Read about ${article.title} in the GRX Pay FAQ.`
    : "FAQ article – GRX Pay";
  return { title, description };
}

function ArticleSidebar({ sections }: { sections: ArticleSection[] }) {
  if (sections.length === 0) return null;

  return (
    <aside
      className="hidden md:top-24 md:sticky md:flex flex-col flex-shrink-0 self-start md:-ml-4 w-full md:w-[161px] lg:w-[260px]"
      aria-label="Article navigation"
    >
      <nav
        className="flex flex-col self-stretch pl-4"
        aria-label="On this page"
      >
        <ArticleSidebarNav sections={sections} />
      </nav>
    </aside>
  );
}

function ArticleBreadcrumbs({
  topicTitle,
  grxPayLabel,
}: {
  topicTitle: string;
  grxPayLabel: string;
}) {
  return (
    <nav className="flex items-center gap-[6px]" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-[6px] p-0 list-none">
        <li className="flex items-center gap-[6px]">
          <Link
            className="text-body-md-regular text-text-soft-500 hover:text-text-subtle-700"
            href="/pay"
          >
            {grxPayLabel}
          </Link>
        </li>
        <li className="flex items-center gap-[6px]" aria-hidden>
          <DirectionRightIcon
            className="size-4 text-neutral-400 shrink-0"
            aria-hidden
          />
        </li>
        <li className="flex items-center gap-[6px]">
          <Link
            className="text-body-md-regular text-text-soft-500 hover:text-text-subtle-700"
            href="/pay/faq"
          >
            FAQ
          </Link>
        </li>
        <li className="flex items-center gap-[6px]" aria-hidden>
          <DirectionRightIcon
            className="size-4 text-neutral-400 shrink-0"
            aria-hidden
          />
        </li>
        <li
          className="text-body-md-medium text-text-strong-1000"
          aria-current="page"
        >
          {topicTitle}
        </li>
      </ol>
    </nav>
  );
}

function renderInlinePart(part: InlinePart, index: number): ReactNode {
  switch (part.type) {
    case "text":
      return <span key={index}>{part.value}</span>;
    case "link":
      return (
        <Link
          key={index}
          className="text-info-base-600 hover:text-info-subtle-500"
          href={part.href}
        >
          {part.text}
        </Link>
      );
    case "bold":
      return (
        <strong key={index} className="font-bold text-text-strong-1000">
          {part.text}
        </strong>
      );
    default: {
      const _exhaustive: never = part;
      return null;
    }
  }
}

function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <section
          key={section.heading}
          id={headingToId(section.heading)}
          className="flex flex-col gap-6 scroll-mt-24"
        >
          <h2 className="text-text-strong-1000 text-title-sm md:text-title-lg">
            {section.heading}
          </h2>

          <div className="flex flex-col [&>*:last-child]:mb-0">
            {section.blocks.map((block, bIndex) => {
              switch (block.type) {
                case "subheading":
                  return (
                    <h3
                      key={`${section.heading}-sub-${block.text}`}
                      className="text-body-md-semibold text-text-strong-1000"
                    >
                      {block.text}
                    </h3>
                  );
                case "paragraph":
                  return (
                    <p
                      key={`${section.heading}-p-${bIndex}`}
                      className="mb-6 text-body-md-regular text-text-subtle-700"
                    >
                      {typeof block.content === "string"
                        ? block.content
                        : block.content.map(renderInlinePart)}
                    </p>
                  );
                case "list":
                  return (
                    <ul
                      key={`${section.heading}-list-${block.items[0]?.slice(0, 20) ?? bIndex}`}
                      className="space-y-0 mb-6 pl-2 text-body-md-regular text-text-subtle-700 list-disc list-inside"
                    >
                      {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                default: {
                  const _: never = block;
                  return null;
                }
              }
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default async function FaqArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const t = await getTranslations();
  const article = FAQ_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="dark:bg-neutral-900 py-16 w-full">
        <div className="mx-auto px-4 w-full max-w-[1180px]">
          <p className="font-medium text-neutral-700 dark:text-neutral-400">
            {t("Pay.Faq.article.not_found")}
          </p>
          <Link
            className="inline-block hover:opacity-80 mt-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 font-medium text-blue-600 dark:text-blue-400"
            href="/pay/faq"
          >
            {t("Pay.Faq.article.back_link")}
          </Link>
        </div>
      </main>
    );
  }

  const sections = getArticleBody(slug);
  const grxPayLabel = (await getTranslations("Faq.breadcrumbs"))("grxPay");

  return (
    <main className="dark:bg-neutral-900 pt-10 pb-16 w-full">
      <div className="flex md:flex-row flex-col gap-12 md:gap-8 lg:gap-10 mx-auto px-4 w-full max-w-[1180px]">
        <ArticleSidebar sections={sections} />
        <article className="flex flex-col md:flex-none lg:flex-none items-start gap-0 lg:gap-8 mx-auto md:mx-0 w-full md:w-[523px] lg:w-[880px] min-w-0 max-w-[343px] md:max-w-none">
          <ArticleBreadcrumbs
            topicTitle={article.title}
            grxPayLabel={grxPayLabel}
          />
          <div className="flex flex-col items-start gap-2 mt-10 md:mt-10 lg:mt-0 mb-8 md:mb-8 lg:mb-0">
            <h1 className="font-bold text-[36px] text-neutral-1000 dark:text-neutral leading-[40px]">
              {article.title}
            </h1>
            <p className="font-normal text-neutral-500 dark:text-neutral-400 text-xs leading-4">
              Last updated {getArticleLastUpdated(slug)}
            </p>
          </div>
          <ArticleBody sections={sections} />
        </article>
      </div>
    </main>
  );
}
