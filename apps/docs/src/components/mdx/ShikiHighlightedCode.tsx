"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import {
  docsCodeShikiDefaultColor,
  docsCodeShikiThemes,
} from "@/config/docs-code-theme";
import { resolveBundledLanguage } from "@/lib/shiki-docs-lang";

let shikiWebPromise: Promise<typeof import("shiki/bundle/web")> | null = null;

function loadShikiWeb() {
  shikiWebPromise ??= import("shiki/bundle/web");
  return shikiWebPromise;
}

const shikiMarkupWrapperClass =
  "[&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:px-4 [&>pre]:py-4 [&>pre]:text-xs [&>pre]:leading-6 [&>pre]:font-mono [&>pre_code]:font-mono";

type HighlightState =
  | { status: "loading" }
  | { status: "html"; html: string }
  | { status: "plain" };

export type ShikiHighlightedCodeProps = {
  code: string;
  language: string;
  className?: string;
  /** Server `highlightDocsCode` output; skips client Shiki when set. */
  highlightedHtml?: string;
};

function ShikiHighlightedCodeClient({
  code,
  language,
  className,
}: Omit<ShikiHighlightedCodeProps, "highlightedHtml">) {
  const [state, setState] = useState<HighlightState>({ status: "loading" });

  useEffect(() => {
    if (!code) {
      setState({ status: "html", html: "" });
      return;
    }

    setState({ status: "loading" });
    let cancelled = false;

    void (async () => {
      try {
        const mod = await loadShikiWeb();
        const lang = resolveBundledLanguage(language, mod.bundledLanguages);
        const out = await mod.codeToHtml(code, {
          lang,
          themes: { ...docsCodeShikiThemes },
          defaultColor: docsCodeShikiDefaultColor,
        });
        if (!cancelled) {
          setState({ status: "html", html: out });
        }
      } catch {
        if (!cancelled) {
          setState({ status: "plain" });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const fallbackPreClass = clsx(
    "m-0 overflow-x-auto px-4 py-4 text-xs leading-6 font-mono bg-bg-muted-50",
    className
  );

  if (state.status === "loading") {
    return (
      <pre className={clsx(fallbackPreClass, "text-text-subtle-700")}>
        <code>{code}</code>
      </pre>
    );
  }

  if (state.status === "plain") {
    return (
      <pre className={fallbackPreClass}>
        <code>{code}</code>
      </pre>
    );
  }

  if (!state.html) {
    return <pre className={fallbackPreClass} />;
  }

  return (
    <div
      className={clsx(shikiMarkupWrapperClass, className)}
      dangerouslySetInnerHTML={{ __html: state.html }}
    />
  );
}

export function ShikiHighlightedCode({
  highlightedHtml,
  ...clientProps
}: ShikiHighlightedCodeProps) {
  if (highlightedHtml !== undefined) {
    return (
      <div
        className={clsx(shikiMarkupWrapperClass, clientProps.className)}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    );
  }

  return <ShikiHighlightedCodeClient {...clientProps} />;
}
