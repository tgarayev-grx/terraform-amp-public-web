import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import { ReactNode } from "react";
import { OpenFinanceIcon } from "./(icons)/OpenFinanceIcon";
import { WarehousingIcon } from "./(icons)/WarehousingIcon";
import { MarketingIcon } from "./(icons)/MarketingIcon";
import { SoftwareDevelopmentIcon } from "./(icons)/SoftwareDevelopmentIcon";
import { FeatureCard } from "../(components)/card";

type TargetAudienceItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

const AUDIENCE_ICONS: ReactNode[] = [
  <OpenFinanceIcon key="openFinance" className="size-6 text-neutral-500" />,
  <WarehousingIcon key="warehousing" className="size-6 text-neutral-500" />,
  <MarketingIcon key="marketing" className="size-6 text-neutral-500" />,
  <SoftwareDevelopmentIcon
    key="software"
    className="size-6 text-neutral-500"
  />,
];

export async function TargetAudienceSection() {
  const t = await getTranslations();

  const audiences: TargetAudienceItem[] = [
    {
      icon: AUDIENCE_ICONS[0],
      title: t("Pay.PartnerProgram.targetAudience.openFinance.title"),
      description: t(
        "Pay.PartnerProgram.targetAudience.openFinance.description"
      ),
    },
    {
      icon: AUDIENCE_ICONS[1],
      title: t("Pay.PartnerProgram.targetAudience.warehousing.title"),
      description: t(
        "Pay.PartnerProgram.targetAudience.warehousing.description"
      ),
    },
    {
      icon: AUDIENCE_ICONS[2],
      title: t("Pay.PartnerProgram.targetAudience.marketing.title"),
      description: t("Pay.PartnerProgram.targetAudience.marketing.description"),
    },
    {
      icon: AUDIENCE_ICONS[3],
      title: t("Pay.PartnerProgram.targetAudience.softwareDev.title"),
      description: t(
        "Pay.PartnerProgram.targetAudience.softwareDev.description"
      ),
    },
  ];

  return (
    <section className="flex flex-col items-center bg-surface-canvas px-4 sm:px-8 py-20 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-14 text-center">
          <h2 className="max-w-[780px] font-unbounded text-display-sm text-text-strong-1000 sm:text-display-md">
            {t("Pay.PartnerProgram.targetAudience.title")}
          </h2>
          <p className="max-w-full text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("Pay.PartnerProgram.targetAudience.subtitle")}
          </p>
        </div>

        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr">
          {audiences.map((audience) => (
            <FeatureCard
              key={audience.title}
              icon={audience.icon}
              title={audience.title}
              description={audience.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
