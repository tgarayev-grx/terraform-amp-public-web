export type NavArticle = {
  type: "article";
  title: string;
  slug: string;
};

export type NavGroup = {
  type: "group";
  title: string;
  children: NavNode[];
};

export type NavOpenAPI = {
  type: "openapi";
};

export type NavNode = NavArticle | NavGroup | NavOpenAPI;

export type DocsVersion = {
  id: string;
  label: string;
  slug: string;
  /** Path relative to the docs app root (e.g. `openapi.json` or `specs/<product>/<version>/openapi.json`) */
  openapiSpecPath: string;
  nav: NavNode[];
  latest?: boolean;
};

export type DocsProduct = {
  id: string;
  label: string;
  slug: string;
  versions: DocsVersion[];
};

export const docsProducts: DocsProduct[] = [
  {
    id: "pay",
    label: "GRX Pay",
    slug: "pay",
    versions: [
      {
        id: "v1",
        label: "v1",
        slug: "v1",
        openapiSpecPath: "content/pay/v1/openapi.json",
        latest: true,
        nav: [
          {
            type: "group",
            title: "Getting started",
            children: [
              {
                type: "article",
                title: "Introduction",
                slug: "introduction",
              },
              {
                type: "article",
                title: "Authentication",
                slug: "authentication",
              },
              {
                type: "article",
                title: "How to call private endpoints",
                slug: "how-to-call-private-endpoints",
              },
            ],
          },
          { type: "openapi" },
        ],
      },
    ],
  },
];

export function getProductBySlug(slug: string): DocsProduct | undefined {
  return docsProducts.find((p) => p.slug === slug);
}

export function getVersion(
  productSlug: string,
  versionSlug: string
): DocsVersion | undefined {
  const product = getProductBySlug(productSlug);
  return product?.versions.find((v) => v.slug === versionSlug);
}

export function isArticleInNav(
  nav: NavNode[],
  slug: string
): NavArticle | undefined {
  for (const node of nav) {
    if (node.type === "article" && node.slug === slug) {
      return node;
    }
    if (node.type === "group") {
      const found = isArticleInNav(node.children, slug);
      if (found) return found;
    }
  }
  return undefined;
}

/** Nav group title that contains this article (e.g. "Getting started"), if any. */
export function getNavGroupTitleForArticle(
  nav: NavNode[],
  slug: string
): string | undefined {
  for (const node of nav) {
    if (node.type === "group") {
      const direct = node.children.some(
        (c) => c.type === "article" && c.slug === slug
      );
      if (direct) {
        return node.title;
      }
      const nested = getNavGroupTitleForArticle(node.children, slug);
      if (nested) return nested;
    }
  }
  return undefined;
}

export function getFirstNavHref(
  productSlug: string,
  versionSlug: string
): string | undefined {
  const version = getVersion(productSlug, versionSlug);
  if (!version) return undefined;
  return firstNavHrefFromNodes(productSlug, versionSlug, version.nav);
}

function firstNavHrefFromNodes(
  productSlug: string,
  versionSlug: string,
  nodes: NavNode[]
): string | undefined {
  for (const node of nodes) {
    if (node.type === "article") {
      return `/${productSlug}/${versionSlug}/${node.slug}/`;
    }
    if (node.type === "openapi") {
      return `/${productSlug}/${versionSlug}/api-reference/`;
    }
    if (node.type === "group") {
      const href = firstNavHrefFromNodes(
        productSlug,
        versionSlug,
        node.children
      );
      if (href) return href;
    }
  }
  return undefined;
}

export function collectArticleSlugs(nav: NavNode[]): string[] {
  const slugs: string[] = [];
  for (const node of nav) {
    if (node.type === "article") {
      slugs.push(node.slug);
    } else if (node.type === "group") {
      slugs.push(...collectArticleSlugs(node.children));
    }
  }
  return slugs;
}

/** Key for an API operation row in linear doc navigation (matches `buildLinearDocsPages`). */
export function operationLinearNavKey(operationSlug: string): string {
  return `api-op:${operationSlug}`;
}

export type DocsNavPage = {
  key: string;
  title: string;
  href: string;
};

/**
 * Flat reading order: articles in nav groups, then (when the spec is available) the first
 * API operation for each `openapi` node — not a separate `/api-reference/` “hub” page (that
 * route only redirects to the first operation).
 */
export function collectOrderedDocPages(
  productSlug: string,
  versionSlug: string,
  nav: NavNode[],
  /** First operation in spec order; when omitted, no API row is added (no spec / empty spec). */
  apiReferenceFirst?: { title: string; href: string; slug: string }
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
      if (apiReferenceFirst) {
        pages.push({
          key: operationLinearNavKey(apiReferenceFirst.slug),
          title: apiReferenceFirst.title,
          href: apiReferenceFirst.href,
        });
      }
    } else if (node.type === "group") {
      pages.push(
        ...collectOrderedDocPages(
          productSlug,
          versionSlug,
          node.children,
          apiReferenceFirst
        )
      );
    }
  }
  return pages;
}

export function getAdjacentDocPages(
  productSlug: string,
  versionSlug: string,
  nav: NavNode[],
  currentSlug: string,
  apiReferenceFirst?: { title: string; href: string; slug: string }
): { prev?: DocsNavPage; next?: DocsNavPage } {
  const pages = collectOrderedDocPages(
    productSlug,
    versionSlug,
    nav,
    apiReferenceFirst
  );
  const i = pages.findIndex((p) => p.key === currentSlug);
  if (i === -1) {
    return {};
  }
  return {
    prev: i > 0 ? pages[i - 1] : undefined,
    next: i < pages.length - 1 ? pages[i + 1] : undefined,
  };
}
