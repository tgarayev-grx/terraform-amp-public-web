import { getTranslations } from "next-intl/server";
import { HeroSection } from "./Hero";
import { AboutUsContentSection } from "./AboutUsContent";
import { RobustSecuritySection } from "./RobustSecurity";
import { SmoothIntegrationSection } from "./SmoothIntegration";
import { EmpowerCtaSection } from "./EmpowerCtaSection";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("Pay.AboutUs.meta.title"),
    description: t("Pay.AboutUs.meta.description"),
    openGraph: {
      title: t("Pay.AboutUs.meta.title"),
      description: t("Pay.AboutUs.meta.description"),
    },
  };
}

export default async function AboutUsPage(
  _: PageProps<"/[locale]/pay/about-us">
) {
  return (
    <main className="flex flex-col justify-center">
      <HeroSection />
      <AboutUsContentSection />
      <RobustSecuritySection />
      <SmoothIntegrationSection />
      <EmpowerCtaSection />
    </main>
  );
}
