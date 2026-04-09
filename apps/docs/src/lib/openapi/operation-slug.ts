import type { ParsedOpenApi, ParsedOperation } from "./types";

function slugify(value: string): string {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "operation";
}

function operationTitle(operation: ParsedOperation): string {
  return operation.summary ?? operation.operationId;
}

export type TaggedOperationEntry = {
  tag: string;
  operation: ParsedOperation;
  slug: string;
  title: string;
};

export function buildTaggedOperationEntries(
  doc: ParsedOpenApi
): TaggedOperationEntry[] {
  const entries: TaggedOperationEntry[] = [];
  const seen = new Map<string, number>();

  for (const tag of doc.tagsInOrder) {
    const operations = doc.operationsByTag[tag] ?? [];
    for (const operation of operations) {
      const readableBase = slugify(operationTitle(operation));
      const count = (seen.get(readableBase) ?? 0) + 1;
      seen.set(readableBase, count);
      const slug = count === 1 ? readableBase : `${readableBase}-${count}`;
      entries.push({
        tag,
        operation,
        slug,
        title: operationTitle(operation),
      });
    }
  }

  return entries;
}

export function findTaggedOperationBySlug(
  doc: ParsedOpenApi,
  slug: string
): TaggedOperationEntry | undefined {
  return buildTaggedOperationEntries(doc).find((entry) => entry.slug === slug);
}
