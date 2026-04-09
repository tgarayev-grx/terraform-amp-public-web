import { buildTaggedOperationEntries } from "@/lib/openapi/operation-slug";
import { parseOpenApiJsonString } from "@/lib/openapi/parse-openapi";
import { readSpecJson } from "@/lib/spec";

/** Title, URL, and slug of the first operation in spec order (matches sidebar / layout). */
export async function getFirstApiReferenceNavLink(
  productSlug: string,
  versionSlug: string
): Promise<{ title: string; href: string; slug: string } | undefined> {
  const json = await readSpecJson(productSlug, versionSlug);
  if (!json) {
    return undefined;
  }
  try {
    const doc = parseOpenApiJsonString(json);
    const entries = buildTaggedOperationEntries(doc);
    const first = entries[0];
    if (!first) {
      return undefined;
    }
    return {
      title: first.title,
      slug: first.slug,
      href: `/${productSlug}/${versionSlug}/api-reference/${first.slug}/`,
    };
  } catch {
    return undefined;
  }
}
