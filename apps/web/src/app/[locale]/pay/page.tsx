import { getTranslations } from "next-intl/server";
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
  const faqItems: FAQQuestion[] = [
    {
      value:
        "what-types-of-businesses-can-use-your-crypto-payment-processing-service",
      question: t("Pay.Root.faqItems.businessTypes.question"),
      answer: t("Pay.Root.faqItems.businessTypes.answer"),
    },
    {
      value: "how-long-to-receive-payments",
      question: t("Pay.Root.faqItems.receivePayments.question"),
      answer: t("Pay.Root.faqItems.receivePayments.answer"),
    },
    {
      value: "fees",
      question: t("Pay.Root.faqItems.fees.question"),
      answer: t("Pay.Root.faqItems.fees.answer"),
    },
    {
      value: "safe-to-accept-payments",
      question: t("Pay.Root.faqItems.safeToAccept.question"),
      answer: t("Pay.Root.faqItems.safeToAccept.answer"),
    },
    {
      value: "auto-conversion",
      question: t("Pay.Root.faqItems.autoConversion.question"),
      answer: t("Pay.Root.faqItems.autoConversion.answer"),
    },
  ];

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

      <FAQSection questions={faqItems} />

      <BuildYourCryptoBusinessWithUsSection />
    </main>
  );
}
