"use client";

import { useMemo, useState } from "react";
import { SingleSelect } from "@grx/ui/components/select/Select";

import { CopyButton } from "@/components/CopyButton";
import type { ParsedOperation } from "@/lib/openapi/types";
import { ShikiHighlightedCode } from "@/components/mdx/ShikiHighlightedCode";

import { ApiReferenceMethodBadge } from "./ApiReferenceMethodBadge";

export type OpenApiRequestSnippetPayload = {
  id: string;
  label: string;
  prismLanguage: string;
  code: string;
  html: string;
};

type OpenApiRequestSamplesStickyProps = {
  operation: ParsedOperation;
  snippets: OpenApiRequestSnippetPayload[];
};

export function OpenApiRequestSamplesSticky({
  operation,
  snippets,
}: OpenApiRequestSamplesStickyProps) {
  const defaultSnippetId = snippets[0]?.id ?? "curl";
  const [snippetId, setSnippetId] = useState(defaultSnippetId);

  const title = operation.summary ?? operation.operationId ?? operation.path;

  const { codeById, htmlById, prismById } = useMemo(() => {
    const c: Record<string, string> = {};
    const h: Record<string, string> = {};
    const p: Record<string, string> = {};
    for (const s of snippets) {
      c[s.id] = s.code;
      h[s.id] = s.html;
      p[s.id] = s.prismLanguage;
    }
    return { codeById: c, htmlById: h, prismById: p };
  }, [snippets]);

  const code = codeById[snippetId] ?? "";
  const highlightedHtml = htmlById[snippetId] ?? "";
  const activePrismLanguage = prismById[snippetId] ?? "bash";

  return (
    <div
      aria-label="Request sample"
      className="bg-bg-muted-50 p-4 rounded-xl overflow-hidden"
    >
      <div className="flex flex-wrap justify-between items-center gap-3 pb-2">
        <div className="flex items-center gap-2 min-w-0">
          <ApiReferenceMethodBadge method={operation.method} />
          <span className="text-body-md-medium text-text-subtle-700 truncate">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <SingleSelect
            value={snippetId}
            onValueChange={setSnippetId}
            size="sm"
          >
            <SingleSelect.Trigger
              className="py-[5px] pr-1.5 pl-2.5"
              variant="inline"
            />
            <SingleSelect.Content>
              {snippets.map((s) => (
                <SingleSelect.Item key={s.id} value={s.id}>
                  {s.label}
                </SingleSelect.Item>
              ))}
            </SingleSelect.Content>
          </SingleSelect>

          <CopyButton text={code} />
        </div>
      </div>

      <div className="bg-stroke-soft-200 mb-3 w-full h-px" />

      <div className="-mx-4 max-h-[min(40vh,22rem)] overflow-auto">
        <ShikiHighlightedCode
          code={code}
          language={activePrismLanguage}
          highlightedHtml={highlightedHtml}
        />
      </div>
    </div>
  );
}
