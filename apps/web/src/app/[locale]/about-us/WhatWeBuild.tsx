import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { HTMLAttributes, memo, ReactNode } from "react";

import grxLogoCard from "./(assets)/grx-logo-card.png";

const WHAT_WE_BUILD_ICONS = {
  checkCircle: "/about-us/icons/check-circle.svg",
  chartHistogram: "/about-us/icons/chart-histogram.svg",
  send: "/about-us/icons/send.svg",
  shield: "/about-us/icons/shield.svg",
  globe: "/about-us/icons/globe.svg",
} as const;

export async function WhatWeBuildSection() {
  const t = await getTranslations("AboutUsPage.whatWeBuild");
  return (
    <section className="flex flex-col items-center bg-bg-weak-100 px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-unbounded text-display-sm text-text-strong-1000 md:text-display-md text-ellipsis">
            {t("title")}
          </h3>
          <h4 className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("subtitle")}
          </h4>
        </div>

        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <WhatWeBuildCardRoot className="justify-center items-center bg-neutral-1000">
            <div className="relative">
              <Image
                src={grxLogoCard}
                alt=""
                className="object-contain"
                sizes="164px"
                loading="lazy"
              />
            </div>
          </WhatWeBuildCardRoot>

          <WhatWeBuildCard
            title={t("transparencyCompliance")}
            description={t("transparencyComplianceDescription")}
            iconSrc={WHAT_WE_BUILD_ICONS.checkCircle}
          />
          <WhatWeBuildCard
            title={t("scalabilityInnovation")}
            description={t("scalabilityInnovationDescription")}
            iconSrc={WHAT_WE_BUILD_ICONS.chartHistogram}
          />
          <WhatWeBuildCard
            title={t("easeOfUse")}
            description={t("easeOfUseDescription")}
            iconSrc={WHAT_WE_BUILD_ICONS.send}
          />
          <WhatWeBuildCard
            title={t("securityTrust")}
            description={t("securityTrustDescription")}
            iconSrc={WHAT_WE_BUILD_ICONS.shield}
          />
          <WhatWeBuildCard
            title={t("opennessForAll")}
            description={t("opennessForAllDescription")}
            iconSrc={WHAT_WE_BUILD_ICONS.globe}
          />
        </div>
      </div>
    </section>
  );
}

type WhatWeBuildCardProps = {
  title: ReactNode;
  description?: ReactNode;
  iconSrc: string;
};

const WhatWeBuildCard = memo(
  ({ title, description, iconSrc }: WhatWeBuildCardProps) => {
    return (
      <WhatWeBuildCardRoot>
        <div className="flex justify-center items-center bg-bg-weak-100 rounded-lg w-12 h-12 text-icon-base-500">
          <img src={iconSrc} alt="" className="w-6 h-6" aria-hidden />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-text-strong-1000 text-title-sm md:text-title-lg text-center">
            {title}
          </h4>

          {!!description && (
            <p className="text-body-xl-regular text-text-soft-500 text-center">
              {description}
            </p>
          )}
        </div>
      </WhatWeBuildCardRoot>
    );
  }
);
WhatWeBuildCard.displayName = "WhatWeBuildCard";

const WhatWeBuildCardRoot = memo(
  ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={twMerge(
          "flex flex-col justify-center items-center gap-10 bg-surface-floating shadow-sm p-6 rounded-2xl min-h-72 md:min-h-80",
          className
        )}
        {...props}
      />
    );
  }
);
WhatWeBuildCardRoot.displayName = "WhatWeBuildRootCard";
