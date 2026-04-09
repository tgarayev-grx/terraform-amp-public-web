"use client";

import {
  Children,
  isValidElement,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SingleSelect } from "@grx/ui/components/select/Select";
import { CopyButton } from "@/components/CopyButton";
import { useCodeGroupState, type CodeGroupLanguage } from "./CodeGroupState";
import { ShikiHighlightedCode } from "./ShikiHighlightedCode";

type Language = CodeGroupLanguage;

export type CodeGroupProps = {
  title?: string;
  children?: ReactNode;
  /**
   * JSON string literal of:
   * [{ "id": "js", "label": "JavaScript", "language": "javascript", "code": "..." }]
   *
   * Use this when you need arbitrary languages in MDX string-literal props.
   */
  items?: string;
  javascript?: string;
  python?: string;
  defaultLanguage?: Language;
};

function normalize(code: string | undefined): string {
  if (!code) return "";
  const unescaped = code
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");
  return unescaped.replace(/\s+$/, "").replace(/^\n+/, "");
}

type CodeGroupItem = {
  /** Stable id used for persistence (e.g. "javascript", "python", "curl") */
  id: string;
  /** Label shown in the dropdown */
  label: string;
  /** Prism language id (optional). If omitted, falls back to id. */
  language?: string;
  /** Code string (may contain \n escapes from MDX) */
  code: string;
};

function prettyLabel(id: string): string {
  const lower = id.toLowerCase();
  if (lower === "js" || lower === "javascript") return "JavaScript";
  if (lower === "ts" || lower === "typescript") return "TypeScript";
  if (lower === "py" || lower === "python") return "Python";
  if (lower === "bash" || lower === "sh" || lower === "shell") return "Shell";
  if (lower === "curl") return "cURL";
  return id;
}

function parseFenceLanguage(className: unknown): string | undefined {
  if (typeof className !== "string") return undefined;
  // Common patterns: "language-javascript", "lang-js"
  const m = className.match(/\b(?:language|lang)-([a-z0-9+-]+)\b/i);
  return m?.[1]?.toLowerCase();
}

function extractCodeFromChildren(children: ReactNode): CodeGroupItem[] {
  const nodes = Children.toArray(children);
  const out: CodeGroupItem[] = [];

  for (const node of nodes) {
    if (!isValidElement(node)) continue;

    // MDX code fences typically become: <pre><code className="language-x">...</code></pre>
    if (node.type === "pre") {
      const preChildren = (node.props as { children?: ReactNode }).children;
      const codeEl = isValidElement(preChildren) ? preChildren : null;
      if (!codeEl || codeEl.type !== "code") continue;

      const className = (codeEl.props as { className?: unknown }).className;
      const lang = parseFenceLanguage(className) ?? "text";
      const raw = (codeEl.props as { children?: unknown }).children;
      const code =
        typeof raw === "string"
          ? raw
          : Array.isArray(raw)
            ? raw.filter((x) => typeof x === "string").join("")
            : "";

      const id = lang;
      out.push({
        id,
        label: prettyLabel(lang),
        language: lang,
        code: normalize(code),
      });
    }
  }

  // Deduplicate by id (first wins)
  const seen = new Set<string>();
  return out.filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true)));
}

function parseItems(raw: string | undefined): CodeGroupItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const out: CodeGroupItem[] = [];
    for (const v of parsed) {
      if (v && typeof v === "object" && !Array.isArray(v)) {
        const rec = v as Record<string, unknown>;
        const id = typeof rec.id === "string" ? rec.id : undefined;
        const label = typeof rec.label === "string" ? rec.label : undefined;
        const code = typeof rec.code === "string" ? rec.code : undefined;
        const language =
          typeof rec.language === "string" ? rec.language : undefined;
        if (id && label && code !== undefined) {
          out.push({ id, label, code, language });
        }
      }
    }
    return out;
  } catch {
    return [];
  }
}

export function CodeGroup({
  title,
  children,
  items,
  javascript,
  python,
  defaultLanguage = "javascript",
}: CodeGroupProps) {
  const shared = useCodeGroupState();
  const [localLanguage, setLocalLanguage] = useState<Language>(defaultLanguage);
  const language = shared?.language ?? localLanguage;
  const setLanguage = shared?.setLanguage ?? setLocalLanguage;

  const available = useMemo(() => {
    if (children) {
      const fromChildren = extractCodeFromChildren(children);
      if (fromChildren.length) return fromChildren;
    }

    const fromJson = parseItems(items).map((it) => ({
      ...it,
      code: normalize(it.code),
    }));

    if (fromJson.length) return fromJson;

    const legacy: CodeGroupItem[] = [];
    const js = normalize(javascript);
    if (js) legacy.push({ id: "javascript", label: "JavaScript", code: js });
    const py = normalize(python);
    if (py) legacy.push({ id: "python", label: "Python", code: py });
    return legacy;
  }, [children, items, javascript, python]);

  const active = useMemo(() => {
    if (!available.length) return undefined;
    return (
      available.find((x) => x.id === language) ??
      available.find((x) => x.id === defaultLanguage) ??
      available[0]
    );
  }, [available, language, defaultLanguage]);

  const code = active?.code ?? "";
  const activeId = active?.id ?? defaultLanguage;
  const prismLanguage = active?.language ?? activeId;

  return (
    <div className="bg-bg-muted-50 p-4 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center gap-3 pb-2">
        <div className="min-w-0">
          {!!title && (
            <div className="text-body-md-medium text-text-subtle-700">
              {title}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <SingleSelect
            value={activeId}
            onValueChange={(v) => setLanguage(v)}
            size="sm"
          >
            <SingleSelect.Trigger
              className="py-[5px] pr-1.5 pl-2.5"
              variant="inline"
            />

            <SingleSelect.Content>
              {available.map((it) => (
                <SingleSelect.Item key={it.id} value={it.id}>
                  {it.label}
                </SingleSelect.Item>
              ))}
            </SingleSelect.Content>
          </SingleSelect>

          <CopyButton text={code} />
        </div>
      </div>
      <div className="bg-stroke-soft-200 mb-3 w-full h-[1px]" />

      <ShikiHighlightedCode code={code} language={prismLanguage} />

      {/* Note: children code fences are parsed, not rendered. */}
    </div>
  );
}

CodeGroup.displayName = "CodeGroup";
