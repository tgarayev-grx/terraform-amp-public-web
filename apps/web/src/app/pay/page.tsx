import { FAQSection } from "./FAQ";
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

export default function PayPage() {
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

      <FAQSection />

      <BuildYourCryptoBusinessWithUsSection />
    </main>
  );
}
