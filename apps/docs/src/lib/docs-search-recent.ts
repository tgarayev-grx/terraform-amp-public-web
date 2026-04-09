import { DOCS_LOCAL_STORAGE_KEYS } from "@/config/local-storage-keys";

import type {
  DocsSearchItem,
  DocsSearchRecentEntry,
} from "@/lib/docs-search.types";

const MAX_RECENT = 8;

function isRecentEntry(x: unknown): x is DocsSearchRecentEntry {
  if (!x || typeof x !== "object") {
    return false;
  }
  const o = x as Record<string, unknown>;
  const kind = o.kind;
  return (
    typeof o.id === "string" &&
    typeof o.href === "string" &&
    typeof o.title === "string" &&
    typeof o.breadcrumb === "string" &&
    typeof kind === "string" &&
    (kind === "page" || kind === "section" || kind === "api") &&
    (o.method === undefined || typeof o.method === "string")
  );
}

export function readRecentSearchResults(): DocsSearchRecentEntry[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(DOCS_LOCAL_STORAGE_KEYS.searchRecent);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isRecentEntry);
  } catch {
    return [];
  }
}

function persist(list: DocsSearchRecentEntry[]) {
  try {
    localStorage.setItem(
      DOCS_LOCAL_STORAGE_KEYS.searchRecent,
      JSON.stringify(list.slice(0, MAX_RECENT))
    );
  } catch {
    /* quota / private mode */
  }
}

function toEntry(item: DocsSearchItem): DocsSearchRecentEntry {
  const { id, kind, title, href, breadcrumb, method } = item;
  return method === undefined
    ? { id, kind, title, href, breadcrumb }
    : { id, kind, title, href, breadcrumb, method };
}

/** Returns the updated list (newest first). */
export function appendRecentEntry(
  prev: DocsSearchRecentEntry[],
  entry: DocsSearchRecentEntry
): DocsSearchRecentEntry[] {
  const next = [entry, ...prev.filter((x) => x.id !== entry.id)].slice(
    0,
    MAX_RECENT
  );
  persist(next);
  return next;
}

/** Returns the updated list (newest first). */
export function appendRecentSearchResult(
  prev: DocsSearchRecentEntry[],
  item: DocsSearchItem
): DocsSearchRecentEntry[] {
  return appendRecentEntry(prev, toEntry(item));
}

export function removeRecentSearchResult(
  prev: DocsSearchRecentEntry[],
  id: string
): DocsSearchRecentEntry[] {
  const next = prev.filter((x) => x.id !== id);
  persist(next);
  return next;
}
