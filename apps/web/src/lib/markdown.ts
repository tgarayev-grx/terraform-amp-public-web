import "server-only";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export type MarkdownFrontMatter = {
  title?: string;
  description?: string;
  createdAt?: string;
  lastUpdatedAt?: string;
  prevVersion?: string;
};

export type ParsedMarkdown = {
  content: string;
  data: MarkdownFrontMatter;
};

export function parseMarkdownFile(
  contentDir: string,
  fileName: string
): ParsedMarkdown {
  const fullPath = join(process.cwd(), contentDir, fileName);
  const fileContents = readFileSync(fullPath, "utf-8");
  const { content, data } = matter(fileContents);
  return {
    content: content.trim(),
    data: data as MarkdownFrontMatter,
  };
}
