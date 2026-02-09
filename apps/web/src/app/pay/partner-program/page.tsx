import { HeroSection } from "./Hero";
import { BenefitsSection } from "./Benefits";
import { TargetAudienceSection } from "./TargetAudience";
import { HowItWorksSection } from "./HowItWorks";
import { FAQCTASection } from "./FAQCTA";

export const metadata = {
  title: "Partner Program | GRX Pay",
  description:
    "Earn passive income with the GRX Pay partnership program. For agencies and service providers looking to expand their offerings and build expertise in GRX Pay.",
  openGraph: {
    title: "Partner Program | GRX Pay",
    description:
      "Earn passive income with the GRX Pay partnership program. For agencies and service providers looking to expand their offerings and build expertise in GRX Pay.",
  },
};

export default function PartnerProgramPage() {
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
