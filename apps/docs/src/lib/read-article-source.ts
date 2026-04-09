import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";
import { z } from "zod";

const frontmatterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export type ArticleSource = {
  body: string;
  title?: string;
  description?: string;
};

export function articleMdxPath(
  productKey: string,
  versionSlug: string,
  slug: string
): string {
  return path.join(
    process.cwd(),
    "content",
    productKey,
    versionSlug,
    `${slug}.mdx`
  );
}

/**
 * Read an MDX article from disk and parse frontmatter (shared by page render and search index build).
 */
export async function readArticleSource(
  productKey: string,
  versionSlug: string,
  slug: string
): Promise<ArticleSource | null> {
  const filePath = articleMdxPath(productKey, versionSlug, slug);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const meta = frontmatterSchema.safeParse(data);
  const body = content.trim();

  if (!meta.success) {
    return { body };
  }

  return {
    body,
    title: meta.data.title,
    description: meta.data.description,
  };
}
