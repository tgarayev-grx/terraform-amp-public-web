import type { Json } from "@/lib/openapi/types";
import { resolveJsonPointer } from "@/lib/openapi/json-pointer";
import { schemaSummaryLine } from "@/components/openapi/OpenApiSchema";

export function isRecord(v: unknown): v is Record<string, Json> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

export function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

export function resolveSchema(docRoot: Json, schema: Json, depth = 0): Json {
  if (!isRecord(schema) || depth > 10) return schema;
  const ref = asString(schema.$ref);
  if (!ref) return schema;
  const resolved = resolveJsonPointer(docRoot, ref);
  if (!resolved) return schema;
  return resolveSchema(docRoot, resolved, depth + 1);
}

export function hasObjectShape(schema: Record<string, Json>): boolean {
  return asString(schema.type) === "object" || schema.properties !== undefined;
}

export function hasArrayShape(schema: Record<string, Json>): boolean {
  return asString(schema.type) === "array" || schema.items !== undefined;
}

export function enumValues(schema: Json): string[] {
  if (!isRecord(schema) || !Array.isArray(schema.enum)) return [];
  return schema.enum.filter((v) => typeof v === "string") as string[];
}

export function schemaDescription(schema: Json): string | undefined {
  return isRecord(schema) ? asString(schema.description) : undefined;
}

export function schemaExample(schema: Json): string | undefined {
  return isRecord(schema) && schema.example !== undefined
    ? JSON.stringify(schema.example)
    : undefined;
}

export function schemaHasChildren(schema: Json): boolean {
  return (
    isRecord(schema) &&
    ((hasObjectShape(schema) &&
      isRecord(schema.properties) &&
      Object.keys(schema.properties).length > 0) ||
      (hasArrayShape(schema) && schema.items !== undefined))
  );
}

export function getObjectProps(schema: Json): {
  props: Record<string, Json>;
  required: Set<string>;
} {
  if (!isRecord(schema)) return { props: {}, required: new Set() };
  const props = isRecord(schema.properties)
    ? (schema.properties as Record<string, Json>)
    : {};
  const required = Array.isArray(schema.required)
    ? new Set(schema.required.filter((x) => typeof x === "string") as string[])
    : new Set<string>();
  return { props, required };
}

export function typeChipLabel(docRoot: Json, schema: Json): string {
  if (!isRecord(schema)) return "schema";

  const type = asString(schema.type);
  const nullable = schema.nullable === true;

  if (type === "array" || schema.items) {
    const items = schema.items as Json | undefined;
    if (items) {
      const resolvedItems = resolveSchema(docRoot, items);
      if (isRecord(resolvedItems)) {
        const it = asString(resolvedItems.type);
        if (it === "object" || resolvedItems.properties) return "object[]";
        if (it) return `${it}[]`;
      }
    }
    return "array";
  }

  const base =
    type === "string" && asString(schema.format)
      ? `string<${asString(schema.format)}>`
      : schemaSummaryLine(docRoot, schema) || "schema";

  const withEnum =
    Array.isArray(schema.enum) && schema.enum.length > 0
      ? `enum<${base}>`
      : base;

  return nullable ? `${withEnum} | null` : withEnum;
}
