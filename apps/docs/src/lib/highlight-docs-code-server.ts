import "server-only";

import { bundledLanguages, codeToHtml } from "shiki/bundle/full";

import {
  docsCodeShikiDefaultColor,
  docsCodeShikiThemes,
} from "@/config/docs-code-theme";
import { resolveBundledLanguage } from "@/lib/shiki-docs-lang";

export async function highlightDocsCode(
  code: string,
  prismLanguage: string
): Promise<string> {
  if (!code) {
    return "";
  }
  const lang = resolveBundledLanguage(prismLanguage, bundledLanguages);
  return codeToHtml(code, {
    lang,
    themes: { ...docsCodeShikiThemes },
    defaultColor: docsCodeShikiDefaultColor,
  });
}
