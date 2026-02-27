import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FAQ_ARTICLES } from "../data";
import { DirectionRightIcon } from "../../(icons)/DirectionRightIcon";
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
      className="hidden w-full flex-shrink-0 flex-col self-start md:flex md:w-[161px] lg:w-[260px] md:sticky md:top-24 md:-ml-4"
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
    <nav
      className="flex items-center gap-[6px] font-normal text-[14px] leading-5 text-neutral-500 dark:text-neutral-400"
      aria-label="Breadcrumb"
    >
      <ol className="flex list-none flex-wrap items-center gap-[6px] p-0">
        <li className="flex items-center gap-[6px]">
          <Link
            className="text-neutral-1000 dark:text-neutral-400 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm dark:hover:text-neutral"
            href="/pay"
          >
            {grxPayLabel}
          </Link>
        </li>
        <li className="flex items-center gap-[6px]" aria-hidden>
          <DirectionRightIcon
            className="size-4 shrink-0 text-neutral-400"
            aria-hidden
          />
        </li>
        <li className="flex items-center gap-[6px]">
          <Link
            className="text-neutral-1000 dark:text-neutral-400 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm dark:hover:text-neutral"
            href="/pay/faq"
          >
            FAQ
          </Link>
        </li>
        <li className="flex items-center gap-[6px]" aria-hidden>
          <DirectionRightIcon
            className="size-4 shrink-0 text-neutral-400"
            aria-hidden
          />
        </li>
        <li className="text-neutral-1000 dark:text-neutral" aria-current="page">
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
          className="text-blue-600 dark:text-blue-400 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm"
          href={part.href}
        >
          {part.text}
        </Link>
      );
    case "bold":
      return (
        <strong key={index} className="font-bold">
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
          <h2 className="font-bold text-[24px] leading-7 text-neutral-1000 dark:text-neutral">
            {section.heading}
          </h2>
          <div className="flex flex-col [&>*:last-child]:mb-0">
            {section.blocks.map((block, bIndex) => {
              switch (block.type) {
                case "subheading":
                  return (
                    <h3
                      key={`${section.heading}-sub-${block.text}`}
                      className="mb-0 font-bold text-base leading-6 text-neutral-1000 dark:text-neutral"
                    >
                      {block.text}
                    </h3>
                  );
                case "paragraph":
                  return (
                    <p
                      key={`${section.heading}-p-${bIndex}`}
                      className="mb-6 font-normal text-sm leading-5 text-neutral-700 dark:text-neutral-300 md:text-base md:leading-6"
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
                      className="mb-6 list-inside list-disc space-y-0 pl-2 font-normal text-sm leading-5 text-neutral-700 dark:text-neutral-300 md:text-base md:leading-6"
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
      <main className="w-full py-16 dark:bg-neutral-900">
        <div className="mx-auto w-full max-w-[1180px] px-4">
          <p className="font-medium text-neutral-700 dark:text-neutral-400">
            {t("Pay.Faq.article.not_found")}
          </p>
          <Link
            className="mt-4 inline-block font-medium text-blue-600 dark:text-blue-400 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm"
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
    <main className="w-full pt-10 pb-16 dark:bg-neutral-900">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-12 px-4 md:flex-row md:gap-8 lg:gap-10">
        <ArticleSidebar sections={sections} />
        <article className="mx-auto flex min-w-0 w-full max-w-[343px] flex-col items-start gap-0 md:mx-0 md:max-w-none md:w-[523px] md:flex-none lg:gap-8 lg:w-[880px] lg:flex-none">
          <ArticleBreadcrumbs
            topicTitle={article.title}
            grxPayLabel={grxPayLabel}
          />
          <div className="mt-10 mb-8 flex flex-col items-start gap-2 md:mt-10 md:mb-8 lg:mt-0 lg:mb-0">
            <h1 className="font-bold text-[36px] leading-[40px] text-neutral-1000 dark:text-neutral">
              {article.title}
            </h1>
            <p className="font-normal text-xs leading-4 text-neutral-500 dark:text-neutral-400">
              Last updated {getArticleLastUpdated(slug)}
            </p>
          </div>
          <ArticleBody sections={sections} />
        </article>
      </div>
    </main>
  );
}
