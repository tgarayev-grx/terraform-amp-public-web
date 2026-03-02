import { getTranslations } from "next-intl/server";
import { memo } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

import securityAndTrustImg from "./(assets)/foundation-security-and-trust.webp";
import simplicityInUxImg from "./(assets)/foundation-simplicity-in-ux.webp";
import transparancyAndComplianceImg from "./(assets)/foundation-transparancy-and-compliance.webp";
import scalabilityAndInnovationImg from "./(assets)/foundation-scalability-and-innovation.webp";

export async function FoundationSection() {
  const t = await getTranslations("Home");
  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded text-display-sm text-text-strong-1000 sm:text-display-md">
            {t("foundation.title")}
          </h3>
        </div>

        <div className="flex flex-col gap-12 mx-auto max-w-[980px]">
          <FeatureCard
            title={t("foundation.securityAndTrust.title")}
            description={t("foundation.securityAndTrust.description")}
            start={securityAndTrustImg}
            alt={t("foundation.securityAndTrust.alt")}
          />

          <FeatureCard
            title={t("foundation.simplicityInUx.title")}
            description={t("foundation.simplicityInUx.description")}
            end={simplicityInUxImg}
            alt={t("foundation.simplicityInUx.alt")}
          />
          <FeatureCard
            title={t("foundation.transparencyAndCompliance.title")}
            description={t("foundation.transparencyAndCompliance.description")}
            start={transparancyAndComplianceImg}
            alt={t("foundation.transparencyAndCompliance.alt")}
          />
          <FeatureCard
            title={t("foundation.scalabilityAndInnovation.title")}
            description={t("foundation.scalabilityAndInnovation.description")}
            end={scalabilityAndInnovationImg}
            alt={t("foundation.scalabilityAndInnovation.alt")}
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
          <h3 className="text-heading-h5 text-text-strong-1000 md:text-heading-h3">
            {title}
          </h3>

          <div className="max-w-[680px] text-body-lg-medium text-text-soft-500 md:text-body-xl-medium">
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
