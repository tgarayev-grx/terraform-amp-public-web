import GithubSlugger from "github-slugger";

function stripInlineMd(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function parseTableRowCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function isTableSeparatorRow(trimmedLine: string): boolean {
  if (!trimmedLine.includes("|")) {
    return false;
  }
  const cells = parseTableRowCells(trimmedLine);
  return cells.length > 0 && cells.every((c) => /^[\s:-]+$/.test(c));
}

function looksLikeTableDataRow(line: string): boolean {
  const t = line.trim();
  return t.startsWith("|") && t.includes("|") && t.length > 1;
}

function stripCellForPlain(cell: string): string {
  return cell
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

/**
 * Turn GFM pipe tables into plain sentences so search snippets are readable (no `|` / markdown table syntax).
 */
function resolveMarkdownTables(raw: string): string {
  const lines = raw.split(/\r?\n/);
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const next = lines[i + 1];

    const isGfmTableStart =
      looksLikeTableDataRow(line) &&
      typeof next === "string" &&
      isTableSeparatorRow(next.trim());

    if (isGfmTableStart) {
      const block: string[] = [];
      while (i < lines.length && looksLikeTableDataRow(lines[i])) {
        block.push(lines[i]);
        i++;
      }
      const plain = gfmTableBlockToPlain(block);
      if (plain) {
        out.push(plain);
      }
      continue;
    }

    out.push(line);
    i++;
  }

  return out.join("\n");
}

function gfmTableBlockToPlain(block: string[]): string {
  if (block.length < 2) {
    return "";
  }

  const rows = block.map((l) => parseTableRowCells(l));
  let dataStart = 0;
  if (block.length >= 2 && isTableSeparatorRow(block[1].trim())) {
    dataStart = 2;
  }

  const parts: string[] = [];
  for (let r = dataStart; r < rows.length; r++) {
    const cells = rows[r].map(stripCellForPlain).filter(Boolean);
    if (cells.length) {
      parts.push(cells.join(" "));
    }
  }
  return parts.join(" ");
}

/**
 * Strip MDX/Markdown enough for search snippets (not perfect, good for indexing).
 */
export function markdownishToPlainText(raw: string): string {
  let s = raw;
  s = s.replace(/```[\s\S]*?```/g, " ");
  s = resolveMarkdownTables(s);
  s = s.replace(/`([^`]+)`/g, "$1");
  s = s.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/\*([^*]+)\*/g, "$1");
  s = s.replace(/^#{1,6}\s+/gm, "");
  s = s.replace(/^import\s.+$/gm, " ");
  s = s.replace(/^export\s.+$/gm, " ");
  s = s.replace(/<[A-Za-z][\s\S]*?\/>/g, " ");
  s = s.replace(/<[A-Za-z][\s\S]*?<\/[A-Za-z][\w.]*>/g, " ");
  s = s.replace(/<[^>]+>/g, " ");
  s = s.replace(/^>\s?/gm, "");
  s = s.replace(/^[-*]\s+/gm, "");
  s = s.replace(/^\d+\.\s+/gm, "");
  s = s.replace(/\s+/g, " ");
  return s.trim();
}

export function snippetFromPlain(
  plain: string,
  maxLen = 200
): string | undefined {
  const t = plain.replace(/\s+/g, " ").trim();
  if (!t) {
    return undefined;
  }
  if (t.length <= maxLen) {
    return t;
  }
  const slice = t.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim() + "…";
}

export type MdxHeadingSection = {
  heading: string;
  slug: string;
  level: number;
  raw: string;
};

/**
 * Split MDX body (no frontmatter) into preamble + `##`–`####` sections. Slugs match `rehype-slug` / `github-slugger`.
 */
export function splitMdxBodyIntoHeadingSections(
  body: string
): MdxHeadingSection[] {
  const lines = body.split(/\r?\n/);
  const slugger = new GithubSlugger();
  const sections: MdxHeadingSection[] = [];

  let i = 0;
  const pre: string[] = [];
  while (i < lines.length) {
    const t = lines[i].trim();
    if (/^(#{2,4})\s+/.test(t)) {
      break;
    }
    pre.push(lines[i]);
    i++;
  }
  const preRaw = pre.join("\n");
  if (preRaw.trim()) {
    sections.push({ heading: "", slug: "", level: 1, raw: preRaw });
  }

  while (i < lines.length) {
    const t = lines[i].trim();
    const m = /^(#{2,4})\s+(.+?)\s*$/.exec(t);
    if (!m) {
      i++;
      continue;
    }
    const level = m[1].length;
    const title = stripInlineMd(m[2].replace(/\s+#+\s*$/, "").trim());
    const slug = title ? slugger.slug(title) : "";
    i++;
    const chunk: string[] = [];
    while (i < lines.length) {
      const nt = lines[i].trim();
      const hm = /^(#{2,4})\s+/.exec(nt);
      if (hm && hm[1].length <= level) {
        break;
      }
      chunk.push(lines[i]);
      i++;
    }
    sections.push({ heading: title, slug, level, raw: chunk.join("\n") });
  }

  return sections;
}
