import { getTranslations } from "next-intl/server";
import { HeroSection } from "./Hero";
import { FeaturesSection } from "./Features";
import { ReviewedBySection } from "./ReviewedBy";
import { BoostYourRevenueSection } from "./BoostYourRevenue";
import { BenefitsAndFeaturesSection } from "./BenefitsAndFeatures";
import { GainAccessToCryptoMarketSection } from "./GainAccessToCryptoMarket";
import { BuildYourCryptoBusinessWithUsSection } from "./BuildYourCryptoBusinessWithUs";
import { AcceptableCryptoList } from "./AcceptableCryptoList";
import { CaseStudiesSection } from "./CaseStudies";
import { HowItWorksSection } from "./HowItWorks";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("Pay.Root.meta.title"),
    description: t("Pay.Root.meta.description"),
    openGraph: {
      title: t("Pay.Root.meta.title"),
      description: t("Pay.Root.meta.description"),
    },
  };
}

export default async function PayPage(_: PageProps<"/[locale]/pay">) {
  const t = await getTranslations();

  return (
    <main className="flex flex-col justify-center">
      <HeroSection />

      <FeaturesSection />

      <HowItWorksSection />

      <ReviewedBySection />

      <BoostYourRevenueSection />

      <CaseStudiesSection />

      <BenefitsAndFeaturesSection />

      <AcceptableCryptoList />

      <GainAccessToCryptoMarketSection />

      <BuildYourCryptoBusinessWithUsSection />
    </main>
  );
}
