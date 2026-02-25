"use client";

import { useEffect, useCallback, useState } from "react";
import { headingToId, type ArticleSection } from "./article-content";

const ACTIVE_TOP_OFFSET = 120;

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
  const ids = sections.map((s) => headingToId(s.heading));
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  const updateActive = useCallback(() => {
    setActiveId((prev) => {
      const next = getActiveSectionId(ids);
      return next === prev ? prev : next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

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
            className={`relative flex items-center self-stretch py-2 px-2 text-sm leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded ${
              isActive
                ? "pl-3 font-medium text-neutral-1000"
                : "font-normal text-neutral-500 hover:text-neutral-1000"
            }`}
            aria-current={isActive ? "location" : undefined}
          >
            {isActive && (
              <span
                className="top-1/2 left-0 absolute bg-gold-500 rounded-r-full w-[3px] h-5 -translate-y-1/2"
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
