import { getTranslations } from "next-intl/server";
import { FAQQuestion, FAQSection } from "../FAQ";
import { WhatsIncludedSection } from "./WhatsIncluded";
import { PricingSection } from "./Pricing";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("Pay.Pricing.meta.title"),
    description: t("Pay.Pricing.meta.description"),
    openGraph: {
      title: t("Pay.Pricing.meta.title"),
      description: t("Pay.Pricing.meta.description"),
    },
  };
}

export default async function PricingPage() {
  const t = await getTranslations();

  const faqItems: FAQQuestion[] = [
    {
      question: t("Pay.Pricing.faqItems.commission.question"),
      value: "what-is-the-commission-for-grx-pay",
      answer: t("Pay.Pricing.faqItems.commission.answer"),
    },
    {
      question: t("Pay.Pricing.faqItems.feesApplied.question"),
      value: "how-are-the-fees-applied",
      answer: t("Pay.Pricing.faqItems.feesApplied.answer"),
    },
    {
      question: t("Pay.Pricing.faqItems.volumeDiscounts.question"),
      value:
        "are-there-volume-based-discounts-available-for-high-frequency-users",
      answer: t("Pay.Pricing.faqItems.volumeDiscounts.answer"),
    },
  ];

  return (
    <main className="flex flex-col justify-center">
      <PricingSection />
      <WhatsIncludedSection />
      <FAQSection questions={faqItems} />
    </main>
  );
}
