import { getTranslations } from "next-intl/server";
import { memo } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

import securityAndTrustPng from "./(assets)/foundation-security-and-trust.png";
import simplicityInUxPng from "./(assets)/foundation-simplicity-in-ux.png";
import transparancyAndCompliancePng from "./(assets)/foundation-transparancy-and-compliance.png";
import scalabilityAndInnovationPng from "./(assets)/foundation-scalability-and-innovation.png";

export async function FoundationSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            The foundation of GRX
          </h3>
        </div>

        <div className="flex flex-col gap-12 mx-auto max-w-[980px]">
          <FeatureCard
            title="Security & Trust"
            description="Institutional-grade security architecture designed to safeguard digital and real-world assets across their entire lifecycle."
            start={securityAndTrustPng}
            alt="Security and Trust"
          />

          <FeatureCard
            title="Simplicity in User Experience"
            description="A unified, intuitive platform that makes complex asset operations manageable — from custody to transactions and reporting."
            end={simplicityInUxPng}
            alt=""
          />
          <FeatureCard
            title="Transparency & Compliance"
            description="Compliance-first infrastructure with transparent processes designed to support regulatory requirements across jurisdictions."
            start={transparancyAndCompliancePng}
            alt=""
          />
          <FeatureCard
            title="Scalability & Innovation"
            description="Modular, API-first architecture built to support high-volume operations and the future expansion of real-world assets on-chain."
            end={scalabilityAndInnovationPng}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  start?: StaticImageData;
  end?: StaticImageData;
  alt: string;
};
const FeatureCard = memo(
  ({ title, description, start, end, alt }: FeatureCardProps) => {
    return (
      <div
        className={clsx("flex md:flex-row flex-col gap-5", {
          "flex-col-reverse": !!end,
        })}
      >
        {!!start && (
          <Image
            className="w-[200px] md:w-[242px] xl:w-[280px] h-[200px] md:h-[242px] xl:h-[280px] object-cover"
            src={start}
            alt={alt}
          />
        )}

        <div className="flex flex-col flex-grow md:justify-center gap-2">
          <h3 className="font-bold text-[36px] leading-[40px]">{title}</h3>

          <div className="max-w-[680px] text-[20px] text-neutral-500 leading-[26px]">
            {description}
          </div>
        </div>

        {!!end && (
          <Image
            className="w-[200px] md:w-[242px] xl:w-[280px] h-[200px] md:h-[242px] xl:h-[280px] object-cover"
            src={end}
            alt={alt}
          />
        )}
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";
