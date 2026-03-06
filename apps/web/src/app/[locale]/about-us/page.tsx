import { ComplianceSection } from "./Compliance";
import { HeroSection } from "./Hero";
import { MidStatementSection } from "./MidStatement";
import { WhoAreWeSection } from "./WhoAreWe";
import { WhatWeBuildSection } from "./WhatWeBuild";
import { GetInTouchSection } from "@/modules/contact-us";

export default async function AboutUsPage(_: PageProps<"/[locale]/about-us">) {
  return (
    <main className="flex flex-col justify-center">
      <HeroSection />
      <MidStatementSection />
      <WhoAreWeSection />
      <WhatWeBuildSection />
      <ComplianceSection />
      <GetInTouchSection />
    </main>
  );
}
