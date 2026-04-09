"use client";

import type { Json, ParsedOpenApi, ParsedOperation } from "@/lib/openapi/types";

import {
  asString,
  enumValues,
  getObjectProps,
  isRecord,
  resolveSchema,
  schemaDescription,
  schemaExample,
  schemaHasChildren,
  typeChipLabel,
} from "@/lib/openapi/schema-display";
import { OpenApiSchemaAccordion } from "./OpenApiSchemaAccordion";
import { ReactNode, useState } from "react";
import { OpenApiSchemaPropertyRow } from "./OpenApiSchemaPropertyRow";
import { SingleSelect } from "@grx/ui/components/select/Select";

function hasChildren(schema: Json): boolean {
  return schemaHasChildren(schema);
}

type OpenApiOperationResponsesSectionProps = {
  responseCodes: string[];
  operation: ParsedOperation;
  doc: ParsedOpenApi;
};

export function OpenApiOperationResponsesSection({
  responseCodes,
  operation,
  doc,
}: OpenApiOperationResponsesSectionProps) {
  const [responseCode, setResponseCode] = useState(responseCodes[0]);

  const res = operation.responses[responseCode];

  if (!isRecord(res)) {
    return (
      <section>
        <OpenApiOperationResponsesSectionHeader
          responseCodes={responseCodes}
          responseCode={responseCode}
          setResponseCode={setResponseCode}
        />
      </section>
    );
  }
  const content = isRecord(res.content) ? res.content : undefined;
  const mediaEntries = content ? Object.entries(content) : [];

  return (
    <section>
      <OpenApiOperationResponsesSectionHeader
        responseCodes={responseCodes}
        responseCode={responseCode}
        setResponseCode={setResponseCode}
        append={
          <span className="text-body-md-regular text-text-subtle-700">
            {mediaEntries.at(0)?.[0]}
          </span>
        }
      />

      <div className="">
        {mediaEntries.length > 0 ? (
          <div className="">
            {mediaEntries.map(([media, block]) => {
              if (!isRecord(block) || !block.schema) return null;
              const resolvedSchema = resolveSchema(
                doc.raw,
                block.schema as Json
              );

              let rootForFields = resolvedSchema;
              if (isRecord(resolvedSchema)) {
                const type = asString(resolvedSchema.type);
                if (
                  (type === "array" || resolvedSchema.items) &&
                  resolvedSchema.items
                ) {
                  rootForFields = resolveSchema(
                    doc.raw,
                    resolvedSchema.items as Json
                  );
                }
              }

              const { props, required } = getObjectProps(rootForFields);
              const keys = Object.keys(props);
              if (!keys.length) {
                return (
                  <OpenApiSchemaAccordion
                    key={media}
                    docRoot={doc.raw}
                    schema={resolvedSchema}
                  />
                );
              }

              return keys.map((key) => {
                const child = props[key] as Json;
                const childResolved = resolveSchema(doc.raw, child);
                const desc = schemaDescription(childResolved);
                const enums = enumValues(childResolved);
                const typeLabel = typeChipLabel(doc.raw, childResolved);
                const requiredField = required.has(key);
                const childHasChildren = hasChildren(childResolved);

                return (
                  <OpenApiSchemaPropertyRow
                    key={key}
                    name={key}
                    typeChip={typeLabel}
                    required={requiredField}
                    enums={enums}
                    example={schemaExample(childResolved)}
                    description={desc}
                    exampleVariant="code"
                    className="flex flex-col gap-4 py-6 last:border-0"
                  >
                    {childHasChildren ? (
                      <OpenApiSchemaAccordion
                        docRoot={doc.raw}
                        schema={childResolved}
                        depth={1}
                        namePrefix={key}
                        required={requiredField}
                      />
                    ) : null}
                  </OpenApiSchemaPropertyRow>
                );
              });
            })}
          </div>
        ) : (
          <div className="px-3 py-3 border-neutral-800 border-t text-neutral-500 text-xs">
            No response body schema.
          </div>
        )}
      </div>
    </section>
  );
}

type OpenApiOperationResponsesSectionHeaderProps = {
  responseCodes: string[];
  responseCode: string;
  setResponseCode: (code: string) => void;

  append?: ReactNode;
};

const OpenApiOperationResponsesSectionHeader = ({
  responseCodes,
  responseCode,
  setResponseCode,
  append,
}: OpenApiOperationResponsesSectionHeaderProps) => {
  return (
    <div className="flex justify-between items-center gap-2 border-stroke-soft-200 border-b">
      <h2 className="pb-3 text-text-strong-1000 text-title-md-semibold">
        Responses
      </h2>

      <div className="flex items-center gap-2">
        <SingleSelect
          value={responseCode}
          onValueChange={setResponseCode}
          size="sm"
        >
          <SingleSelect.Trigger variant="inline" />
          <SingleSelect.Content>
            {responseCodes.map((code) => (
              <SingleSelect.Item key={code} value={code}>
                {code}
              </SingleSelect.Item>
            ))}
          </SingleSelect.Content>
        </SingleSelect>

        {append}
      </div>
    </div>
  );
};

OpenApiOperationResponsesSectionHeader.displayName =
  "OpenApiOperationResponsesSectionHeader";
