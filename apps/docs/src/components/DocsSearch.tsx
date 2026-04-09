"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Fuse, { type IFuseOptions } from "fuse.js";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { Modal } from "@grx/ui";

import { DocsApiMethodBadge } from "@/components/DocsApiMethodBadge";
import type {
  DocsSearchItem,
  DocsSearchRecentEntry,
} from "@/lib/docs-search.types";
import {
  appendRecentEntry,
  appendRecentSearchResult,
  readRecentSearchResults,
  removeRecentSearchResult,
} from "@/lib/docs-search-recent";

const FUSE_OPTIONS: IFuseOptions<DocsSearchItem> = {
  keys: [
    { name: "title", weight: 0.32 },
    { name: "text", weight: 0.28 },
    { name: "snippet", weight: 0.2 },
    { name: "breadcrumb", weight: 0.12 },
    { name: "section", weight: 0.08 },
  ],
  threshold: 0.42,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
  distance: 140,
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) {
    return <>{text}</>;
  }
  const terms = [
    ...new Set(
      q
        .split(/\s+/)
        .map((t) => t.trim())
        .filter((t) => t.length >= 2)
    ),
  ];
  if (terms.length === 0) {
    return <>{text}</>;
  }
  const re = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        terms.some((t) => part.toLowerCase() === t.toLowerCase()) ? (
          <span key={i} className="font-medium text-primary-gold">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

function DocPageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function SearchResultIcon({
  item,
}: {
  item: Pick<DocsSearchItem, "kind" | "method">;
}) {
  const iconColumn =
    "flex w-10 shrink-0 justify-center pt-0.5 text-text-soft-500";

  if (item.kind === "api" && item.method) {
    return (
      <span className={iconColumn}>
        <DocsApiMethodBadge method={item.method} />
      </span>
    );
  }
  if (item.kind === "section") {
    return (
      <span
        className={clsx(
          iconColumn,
          "font-mono text-xl leading-none tabular-nums"
        )}
        aria-hidden
      >
        #
      </span>
    );
  }
  return (
    <span className={iconColumn} aria-hidden>
      <DocPageIcon className="w-6 h-6" />
    </span>
  );
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M16.3955 9.61275C16.3955 5.86662 13.3586 2.82979 9.61251 2.82979C5.86638 2.82979 2.82954 5.86662 2.82954 9.61275C2.82954 13.3589 5.86638 16.3957 9.61251 16.3957C13.3586 16.3957 16.3955 13.3589 16.3955 9.61275ZM17.5583 9.61275C17.5583 11.5976 16.8281 13.4103 15.6248 14.8029L18.1631 17.3412C18.3902 17.5683 18.3902 17.9363 18.1631 18.1634C17.9361 18.3904 17.568 18.3904 17.341 18.1634L14.8027 15.6251C13.4101 16.8283 11.5973 17.5585 9.61251 17.5585C5.22418 17.5585 1.66675 14.0011 1.66675 9.61275C1.66675 5.22443 5.22418 1.66699 9.61251 1.66699C14.0008 1.66699 17.5583 5.22443 17.5583 9.61275Z"
        fill="currentColor"
      />
    </svg>
  );
}

function useSearchShortcutLabel(): string {
  const [label, setLabel] = useState("Ctrl+K");
  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const platform = typeof navigator !== "undefined" ? navigator.platform : "";
    const isApple =
      /Mac|iPhone|iPad|iPod/.test(ua) ||
      platform === "MacIntel" ||
      platform.startsWith("iPhone") ||
      platform.startsWith("iPad");
    setLabel(isApple ? "⌘K" : "Ctrl+K");
  }, []);
  return label;
}

type DocsSearchProps = {
  items: DocsSearchItem[];
  className?: string;
  /** `headerIcon`: icon-only trigger for the header row (mobile). */
  variant?: "sidebar" | "mobileBar" | "headerIcon";
  registerShortcut?: boolean;
};

