import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import { ReactNode } from "react";
import { OpenFinanceIcon } from "./(icons)/OpenFinanceIcon";
import { WarehousingIcon } from "./(icons)/WarehousingIcon";
import { MarketingIcon } from "./(icons)/MarketingIcon";
import { SoftwareDevelopmentIcon } from "./(icons)/SoftwareDevelopmentIcon";

type TargetAudienceItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

type TargetAudienceCardProps = TargetAudienceItem & {
  className?: string;
};

function TargetAudienceCard({
  icon,
  title,
  description,
  className,
}: TargetAudienceCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-6 bg-white shadow-sm p-6 rounded-2xl sm:h-full min-h-[272px]",
        className
      )}
    >
      <div className="flex flex-shrink-0 justify-center items-center bg-neutral-100 rounded-[10px] w-12 h-12">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-[18px] text-neutral-900 md:text-[24px] leading-[22px] md:leading-[28px]">
          {title}
        </h3>
        <p className="text-neutral-700 text-sm md:text-base leading-[20px] md:leading-[24px]">
          {description}
        </p>
      </div>
    </div>
  );
}

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
    <section className="flex flex-col items-center bg-white px-4 sm:px-8 py-20 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-14 text-center">
          <h2 className="max-w-[780px] font-unbounded font-bold text-[28px] text-neutral-900 sm:text-[36px] leading-[32px] sm:leading-[40px]">
            {t("Pay.PartnerProgram.targetAudience.title")}
          </h2>
          <p className="max-w-full font-medium text-neutral-700 text-base sm:text-xl leading-[24px] sm:leading-[26px]">
            {t("Pay.PartnerProgram.targetAudience.subtitle")}
          </p>
        </div>

        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr">
          {audiences.map((audience) => (
            <TargetAudienceCard key={audience.title} {...audience} />
          ))}
        </div>
      </div>
    </section>
  );
}
