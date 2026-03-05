import { getTranslations } from "next-intl/server";
import { memo, ReactNode } from "react";
import clsx from "clsx";

import { ShieldIcon } from "@grx/ui/icons/ShieldIcon";
import { CubeIcon } from "@grx/ui/icons/CubeIcon";
import { ZoomOutIcon } from "@grx/ui/icons/ZoomOutIcon";

export async function TechnologySection() {
  const t = await getTranslations("Home");
  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded text-display-sm text-text-strong-1000 md:text-display-md">
            {t("technology.title")}
          </h3>

          <h4 className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("technology.subtitle")}
          </h4>
        </div>

        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          <FeatureCard
            title={t("technology.cloudNative.title")}
            description={t("technology.cloudNative.description")}
            icon={<CubeIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("technology.secureAndCompliant.title")}
            description={t("technology.secureAndCompliant.description")}
            icon={<ShieldIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("technology.scalableAndFlexible.title")}
            description={t("technology.scalableAndFlexible.description")}
            icon={<ZoomOutIcon width={24} height={24} />}
          />
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  className?: string;
  classes?: {
    root?: string;
    icon?: string;
    content?: string;
    title?: string;
    description?: string;
  };
  title: string;
  description: ReactNode;
  icon: ReactNode;
};
const FeatureCard = memo(
  ({ className, classes, title, description, icon }: FeatureCardProps) => {
    return (
      <div
        className={clsx(
          "flex flex-col items-center gap-10 border-stroke-soft-200 p-10 border rounded-2xl min-h-[292px]",
          classes?.root,
          className
        )}
      >
        <div
          className={clsx(
            "flex justify-center items-center bg-bg-weak-100 rounded-xl w-12 h-12 text-icon-base-500",
            classes?.icon
          )}
        >
          {icon}
        </div>

        <div
          className={clsx("flex flex-col items-center gap-2", classes?.content)}
        >
          <h3
            className={clsx(
              "text-text-strong-1000 text-title-sm md:text-title-lg",
              classes?.title
            )}
          >
            {title}
          </h3>

          <div
            className={clsx(
              "text-body-md-regular text-text-soft-500 md:text-body-lg-regular text-center",
              classes?.description
            )}
          >
            {description}
          </div>
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";
