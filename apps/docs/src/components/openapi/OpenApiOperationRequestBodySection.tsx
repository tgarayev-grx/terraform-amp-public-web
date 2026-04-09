"use client";

import type { Json } from "@/lib/openapi/types";

import { OpenApiSchemaPropertyRow } from "./OpenApiSchemaPropertyRow";
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
import { Fragment } from "react";

function rootSchemaForFields(docRoot: Json, schema: Json): Json {
  const resolved = resolveSchema(docRoot, schema);
  if (!isRecord(resolved)) return resolved;

  const type = asString(resolved.type);
  if ((type === "array" || resolved.items) && resolved.items) {
    return resolveSchema(docRoot, resolved.items as Json);
  }
  return resolved;
}

type Props = {
  docRoot: Json;
  requestContent: Record<string, Json>;
};

export function OpenApiOperationRequestBodySection({
  docRoot,
  requestContent,
}: Props) {
  return (
    <section className="mb-10">
      <h2 className="border-stroke-soft-200 pb-3 border-b text-text-strong-1000 text-title-md-semibold">
        Request Body
      </h2>

      <div className="">
        {Object.entries(requestContent).map(([media, body]) => {
          if (!isRecord(body) || !body.schema) return null;
          const resolvedSchema = resolveSchema(docRoot, body.schema as Json);
          const rootForFields = rootSchemaForFields(
            docRoot,
            body.schema as Json
          );
          const { props, required } = getObjectProps(rootForFields);
          const keys = Object.keys(props);

          return (
            <Fragment key={media}>
              {keys.length ? (
                <>
                  {keys.map((key) => {
                    const child = props[key] as Json;
                    const childResolved = resolveSchema(docRoot, child);
                    const requiredField = required.has(key);
                    const childHasChildren = schemaHasChildren(childResolved);

                    return (
                      <OpenApiSchemaPropertyRow
                        className="flex flex-col gap-4 py-6"
                        key={key}
                        name={key}
                        typeChip={typeChipLabel(docRoot, childResolved)}
                        required={requiredField}
                        enums={enumValues(childResolved)}
                        example={schemaExample(childResolved)}
                        description={schemaDescription(childResolved)}
                        exampleVariant="code"
                      >
                        {childHasChildren ? (
                          <OpenApiSchemaAccordion
                            docRoot={docRoot}
                            schema={childResolved}
                            depth={1}
                            namePrefix={key}
                            required={requiredField}
                          />
                        ) : null}
                      </OpenApiSchemaPropertyRow>
                    );
                  })}
                </>
              ) : (
                <OpenApiSchemaAccordion
                  docRoot={docRoot}
                  schema={resolvedSchema}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
