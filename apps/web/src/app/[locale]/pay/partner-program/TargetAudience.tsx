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
        "flex flex-col gap-6 rounded-2xl bg-white p-6 min-h-[272px] sm:h-full shadow-light-sm",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-[10px] flex-shrink-0">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-neutral-900 text-[18px] leading-[22px] md:text-[24px] md:leading-[28px]">
          {title}
        </h3>
        <p className="text-neutral-700 text-sm leading-[20px] md:text-base md:leading-[24px]">
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
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="flex flex-col gap-4 items-center text-center mb-12 sm:mb-14">
          <h2 className="font-unbounded font-bold text-[28px] sm:text-[36px] leading-[32px] sm:leading-[40px] text-neutral-900 max-w-[780px]">
            {t("Pay.PartnerProgram.targetAudience.title")}
          </h2>
          <p className="font-medium text-neutral-700 text-base sm:text-xl leading-[24px] sm:leading-[26px] max-w-full">
            {t("Pay.PartnerProgram.targetAudience.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-5">
          {audiences.map((audience) => (
            <TargetAudienceCard key={audience.title} {...audience} />
          ))}
        </div>
      </div>
    </section>
  );
}
