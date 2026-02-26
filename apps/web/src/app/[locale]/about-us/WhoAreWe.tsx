import { getTranslations } from "next-intl/server";

import ourVisionPng from "./(assets)/vision.webp";
import Image from "next/image";
import { memo, ReactNode } from "react";

export async function WhoAreWeSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col text-center">
      <div className="relative flex flex-col flex-grow sm:justify-between items-center gap-5 lg:grid lg:grid-cols-2 mx-auto px-4 md:px-8 xl:px-0 py-20 md:py-24 w-full max-w-[1180px]">
        <div className="flex flex-col gap-5 w-full">
          <DescriptionCard
            title={t("AboutUsPage.whoAreWe.title")}
            description={t("AboutUsPage.whoAreWe.description")}
          />

          <DescriptionCard
            title={t("AboutUsPage.whoAreWe.visionTitle")}
            description={t("AboutUsPage.whoAreWe.visionDescription")}
          />
        </div>

        <div className="relative rounded-2xl w-full min-h-[280px] sm:min-h-[525px] lg:min-h-full overflow-hidden">
          <Image className="object-cover" src={ourVisionPng} alt="" fill />
        </div>
      </div>
    </section>
  );
}

type DescriptionCardProps = {
  title: ReactNode;
  description: ReactNode;
};

const DescriptionCard = memo(({ title, description }: DescriptionCardProps) => {
  return (
    <div className="flex flex-col gap-4 shadow-light-sm dark:bg-card dark:shadow-dark-sm p-6 rounded-2xl text-left">
      <h2 className="font-bold text-[28px] md:text-[32px] leading-[32px] md:leading-[36px]">
        {title}
      </h2>

      <p className="text-neutral-700 dark:text-neutral-400 md:text-[18px] text-base md:leading-[26px] whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
});

DescriptionCard.displayName = "DescriptionCard";
