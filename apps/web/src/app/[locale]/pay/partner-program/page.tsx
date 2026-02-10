import { getTranslations } from "next-intl/server";
import { HeroSection } from "./Hero";
import { BenefitsSection } from "./Benefits";
import { TargetAudienceSection } from "./TargetAudience";
import { HowItWorksSection } from "./HowItWorks";
import { FAQCTASection } from "./FAQCTA";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("Pay.PartnerProgram.meta.title"),
    description: t("Pay.PartnerProgram.meta.description"),
    openGraph: {
      title: t("Pay.PartnerProgram.meta.title"),
      description: t("Pay.PartnerProgram.meta.description"),
    },
  };
}

export default async function PartnerProgramPage() {
  return (
    <main className="flex flex-col justify-center">
      <HeroSection />
      <BenefitsSection />
      <TargetAudienceSection />
      <HowItWorksSection />
      <FAQCTASection />
    </main>
  );
}
