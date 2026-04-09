import type { Json, ParsedOpenApi } from "@/lib/openapi/types";

import { OpenApiOperationChip } from "./OpenApiOperationDocChip";
import {
  enumValues,
  resolveSchema,
  typeChipLabel,
} from "@/lib/openapi/schema-display";

function isRecord(v: unknown): v is Record<string, Json> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

type Props = {
  parameters: Record<string, Json>[];
  doc: ParsedOpenApi;
};

export function OpenApiOperationParametersSection({ parameters, doc }: Props) {
  const groupedParameters = parameters.reduce<
    Record<string, Record<string, Json>[]>
  >((acc, param) => {
    const key = asString(param.in) ?? "other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(param);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedParameters).map(([location, params]) => (
        <section className="mb-10" key={location}>
          <h2 className="border-stroke-soft-200 pb-3 border-b text-text-strong-1000 text-title-md-semibold">
            {capitalize(location)} Parameters
          </h2>

          <div>
            {params.map((param, i) => {
              const schema = isRecord(param.schema) ? param.schema : undefined;
              const resolvedSchema = schema
                ? resolveSchema(doc.raw, schema)
                : undefined;
              const schemaEnums = resolvedSchema
                ? enumValues(resolvedSchema)
                : [];

              return (
                <div
                  key={`${asString(param.name) ?? "param"}-${location}-${i}`}
                  className="flex flex-col gap-4 border-stroke-soft-200 py-6 border-b"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <code className="font-fira-code font-medium text-[14px]/[20px] text-text-strong-1000">
                      {asString(param.name) ?? "—"}
                    </code>

                    {resolvedSchema ? (
                      <OpenApiOperationChip variant="text">
                        {typeChipLabel(doc.raw, resolvedSchema)}
                      </OpenApiOperationChip>
                    ) : null}

                    {param.required ? (
                      <OpenApiOperationChip variant="danger">
                        required
                      </OpenApiOperationChip>
                    ) : null}
                  </div>

                  {schemaEnums.length ? (
                    <p className="text-body-md-regular text-text-subtle-700">
                      Available options:{" "}
                      <span className="inline-flex flex-wrap items-center gap-1.5">
                        {schemaEnums.map((value, index, values) => (
                          <span
                            key={value}
                            className="inline-flex items-center gap-0.5"
                          >
                            <OpenApiOperationChip variant="text">
                              {value}
                            </OpenApiOperationChip>
                            {index !== values.length - 1 ? (
                              <span className="text-body-md-regular text-text-subtle-700">
                                {", "}
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </span>
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
