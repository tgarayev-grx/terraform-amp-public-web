"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import type { ArticleHeading } from "@/lib/extract-article-headings";

const STICKY_TOP_OFFSET_PX = 96;

function pickActiveHeadingId(headings: ArticleHeading[]): string | null {
  if (typeof document === "undefined" || headings.length === 0) {
    return headings[0]?.id ?? null;
  }

  let active: string | null = null;
  for (const h of headings) {
    const el = document.getElementById(h.id);
    if (!el) {
      continue;
    }
    if (el.getBoundingClientRect().top <= STICKY_TOP_OFFSET_PX) {
      active = h.id;
    }
  }

  return active ?? headings[0]?.id ?? null;
}

function TocListIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 4.5h11M2.5 8h8M2.5 11.5h11"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type DocsArticleTocProps = {
  headings: ArticleHeading[];
};

export function DocsArticleToc({ headings }: DocsArticleTocProps) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null
  );

  useEffect(() => {
    setActiveId(headings[0]?.id ?? null);
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const update = () => {
      setActiveId(pickActiveHeadingId(headings));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="On this page"
      className="hidden xl:block xl:self-stretch pt-1 w-64 shrink-0"
    >
      <div className="top-24 sticky">
        <div className="flex items-center gap-2 mb-3 text-body-md-medium text-text-soft-500">
          <TocListIcon className="size-4 shrink-0" />
          <span>On this page</span>
        </div>

        <ul className="flex flex-col gap-1">
          {headings.map((h) => {
            const active = activeId === h.id;
            return (
              <li key={h.id} className="relative">
                <a
                  href={`#${h.id}`}
                  className={clsx(
                    "block py-2.5 pl-2 text-body-md-medium transition-colors",
                    h.depth === 3 && "pl-5",
                    h.depth === 4 && "pl-7",
                    active
                      ? "border-gold-400 text-text-strong-1000 before:content-[''] before:absolute before:left-0 before:top-[10px] before:bottom-0 before:w-[2px] before:bg-primary-gold before:h-[20px]"
                      : "border-transparent text-text-soft-500 hover:text-text-strong-1000"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    if (typeof window !== "undefined") {
                      window.history.replaceState(null, "", `#${h.id}`);
                    }
                  }}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
