import type { Json } from "@/lib/openapi/types";
import {
  asString,
  enumValues,
  getObjectProps,
  isRecord,
  resolveSchema,
} from "@/lib/openapi/schema-display";

const PREFERRED_MEDIA = [
  "application/json",
  "application/problem+json",
  "text/json",
] as const;

export function sortResponseCodes(codes: string[]): string[] {
  return [...codes].sort((a, b) => {
    const na = parseInt(a, 10);
    const nb = parseInt(b, 10);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) {
      return na - nb;
    }
    return a.localeCompare(b);
  });
}

function pickMediaType(keys: string[]): string | undefined {
  for (const pref of PREFERRED_MEDIA) {
    if (keys.includes(pref)) {
      return pref;
    }
  }
  return keys[0];
}

/**
 * Pretty-printed JSON sample for an OpenAPI response (example, examples.*, or mock from schema).
 */
export function getResponseSampleJsonString(
  docRoot: Json,
  responseBlock: Json | undefined
): string {
  if (!isRecord(responseBlock)) {
    return "// No response definition\n{}";
  }

  const content = isRecord(responseBlock.content)
    ? responseBlock.content
    : undefined;
  if (!content || Object.keys(content).length === 0) {
    const desc = asString(responseBlock.description);
    return desc
      ? `// ${desc.replace(/\n/g, "\n// ")}\n{}`
      : "// No response body\n{}";
  }

  const media = pickMediaType(Object.keys(content));
  if (!media) {
    return "{}";
  }

  const block = content[media];
  if (!isRecord(block)) {
    return "{}";
  }

  if (block.example !== undefined) {
    return JSON.stringify(block.example, null, 2);
  }

  const examples = block.examples;
  if (isRecord(examples)) {
    for (const v of Object.values(examples)) {
      if (isRecord(v) && v.value !== undefined) {
        return JSON.stringify(v.value, null, 2);
      }
      if (v !== undefined && !isRecord(v)) {
        return JSON.stringify(v, null, 2);
      }
    }
  }

  if (block.schema !== undefined) {
    const resolved = resolveSchema(docRoot, block.schema as Json);
    const mock = mockValueFromSchema(docRoot, resolved, 0);
    if (mock !== undefined) {
      return JSON.stringify(mock, null, 2);
    }
  }

  return "{}";
}

function mockValueFromSchema(
  docRoot: Json,
  schema: Json,
  depth: number
): Json | undefined {
  if (depth > 14) {
    return null;
  }
  if (!isRecord(schema)) {
    return undefined;
  }

  const resolved = resolveSchema(docRoot, schema);
  if (!isRecord(resolved)) {
    return undefined;
  }

  if (resolved.example !== undefined) {
    return resolved.example as Json;
  }

  const oneOf = resolved.oneOf;
  if (Array.isArray(oneOf) && oneOf.length > 0) {
    return mockValueFromSchema(docRoot, oneOf[0] as Json, depth + 1);
  }

  const anyOf = resolved.anyOf;
  if (Array.isArray(anyOf) && anyOf.length > 0) {
    return mockValueFromSchema(docRoot, anyOf[0] as Json, depth + 1);
  }

  const allOf = resolved.allOf;
  if (Array.isArray(allOf) && allOf.length > 0) {
    const merged: Record<string, Json> = {};
    for (const part of allOf) {
      const m = mockValueFromSchema(docRoot, part as Json, depth + 1);
      if (isRecord(m)) {
        Object.assign(merged, m);
      }
    }
    return Object.keys(merged).length > 0 ? merged : undefined;
  }

  const type = asString(resolved.type);
  const enums = enumValues(resolved);
  if (enums.length > 0) {
    return enums[0] as Json;
  }

  if (type === "string" || (!type && resolved.format)) {
    return asString(resolved.default) ?? "string";
  }
  if (type === "number" || type === "integer") {
    if (typeof resolved.example === "number") {
      return resolved.example;
    }
    if (typeof resolved.default === "number") {
      return resolved.default;
    }
    return 0;
  }
  if (type === "boolean") {
    return true;
  }

  if (type === "array" || resolved.items) {
    const items = resolved.items as Json | undefined;
    if (items) {
      const item = mockValueFromSchema(docRoot, items, depth + 1);
      return item !== undefined ? [item] : [];
    }
    return [];
  }

  if (
    type === "object" ||
    isRecord(resolved.properties) ||
    Array.isArray(resolved.required)
  ) {
    const { props, required } = getObjectProps(resolved);
    const out: Record<string, Json> = {};
    const keys = Object.keys(props);
    for (const key of keys) {
      const child = resolveSchema(docRoot, props[key] as Json);
      const req = required.has(key);
      const val = mockValueFromSchema(docRoot, child, depth + 1);
      if (val !== undefined) {
        out[key] = val;
      } else if (req) {
        out[key] = placeholderForRequired(child);
      }
    }
    return out;
  }

  return undefined;
}

function placeholderForRequired(schema: Json): Json {
  if (!isRecord(schema)) {
    return null;
  }
  const t = asString(schema.type);
  if (t === "string") {
    return "string";
  }
  if (t === "number" || t === "integer") {
    return 0;
  }
  if (t === "boolean") {
    return false;
  }
  if (t === "array") {
    return [];
  }
  return {};
}
