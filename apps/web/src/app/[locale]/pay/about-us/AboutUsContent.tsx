import { getTranslations } from "next-intl/server";
import Image from "next/image";
import clsx from "clsx";

import demoImage from "./(assets)/demo.webp";
import demoXsImage from "./(assets)/demo-xs.webp";

export async function AboutUsContentSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col bg-neutral-1000 px-4 sm:px-8 py-16 sm:py-20 lg:py-24 text-neutral-50">
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col items-center mx-auto max-w-[680px] text-center">
          <h2 className="mb-6 font-unbounded font-bold text-[28px] sm:text-[36px] leading-[32px] sm:leading-[40px]">
            {t("Pay.AboutUs.content.title")}
          </h2>

          <p className="font-medium text-neutral-300 sm:text-[20px] text-base sm:leading-[26px]">
            {t("Pay.AboutUs.content.description")}
          </p>
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-12 lg:gap-16">
          <div className="flex flex-col lg:max-w-[520px]">
            <h3 className="mb-6 font-bold text-[22px] sm:text-[28px] leading-[28px] sm:leading-[34px]">
              {t("Pay.AboutUs.content.title2")}
            </h3>

            <p className="font-medium text-[15px] text-neutral-300 sm:text-[16px] leading-[22px] sm:leading-[24px]">
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

        <div
          className={clsx(
            "gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            "mt-4"
          )}
        >
          <div
            className="flex flex-col gap-4 bg-[#1d1d1d] p-6 rounded-2xl"
            style={{
              boxShadow:
                "0 0.5px 0 0 rgba(255, 255, 255, 0.08) inset, 0 3px 8px 0 rgba(0, 0, 0, 0.35), 0 0 0.5px 0 rgba(255, 255, 255, 0.30) inset, 0 1px 3px 0 rgba(0, 0, 0, 0.50)",
            }}
          >
            <h4 className="font-bold text-[18px] text-white sm:text-[24px] leading-[22px] sm:leading-[28px]">
              {t("Pay.AboutUs.content.cards.1.title")}
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base">
              {t("Pay.AboutUs.content.cards.1.description")}
            </p>
          </div>

          <div
            className="flex flex-col gap-4 bg-[#1d1d1d] p-6 rounded-2xl"
            style={{
              boxShadow:
                "0 0.5px 0 0 rgba(255, 255, 255, 0.08) inset, 0 3px 8px 0 rgba(0, 0, 0, 0.35), 0 0 0.5px 0 rgba(255, 255, 255, 0.30) inset, 0 1px 3px 0 rgba(0, 0, 0, 0.50)",
            }}
          >
            <h4 className="font-bold text-[18px] text-white sm:text-[24px] leading-[22px] sm:leading-[28px]">
              {t("Pay.AboutUs.content.cards.2.title")}
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base">
              {t("Pay.AboutUs.content.cards.2.description")}
            </p>
          </div>

          <div
            className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1 bg-[#1d1d1d] p-6 rounded-2xl"
            style={{
              boxShadow:
                "0 0.5px 0 0 rgba(255, 255, 255, 0.08) inset, 0 3px 8px 0 rgba(0, 0, 0, 0.35), 0 0 0.5px 0 rgba(255, 255, 255, 0.30) inset, 0 1px 3px 0 rgba(0, 0, 0, 0.50)",
            }}
          >
            <h4 className="font-bold text-[18px] text-white sm:text-[24px] leading-[22px] sm:leading-[28px]">
              {t("Pay.AboutUs.content.cards.3.title")}
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base">
              {t("Pay.AboutUs.content.cards.3.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
