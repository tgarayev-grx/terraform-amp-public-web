import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { DocsArticlePager } from "@/components/DocsArticlePager";
import { OpenApiOperationDoc } from "@/components/openapi/OpenApiOperationDoc";
import { getProductBySlug, getVersion } from "@/config/docs-navigation";
import { findTaggedOperationBySlug } from "@/lib/openapi/operation-slug";
import { operationLinearNavKey } from "@/config/docs-navigation";
import {
  buildLinearDocsPages,
  getAdjacentLinearDocPages,
} from "@/lib/linear-docs-nav";
import { parseOpenApiJsonString } from "@/lib/openapi/parse-openapi";
import { readSpecJson } from "@/lib/spec";

type Props = {
  params: Promise<{ product: string; version: string; operationId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    product: productSlug,
    version: versionSlug,
    operationId: rawOperationId,
  } = await params;
  const operationSlug = decodeURIComponent(rawOperationId);
  const product = getProductBySlug(productSlug);
  const version = getVersion(productSlug, versionSlug);
  if (!version) {
    return { title: "API reference" };
  }

  const json = await readSpecJson(productSlug, versionSlug);
  if (!json) {
    return {
      title: `API reference · ${product?.label ?? "Docs"} ${version.label}`,
    };
  }

  try {
    const doc = parseOpenApiJsonString(json);
    const found = findTaggedOperationBySlug(doc, operationSlug);
    return {
      title: found?.title
        ? `${found.title} · API reference`
        : `${operationSlug} · API reference`,
    };
  } catch {
    return {
      title: `API reference · ${product?.label ?? "Docs"} ${version.label}`,
    };
  }
}

export default async function ApiOperationPage({
  params,
}: PageProps<"/[product]/[version]/api-reference/[operationId]">) {
  const {
    product: productSlug,
    version: versionSlug,
    operationId: rawOperationId,
  } = await params;
  const operationSlug = decodeURIComponent(rawOperationId);

  const product = getProductBySlug(productSlug);
  const version = getVersion(productSlug, versionSlug);
  if (!product || !version) {
    notFound();
  }

  const json = await readSpecJson(productSlug, versionSlug);
  if (!json) {
    notFound();
  }

  const doc = parseOpenApiJsonString(json);
  const found = findTaggedOperationBySlug(doc, operationSlug);
  if (!found) {
    notFound();
  }

  const linearPages = buildLinearDocsPages(
    productSlug,
    versionSlug,
    version.nav,
    doc
  );
  const { prev, next } = getAdjacentLinearDocPages(
    linearPages,
    operationLinearNavKey(operationSlug)
  );

  return (
    <>
      <OpenApiOperationDoc
        doc={doc}
        operation={found.operation}
        tag={found.tag}
      />

      <DocsArticlePager prev={prev} next={next} />
    </>
  );
}
