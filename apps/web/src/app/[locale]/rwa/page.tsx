import { getTranslations } from "next-intl/server";

import { HeroSection } from "./Hero";
import { BuildCtaSection } from "../BuildCta";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("Rwa.meta.title"),
    description: t("Rwa.meta.description"),
    openGraph: {
      title: t("Rwa.meta.title"),
      description: t("Rwa.meta.description"),
    },
  };
}

export default function RwaPage(_: PageProps<"/[locale]/rwa">) {
  return (
    <main className="flex flex-col justify-center">
      <HeroSection />
      <BuildCtaSection />
    </main>
  );
}
