import type { Json, ParsedOpenApi, ParsedOperation } from "@/lib/openapi/types";
import { OpenApiOperationDocHeader } from "./OpenApiOperationHeader";
import { OpenApiOperationSecuritySection } from "./OpenApiOperationSecuritySection";
import { OpenApiOperationParametersSection } from "./OpenApiOperationParametersSection";
import { OpenApiOperationRequestBodySection } from "./OpenApiOperationRequestBodySection";
import { OpenApiOperationResponsesSection } from "./OpenApiOperationResponsesSection";
import { OpenApiOperationStickyColumn } from "./OpenApiOperationStickyColumn";

function isRecord(v: unknown): v is Record<string, Json> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

export async function OpenApiOperationDoc({
  doc,
  operation,
  tag,
}: {
  doc: ParsedOpenApi;
  operation: ParsedOperation;
  tag: string;
}) {
  const parameters = operation.parameters.filter(isRecord);
  const requestBody = isRecord(operation.requestBody)
    ? operation.requestBody
    : undefined;
  const requestContent = isRecord(requestBody?.content)
    ? requestBody.content
    : undefined;
  const responseCodes = Object.keys(operation.responses).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="flex flex-col flex-grow w-full xl:flex-row xl:items-stretch xl:justify-between">
      <article className="flex flex-col flex-grow min-w-0 w-full xl:max-w-[640px]">
        <OpenApiOperationDocHeader tag={tag} operation={operation} />

        <OpenApiOperationSecuritySection operation={operation} doc={doc} />

        <OpenApiOperationParametersSection parameters={parameters} doc={doc} />

        {requestContent ? (
          <OpenApiOperationRequestBodySection
            docRoot={doc.raw}
            requestContent={requestContent as Record<string, Json>}
          />
        ) : null}

        {responseCodes.length > 0 ? (
          <OpenApiOperationResponsesSection
            responseCodes={responseCodes}
            operation={operation}
            doc={doc}
          />
        ) : null}
      </article>

      <OpenApiOperationStickyColumn
        doc={doc}
        operation={operation}
        responseCodes={responseCodes}
      />
    </div>
  );
}
