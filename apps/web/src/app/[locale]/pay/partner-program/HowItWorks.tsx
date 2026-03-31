import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

export async function HowItWorksSection() {
  const t = await getTranslations();

  const steps = [
    {
      title: t("Pay.PartnerProgram.howItWorks.steps.apply.title"),
      description: t("Pay.PartnerProgram.howItWorks.steps.apply.description"),
    },
    {
      title: t("Pay.PartnerProgram.howItWorks.steps.invite.title"),
      description: t("Pay.PartnerProgram.howItWorks.steps.invite.description"),
    },
    {
      title: t("Pay.PartnerProgram.howItWorks.steps.getPaid.title"),
      description: t("Pay.PartnerProgram.howItWorks.steps.getPaid.description"),
    },
  ];

  return (
    <section className="flex flex-col items-center bg-bg-weak-100 px-4 sm:px-8 py-20 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="mb-12 sm:mb-14 font-bounded text-display-sm text-text-strong-1000 md:text-display-md text-center">
          {t("Pay.PartnerProgram.howItWorks.title")}
        </h2>

        <div className="flex flex-col gap-12 sm:gap-8 md:gap-12 mb-12 sm:mb-14">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              number={index + 1}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type StepCardProps = {
  number: ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
};

export function StepCard({
  number,
  title,
  description,
  isLast,
}: StepCardProps) {
  return (
    <div className="relative flex items-center gap-4 sm:gap-8 md:gap-10 w-full">
      <div className="relative flex flex-col flex-shrink-0 items-center">
        <div className="flex justify-center items-center bg-surface-floating shadow-sm rounded-full w-16 sm:w-[84px] md:w-[108px] h-16 sm:h-[84px] md:h-[108px]">
          <span className="font-bounded text-text-strong-1000 text-title-lg md:text-display-md">
            {number}
          </span>
        </div>

        {!isLast && (
          <div className="top-[64px] sm:top-[84px] md:top-[108px] left-1/2 absolute bg-primary-gold w-[2px] h-[calc(100%+48px)] sm:h-[calc(100%+32px)] md:h-[calc(100%+48px)] -translate-x-1/2" />
        )}
      </div>

      <div className="flex flex-col flex-1 gap-2 bg-surface-floating shadow-sm sm:p-5 md:p-6 px-3 py-4 rounded-2xl">
        <h3 className="text-text-strong-1000 text-title-sm md:text-title-lg">
          {title}
        </h3>

        <p className="text-body-md-regular text-text-subtle-700 md:text-body-lg-regular">
          {description}
        </p>
      </div>
    </div>
  );
}
