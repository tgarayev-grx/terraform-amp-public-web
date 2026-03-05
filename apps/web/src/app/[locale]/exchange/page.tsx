import { HeroSection } from "./HeroSection";
import { AssetsSection } from "./AssetsSection";
import { CtaBanner } from "./CtaBanner";

export default function ExchangePage(_: PageProps<"/[locale]/exchange">) {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AssetsSection />
      <CtaBanner />
    </main>
  );
}
