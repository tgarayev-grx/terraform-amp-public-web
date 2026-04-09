"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { CopyButton } from "@/components/CopyButton";
import type { ParsedOperation } from "@/lib/openapi/types";
import { ShikiHighlightedCode } from "@/components/mdx/ShikiHighlightedCode";

type OpenApiResponseSamplePayload = {
  jsonText: string;
  html: string;
};

type OpenApiResponseSamplesStickyProps = {
  operation: ParsedOperation;
  responseCodes: string[];
  responseSamples: Record<string, OpenApiResponseSamplePayload>;
};

export function OpenApiResponseSamplesSticky({
  operation,
  responseCodes,
  responseSamples,
}: OpenApiResponseSamplesStickyProps) {
  const [responseCode, setResponseCode] = useState(
    () => responseCodes[0] ?? ""
  );

  useEffect(() => {
    const codes = Object.keys(operation.responses).sort((a, b) =>
      a.localeCompare(b)
    );
    setResponseCode(codes[0] ?? "");
  }, [
    operation.operationId,
    operation.method,
    operation.path,
    operation.responses,
  ]);

  const active = responseSamples[responseCode];
  const jsonText = active?.jsonText ?? "";
  const highlightedHtml = active?.html ?? "";

  if (responseCodes.length === 0) {
    return null;
  }

  return (
    <div
      aria-label="Response samples"
      className="bg-bg-muted-50 p-4 rounded-xl overflow-hidden"
    >
      <div className="flex flex-wrap justify-between items-center gap-3 pb-2">
        <div
          className="flex flex-wrap gap-1 min-w-0"
          role="tablist"
          aria-label="HTTP status"
        >
          {responseCodes.map((code) => {
            const activeTab = code === responseCode;
            return (
              <button
                key={code}
                type="button"
                role="tab"
                aria-selected={activeTab}
                onClick={() => setResponseCode(code)}
                className={clsx(
                  "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                  activeTab
                    ? "bg-bg-weak-100 text-gold-400"
                    : "text-text-subtle-700 hover:text-text-strong-1000 hover:bg-bg-soft-200"
                )}
              >
                {code}
              </button>
            );
          })}
        </div>

        <CopyButton text={jsonText} className="shrink-0" />
      </div>

      <div className="bg-stroke-soft-200 mb-3 w-full h-[1px]" />

      <ShikiHighlightedCode
        code={jsonText}
        language="json"
        highlightedHtml={highlightedHtml}
      />
    </div>
  );
}
