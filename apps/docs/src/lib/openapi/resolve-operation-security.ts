import type { Json, ParsedOpenApi, ParsedOperation } from "./types";

function isRecord(v: unknown): v is Record<string, Json> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

export type ResolvedSecurityScheme = {
  key: string;
  required: boolean;
  type?: string;
  description?: string;
  in?: string;
  name?: string;
  scheme?: string;
  bearerFormat?: string;
  openIdConnectUrl?: string;
  scopes?: string[];
};

export function resolveOperationSecurity(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): ResolvedSecurityScheme[] {
  const opSecurity = operation.security;
  const globalSecurity =
    isRecord(doc.raw) && Array.isArray(doc.raw.security)
      ? (doc.raw.security as Json[])
      : undefined;
  const security: Json[] | undefined = opSecurity ?? globalSecurity;

  const required = Array.isArray(security) && security.length > 0;
  if (!required) return [];

  const components = doc.components;
  const schemesRoot =
    isRecord(components) && isRecord(components.securitySchemes)
      ? components.securitySchemes
      : undefined;

  const out: ResolvedSecurityScheme[] = [];

  for (const entry of security) {
    if (!isRecord(entry)) continue;
    for (const [key, scopesVal] of Object.entries(entry)) {
      const scopes = Array.isArray(scopesVal)
        ? (scopesVal.filter((s) => typeof s === "string") as string[])
        : undefined;

      const schemeRaw = schemesRoot ? schemesRoot[key] : undefined;
      if (isRecord(schemeRaw)) {
        out.push({
          key,
          required: true,
          type: asString(schemeRaw.type),
          description: asString(schemeRaw.description),
          in: asString(schemeRaw.in),
          name: asString(schemeRaw.name),
          scheme: asString(schemeRaw.scheme),
          bearerFormat: asString(schemeRaw.bearerFormat),
          openIdConnectUrl: asString(schemeRaw.openIdConnectUrl),
          scopes,
        });
      } else {
        out.push({ key, required: true, scopes });
      }
    }
  }

  out.sort((a, b) => {
    const rank = (s: ResolvedSecurityScheme) =>
      s.type === "apiKey"
        ? 0
        : s.type === "http"
          ? 1
          : s.type === "oauth2"
            ? 2
            : 3;
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    return a.key.localeCompare(b.key);
  });

  return out;
}
