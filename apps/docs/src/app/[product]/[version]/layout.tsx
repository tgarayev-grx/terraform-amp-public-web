import { notFound } from "next/navigation";

import { getProductBySlug, getVersion } from "@/config/docs-navigation";
import { DocsShell, type EndpointNavTag } from "@/components/DocsShell";
import { loadDocsSearchIndex } from "@/lib/load-docs-search-index";
import { parseOpenApiJsonString } from "@/lib/openapi/parse-openapi";
import { buildTaggedOperationEntries } from "@/lib/openapi/operation-slug";
import { readSpecJson } from "@/lib/spec";

export default async function DocsProductVersionLayout({
  children,
  params,
}: LayoutProps<"/[product]/[version]">) {
  const { product: productSlug, version: versionSlug } = await params;
  const product = getProductBySlug(productSlug);
  const version = getVersion(productSlug, versionSlug);
  if (!product || !version) {
    notFound();
  }

  let endpointTags: EndpointNavTag[] = [];

  const specJson = await readSpecJson(productSlug, versionSlug);

  if (specJson) {
    try {
      const parsed = parseOpenApiJsonString(specJson);
      const taggedEntries = buildTaggedOperationEntries(parsed);
      const tags = new Map<string, EndpointNavTag>();
      for (const entry of taggedEntries) {
        const existing = tags.get(entry.tag) ?? {
          tag: entry.tag,
          operations: [],
        };
        existing.operations.push({
          operationId: entry.operation.operationId,
          slug: entry.slug,
          method: entry.operation.method,
          path: entry.operation.path,
          summary: entry.title,
          href: `/${productSlug}/${versionSlug}/api-reference/${entry.slug}/`,
        });
        tags.set(entry.tag, existing);
      }
      endpointTags = Array.from(tags.values());
    } catch {
      endpointTags = [];
    }
  }

  const searchItems = await loadDocsSearchIndex(productSlug, versionSlug);

  return (
    <DocsShell
      product={product}
      version={version}
      endpointTags={endpointTags}
      searchItems={searchItems}
    >
      {children}
    </DocsShell>
  );
}
