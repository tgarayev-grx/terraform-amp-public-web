import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { Logo } from "@grx/ui/icons/brand/logo";
import { ShieldIcon } from "@grx/ui/icons/ShieldIcon";
import { BankIcon } from "@grx/ui/icons/BankIcon";
import { HTMLAttributes, memo, ReactNode } from "react";
import { GoldIcon } from "@grx/ui/icons/GoldIcon";
import { GlobeIcon } from "@grx/ui/icons/GlobeIcon";
import { LockIcon } from "@grx/ui/icons/LockIcon";

export async function WhatWeBuildSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center bg-bg-weak-100 px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-unbounded text-display-sm text-text-strong-1000 md:text-display-md text-ellipsis">
            {t("AboutUsPage.whatWeBuild.title")}
          </h3>
          <h4 className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("AboutUsPage.whatWeBuild.subtitle")}
          </h4>
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <WhatWeBuildCardRoot className="justify-start items-start bg-neutral-1000">
            <Logo className="mt-4 ml-4 w-[150px] h-[120px] text-gold-500" />
          </WhatWeBuildCardRoot>

          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.bankingCustody")}
            icon={<BankIcon className="w-6 h-6" />}
          />
          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.complianceAudit")}
            icon={<ShieldIcon className="w-6 h-6" />}
          />
          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.assetTokenization")}
            description={t(
              "AboutUsPage.whatWeBuild.assetTokenizationDescription"
            )}
            icon={<GoldIcon className="w-6 h-6" />}
          />
          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.distributionRails")}
            description={t(
              "AboutUsPage.whatWeBuild.distributionRailsDescription"
            )}
            icon={<GlobeIcon className="w-6 h-6" />}
          />
          <WhatWeBuildCard
            title={t("AboutUsPage.whatWeBuild.digitalAssetsAccess")}
            icon={<LockIcon className="w-6 h-6" />}
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
        <div className="flex justify-center items-center bg-bg-weak-100 rounded-[10px] w-12 h-12 text-icon-base-500">
          {icon}
        </div>

        <div>
          <h4 className="text-text-strong-1000 text-title-sm md:text-title-lg text-center">
            {title}
          </h4>

          {!!description && (
            <h5 className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium text-center">
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
        className={twMerge(
          "flex flex-col justify-center items-center gap-6 bg-surface-floating shadow-sm p-6 rounded-2xl min-h-[266px] md:min-h-[320px]",
          className
        )}
        {...props}
      />
    );
  }
);
WhatWeBuildCardRoot.displayName = "WhatWeBuildRootCard";
