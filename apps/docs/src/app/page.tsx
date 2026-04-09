import { redirect } from "next/navigation";

import { docsProducts, getFirstNavHref } from "@/config/docs-navigation";

export default function HomePage() {
  const first = docsProducts[0];
  const firstVersion = first?.versions.find((v) => v.latest);

  if (!first || !firstVersion) {
    return (
      <div className="p-8 text-neutral-400">
        No documentation products configured.
      </div>
    );
  }
  const href =
    getFirstNavHref(first.slug, firstVersion.slug) ??
    `/${first.slug}/${firstVersion.slug}/`;

  redirect(href);
}
