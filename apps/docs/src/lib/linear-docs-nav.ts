import {
  operationLinearNavKey,
  type DocsNavPage,
  type NavNode,
} from "@/config/docs-navigation";
import { buildTaggedOperationEntries } from "@/lib/openapi/operation-slug";
import type { ParsedOpenApi } from "@/lib/openapi/types";

/**
 * Reading order: nav articles (and nested groups), then every OpenAPI operation in
 * `buildTaggedOperationEntries` order for each `openapi` node.
 */
export function buildLinearDocsPages(
  productSlug: string,
  versionSlug: string,
  nav: NavNode[],
  doc: ParsedOpenApi
): DocsNavPage[] {
  const pages: DocsNavPage[] = [];
  for (const node of nav) {
    if (node.type === "article") {
      pages.push({
        key: node.slug,
        title: node.title,
        href: `/${productSlug}/${versionSlug}/${node.slug}/`,
      });
    } else if (node.type === "openapi") {
      for (const entry of buildTaggedOperationEntries(doc)) {
        pages.push({
          key: operationLinearNavKey(entry.slug),
          title: entry.title,
          href: `/${productSlug}/${versionSlug}/api-reference/${entry.slug}/`,
        });
      }
    } else if (node.type === "group") {
      pages.push(
        ...buildLinearDocsPages(productSlug, versionSlug, node.children, doc)
      );
    }
  }
  return pages;
}

export function getAdjacentLinearDocPages(
  pages: DocsNavPage[],
  currentKey: string
): { prev?: DocsNavPage; next?: DocsNavPage } {
  const i = pages.findIndex((p) => p.key === currentKey);
  if (i === -1) {
    return {};
  }
  return {
    prev: i > 0 ? pages[i - 1] : undefined,
    next: i < pages.length - 1 ? pages[i + 1] : undefined,
  };
}
