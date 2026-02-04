import { FAQQuestion, FAQSection } from "../FAQ";
import { WhatsIncludedSection } from "./WhatsIncluded";
import { PricingSection } from "./Pricing";

export default function PricingPage() {
  return (
    <main className="flex flex-col justify-center">
      <PricingSection />

      <WhatsIncludedSection />

      <FAQSection questions={FAQ_ITEMS} />
    </main>
  );
}

const FAQ_ITEMS: FAQQuestion[] = [
  {
    question: "What is the commission for GRX Pay?",
    value: "what-is-the-commission-for-grx-pay",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    question: "How are the fees applied?",
    value: "how-are-the-fees-applied",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    question:
      "Are there volume-based discounts available for high-frequency users?",
    value:
      "are-there-volume-based-discounts-available-for-high-frequency-users",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];
