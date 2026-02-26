import { ForcedDarkTheme } from "@/components/theme/ForcedDarkTheme";
import { HeroSection } from "./Hero";
import { WhoAreWeSection } from "./WhoAreWe";
import { WhatWeBuildSection } from "./WhatWeBuild";
import { OurTeamSection } from "./OurTeam";
import { GetInTouchSection } from "@/modules/contact-us";

export default async function AboutUsPage(_: PageProps<"/[locale]/about-us">) {
  return (
    <main className="flex flex-col justify-center">
      <ForcedDarkTheme />
      <HeroSection />
      <WhoAreWeSection />
      <WhatWeBuildSection />
      <OurTeamSection />
      <GetInTouchSection />
    </main>
  );
}
