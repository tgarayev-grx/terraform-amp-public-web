import Link from "next/link";
import clsx from "clsx";
import { ArrowRightIcon } from "@grx/ui/icons/ArrowRightIcon";

import type { DocsNavPage } from "@/config/docs-navigation";

export type DocsArticlePagerProps = {
  prev?: Pick<DocsNavPage, "title" | "href">;
  next?: Pick<DocsNavPage, "title" | "href">;
};

const linkClass = clsx(
  "group inline-flex items-center gap-2 rounded-lg max-w-full",
  "text-body-md-medium text-text-subtle-700",
  "hover:text-gold-400 transition-colors"
);

export function DocsArticlePager({ prev, next }: DocsArticlePagerProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Adjacent documentation pages"
      className="mt-10 pt-8 w-full xl:max-w-[640px]"
    >
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <div className="min-w-0">
          {prev ? (
            <Link
              href={prev.href}
              className={clsx(
                linkClass,
                "text-text-soft-500 hover:text-text-strong-1000 transition-colors"
              )}
            >
              <ArrowRightIcon
                aria-hidden
                className="size-5 rotate-180 shrink-0"
              />
              <span className="min-w-0 truncate">{prev.title}</span>
            </Link>
          ) : null}
        </div>

        <div className="sm:justify-self-end min-w-0 sm:text-right">
          {next ? (
            <Link
              href={next.href}
              className={clsx(
                linkClass,
                "sm:flex-row-reverse text-text-soft-500 hover:text-text-strong-1000 transition-colors"
              )}
            >
              <ArrowRightIcon aria-hidden className="size-5 shrink-0" />
              <span className="min-w-0 truncate">{next.title}</span>
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
