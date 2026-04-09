import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getAdjacentDocPages,
  getProductBySlug,
  getVersion,
  isArticleInNav,
} from "@/config/docs-navigation";
import { DocsArticlePager } from "@/components/DocsArticlePager";
import { DocsArticleToc } from "@/components/DocsArticleToc";
import { getFirstApiReferenceNavLink } from "@/lib/first-api-reference-nav";
import { loadArticleMdx } from "@/lib/load-article";
import { MdxRemoteContent } from "@/components/mdx/MdxRemoteContent";

export async function generateMetadata({
  params,
}: PageProps<"/[product]/[version]/[slug]">): Promise<Metadata> {
  const { product: productSlug, version: versionSlug, slug } = await params;
  const product = getProductBySlug(productSlug);
  const version = getVersion(productSlug, versionSlug);
  const article =
    product && version ? isArticleInNav(version.nav, slug) : undefined;
  const loaded =
    product && version
      ? await loadArticleMdx(product.id, versionSlug, slug)
      : null;
  const title = loaded?.title ?? article?.title ?? slug.replace(/-/g, " ");
  const description = loaded?.description;
  const ogTitle = `${title} · ${product?.label ?? "Docs"}`;
  return {
    title: ogTitle,
    description,
    openGraph: {
      title: ogTitle,
      description,
      type: "website",
      url: `/${productSlug}/${versionSlug}/${slug}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export default async function DocsArticlePage({
  params,
}: PageProps<"/[product]/[version]/[slug]">) {
  const { product: productSlug, version: versionSlug, slug } = await params;
  const product = getProductBySlug(productSlug);
  const version = getVersion(productSlug, versionSlug);
  if (!product || !version) {
    notFound();
  }
  if (!isArticleInNav(version.nav, slug)) {
    notFound();
  }
  const loaded = await loadArticleMdx(product.id, versionSlug, slug);
  if (!loaded) {
    notFound();
  }

  const heading =
    loaded.title ?? isArticleInNav(version.nav, slug)?.title ?? slug;

  const apiReferenceFirst = await getFirstApiReferenceNavLink(
    productSlug,
    versionSlug
  );
  const { prev, next } = getAdjacentDocPages(
    productSlug,
    versionSlug,
    version.nav,
    slug,
    apiReferenceFirst
  );

  return (
    <div className="flex xl:flex-row flex-col flex-grow xl:justify-between xl:items-stretch w-full">
      <article className="flex flex-col flex-grow px-4 md:px-0 w-full min-w-0 xl:max-w-[640px]">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="text-heading-h4 text-text-strong-1000">{heading}</h1>

          <p className="text-body-md-regular text-text-soft-500">
            {loaded.description}
          </p>
        </div>

        <MdxRemoteContent source={loaded.content} />

        <DocsArticlePager prev={prev} next={next} />
      </article>

      <DocsArticleToc headings={loaded.headings} />
    </div>
  );
}
