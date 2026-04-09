import type { Json } from "./types";

function isRecord(v: unknown): v is Record<string, Json> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/** Decode JSON Pointer token (~1 -> /, ~0 -> ~) */
function decodeToken(s: string): string {
  return s.replace(/~1/g, "/").replace(/~0/g, "~");
}

/**
 * Resolve a local JSON Pointer against a document root (e.g. `#/components/schemas/Foo`).
 */
export function resolveJsonPointer(root: Json, pointer: string): Json | null {
  if (!pointer.startsWith("#/")) return null;
  const parts = pointer.slice(2).split("/").map(decodeToken);
  let cur: Json = root;
  for (const p of parts) {
    if (!isRecord(cur) || !(p in cur)) return null;
    cur = cur[p] as Json;
  }
  return cur;
}

export function refDisplayName(pointer: string): string {
  if (!pointer.startsWith("#/")) return pointer;
  const tail = pointer.slice(2).split("/").pop();
  return tail ? decodeToken(tail) : pointer;
}
