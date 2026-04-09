import remarkGfm from "remark-gfm";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import {
  extractArticleHeadingsFromSource,
  type ArticleHeading,
} from "@/lib/extract-article-headings";
import { readArticleSource } from "@/lib/read-article-source";

export type LoadedArticle = {
  content: MDXRemoteSerializeResult;
  title?: string;
  description?: string;
  headings: ArticleHeading[];
};

export async function loadArticleMdx(
  productKey: string,
  versionSlug: string,
  slug: string
): Promise<LoadedArticle | null> {
  const source = await readArticleSource(productKey, versionSlug, slug);
  if (!source) {
    return null;
  }

  const headings = extractArticleHeadingsFromSource(source.body);

  const mdxSource = await serialize(source.body, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "after",
            properties: {
              className: ["mdx-heading-anchor-wrap"],
            },
          },
        ],
      ],
    },
    parseFrontmatter: false,
  });

  return {
    content: mdxSource,
    title: source.title,
    description: source.description,
    headings,
  };
}
