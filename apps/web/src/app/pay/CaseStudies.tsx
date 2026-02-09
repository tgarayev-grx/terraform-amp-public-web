import { memo, ReactNode } from "react";
import clsx from "clsx";
import Image from "next/image";
import { ButtonRoot, ButtonText } from "@grx/ui/index";
import Link from "next/link";

import caseStudiesPng from "./(assets)/case-studies.png";
import { ArrowRightIcon } from "./(icons)/ArrowRightIcon";
import { QuoteIcon } from "./(icons)/QuoteIcon";
import { Company1LogoIcon } from "./(icons)/Company1LogoIcon";
import { Company2LogoIcon } from "./(icons)/Company2LogoIcon";
import { Company3LogoIcon } from "./(icons)/Company3LogoIcon";

export const CaseStudiesSection = memo(() => {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h3 className="flex flex-col gap-4 mx-auto mb-14 max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl text-center leading-[32px] sm:leading-[40px]">
          Loved by
        </h3>

        <div className="gap-6 xl:gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 xl:grid-rows-2">
          <CaseStudyCard
            className="md:col-span-2 xl:col-span-1 xl:row-span-2 bg-neutral-1000 md:min-h-[560px!important] text-neutral-50"
            quoteClassName="text-gold-500"
            description={`We are thrilled to join forces with GRX Pay to enhance the payment experience for our customers. This collaboration underscores our commitment to providing innovative solutions that meet evolving needs. 

By seamlessly integrating crypto payment options into invoys links, we empower businesses with greater flexibility and convenience in managing their financial processes.`}
            icon={<Company1LogoIcon />}
          />
          <CaseStudyCard
            className="md:col-span-2 xl:col-start-2 xl:row-start-1 bg-gold-500 text-neutral-1000"
            quoteClassName="text-neutral-1000"
            description={`As a private jet charter company, PVJets has found GRX Pay to be an exceptional cryptocurrency payment platform. It offers our clients flexibility and ease with secure and efficient transactions. 
GRX Pay's support of multiple cryptocurrencies and its user-friendly interface ensure a smooth payment experience, enhancing our service delivery. Highly recommended for businesses integrating crypto payments.`}
            icon={<Company2LogoIcon />}
          />
          <div className="md:contents xl:gap-6 xl:grid xl:grid-cols-2 xl:col-start-2 xl:row-start-2 xl:mr-[-24px]">
            <CaseStudyCard
              className="bg-neutral-50 text-neutral-1000"
              quoteClassName="text-gold-500"
              description="The Superheroes.Marketing team continues cooperation with GRX Pay. Everything is cool: usability, communication. For our team it is a clear benefit :) We have a positive impression of using this service for our marketing agency."
              icon={<Company3LogoIcon />}
            />
            <div
              className="flex flex-col justify-between gap-4 p-6 rounded-2xl min-h-[356px] xl:min-h-[306px]"
              style={{
                boxShadow:
                  "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
              }}
            >
              <Image className="w-[195px]" src={caseStudiesPng} alt="" />

              <ButtonRoot
                palette="secondary"
                size="md"
                variant="contained"
                asChild
              >
                <Link href="/pay/cases">
                  <ButtonText>More case studies</ButtonText>

                  <ArrowRightIcon width={24} height={24} />
                </Link>
              </ButtonRoot>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
CaseStudiesSection.displayName = "BenefitsAndFeaturesSection";

type CaseStudyCardProps = {
  className?: string;
  quoteClassName?: string;
  description: string;
  icon: ReactNode;
};

const CaseStudyCard = memo(
  ({ className, quoteClassName, description, icon }: CaseStudyCardProps) => {
    return (
      <div
        className={clsx(
          "flex flex-col justify-between p-6 rounded-2xl min-h-[356px] md:min-h-[306px]",
          className
        )}
        style={{
          boxShadow:
            "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
        }}
      >
        <div className="flex flex-col gap-2 mb-10 xl:mb-6">
          <div className={clsx("w-5 h-5", quoteClassName)}>
            <QuoteIcon />
          </div>

          <p className="text-base whitespace-pre-wrap">{description}</p>
        </div>

        <div className="flex justify-end items-center">{icon}</div>
      </div>
    );
  }
);
CaseStudyCard.displayName = "CaseStudyCard";
