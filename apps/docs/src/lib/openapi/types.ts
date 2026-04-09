/** Loose JSON value from OpenAPI / JSON Schema documents */
export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options"
  | "trace";

export const HTTP_METHODS: readonly HttpMethod[] = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "trace",
] as const;

export type ParsedOperation = {
  operationId: string;
  method: HttpMethod;
  path: string;
  summary?: string;
  description?: string;
  tags: string[];
  parameters: Json[];
  requestBody?: Json;
  responses: Record<string, Json>;
  security?: Json[];
};

export type ParsedOpenApi = {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers: { url: string; description?: string }[];
  /** Tag names in display order */
  tagsInOrder: string[];
  operationsByTag: Record<string, ParsedOperation[]>;
  /** Raw `components` for $ref resolution */
  components: Json;
  /** Original document root (for JSON Pointer $ref) */
  raw: Json;
};
