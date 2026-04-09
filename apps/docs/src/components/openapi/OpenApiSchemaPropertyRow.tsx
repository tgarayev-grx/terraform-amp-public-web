"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { OpenApiOperationChip } from "./OpenApiOperationDocChip";

export type OpenApiSchemaPropertyRowProps = {
  name: string;
  typeChip: string;
  required: boolean;
  enums: string[];
  example?: string;
  description?: string;
  exampleVariant: "code" | "chip";
  children?: ReactNode;
  className?: string;
};

export function OpenApiSchemaPropertyRow({
  name,
  typeChip,
  required,
  enums,
  example,
  description,
  exampleVariant,
  children,
  className,
}: OpenApiSchemaPropertyRowProps) {
  return (
    <div
      className={clsx(
        "border-stroke-soft-200 py-4 last:border-0 border-b",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <code className="font-fira-code font-medium text-[14px]/[20px] text-text-strong-1000">
          {name}
        </code>

        <OpenApiOperationChip variant="text">{typeChip}</OpenApiOperationChip>

        {required ? (
          <OpenApiOperationChip variant="danger">required</OpenApiOperationChip>
        ) : null}
      </div>

      {enums.length ? (
        <div className="text-body-md-regular text-text-subtle-700">
          Available options:{" "}
          <span className="inline-flex flex-wrap items-center gap-1.5">
            {enums.map((v) => (
              <OpenApiOperationChip key={v} variant="text">
                {v}
              </OpenApiOperationChip>
            ))}
          </span>
        </div>
      ) : null}

      {!!description && (
        <p className="text-body-md-regular text-text-subtle-700">
          {description}
        </p>
      )}

      {!!example && (
        <div className="text-body-md-regular text-text-subtle-700">
          Example:{" "}
          {exampleVariant === "chip" ? (
            <OpenApiOperationChip variant="text">
              {example}
            </OpenApiOperationChip>
          ) : (
            <code className="font-mono text-text-subtle-700">{example}</code>
          )}
        </div>
      )}

      {children ? <div className="">{children}</div> : null}
    </div>
  );
}

OpenApiSchemaPropertyRow.displayName = "OpenApiSchemaPropertyRow";
