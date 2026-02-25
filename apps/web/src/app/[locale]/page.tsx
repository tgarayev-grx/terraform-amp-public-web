import { HeroSection } from "./Hero";
import { FoundationSection } from "./Foundation";
import { EcosystemSection } from "./Ecosystem";
import { TechnologySection } from "./Technology";

export default function Home(_: PageProps<"/[locale]">) {
  return (
    <main className="flex flex-col justify-center">
      <HeroSection />
      <FoundationSection />
      <EcosystemSection />
      <TechnologySection />
    </main>
  );
}
