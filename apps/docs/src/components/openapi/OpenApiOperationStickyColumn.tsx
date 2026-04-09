import type { ParsedOpenApi, ParsedOperation } from "@/lib/openapi/types";
import { REQUEST_CODE_SNIPPET_DEFS } from "@/lib/openapi/build-request-code-samples";
import { highlightDocsCode } from "@/lib/highlight-docs-code-server";
import { getResponseSampleJsonString } from "@/lib/openapi/response-sample-json";

import { OpenApiRequestSamplesSticky } from "./OpenApiRequestSamplesSticky";
import { OpenApiResponseSamplesSticky } from "./OpenApiResponseSamplesSticky";

type OpenApiOperationStickyColumnProps = {
  doc: ParsedOpenApi;
  operation: ParsedOperation;
  responseCodes: string[];
};

export async function OpenApiOperationStickyColumn({
  doc,
  operation,
  responseCodes,
}: OpenApiOperationStickyColumnProps) {
  const hasResponses = responseCodes.length > 0;

  const requestSnippets = await Promise.all(
    REQUEST_CODE_SNIPPET_DEFS.map(async (def) => {
      const code = def.build(operation, doc);
      const html = await highlightDocsCode(code, def.prismLanguage);
      return {
        id: def.id,
        label: def.label,
        prismLanguage: def.prismLanguage,
        code,
        html,
      };
    })
  );

  const responseSamplesEntries = await Promise.all(
    responseCodes.map(async (code) => {
      const block = operation.responses[code];
      const jsonText = getResponseSampleJsonString(doc.raw, block);
      const html = await highlightDocsCode(jsonText, "json");
      return [code, { jsonText, html }] as const;
    })
  );
  const responseSamples = Object.fromEntries(responseSamplesEntries);

  return (
    <div className="hidden shrink-0 xl:block xl:self-stretch w-full max-w-[400px] pt-1">
      <div className="top-24 sticky flex flex-col gap-4 w-full">
        <OpenApiRequestSamplesSticky
          operation={operation}
          snippets={requestSnippets}
        />
        {hasResponses ? (
          <OpenApiResponseSamplesSticky
            operation={operation}
            responseCodes={responseCodes}
            responseSamples={responseSamples}
          />
        ) : null}
      </div>
    </div>
  );
}
