import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import clsx from "clsx";
import Image from "next/image";
import { ButtonRoot, ButtonText } from "@grx/ui/index";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";

import caseStudiesPng from "./(assets)/case-studies.png";
import { ArrowRightIcon } from "./(icons)/ArrowRightIcon";
import { QuoteIcon } from "./(icons)/QuoteIcon";
import { Company1LogoIcon } from "./(icons)/Company1LogoIcon";
import { Company2LogoIcon } from "./(icons)/Company2LogoIcon";
import { Company3LogoIcon } from "./(icons)/Company3LogoIcon";
import { twMerge } from "tailwind-merge";

export async function CaseStudiesSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded text-heading-h5 text-text-strong-1000 md:text-heading-h3 text-center">
            {t("Pay.Root.caseStudies.title")}
          </h3>
          <h4 className="text-body-lg-medium text-text-subtle-700 sm:text-body-xl-medium">
            {t("Pay.Root.caseStudies.subtitle")}
          </h4>
        </div>

        <div className="gap-6 xl:gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 xl:grid-rows-2">
          <CaseStudyCard
            className="md:col-span-2 xl:col-span-1 xl:row-span-2 bg-bg-base-1000 md:min-h-[560px!important]"
            classes={{
              quote: "text-gold-500",
              description: "text-text-inverce",
              icon: "text-text-inverce",
            }}
            description={t("Pay.Root.caseStudies.descriptions.0")}
            icon={<Company1LogoIcon />}
          />
          <CaseStudyCard
            className="md:col-span-2 xl:col-start-2 xl:row-start-1 bg-gold-500 text-neutral-1000"
            classes={{
              quote: "text-neutral-1000",
            }}
            description={t("Pay.Root.caseStudies.descriptions.1")}
            icon={<Company2LogoIcon />}
          />
          <div className="md:contents xl:gap-6 xl:grid xl:grid-cols-2 xl:col-start-2 xl:row-start-2 xl:mr-[-24px]">
            <CaseStudyCard
              className="col-span-2 bg-surface-floating text-text-strong-1000"
              classes={{
                quote: "text-gold-500",
                icon: "text-text-subtle-700",
              }}
              description={t("Pay.Root.caseStudies.descriptions.2")}
              icon={<Company3LogoIcon />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type CaseStudyCardProps = {
  className?: string;
  classes?: {
    root?: string;
    quote?: string;
    description?: string;
    icon?: string;
  };
  description: string;
  icon: ReactNode;
};

function CaseStudyCard({
  className,
  classes,
  description,
  icon,
}: CaseStudyCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-between shadow-sm p-6 rounded-2xl min-h-[356px] md:min-h-[306px]",
        classes?.root,
        className
      )}
    >
      <div className="flex flex-col gap-2 mb-10 xl:mb-6">
        <div className={clsx("w-5 h-5", classes?.quote)}>
          <QuoteIcon />
        </div>

        <p
          className={twMerge(
            "text-body-lg-medium md:text-body-xl-medium whitespace-pre-wrap",
            classes?.description
          )}
        >
          {description}
        </p>
      </div>

      <div className={clsx("flex justify-end items-center", classes?.icon)}>
        {icon}
      </div>
    </div>
  );
}
