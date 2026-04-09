"use client";

import type { Json } from "@/lib/openapi/types";
import {
  OpenApiAccordionContent,
  OpenApiAccordionItem,
  OpenApiAccordionRoot,
  OpenApiAccordionTrigger,
} from "./OpenApiAccordion";
import { OpenApiSchemaPropertyRow } from "./OpenApiSchemaPropertyRow";
import { OpenApiOperationChip } from "./OpenApiOperationDocChip";
import {
  asString,
  enumValues,
  getObjectProps,
  hasArrayShape,
  hasObjectShape,
  isRecord,
  resolveSchema,
  schemaDescription,
  schemaExample,
  schemaHasChildren,
  typeChipLabel,
} from "@/lib/openapi/schema-display";

type Props = {
  docRoot: Json;
  schema: Json;
  depth?: number;
  /** Optional prefix for nested field names (e.g. "data") */
  namePrefix?: string;
  /** Marks this schema as required in parent */
  required?: boolean;
};

export function OpenApiSchemaAccordion({
  docRoot,
  schema,
  depth = 0,
  namePrefix,
  required,
}: Props) {
  if (depth > 12) {
    return <div className="text-text-subtle-700 text-xs">…</div>;
  }

  const resolved = resolveSchema(docRoot, schema);
  const name = namePrefix ?? "";
  const isRequired = required === true;

  if (!isRecord(resolved)) {
    return (
      <div className="bg-bg-weak-100/20 border-stroke-soft-200 px-4 py-3 border rounded-lg">
        {!!name && (
          <div className="flex flex-wrap items-center gap-2">
            <code className="font-fira-code font-medium text-[14px]/[20px] text-text-strong-1000">
              {name}
            </code>

            {isRequired && (
              <OpenApiOperationChip variant="danger">
                required
              </OpenApiOperationChip>
            )}
          </div>
        )}

        <code className="block mt-1 text-text-subtle-700 text-xs">
          {JSON.stringify(resolved)}
        </code>
      </div>
    );
  }

  const hasChildren =
    (hasObjectShape(resolved) &&
      isRecord(resolved.properties) &&
      Object.keys(resolved.properties).length > 0) ||
    (hasArrayShape(resolved) && resolved.items !== undefined);

  const resolvedForChildren = (() => {
    // For arrays of objects, children should come from items' object shape
    if (hasArrayShape(resolved)) {
      const items = resolved.items as Json | undefined;
      if (items) return resolveSchema(docRoot, items);
    }
    return resolved;
  })();

  const { props, required: requiredSet } = getObjectProps(resolvedForChildren);

  // Root (depth 0) should show rows immediately (no accordions at this level).
  if (depth === 0) {
    return (
      <div className="border-stroke-base-300 border rounded-lg">
        <div className="px-4 py-2">
          {Object.keys(props).map((key) => {
            const child = props[key] as Json;
            const childResolved = resolveSchema(docRoot, child);

            return (
              <OpenApiSchemaPropertyRow
                key={key}
                name={key}
                typeChip={typeChipLabel(docRoot, childResolved)}
                required={requiredSet.has(key)}
                enums={enumValues(childResolved)}
                example={schemaExample(childResolved)}
                description={schemaDescription(childResolved)}
                exampleVariant="code"
              >
                {schemaHasChildren(childResolved) ? (
                  <OpenApiSchemaAccordion
                    docRoot={docRoot}
                    schema={childResolved}
                    depth={depth + 1}
                    namePrefix={key}
                    required={requiredSet.has(key)}
                  />
                ) : null}
              </OpenApiSchemaPropertyRow>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="border-stroke-base-300 border rounded-lg">
      {hasChildren && (
        <div className="px-4 py-3">
          <OpenApiAccordionRoot>
            <OpenApiAccordionItem value="children">
              <OpenApiAccordionTrigger className="px-0 py-0">
                Show child attributes
              </OpenApiAccordionTrigger>

              <OpenApiAccordionContent className="pt-3">
                <div className="border-stroke-base-300 border-t">
                  {Object.keys(props).map((key) => {
                    const child = props[key] as Json;
                    const childResolved = resolveSchema(docRoot, child);
                    const childName = name ? `${name}.${key}` : key;

                    return (
                      <OpenApiSchemaPropertyRow
                        key={childName}
                        name={childName}
                        typeChip={typeChipLabel(docRoot, childResolved)}
                        required={requiredSet.has(key)}
                        enums={enumValues(childResolved)}
                        example={schemaExample(childResolved)}
                        description={schemaDescription(childResolved)}
                        exampleVariant="chip"
                        className="flex flex-col gap-4 border-stroke-base-300 py-6 last:border-0 border-b"
                      >
                        {schemaHasChildren(childResolved) ? (
                          <OpenApiSchemaAccordion
                            docRoot={docRoot}
                            schema={childResolved}
                            depth={depth + 1}
                            namePrefix={childName}
                            required={requiredSet.has(key)}
                          />
                        ) : null}
                      </OpenApiSchemaPropertyRow>
                    );
                  })}
                </div>
              </OpenApiAccordionContent>
            </OpenApiAccordionItem>
          </OpenApiAccordionRoot>
        </div>
      )}
    </div>
  );
}

OpenApiSchemaAccordion.displayName = "OpenApiSchemaAccordion";
