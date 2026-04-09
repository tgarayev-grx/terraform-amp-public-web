import GithubSlugger from "github-slugger";

export type ArticleHeading = {
  depth: 2 | 3 | 4;
  text: string;
  id: string;
};

/**
 * Extract ATX headings (## …) from MDX/Markdown source. Uses the same slugger as
 * `rehype-slug` (GitHubSlugger per document) so `id`s match rendered headings.
 */
export function extractArticleHeadingsFromSource(
  source: string
): ArticleHeading[] {
  const slugger = new GithubSlugger();
  const headings: ArticleHeading[] = [];
  const lines = source.split(/\r?\n/);

  for (const line of lines) {
    const m = /^(#{2,4})\s+(.+?)\s*$/.exec(line.trim());
    if (!m) {
      continue;
    }
    const depth = m[1].length as 2 | 3 | 4;
    let text = m[2].replace(/\s+#+\s*$/, "").trim();
    text = stripInlineMd(text);
    if (!text) {
      continue;
    }
    const id = slugger.slug(text);
    headings.push({ depth, text, id });
  }

  return headings;
}

function stripInlineMd(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}
