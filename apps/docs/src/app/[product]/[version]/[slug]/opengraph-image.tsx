import { getDocsArticleOgImageResponse } from "@/lib/docs-og-image";

export const runtime = "nodejs";

export const alt = "Documentation";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function Image({
  params,
}: PageProps<"/[product]/[version]/[slug]">) {
  return getDocsArticleOgImageResponse(await params);
}
