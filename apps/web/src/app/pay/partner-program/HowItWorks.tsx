import Link from "next/link";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";
import { SALES_EMAIL } from "./constants";

export type StepItem = {
  title: string;
  description: string;
};

export const STEPS: readonly StepItem[] = [
  {
    title: "Apply for a partner program",
    description:
      "For developers who are actively seeking a crypto payment solution to empower your clients",
  },
  {
    title: "Invite businesses",
    description: "Tell about GRX Pay to your partners",
  },
  {
    title: "Get Paid and Grow",
    description:
      "Receive the income every month right to your GRX Pay account",
  },
] as const;

type StepCardProps = StepItem & {
  number: number;
  isLast?: boolean;
};

function StepCard({ number, title, description, isLast }: StepCardProps) {
  return (
    <div className="flex gap-4 sm:gap-8 md:gap-10 w-full relative items-center">
      <div className="flex flex-col items-center flex-shrink-0 relative">
        {/* Numbered circle badge */}
        <div className="flex items-center justify-center w-16 h-16 sm:w-[84px] sm:h-[84px] md:w-[108px] md:h-[108px] rounded-full bg-[#1d1d1d] shadow-dark-sm">
          <span className="font-unbounded font-bold text-white text-[24px] sm:text-[30px] md:text-[36px] leading-[32px] sm:leading-[34px] md:leading-[40px]">
            {number}
          </span>
        </div>
        {/* Vertical connector line between steps (hidden for last step) */}
        {!isLast && (
          <div className="absolute top-[64px] sm:top-[84px] md:top-[108px] left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%+48px)] sm:h-[calc(100%+32px)] md:h-[calc(100%+48px)] bg-yellow-500" />
        )}
      </div>

      <div className="flex-1 flex flex-col gap-2 px-3 py-4 sm:p-5 md:p-6 rounded-2xl bg-[#1d1d1d] shadow-dark-sm">
        <h3 className="font-bold text-white text-[18px] sm:text-[22px] md:text-[24px] leading-[22px] sm:leading-[26px] md:leading-[28px]">
          {title}
        </h3>
        <p className="text-neutral-300 text-sm sm:text-[15px] md:text-base leading-[20px] sm:leading-[22px] md:leading-[24px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-20 lg:py-24 bg-neutral-1000">
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="mb-12 sm:mb-14 font-unbounded font-bold text-[28px] sm:text-[36px] text-center leading-[32px] sm:leading-[40px] text-white">
          How to start?
        </h2>

        <div className="flex flex-col gap-12 sm:gap-8 md:gap-12 mb-12 sm:mb-14">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.title}
              number={index + 1}
              title={step.title}
              description={step.description}
              isLast={index === STEPS.length - 1}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonRoot
            className="w-full sm:w-[180px]"
            palette="secondary"
            variant="contained"
            size="lg"
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
      </div>
    </section>
  );
}
