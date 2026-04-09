import { collectArticleSlugs, type NavNode } from "@/config/docs-navigation";
import type { DocsSearchItem } from "@/lib/docs-search.types";
import {
  markdownishToPlainText,
  snippetFromPlain,
  splitMdxBodyIntoHeadingSections,
} from "@/lib/mdx-for-search";
import type { TaggedOperationEntry } from "@/lib/openapi/operation-slug";
import { readArticleSource } from "@/lib/read-article-source";

function navGroupForArticle(
  nav: NavNode[],
  slug: string,
  parent?: string
): string | undefined {
  for (const node of nav) {
    if (node.type === "article" && node.slug === slug) {
      return parent;
    }
    if (node.type === "group") {
      const found = navGroupForArticle(node.children, slug, node.title);
      if (found !== undefined) {
        return found;
      }
    }
  }
  return undefined;
}

function articleTitleFromNav(nav: NavNode[], slug: string): string | undefined {
  for (const node of nav) {
    if (node.type === "article" && node.slug === slug) {
      return node.title;
    }
    if (node.type === "group") {
      const t = articleTitleFromNav(node.children, slug);
      if (t) {
        return t;
      }
    }
  }
  return undefined;
}

export async function buildDocsSearchIndex(args: {
  productId: string;
  productSlug: string;
  versionSlug: string;
  nav: NavNode[];
  taggedEntries: TaggedOperationEntry[];
}): Promise<DocsSearchItem[]> {
  const { productId, productSlug, versionSlug, nav, taggedEntries } = args;
  const items: DocsSearchItem[] = [];

  const slugs = collectArticleSlugs(nav);

  for (const slug of slugs) {
    const navTitle = articleTitleFromNav(nav, slug);
    const groupTitle = navGroupForArticle(nav, slug);
    const loaded = await readArticleSource(productId, versionSlug, slug);
    if (!loaded) {
      continue;
    }

    const articleTitle = loaded.title ?? navTitle ?? slug.replace(/-/g, " ");
    const baseHref = `/${productSlug}/${versionSlug}/${slug}/`;
    const sectionLabel = (groupTitle ?? "Guides").toUpperCase();
    const pageBreadcrumb = groupTitle
      ? `${groupTitle} > ${articleTitle}`
      : articleTitle;

    const sections = splitMdxBodyIntoHeadingSections(loaded.body);
    const fullPlain = markdownishToPlainText(loaded.body);
    const pageSnippet = snippetFromPlain(
      loaded.description ? `${loaded.description} ${fullPlain}` : fullPlain,
      220
    );

    items.push({
      id: `article:${slug}:page`,
      kind: "page",
      title: articleTitle,
      href: baseHref,
      section: sectionLabel,
      breadcrumb: pageBreadcrumb,
      snippet: pageSnippet,
      text: [
        articleTitle,
        loaded.description ?? "",
        groupTitle ?? "",
        fullPlain,
        slug.replace(/-/g, " "),
      ]
        .join(" ")
        .trim(),
    });

    for (const sec of sections) {
      if (!sec.heading || !sec.slug) {
        continue;
      }
      const plain = markdownishToPlainText(sec.raw);
      if (!plain) {
        continue;
      }
      const snip = snippetFromPlain(plain, 220);
      items.push({
        id: `article:${slug}:h:${sec.slug}`,
        kind: "section",
        title: sec.heading,
        href: `${baseHref}#${sec.slug}`,
        section: sectionLabel,
        breadcrumb: `${articleTitle} > ${sec.heading}`,
        snippet: snip,
        text: [
          articleTitle,
          sec.heading,
          groupTitle ?? "",
          plain,
          pageBreadcrumb,
        ].join(" "),
      });
    }
  }

  for (const entry of taggedEntries) {
    const { operation } = entry;
    const label = entry.title;
    const href = `/${productSlug}/${versionSlug}/api-reference/${entry.slug}/`;
    const descPlain = operation.description
      ? markdownishToPlainText(operation.description)
      : "";
    const snippet =
      snippetFromPlain(
        descPlain || `${operation.method.toUpperCase()} ${operation.path}`,
        220
      ) ?? `${operation.method.toUpperCase()} ${operation.path}`;

    items.push({
      id: `api:${entry.slug}`,
      kind: "api",
      title: label,
      href,
      section: "API REFERENCE",
      breadcrumb: `${entry.tag} · ${operation.method.toUpperCase()} ${operation.path}`,
      snippet,
      text: [
        label,
        operation.operationId,
        operation.path,
        entry.tag,
        descPlain,
        operation.summary ?? "",
      ].join(" "),
      method: operation.method,
    });
  }

  return items;
}
