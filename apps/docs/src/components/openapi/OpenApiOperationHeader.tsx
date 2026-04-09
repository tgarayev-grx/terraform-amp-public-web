import type { ParsedOperation } from "@/lib/openapi/types";
import { Fragment } from "react";
import { ApiReferenceMethodBadge } from "./ApiReferenceMethodBadge";

type OpenApiOperationDocHeaderProps = {
  tag: string;
  operation: ParsedOperation;
};

export const OpenApiOperationDocHeader = ({
  tag,
  operation,
}: OpenApiOperationDocHeaderProps) => {
  return (
    <header className="flex flex-col gap-2 mb-10">
      <p className="text-[11px]/[16px] text-text-soft-500 uppercase">{tag}</p>

      <h1 className="text-heading-h4 text-text-strong-1000">
        {operation.summary ?? operation.operationId}
      </h1>

      {operation.description && (
        <p className="text-body-sm-regular text-text-soft-500">
          {operation.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <ApiReferenceMethodBadge method={operation.method} />

        <code className="flex gap-0.5 text-body-sm-regular text-text-subtle-700">
          {operation.path.split("/").map((part, index, parts) => (
            <Fragment key={part}>
              <span>{part}</span>

              {index !== parts.length - 1 && <span>/</span>}
            </Fragment>
          ))}
        </code>
      </div>
    </header>
  );
};

OpenApiOperationDocHeader.displayName = "OpenApiOperationDocHeader";
