import type { Json, ParsedOpenApi, ParsedOperation } from "@/lib/openapi/types";
import { resolveOperationSecurity } from "@/lib/openapi/resolve-operation-security";

function isRecord(v: unknown): v is Record<string, Json> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function joinUrl(base: string, path: string): string {
  const b = base.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

export function getOperationRequestBaseUrl(doc: ParsedOpenApi): string {
  const u = doc.servers[0]?.url;
  return typeof u === "string" && u
    ? u.replace(/\/+$/, "")
    : "https://example.com";
}

function shellQuoteSingle(s: string): string {
  return `'${s.replace(/'/g, `'\\''`)}'`;
}

/** Unquoted URL in curl examples when safe for typical shells (matches plain https://… paths). */
function curlUrlToken(fullUrl: string): string {
  if (/^[A-Za-z0-9_.:/-]+$/.test(fullUrl)) {
    return fullUrl;
  }
  return shellQuoteSingle(fullUrl);
}

/** Escape for JavaScript single-quoted string literals. */
function escapeForJsSingleQuotedString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function queryParamValue(p: Record<string, Json>): string | undefined {
  const name = asString(p.name);
  if (!name) return undefined;
  if (p.example !== undefined && p.example !== null) {
    return typeof p.example === "object"
      ? JSON.stringify(p.example)
      : String(p.example);
  }
  const schema = isRecord(p.schema) ? p.schema : undefined;
  if (schema?.example !== undefined && schema.example !== null) {
    const ex = schema.example;
    return typeof ex === "object" ? JSON.stringify(ex) : String(ex);
  }
  if (p.required === true) {
    return `<${name}>`;
  }
  return undefined;
}

function collectHeaders(
  operation: ParsedOperation,
  doc: ParsedOpenApi,
  includeContentType: boolean
): { name: string; value: string }[] {
  const headers: { name: string; value: string }[] = [];

  for (const sec of resolveOperationSecurity(operation, doc)) {
    if (sec.type === "apiKey" && sec.in === "header" && sec.name) {
      headers.push({
        name: sec.name,
        value: `<${sec.name}>`,
      });
    } else if (sec.type === "http" && sec.scheme === "bearer") {
      headers.push({ name: "Authorization", value: "Bearer <token>" });
    } else if (sec.type === "http" && sec.scheme === "basic") {
      headers.push({ name: "Authorization", value: "Basic <credentials>" });
    }
  }

  if (includeContentType) {
    headers.push({ name: "content-type", value: "application/json" });
  }

  return headers;
}

function buildFullUrl(operation: ParsedOperation, doc: ParsedOpenApi): string {
  const base = getOperationRequestBaseUrl(doc);
  let pathAndQuery = operation.path;
  const queryParts: string[] = [];

  for (const param of operation.parameters) {
    if (!isRecord(param)) continue;
    if (asString(param.in) !== "query") continue;
    const val = queryParamValue(param);
    if (val === undefined) continue;
    const n = asString(param.name);
    if (!n) continue;
    queryParts.push(`${encodeURIComponent(n)}=${encodeURIComponent(val)}`);
  }

  if (queryParts.length > 0) {
    const sep = operation.path.includes("?") ? "&" : "?";
    pathAndQuery = `${operation.path}${sep}${queryParts.join("&")}`;
  }

  return joinUrl(base, pathAndQuery);
}

function requestBodyJsonString(operation: ParsedOperation): string | null {
  const rb = operation.requestBody;
  if (!isRecord(rb)) return null;
  const content = isRecord(rb.content) ? rb.content : undefined;
  if (!content) return null;
  const jsonBlock = content["application/json"];
  if (!isRecord(jsonBlock)) return null;
  if (jsonBlock.example !== undefined) {
    return JSON.stringify(jsonBlock.example, null, 2);
  }
  return "{}";
}

function hasJsonRequestBody(operation: ParsedOperation): boolean {
  return requestBodyJsonString(operation) !== null;
}

export function buildCurlSample(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): string {
  const method = operation.method.toUpperCase();
  const fullUrl = buildFullUrl(operation, doc);
  const hasBody =
    method !== "GET" && method !== "HEAD" && hasJsonRequestBody(operation);
  const headers = collectHeaders(operation, doc, hasBody);

  const lines: string[] = [
    `curl --request ${method}`,
    `  --url ${curlUrlToken(fullUrl)}`,
  ];

  for (const h of headers) {
    lines.push(`  --header ${shellQuoteSingle(`${h.name}: ${h.value}`)}`);
  }

  if (hasBody) {
    const raw = requestBodyJsonString(operation) ?? "{}";
    const oneLine = raw.replace(/\s*\n\s*/g, " ").trim();
    lines.push(`  --data ${shellQuoteSingle(oneLine)}`);
  }

  return lines
    .map((line, i) => (i < lines.length - 1 ? `${line} \\` : line))
    .join("\n");
}

export function buildJavaScriptFetchSample(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): string {
  const method = operation.method.toUpperCase();
  const fullUrl = buildFullUrl(operation, doc);
  const bodyStr = requestBodyJsonString(operation);
  const hasBody = method !== "GET" && method !== "HEAD" && bodyStr !== null;
  const headers = collectHeaders(operation, doc, !!hasBody);

  const headerEntries = headers.map(
    (h) =>
      `'${escapeForJsSingleQuotedString(h.name)}': '${escapeForJsSingleQuotedString(h.value)}'`
  );
  const headersLiteral = `{${headerEntries.join(", ")}}`;

  const urlLiteral = `'${escapeForJsSingleQuotedString(fullUrl)}'`;

  let optionsInner = `method: '${method}', headers: ${headersLiteral}`;
  if (hasBody && bodyStr) {
    try {
      const parsed = JSON.parse(bodyStr) as unknown;
      optionsInner += `, body: JSON.stringify(${JSON.stringify(parsed)})`;
    } catch {
      optionsInner += `, body: ${JSON.stringify(bodyStr)}`;
    }
  }

  const optionsLine = `const options = {${optionsInner}};`;

  return `${optionsLine}

fetch(${urlLiteral}, options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));`;
}

function getRequestSampleParts(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): {
  method: string;
  fullUrl: string;
  headers: { name: string; value: string }[];
  hasBody: boolean;
  bodyStr: string | null;
} {
  const method = operation.method.toUpperCase();
  const fullUrl = buildFullUrl(operation, doc);
  const bodyStr = requestBodyJsonString(operation);
  const hasBody = method !== "GET" && method !== "HEAD" && bodyStr !== null;
  const headers = collectHeaders(operation, doc, hasBody);
  return { method, fullUrl, headers, hasBody, bodyStr };
}

function escapePythonDouble(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
}

function pythonUrlExpr(fullUrl: string): string {
  if (!fullUrl.includes('"""')) {
    return `r"""${fullUrl}"""`;
  }
  return `"${escapePythonDouble(fullUrl)}"`;
}

function phpSingleQuoted(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function goDoubleQuoted(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

function javaStringLiteral(s: string): string {
  return goDoubleQuoted(s);
}

function rubySingleQuoted(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

const PHP_JSON_HEREDOC = "GRXBODYEOF";

export function buildPythonRequestsSample(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): string {
  const { method, fullUrl, headers, hasBody, bodyStr } = getRequestSampleParts(
    operation,
    doc
  );
  const urlExpr = pythonUrlExpr(fullUrl);
  const headerLines = headers.map(
    (h) =>
      `    "${escapePythonDouble(h.name)}": "${escapePythonDouble(h.value)}",`
  );
  const headerBlock = `headers = {\n${headerLines.join("\n")}\n}`;

  if (hasBody && bodyStr) {
    return `import json

import requests

url = ${urlExpr}
${headerBlock}
payload = json.loads(${JSON.stringify(bodyStr)})

response = requests.request(
    "${method}",
    url,
    headers=headers,
    json=payload,
)
response.raise_for_status()
print(response.json())`;
  }

  return `import requests

url = ${urlExpr}
${headerBlock}

response = requests.request("${method}", url, headers=headers)
response.raise_for_status()
print(response.json())`;
}

export function buildPhpCurlSample(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): string {
  const { method, fullUrl, headers, hasBody, bodyStr } = getRequestSampleParts(
    operation,
    doc
  );
  const headerArray = headers.map(
    (h) => `        '${phpSingleQuoted(`${h.name}: ${h.value}`)}',`
  );
  const urlPhp = phpSingleQuoted(fullUrl);

  const base = `<?php

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => '${urlPhp}',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
${headerArray.join("\n")}
    ],
    CURLOPT_CUSTOMREQUEST => '${method}',`;

  if (hasBody && bodyStr) {
    return `${base}
    CURLOPT_POSTFIELDS => <<<'${PHP_JSON_HEREDOC}'
