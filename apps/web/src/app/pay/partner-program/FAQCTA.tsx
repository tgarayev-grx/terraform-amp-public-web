import Link from "next/link";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";
import { MessageIcon } from "./(icons)/MessageIcon";
import { SALES_EMAIL } from "./constants";

export function FAQCTASection() {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto w-full max-w-[580px] flex flex-col items-center gap-8">
        <div className="flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-[10px]">
          <MessageIcon className="text-neutral-500 size-6" />
        </div>

        <div className="flex flex-col gap-4 text-center">
          <h2 className="font-bold text-neutral-900 text-[28px] sm:text-[36px] leading-[32px] sm:leading-[40px]">
            Still have questions?
          </h2>
          <p className="font-medium text-neutral-700 text-base sm:text-xl leading-[24px] sm:leading-[26px]">
            {"Can't find the answer you're looking for? Feel free to reach out, we're happy to help."}
          </p>
        </div>

        <ButtonRoot
          className="min-w-[240px]"
          palette="primary"
          variant="contained"
          size="md"
          asChild
        >
          <Link
            href={`mailto:${SALES_EMAIL}`}
            rel="noopener noreferrer"
            aria-label="Contact sales team via email"
          >
            <ButtonText>Contact us</ButtonText>
          </Link>
        </ButtonRoot>
      </div>
    </section>
  );
}
