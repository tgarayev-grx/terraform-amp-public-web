import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getProductBySlug, getVersion } from "@/config/docs-navigation";
import { buildTaggedOperationEntries } from "@/lib/openapi/operation-slug";
import { parseOpenApiJsonString } from "@/lib/openapi/parse-openapi";
import { readSpecJson } from "@/lib/spec";

export async function generateMetadata({
  params,
}: PageProps<"/[product]/[version]">): Promise<Metadata> {
  const { product: productSlug, version: versionSlug } = await params;
  const product = getProductBySlug(productSlug);
  const version = getVersion(productSlug, versionSlug);
  return {
    title: version
      ? `API reference · ${product?.label ?? "Docs"} ${version.label}`
      : "API reference",
  };
}

export default async function ApiReferencePage({
  params,
}: PageProps<"/[product]/[version]">) {
  const { product: productSlug, version: versionSlug } = await params;
  const version = getVersion(productSlug, versionSlug);
  if (!version) {
    notFound();
  }

  const json = await readSpecJson(productSlug, versionSlug);
  if (!json) {
    notFound();
  }

  let doc;
  try {
    doc = parseOpenApiJsonString(json);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return (
      <div className="bg-red-950/30 p-4 border border-red-900/60 rounded-lg text-red-200 text-sm">
        <p className="font-medium">Could not parse OpenAPI document</p>
        <p className="mt-1 font-mono text-red-300/90 text-xs">{message}</p>
      </div>
    );
  }

  const entries = buildTaggedOperationEntries(doc);
  const first = entries[0];
  if (!first) {
    notFound();
  }

  redirect(`/${productSlug}/${versionSlug}/api-reference/${first.slug}/`);
}
