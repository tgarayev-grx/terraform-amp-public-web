import "server-only";

import fs from "fs/promises";
import path from "path";

import type { DocsSearchItem } from "@/lib/docs-search.types";

const GENERATED_SEGMENTS = ["src", "generated", "docs-search"] as const;

export function docsSearchIndexFilePath(
  productSlug: string,
  versionSlug: string
): string {
  return path.join(
    process.cwd(),
    ...GENERATED_SEGMENTS,
    productSlug,
    `${versionSlug}.json`
  );
}

export async function loadDocsSearchIndex(
  productSlug: string,
  versionSlug: string
): Promise<DocsSearchItem[]> {
  const filePath = docsSearchIndexFilePath(productSlug, versionSlug);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as DocsSearchItem[];
}
