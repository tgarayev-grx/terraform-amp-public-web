import type { HttpMethod, Json, ParsedOpenApi, ParsedOperation } from "./types";
import { HTTP_METHODS } from "./types";

function isRecord(v: unknown): v is Record<string, Json> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function asJsonArray(v: unknown): Json[] {
  return Array.isArray(v) ? (v as Json[]) : [];
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function resolveServerUrl(server: Record<string, Json>): string | undefined {
  const template = asString(server.url);
  if (!template) return undefined;
  const vars = isRecord(server.variables) ? server.variables : undefined;
  return template.replace(/\{([^}]+)\}/g, (full, name: string) => {
    if (!vars) return full;
    const variable = vars[name];
    if (!isRecord(variable)) return full;
    const def = asString(variable.default);
    return def ?? full;
  });
}

function primaryTagName(tags: Json[] | undefined): string {
  if (!tags?.length) return "Other";
  for (const t of tags) {
    if (typeof t === "string" && t) return t;
    if (isRecord(t)) {
      const n = asString(t.name);
      if (n) return n;
    }
  }
  return "Other";
}

function defaultOperationId(method: HttpMethod, path: string): string {
  const safe = path.replace(/[/{}/]/g, "_").replace(/^_+|_+$/g, "") || "root";
  return `${method}_${safe}`;
}

/**
 * Parse an OpenAPI 3.x document into a structure suitable for our renderer.
 * No external schema validator — assumes valid JSON produced by your toolchain.
 */
export function parseOpenApiDocument(root: unknown): ParsedOpenApi {
  if (!isRecord(root)) {
    throw new Error("OpenAPI document must be a JSON object");
  }

  const openapi = asString(root.openapi);
  if (!openapi || !openapi.startsWith("3.")) {
    throw new Error('Expected OpenAPI 3.x (field "openapi" like "3.0.0")');
  }

  const infoRaw = root.info;
  if (!isRecord(infoRaw)) {
    throw new Error('Missing object "info"');
  }
  const title = asString(infoRaw.title) ?? "API";
  const version = asString(infoRaw.version) ?? "";
  const description = asString(infoRaw.description);

  const servers: { url: string; description?: string }[] = [];
  const serversRaw = root.servers;
  if (Array.isArray(serversRaw)) {
    for (const s of serversRaw) {
      if (!isRecord(s)) continue;
      const url = resolveServerUrl(s);
      if (url) {
        servers.push({
          url,
          description: asString(s.description),
        });
      }
    }
  }

  const pathsRaw = root.paths;
  if (!isRecord(pathsRaw)) {
    throw new Error('Missing object "paths"');
  }

  const tagOrderFromSpec: string[] = [];
  const tagsBlock = root.tags;
  if (Array.isArray(tagsBlock)) {
    for (const t of tagsBlock) {
      if (!isRecord(t)) continue;
      const n = asString(t.name);
      if (n) tagOrderFromSpec.push(n);
    }
  }

  const operationsByTag: Record<string, ParsedOperation[]> = {};
  const tagSeen = new Set<string>();

  for (const [path, pathItem] of Object.entries(pathsRaw)) {
    if (!isRecord(pathItem)) continue;

    for (const method of HTTP_METHODS) {
      const opRaw = pathItem[method];
      if (!isRecord(opRaw)) continue;

      const operationId =
        asString(opRaw.operationId) ?? defaultOperationId(method, path);
      const summary = asString(opRaw.summary);
      const description = asString(opRaw.description);
      const tag = primaryTagName(asJsonArray(opRaw.tags as unknown[]));
      const parameters = asJsonArray(opRaw.parameters as unknown[]);
      const requestBody = isRecord(opRaw.requestBody)
        ? (opRaw.requestBody as Json)
        : undefined;
      const responses = isRecord(opRaw.responses)
        ? (opRaw.responses as Record<string, Json>)
        : {};
      const security = Array.isArray(opRaw.security)
        ? (opRaw.security as Json[])
        : undefined;

      const op: ParsedOperation = {
        operationId,
        method,
        path,
        summary,
        description,
        tags: [tag],
        parameters,
        requestBody,
        responses,
        security,
      };

      tagSeen.add(tag);
      if (!operationsByTag[tag]) operationsByTag[tag] = [];
      operationsByTag[tag].push(op);
    }
  }

  const extraTags = [...tagSeen].filter((t) => !tagOrderFromSpec.includes(t));
  extraTags.sort();
  const tagsInOrder = [
    ...tagOrderFromSpec.filter((t) => tagSeen.has(t)),
    ...extraTags,
  ];

  for (const tag of tagsInOrder) {
    operationsByTag[tag]?.sort((a, b) => {
      const ap = a.path.localeCompare(b.path);
      if (ap !== 0) return ap;
      return a.method.localeCompare(b.method);
    });
  }

  const components: Json = isRecord(root.components)
    ? (root.components as Json)
    : {};

  return {
    openapi,
    info: { title, version, description },
    servers,
    tagsInOrder,
    operationsByTag,
    components,
    raw: root as Json,
  };
}

export function parseOpenApiJsonString(json: string): ParsedOpenApi {
  let data: unknown;
  try {
    data = JSON.parse(json) as unknown;
  } catch {
    throw new Error("Invalid JSON");
  }
  return parseOpenApiDocument(data);
}
