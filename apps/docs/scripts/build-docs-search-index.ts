import fs from "fs/promises";
import path from "path";

import { docsProducts } from "../src/config/docs-navigation";
import { buildDocsSearchIndex } from "../src/lib/build-docs-search-index";
import { parseOpenApiJsonString } from "../src/lib/openapi/parse-openapi";
import {
  buildTaggedOperationEntries,
  type TaggedOperationEntry,
} from "../src/lib/openapi/operation-slug";
import { readSpecJson } from "../src/lib/spec";

const OUT_SEGMENTS = ["src", "generated", "docs-search"] as const;

async function main() {
  const outRoot = path.join(process.cwd(), ...OUT_SEGMENTS);
  await fs.rm(outRoot, { recursive: true, force: true });
  await fs.mkdir(outRoot, { recursive: true });

  for (const product of docsProducts) {
    for (const version of product.versions) {
      let taggedEntries: TaggedOperationEntry[] = [];
      const specJson = await readSpecJson(product.slug, version.slug);
      if (specJson) {
        try {
          const parsed = parseOpenApiJsonString(specJson);
          taggedEntries = buildTaggedOperationEntries(parsed);
        } catch {
          taggedEntries = [];
        }
      }

      const items = await buildDocsSearchIndex({
        productId: product.id,
        productSlug: product.slug,
        versionSlug: version.slug,
        nav: version.nav,
        taggedEntries,
      });

      const dir = path.join(outRoot, product.slug);
      await fs.mkdir(dir, { recursive: true });
      const filePath = path.join(dir, `${version.slug}.json`);
      await fs.writeFile(filePath, `${JSON.stringify(items)}\n`, "utf-8");
      console.log(
        `Wrote ${path.relative(process.cwd(), filePath)} (${items.length} items)`
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
