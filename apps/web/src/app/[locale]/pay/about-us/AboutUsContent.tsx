import { getTranslations } from "next-intl/server";
import Image from "next/image";

import demoImage from "./(assets)/demo.webp";
import demoXsImage from "./(assets)/demo-xs.webp";

export async function AboutUsContentSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col bg-bg-weak-100 px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col items-center mx-auto max-w-[680px] text-center">
          <h2 className="mb-6 font-bounded text-display-sm text-text-strong-1000 sm:text-display-md">
            {t("Pay.AboutUs.content.title")}
          </h2>

          <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("Pay.AboutUs.content.description")}
          </p>
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-12 lg:gap-16">
          <div className="flex flex-col lg:max-w-[520px]">
            <h3 className="mb-6 text-text-strong-1000 text-title-lg md:text-heading-h4">
              {t("Pay.AboutUs.content.title2")}
            </h3>

            <p className="text-body-md-regular text-text-subtle-700 md:text-body-lg-regular">
              {t("Pay.AboutUs.content.description2")}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <Image
              src={demoImage}
              alt={t("Pay.AboutUs.content.demoImageAlt")}
              className="hidden min-[376px]:block w-full object-contain"
            />
            <Image
              src={demoXsImage}
              alt={t("Pay.AboutUs.content.demoImageAlt")}
              className="min-[376px]:hidden h-[400px] object-cover"
            />
          </div>
        </div>

        <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          <div className="flex flex-col gap-4 bg-surface-floating shadow-sm p-6 rounded-2xl">
            <h4 className="text-text-strong-1000 text-title-sm md:text-title-lg">
              {t("Pay.AboutUs.content.cards.1.title")}
            </h4>
            <p className="text-body-md-regular text-text-subtle-700 md:text-body-lg-regular">
              {t("Pay.AboutUs.content.cards.1.description")}
            </p>
          </div>

          <div className="flex flex-col gap-4 bg-surface-floating shadow-sm p-6 rounded-2xl">
            <h4 className="text-text-strong-1000 text-title-sm md:text-title-lg">
              {t("Pay.AboutUs.content.cards.2.title")}
            </h4>
            <p className="text-body-md-regular text-text-subtle-700 md:text-body-lg-regular">
              {t("Pay.AboutUs.content.cards.2.description")}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1 bg-surface-floating shadow-sm p-6 rounded-2xl">
            <h4 className="text-text-strong-1000 text-title-sm md:text-title-lg">
              {t("Pay.AboutUs.content.cards.3.title")}
            </h4>
            <p className="text-body-md-regular text-text-subtle-700 md:text-body-lg-regular">
              {t("Pay.AboutUs.content.cards.3.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
