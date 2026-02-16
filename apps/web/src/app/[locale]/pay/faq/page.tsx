import { ArticleList } from "./ArticleList";
import { FaqHero } from "./FaqHero";
import { StillHaveQuestions } from "./StillHaveQuestions";

export const metadata = {
  title: "FAQ | GRX Pay",
  description:
    "Frequently asked questions about crypto payments, Bitcoin, and GRX Pay. Find answers about cryptocurrency processing and getting started.",
  openGraph: {
    title: "FAQ | GRX Pay",
    description:
      "Frequently asked questions about crypto payments, Bitcoin, and GRX Pay.",
  },
};

export default function FaqPage() {
  return (
    <main className="flex flex-col">
      <FaqHero />
      <ArticleList />
      <StillHaveQuestions />
    </main>
  );
}
