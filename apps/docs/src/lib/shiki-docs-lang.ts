import type { BundledLanguage } from "shiki/bundle/full";

const PRISM_TO_SHIKI: Record<string, BundledLanguage> = {
  bash: "bash",
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  curl: "bash",
  js: "javascript",
  javascript: "javascript",
  jsx: "jsx",
  ts: "typescript",
  typescript: "typescript",
  tsx: "tsx",
  json: "json",
  jsonc: "jsonc",
  py: "python",
  python: "python",
  yml: "yaml",
  yaml: "yaml",
  md: "markdown",
  mdx: "mdx",
  html: "html",
  css: "css",
  scss: "scss",
  text: "markdown",
  php: "php",
  go: "go",
  golang: "go",
  java: "java",
  ruby: "ruby",
  rb: "ruby",
};

export function resolveBundledLanguage(
  prismLanguage: string,
  bundledLanguages: Record<string, unknown>
): BundledLanguage {
  const id = prismLanguage.toLowerCase();
  const mapped = PRISM_TO_SHIKI[id] ?? id;
  if (mapped in bundledLanguages) {
    return mapped;
  }
  return "typescript";
}
