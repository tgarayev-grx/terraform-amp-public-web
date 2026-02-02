import * as Accordion from "@radix-ui/react-accordion";
import { memo } from "react";
import { MinusIcon } from "./(icons)/MinusIcon";
import { PlusIcon } from "./(icons)/PlusIcon";

const FAQ_ITEMS = [
  {
    value:
      "what-types-of-businesses-can-use-your-crypto-payment-processing-service",
    question:
      "What types of businesses (or individuals) can use your crypto payment processing service?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
  {
    value: "how-long-to-receive-payments",
    question: "How long does it take for me to receive my payments?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
  {
    value: "fees",
    question: "Are there any fees for using GRX Pay?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
  {
    value: "safe-to-accept-payments",
    question: "Is it safe to accept payments in cryptocurrencies?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
  {
    value: "auto-conversion",
    question: "What is auto-conversion, and how does it work on the GRX Pay?",
    answer:
      "Et qui aperiam deserunt. Sed ratione qui qui eaque repellat aut consequatur omnis. Est recusandae culpa voluptate asperiores et. Libero fuga sunt molestiae maxime laudantium enim expedita corporis minus.",
  },
];

export const FAQSection = memo(function FAQSection() {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            FAQ
          </h3>
          <h4 className="font-medium text-neutral-700 sm:text-[20px] text-base sm:leading-[26px]">
            You can find more answers to questions <span>here</span>
          </h4>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="flex flex-col mx-auto w-full max-w-[720px]"
        >
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item
              key={item.value}
              value={item.value}
              className="bg-white data-[state=open]:border-neutral-300 rounded-xl overflow-hidden"
            >
              <Accordion.Trigger
                className="group flex justify-between items-center gap-4 px-4 sm:px-6 py-4 w-full text-neutral-900 hover:text-neutral-700 transition-colors"
                id={item.value}
              >
                <span className="font-medium text-base sm:text-lg text-left">
                  {item.question}
                </span>

                <div className="relative flex flex-shrink-0 justify-center items-center self-start bg-neutral-100 rounded-[6px] w-6 h-6 text-neutral-1000">
                  <PlusIcon
                    className="absolute opacity-100 group-data-[state=open]:opacity-0 w-4 h-4 transition-opacity duration-200 ease-in-out"
                    aria-hidden
                  />
                  <MinusIcon
                    className="absolute opacity-0 group-data-[state=open]:opacity-100 w-4 h-4 transition-opacity duration-200 ease-in-out"
                    aria-hidden
                  />
                </div>
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-4 sm:px-6 pt-0 pb-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {item.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
});
FAQSection.displayName = "FAQSection";
