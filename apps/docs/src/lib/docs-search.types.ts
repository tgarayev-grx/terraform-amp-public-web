export type DocsSearchItemKind = "page" | "section" | "api";

export type DocsSearchItem = {
  id: string;
  kind: DocsSearchItemKind;
  title: string;
  href: string;
  /** Uppercase category (e.g. API REFERENCE, Getting started). */
  section: string;
  /** Grey breadcrumb line (e.g. Authentication > Creating your API key). */
  breadcrumb: string;
  snippet?: string;
  /** Full fuzzy-search corpus. */
  text: string;
  method?: string;
};

/** Persisted when the user opens a search result (not the query text). */
export type DocsSearchRecentEntry = Pick<
  DocsSearchItem,
  "id" | "kind" | "title" | "href" | "breadcrumb" | "method"
>;
