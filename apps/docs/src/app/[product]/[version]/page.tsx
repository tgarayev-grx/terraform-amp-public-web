import { notFound, redirect } from "next/navigation";

import {
  getFirstNavHref,
  getProductBySlug,
  getVersion,
} from "@/config/docs-navigation";

export default async function DocsVersionIndexPage({
  params,
}: PageProps<"/[product]/[version]">) {
  const { product: productSlug, version: versionSlug } = await params;
  const product = getProductBySlug(productSlug);
  const version = getVersion(productSlug, versionSlug);
  if (!product || !version) {
    notFound();
  }
  const href = getFirstNavHref(productSlug, versionSlug);
  if (href) {
    redirect(href);
  }
  notFound();
}
