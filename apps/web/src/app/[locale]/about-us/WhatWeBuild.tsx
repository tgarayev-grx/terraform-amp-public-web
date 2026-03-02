import { getTranslations } from "next-intl/server";

import { Logo } from "@grx/ui/icons/brand/logo";
import { ShieldIcon } from "../pay/(icons)/ShieldIcon";
import { BankIcon } from "../pay/(icons)/BankIcon";
import { HTMLAttributes, memo, ReactNode } from "react";
import { GoldIcon } from "../pay/(icons)/GoldIcon";
import { GlobeIcon } from "../pay/(icons)/GlobeIcon";
import { LockIcon } from "../pay/(icons)/LockIcon";
import clsx from "clsx";

export async function WhatWeBuildSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center bg-neutral-100 dark:bg-neutral-800 px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-unbounded font-bold text-[28px] lg:text-4xl leading-[32px]">
            {t("AboutUsPage.whatWeBuild.title")}
          </h3>
          <h4 className="font-medium text-neutral-700 lg:text-[20px] dark:text-neutral-400 text-base lg:leading-[26px]">
            {t("AboutUsPage.whatWeBuild.subtitle")}
          </h4>
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <WhatWeBuildCardRoot className="justify-start items-start bg-neutral-1000">
            <Logo className="mt-4 ml-4 w-[150px] h-[120px] text-gold-500" />
          </WhatWeBuildCardRoot>

          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.bankingCustody")}
            icon={
              <BankIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-400" />
            }
          />
          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.complianceAudit")}
            icon={
              <ShieldIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-400" />
            }
          />
          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.assetTokenization")}
            description={t(
              "AboutUsPage.whatWeBuild.assetTokenizationDescription"
            )}
            icon={
              <GoldIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-400" />
            }
          />
          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.distributionRails")}
            description={t(
              "AboutUsPage.whatWeBuild.distributionRailsDescription"
            )}
            icon={
              <GlobeIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-400" />
            }
          />
          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.digitalAssetsAccess")}
            icon={
              <LockIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-400" />
            }
          />
        </div>
      </div>
    </section>
  );
}

type WhatWeBuildCardProps = {
  title: ReactNode;
  description?: ReactNode;
  icon: ReactNode;
};

const WhatWeBuildCard = memo(
  ({ title, description, icon }: WhatWeBuildCardProps) => {
    return (
      <WhatWeBuildCardRoot>
        <div className="flex justify-center items-center bg-neutral-100 dark:bg-neutral-800 rounded-[10px] w-12 h-12">
          {icon}
        </div>

        <div>
          <h4 className="font-bold text-[18px] md:text-[24px] text-center leading-[22px] md:leading-[28px] tracking-[-0.072px] md:tracking-[0]">
            {title}
          </h4>

          {!!description && (
            <h5 className="text-[20px] text-neutral-700 dark:text-neutral-400 text-center leading-[26px]">
              {description}
            </h5>
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
        className={clsx(
          "flex flex-col justify-center items-center gap-6 shadow-sm dark:shadow-dark-sm p-6 rounded-2xl min-h-[266px] md:min-h-[320px]",
          !className?.includes("bg-") && "bg-neutral dark:bg-card",
          className
        )}
        {...props}
      />
    );
  }
);
WhatWeBuildCardRoot.displayName = "WhatWeBuildRootCard";