export function DocsSearch({
  items,
  className,
  variant = "sidebar",
  registerShortcut = true,
}: DocsSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const shortcutLabel = useSearchShortcutLabel();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentResults, setRecentResults] = useState<DocsSearchRecentEntry[]>(
    []
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeIndexRef = useRef(-1);
  activeIndexRef.current = activeIndex;

  const trimmedQuery = query.trim();
  const showRecent = !trimmedQuery && recentResults.length > 0;

  const fuse = useMemo(() => new Fuse(items, FUSE_OPTIONS), [items]);

  const results = useMemo(() => {
    if (!trimmedQuery) {
      return items.filter((i) => i.kind === "page");
    }
    return fuse.search(trimmedQuery).map((r) => r.item);
  }, [fuse, items, trimmedQuery]);

  const hasNoMatches = trimmedQuery && results.length === 0;

  const navigableCount = useMemo(() => {
    if (hasNoMatches) {
      return 0;
    }
    const recent = showRecent ? recentResults.length : 0;
    return recent + results.length;
  }, [hasNoMatches, showRecent, recentResults.length, results.length]);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [trimmedQuery, pathname, open, showRecent, hasNoMatches, results]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setRecentResults(readRecentSearchResults());
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (activeIndex < 0 || !open) {
      return;
    }
    const el = document.querySelector(
      `[data-search-nav-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const navigateToRecent = useCallback(
    (recent: DocsSearchRecentEntry) => {
      setRecentResults((prev) => appendRecentEntry(prev, recent));
      router.push(recent.href);
      setOpen(false);
    },
    [router]
  );

  const navigateToItem = useCallback(
    (item: DocsSearchItem) => {
      setRecentResults((prev) => appendRecentSearchResult(prev, item));
      router.push(item.href);
      setOpen(false);
    },
    [router]
  );

  const handlePanelKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (navigableCount === 0) {
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => {
          if (i < 0) {
            return 0;
          }
          return Math.min(i + 1, navigableCount - 1);
        });
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? -1 : i - 1));
        return;
      }
      if (e.key === "Enter") {
        const idx = activeIndexRef.current;
        if (idx < 0) {
          return;
        }
        e.preventDefault();
        const recentLen = showRecent ? recentResults.length : 0;
        if (showRecent && idx < recentLen) {
          navigateToRecent(recentResults[idx]!);
          return;
        }
        const item = results[idx - recentLen];
        if (item) {
          navigateToItem(item);
        }
      }
    },
    [
      navigableCount,
      navigateToItem,
      navigateToRecent,
      recentResults,
      results,
      showRecent,
    ]
  );

  const onGlobalKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!registerShortcut) {
      return;
    }
    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [onGlobalKey, registerShortcut]);

  const rowActive = (navIndex: number) => activeIndex === navIndex;

  const triggerButton =
    variant === "headerIcon" ? (
      <button
        type="button"
        className={clsx(
          "flex justify-center items-center w-10 h-10 shrink-0",
          "text-icon-base-500 hover:text-icon-subtle-700 transition-colors",
          className
        )}
        aria-label="Open documentation search"
      >
        <SearchGlyph className="w-6 h-6" />
      </button>
    ) : (
      <button
        type="button"
        className={clsx(
          variant === "sidebar"
            ? "flex items-center gap-2 bg-bg-weak-100 hover:bg-bg-weak-200 px-3 py-2 border border-stroke-soft-200 rounded-lg w-full text-left text-text-subtle-700 hover:text-text-strong-1000 transition-colors"
            : "flex items-center gap-2 bg-bg-weak-100 hover:bg-bg-weak-200 px-3 py-2 border border-stroke-soft-200 rounded-lg w-full text-left text-text-subtle-700 transition-colors",
          className
        )}
        aria-label="Open documentation search"
      >
        <SearchGlyph
          className={clsx(
            "text-icon-base-500 shrink-0",
            variant === "sidebar" ? "w-4 h-4" : "w-4 h-4"
          )}
        />
        <span className="flex-1 text-body-sm-regular truncate">Search…</span>
        <kbd className="hidden sm:inline-flex items-center bg-surface-base border-stroke-soft-200 px-1.5 py-0.5 border rounded font-medium text-[10px] text-icon-subtle-700">
          {shortcutLabel}
        </kbd>
      </button>
    );

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger>

      <Dialog.Portal>
        <Modal.Overlay />

        <Modal.Content
          placement="top"
          className={clsx(
            "!flex !flex-col !gap-0 !p-0 !max-h-[min(560px,88dvh)] !overflow-hidden",
            "!sm:max-w-[560px]"
          )}
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onKeyDown={handlePanelKeyDown}
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>

          <div className="flex items-center gap-2 border-stroke-soft-200 px-4 py-3 border-b">
            <SearchGlyph className="w-5 h-5 text-icon-base-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides and API…"
              className="flex-1 bg-transparent outline-none min-w-0 text-body-md-regular text-text-strong-1000 placeholder:text-text-subtle-700"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <Modal.Close className="top-auto right-auto static shrink-0" />
          </div>

          {showRecent ? (
            <div className="border-stroke-soft-200 px-2 py-2 border-b shrink-0">
              <div className="px-2 pb-1 font-medium text-[11px]/[16px] text-text-soft-500 uppercase tracking-[0.055px]">
                Recently viewed
              </div>
              <ul className="flex flex-col gap-0.5" role="list">
                {recentResults.map((recent, navIndex) => (
                  <li key={recent.id}>
                    <div className="flex items-center gap-0 hover:bg-bg-weak-100 rounded-xl">
                      <Link
                        href={recent.href}
                        data-search-nav-index={navIndex}
                        className={clsx(
                          "flex flex-1 items-start gap-3 px-3 py-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 min-w-0 text-left transition-colors",
                          rowActive(navIndex) && "bg-bg-weak-100"
                        )}
                        onClick={() => {
                          setRecentResults((prev) =>
                            appendRecentEntry(prev, recent)
                          );
                          setOpen(false);
                        }}
                      >
                        <SearchResultIcon item={recent} />
                        <div className="flex flex-col flex-1 gap-1 min-w-0">
                          <span className="font-medium text-[11px]/[16px] text-text-soft-500 tracking-[0.055px]">
                            {recent.breadcrumb}
                          </span>
                          <span className="text-body-md-medium text-text-strong-1000">
                            {recent.title}
                          </span>
                        </div>
                      </Link>
                      <button
                        type="button"
                        className="flex justify-center items-center rounded-lg w-9 h-9 text-icon-base-500 hover:text-text-strong-1000 transition-colors shrink-0"
                        aria-label={`Remove “${recent.title}” from recently viewed`}
                        onClick={() =>
                          setRecentResults((prev) =>
                            removeRecentSearchResult(prev, recent.id)
                          )
                        }
                      >
                        <span className="text-lg leading-none" aria-hidden>
                          ×
                        </span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ul
            className="flex-1 p-2 min-h-0 overflow-y-auto"
            role="listbox"
            aria-label="Search results"
          >
            {hasNoMatches ? (
              <li className="px-3 py-8 text-body-sm-regular text-text-subtle-700 text-center">
                No matching pages. Try different words.
              </li>
            ) : (
              results.map((item, j) => {
                const navIndex = (showRecent ? recentResults.length : 0) + j;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={rowActive(navIndex)}
                  >
                    <Link
                      href={item.href}
                      data-search-nav-index={navIndex}
                      className={clsx(
                        "flex items-start gap-3 hover:bg-bg-weak-100 px-3 py-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-colors",
                        rowActive(navIndex) && "bg-bg-weak-100"
                      )}
                      onClick={() => {
                        setRecentResults((prev) =>
                          appendRecentSearchResult(prev, item)
                        );
                        setOpen(false);
                      }}
                    >
                      <SearchResultIcon item={item} />
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <span className="font-medium text-[11px]/[16px] text-text-soft-500 tracking-[0.055px]">
                          <HighlightMatch
                            text={item.breadcrumb}
                            query={query}
                          />
                        </span>
                        <span className="text-body-md-medium text-text-strong-1000">
                          <HighlightMatch text={item.title} query={query} />
                        </span>
                        {item.snippet ? (
                          <span className="text-body-sm-regular text-text-subtle-700 line-clamp-2">
                            <HighlightMatch text={item.snippet} query={query} />
                          </span>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </Modal.Content>
      </Dialog.Portal>
    </Modal.Root>
  );
}
