"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { headingToId, type ArticleSection } from "./article-content";

const ACTIVE_TOP_OFFSET = 120;
const SIDEBAR_INDICATOR_OFFSET_LEFT = 13;

function getActiveSectionId(ids: string[]): string | null {
  if (ids.length === 0) return null;
  const positions = ids
    .map((id) => {
      const el = document.getElementById(id);
      return el ? { id, top: el.getBoundingClientRect().top } : null;
    })
    .filter((p): p is { id: string; top: number } => p !== null);
  const inView = positions.filter((p) => p.top <= ACTIVE_TOP_OFFSET);
  if (inView.length > 0) {
    const active = inView.reduce((a, b) => (a.top > b.top ? a : b));
    return active.id;
  }
  const below = positions.filter((p) => p.top > ACTIVE_TOP_OFFSET);
  if (below.length > 0) {
    const nearest = below.reduce((a, b) => (a.top < b.top ? a : b));
    return nearest.id;
  }
  return positions[positions.length - 1]?.id ?? ids[0];
}

export function ArticleSidebarNav({
  sections,
}: {
  sections: ArticleSection[];
}) {
  const ids = useMemo(
    () => sections.map((s) => headingToId(s.heading)),
    [sections]
  );
  const idsKey = ids.join(",");
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  const updateActive = useCallback(() => {
    setActiveId((prev) => {
      const next = getActiveSectionId(ids);
      return next === prev ? prev : next;
    });
  }, [idsKey]);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  if (sections.length === 0) return null;

  return (
    <div className="flex flex-col self-stretch gap-0.5">
      {sections.map((section) => {
        const id = headingToId(section.heading);
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className={clsx(
              "relative flex items-center self-stretch py-2 pr-2 rounded text-sm leading-5",
              isActive
                ? "-ml-3 pl-1 text-text-strong-1000 text-body-md-medium"
                : "-ml-2 text-text-soft-500 hover:text-text-subtle-700 text-body-md-medium"
            )}
            aria-current={isActive ? "location" : undefined}
          >
            {isActive && (
              <span
                className="top-1/2 absolute bg-primary-gold rounded-r-full w-[3px] h-5 -translate-y-1/2"
                style={{ left: -SIDEBAR_INDICATOR_OFFSET_LEFT }}
                aria-hidden
              />
            )}
            {section.heading}
          </a>
        );
      })}
    </div>
  );
}
