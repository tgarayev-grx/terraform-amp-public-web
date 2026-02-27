import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { FAQ_ARTICLES } from "./data";
import { DirectionRightIcon } from "../(icons)/DirectionRightIcon";

export function ArticleList() {
  return (
    <section className="px-4 sm:px-8" aria-label="FAQ articles">
      <ul className="mx-auto flex w-full max-w-[980px] flex-col">
        {FAQ_ARTICLES.map((article) => (
          <li key={article.slug}>
            <Link
              className="group flex items-center justify-between gap-3 rounded-2xl px-4 py-6 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 sm:gap-4 sm:px-6"
              href={`/pay/faq/${article.slug}`}
            >
              <span className="font-semibold text-[18px] leading-[22px] tracking-[0.4px] text-neutral-1000 dark:text-neutral group-hover:text-neutral-700 dark:group-hover:text-neutral-300 sm:text-[20px] sm:leading-[24px]">
                {article.title}
              </span>
              <span
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800"
                aria-hidden
              >
                <DirectionRightIcon className="size-4 text-neutral-400 dark:text-neutral-500" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
