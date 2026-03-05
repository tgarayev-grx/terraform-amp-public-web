import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { FAQ_ARTICLES } from "./data";
import { ArrowRightIcon } from "@grx/ui/icons/ArrowRightIcon";

export function ArticleList() {
  return (
    <section className="px-4 sm:px-8" aria-label="FAQ articles">
      <ul className="flex flex-col mx-auto w-full max-w-[980px]">
        {FAQ_ARTICLES.map((article) => (
          <li key={article.slug}>
            <Link
              className="group flex justify-between items-center gap-3 sm:gap-4 hover:bg-bg-weak-100 px-4 sm:px-6 py-6 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 text-left transition-colors"
              href={`/pay/faq/${article.slug}`}
            >
              <span className="text-text-strong-1000 text-title-sm-semibold md:text-title-md-semibold">
                {article.title}
              </span>

              <span
                className="flex flex-shrink-0 justify-center items-center bg-primary-weak-100 rounded-md w-6 h-6"
                aria-hidden
              >
                <ArrowRightIcon className="size-4 text-primary-base-1000" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
