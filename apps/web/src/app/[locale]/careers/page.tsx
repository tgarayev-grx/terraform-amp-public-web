import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CareersHero } from "./Hero";
import { HeroBgImage } from "./HeroBgImage";
import { BuildTheFuture } from "./BuildTheFuture";
import { WhyGRX } from "./WhyGRX";
import { HiringProcess } from "./HiringProcess";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("CareersPage.meta.title"),
    description: t("CareersPage.meta.description"),
  };
}

export default async function CareersPage() {
  return (
    <main className="flex flex-col">
      <CareersHero />
      <HeroBgImage />
      <BuildTheFuture />
      <WhyGRX />
      <HiringProcess />
    </main>
  );
}
