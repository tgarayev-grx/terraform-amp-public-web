import type { BundledTheme } from "shiki";

/**
 * Shiki dual themes: default inline is `light`; dark uses `--shiki-dark*` (see globals.css).
 */
export const docsCodeShikiThemes = {
  light: "github-light-default",
  dark: "dark-plus",
} as const satisfies Record<"light" | "dark", BundledTheme>;

export const docsCodeShikiDefaultColor: "light" | "dark" = "light";
