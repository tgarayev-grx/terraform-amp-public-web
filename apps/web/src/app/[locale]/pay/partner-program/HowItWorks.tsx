import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";
import { SALES_EMAIL } from "./constants";

type StepCardProps = {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
};

function StepCard({ number, title, description, isLast }: StepCardProps) {
  return (
    <div className="relative flex items-center gap-4 sm:gap-8 md:gap-10 w-full">
      <div className="relative flex flex-col flex-shrink-0 items-center">
        <div className="flex justify-center items-center bg-[#1d1d1d] shadow-dark-sm rounded-full w-16 sm:w-[84px] md:w-[108px] h-16 sm:h-[84px] md:h-[108px]">
          <span className="font-unbounded font-bold text-[24px] text-white sm:text-[30px] md:text-[36px] leading-[32px] sm:leading-[34px] md:leading-[40px]">
            {number}
          </span>
        </div>
        {!isLast && (
          <div className="top-[64px] sm:top-[84px] md:top-[108px] left-1/2 absolute bg-yellow-500 w-[2px] h-[calc(100%+48px)] sm:h-[calc(100%+32px)] md:h-[calc(100%+48px)] -translate-x-1/2" />
        )}
      </div>

      <div className="flex flex-col flex-1 gap-2 bg-[#1d1d1d] shadow-dark-sm sm:p-5 md:p-6 px-3 py-4 rounded-2xl">
        <h3 className="font-bold text-[18px] text-white sm:text-[22px] md:text-[24px] leading-[22px] sm:leading-[26px] md:leading-[28px]">
          {title}
        </h3>
        <p className="text-neutral-300 sm:text-[15px] text-sm md:text-base leading-[20px] sm:leading-[22px] md:leading-[24px]">
          {description}
        </p>
      </div>
    </div>
  );
}

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
    <section className="flex flex-col items-center bg-neutral-1000 px-4 sm:px-8 py-20 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="mb-12 sm:mb-14 font-unbounded font-bold text-[28px] text-white sm:text-[36px] text-center leading-[32px] sm:leading-[40px]">
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
              <ButtonText>
                {t("Pay.PartnerProgram.howItWorks.contactUs")}
              </ButtonText>
            </Link>
          </ButtonRoot>
        </div>
      </div>
    </section>
  );
}
