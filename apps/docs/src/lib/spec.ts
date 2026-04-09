import fs from "fs/promises";
import path from "path";

import { getVersion } from "@/config/docs-navigation";

export function resolveSpecAbsolutePath(
  productSlug: string,
  versionSlug: string
): string | null {
  const version = getVersion(productSlug, versionSlug);
  if (!version) return null;
  return path.join(process.cwd(), version.openapiSpecPath);
}

export async function readSpecJson(
  productSlug: string,
  versionSlug: string
): Promise<string | null> {
  const abs = resolveSpecAbsolutePath(productSlug, versionSlug);
  if (!abs) return null;
  try {
    return await fs.readFile(abs, "utf-8");
  } catch {
    return null;
  }
}
