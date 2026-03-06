import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import ourVisionPng from "./(assets)/vision.webp";
import Image from "next/image";
import { memo, ReactNode } from "react";

export async function WhoAreWeSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col bg-bg-base">
      <div className="relative flex flex-col lg:flex-row gap-5 lg:gap-5 items-stretch mx-auto px-4 md:px-8 xl:px-0 py-20 md:py-24 w-full max-w-[1180px]">
        <div className="flex flex-col gap-5 w-full lg:max-w-[580px]">
          <DescriptionCard
            className="min-h-[320px]"
            title={t("AboutUsPage.whoAreWe.title")}
            description={t("AboutUsPage.whoAreWe.description")}
          />
          <DescriptionCard
            title={t("AboutUsPage.whoAreWe.visionTitle")}
            description={t("AboutUsPage.whoAreWe.visionDescription")}
          />
        </div>

        <div className="relative rounded-2xl w-full lg:w-[580px] lg:max-w-[580px] min-h-[280px] sm:min-h-[525px] lg:min-h-[525px] overflow-hidden shrink-0">
          <Image className="object-cover" src={ourVisionPng} alt="" fill />
        </div>
      </div>
    </section>
  );
}

type DescriptionCardProps = {
  className?: string;
  title: ReactNode;
  description: ReactNode;
};

const DescriptionCard = memo(
  ({ className, title, description }: DescriptionCardProps) => {
    return (
      <div
        className={clsx(
          "flex flex-col gap-4 bg-surface-floating shadow-sm p-6 rounded-2xl text-left",
          className
        )}
      >
        <h2 className="text-heading-h5 text-text-strong-1000 md:text-heading-h4">
          {title}
        </h2>

        <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium whitespace-pre-wrap">
          {description}
        </p>
      </div>
    );
  }
);

DescriptionCard.displayName = "DescriptionCard";
