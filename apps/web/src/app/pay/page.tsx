import { FAQQuestion, FAQSection } from "./FAQ";
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

      <FAQSection questions={FAQ_ITEMS} />

      <BuildYourCryptoBusinessWithUsSection />
    </main>
  );
}

const FAQ_ITEMS: FAQQuestion[] = [
  {
    value:
      "what-types-of-businesses-can-use-your-crypto-payment-processing-service",
    question:
      "What types of businesses (or individuals) can use your crypto payment processing service?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
  {
    value: "how-long-to-receive-payments",
    question: "How long does it take for me to receive my payments?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
  {
    value: "fees",
    question: "Are there any fees for using GRX Pay?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
  {
    value: "safe-to-accept-payments",
    question: "Is it safe to accept payments in cryptocurrencies?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
  {
    value: "auto-conversion",
    question: "What is auto-conversion, and how does it work on the GRX Pay?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
];