${bodyStr}
${PHP_JSON_HEREDOC}
]);

$response = curl_exec($curl);
curl_close($curl);
echo $response;`;
  }

  return `${base}
]);

$response = curl_exec($curl);
curl_close($curl);
echo $response;`;
}

export function buildGoNetHttpSample(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): string {
  const { method, fullUrl, headers, hasBody, bodyStr } = getRequestSampleParts(
    operation,
    doc
  );
  const urlGo = goDoubleQuoted(fullUrl);
  const headerSets = headers
    .map(
      (h) =>
        `\treq.Header.Set("${goDoubleQuoted(h.name)}", "${goDoubleQuoted(h.value)}")`
    )
    .join("\n");

  if (hasBody && bodyStr) {
    const bodyGo = goDoubleQuoted(bodyStr);
    return `package main

import (
	"fmt"
	"io"
	"net/http"
	"strings"
)

func main() {
	client := &http.Client{}
	body := strings.NewReader("${bodyGo}")
	req, err := http.NewRequest("${method}", "${urlGo}", body)
	if err != nil {
		panic(err)
	}
${headerSets}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	out, _ := io.ReadAll(resp.Body)
	fmt.Println(string(out))
}`;
  }

  return `package main

import (
	"fmt"
	"io"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, err := http.NewRequest("${method}", "${urlGo}", nil)
	if err != nil {
		panic(err)
	}
${headerSets}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	out, _ := io.ReadAll(resp.Body)
	fmt.Println(string(out))
}`;
}

export function buildJavaHttpClientSample(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): string {
  const { method, fullUrl, headers, hasBody, bodyStr } = getRequestSampleParts(
    operation,
    doc
  );
  const urlJ = javaStringLiteral(fullUrl);
  const headerLines = headers
    .map(
      (h) =>
        `        .header("${javaStringLiteral(h.name)}", "${javaStringLiteral(h.value)}")`
    )
    .join("\n");

  if (hasBody && bodyStr) {
    const bodyJ = javaStringLiteral(bodyStr);
    return `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
  public static void main(String[] args) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("${urlJ}"))
