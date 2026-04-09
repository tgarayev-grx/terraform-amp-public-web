import type { Json } from "@/lib/openapi/types";
import { refDisplayName, resolveJsonPointer } from "@/lib/openapi/json-pointer";

function isRecord(v: unknown): v is Record<string, Json> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

const MAX_DEPTH = 14;

type OpenApiSchemaProps = {
  /** Full OpenAPI document root (for $ref) */
  docRoot: Json;
  schema: Json;
  depth?: number;
  /** Pointers already visited (cycle guard) */
  visitedRefs?: Set<string>;
  /** If true, don't show custom $ref names, only resolved shapes */
  hideRefNames?: boolean;
};

export function OpenApiSchema({
  docRoot,
  schema,
  depth = 0,
  visitedRefs = new Set(),
  hideRefNames = false,
}: OpenApiSchemaProps) {
  if (depth > MAX_DEPTH) {
    return <span className="text-xs text-neutral-500 italic">… max depth</span>;
  }

  if (schema === null || schema === undefined) {
    return <span className="text-neutral-500">—</span>;
  }

  if (!isRecord(schema)) {
    return (
      <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-xs text-gold-300">
        {JSON.stringify(schema)}
      </code>
    );
  }

  const ref = asString(schema.$ref);
  if (ref) {
    if (visitedRefs.has(ref)) {
      if (hideRefNames) {
        return (
          <span className="text-xs text-neutral-500 italic">
            Circular object
          </span>
        );
      }
      return (
        <span className="text-xs text-neutral-500 italic">
          Circular {refDisplayName(ref)}
        </span>
      );
    }
    visitedRefs.add(ref);
    const resolved = resolveJsonPointer(docRoot, ref);
    if (!resolved) {
      if (hideRefNames) {
        return <span className="text-xs text-neutral-500">object</span>;
      }
      return (
        <code className="text-xs text-neutral-400">{refDisplayName(ref)}</code>
      );
    }
    if (hideRefNames) {
      return (
        <OpenApiSchema
          docRoot={docRoot}
          schema={resolved}
          depth={depth + 1}
          visitedRefs={visitedRefs}
          hideRefNames={hideRefNames}
        />
      );
    }
    return (
      <span className="space-y-2">
        <code className="text-xs text-gold-400">{refDisplayName(ref)}</code>
        <OpenApiSchema
          docRoot={docRoot}
          schema={resolved}
          depth={depth + 1}
          visitedRefs={visitedRefs}
          hideRefNames={hideRefNames}
        />
      </span>
    );
  }

  const allOf = schema.allOf;
  if (Array.isArray(allOf) && allOf.length) {
    return (
      <div className="space-y-3 border-l-2 border-neutral-700 pl-3">
        <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          All of
        </div>
        {allOf.map((sub, i) => (
          <OpenApiSchema
            key={i}
            docRoot={docRoot}
            schema={sub as Json}
            depth={depth + 1}
            visitedRefs={new Set(visitedRefs)}
            hideRefNames={hideRefNames}
          />
        ))}
      </div>
    );
  }

  const oneOf = schema.oneOf;
  if (Array.isArray(oneOf) && oneOf.length) {
    return (
      <div className="space-y-2 border-l-2 border-neutral-700 pl-3">
        <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          One of
        </div>
        <ul className="list-inside list-decimal space-y-2 text-sm">
          {oneOf.map((sub, i) => (
            <li key={i}>
              <OpenApiSchema
                docRoot={docRoot}
                schema={sub as Json}
                depth={depth + 1}
                visitedRefs={new Set(visitedRefs)}
                hideRefNames={hideRefNames}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const anyOf = schema.anyOf;
  if (Array.isArray(anyOf) && anyOf.length) {
    return (
      <div className="space-y-2 border-l-2 border-neutral-700 pl-3">
        <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Any of
        </div>
        <ul className="list-inside list-decimal space-y-2 text-sm">
          {anyOf.map((sub, i) => (
            <li key={i}>
              <OpenApiSchema
                docRoot={docRoot}
                schema={sub as Json}
                depth={depth + 1}
                visitedRefs={new Set(visitedRefs)}
                hideRefNames={hideRefNames}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const type = asString(schema.type);
  const format = asString(schema.format);
  const enumVals = schema.enum;

  if (Array.isArray(enumVals) && enumVals.length) {
    return (
      <span className="text-sm text-neutral-300">
        <span className="text-neutral-500">enum</span>{" "}
        {enumVals.map((v, i) => (
          <code
            key={i}
            className="mx-0.5 rounded bg-neutral-850 px-1 py-0.5 text-xs text-gold-300"
          >
            {JSON.stringify(v)}
          </code>
        ))}
      </span>
    );
  }

  if (type === "array") {
    const items = schema.items;
    return (
      <div className="text-sm">
        <span className="text-neutral-500">array</span>
        {items ? (
          <div className="mt-1 pl-3">
            <OpenApiSchema
              docRoot={docRoot}
              schema={items as Json}
              depth={depth + 1}
              visitedRefs={new Set(visitedRefs)}
              hideRefNames={hideRefNames}
            />
          </div>
        ) : null}
      </div>
    );
  }

  if (type === "object" || schema.properties) {
    const props = isRecord(schema.properties) ? schema.properties : {};
    const required = Array.isArray(schema.required)
      ? new Set(
          schema.required.filter((x) => typeof x === "string") as string[]
        )
      : new Set<string>();

    const keys = Object.keys(props);
    if (!keys.length) {
      return (
        <span className="text-sm text-neutral-500">
          object
          {schema.additionalProperties ? " (+ additional properties)" : ""}
        </span>
      );
    }

    return (
      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900/80">
              <th className="px-3 py-2 font-medium text-neutral-400">Field</th>
              <th className="px-3 py-2 font-medium text-neutral-400">Type</th>
              <th className="px-3 py-2 font-medium text-neutral-400">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => {
              const child = props[key] as Json;
              return (
                <tr
                  key={key}
                  className="border-b border-neutral-850 last:border-0"
                >
                  <td className="px-3 py-2 align-top font-mono text-xs text-gold-300">
                    {key}
                    {required.has(key) ? (
                      <span className="ml-1 text-red-400">*</span>
                    ) : null}
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-neutral-400">
                    {schemaTypeHint(docRoot, child, hideRefNames)}
                  </td>
                  <td className="px-3 py-2 align-top text-xs text-neutral-300">
                    {isRecord(child) && asString(child.description) ? (
                      <p className="mb-1 text-neutral-400">
                        {child.description as string}
                      </p>
                    ) : null}
                    <OpenApiSchema
                      docRoot={docRoot}
                      schema={child}
                      depth={depth + 1}
                      visitedRefs={new Set(visitedRefs)}
                      hideRefNames={hideRefNames}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  const bits: string[] = [];
  if (type) bits.push(type);
  if (format) bits.push(format);
  if (schema.nullable === true) bits.push("nullable");
  const example = schema.example;
  return (
    <span className="text-sm text-neutral-300">
      {bits.length ? (
        <code className="rounded bg-neutral-850 px-1.5 py-0.5 text-xs">
          {bits.join(" · ")}
        </code>
      ) : (
        <span className="text-neutral-500 italic">schema</span>
      )}
      {example !== undefined ? (
        <span className="ml-2 text-xs text-neutral-500">
          e.g. <code>{JSON.stringify(example)}</code>
        </span>
      ) : null}
    </span>
  );
}

function schemaTypeHint(
  docRoot: Json,
  schema: Json,
  hideRefNames: boolean
): string {
  if (!isRecord(schema)) return "";
  const ref = asString(schema.$ref);
  if (ref) {
    if (!hideRefNames) return refDisplayName(ref);
    const resolved = resolveJsonPointer(docRoot, ref);
    if (resolved) return schemaTypeHint(docRoot, resolved, hideRefNames);
    return "object";
  }
  const t = asString(schema.type);
  if (t === "array") {
    const items = schema.items;
    if (isRecord(items)) {
      const ir = asString(items.$ref);
      if (ir) {
        if (!hideRefNames) return `array of ${refDisplayName(ir)}`;
        const resolved = resolveJsonPointer(docRoot, ir);
        if (isRecord(resolved)) {
          if (resolved.properties || asString(resolved.type) === "object") {
            return "array of objects";
          }
          const rt = asString(resolved.type);
          return rt ? `array of ${rt}` : "array";
        }
        return "array";
      }
      return `array of ${asString(items.type) ?? "items"}`;
    }
    return "array";
  }
  if (schema.properties) return "object";
  const parts: string[] = [];
  if (t) parts.push(t);
  const f = asString(schema.format);
  if (f) parts.push(f);
  if (schema.enum) parts.push("enum");
  return parts.join(" · ") || "object";
}

export function schemaSummaryLine(docRoot: Json, schema: Json): string {
  if (!isRecord(schema)) return "";
  const ref = asString(schema.$ref);
  if (ref) return refDisplayName(ref);
  const t = asString(schema.type);
  if (t === "array") {
    const items = schema.items;
    if (isRecord(items)) {
      const inner = schemaSummaryLine(docRoot, items as Json);
      return inner ? `array<${inner}>` : "array";
    }
    return "array";
  }
  if (schema.properties || t === "object") return "object";
  const f = asString(schema.format);
  if (t === "string" && f) return `string<${f}>`;
  const parts: string[] = [];
  if (t) parts.push(t);
  if (f) parts.push(f);
  return parts.join(" ") || "";
}