${headerLines}
        .method("${method}", HttpRequest.BodyPublishers.ofString("${bodyJ}"))
        .build();
    HttpResponse<String> response =
        client.send(request, HttpResponse.BodyHandlers.ofString());
    System.out.println(response.body());
  }
}`;
  }

  return `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
  public static void main(String[] args) throws Exception {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("${urlJ}"))
${headerLines}
        .method("${method}", HttpRequest.BodyPublishers.noBody())
        .build();
    HttpResponse<String> response =
        client.send(request, HttpResponse.BodyHandlers.ofString());
    System.out.println(response.body());
  }
}`;
}

function rubyHashEntry(name: string, value: string): string {
  return `  '${rubySingleQuoted(name)}' => '${rubySingleQuoted(value)}',`;
}

export function buildRubyNetHttpSample(
  operation: ParsedOperation,
  doc: ParsedOpenApi
): string {
  const { method, fullUrl, headers, hasBody, bodyStr } = getRequestSampleParts(
    operation,
    doc
  );
  const uriRb = rubySingleQuoted(fullUrl);
  const headerHashLines = headers.map((h) => rubyHashEntry(h.name, h.value));
  const headersBlock = `headers = {\n${headerHashLines.join("\n")}\n}`;

  if (hasBody && bodyStr) {
    const bodyRb = bodyStr.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    return `require 'net/http'
require 'uri'

uri = URI('${uriRb}')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = (uri.scheme == 'https')

${headersBlock}
body = '${bodyRb}'

response = http.send_request('${method}', uri.request_uri, body, headers)
puts response.body`;
  }

  return `require 'net/http'
require 'uri'

uri = URI('${uriRb}')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = (uri.scheme == 'https')

${headersBlock}

response = http.send_request('${method}', uri.request_uri, nil, headers)
puts response.body`;
}

export type RequestCodeSnippetDef = {
  id: string;
  label: string;
  prismLanguage: string;
  build: (operation: ParsedOperation, doc: ParsedOpenApi) => string;
};

export const REQUEST_CODE_SNIPPET_DEFS: readonly RequestCodeSnippetDef[] = [
  { id: "curl", label: "cURL", prismLanguage: "bash", build: buildCurlSample },
  {
    id: "javascript",
    label: "JavaScript",
    prismLanguage: "javascript",
    build: buildJavaScriptFetchSample,
  },
  {
    id: "python",
    label: "Python",
    prismLanguage: "python",
    build: buildPythonRequestsSample,
  },
  { id: "php", label: "PHP", prismLanguage: "php", build: buildPhpCurlSample },
  { id: "go", label: "Go", prismLanguage: "go", build: buildGoNetHttpSample },
  {
    id: "java",
    label: "Java",
    prismLanguage: "java",
    build: buildJavaHttpClientSample,
  },
  {
    id: "ruby",
    label: "Ruby",
    prismLanguage: "ruby",
    build: buildRubyNetHttpSample,
  },
];
