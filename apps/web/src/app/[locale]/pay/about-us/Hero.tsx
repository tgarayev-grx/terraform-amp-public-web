import { getTranslations } from "next-intl/server";
import Image from "next/image";

import heroBackgroundImagePng from "./(assets)/ill_buycrypto.webp";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col bg-neutral-50 pt-[80px] sm:pt-[112px] lg:pt-[80px] pb-12 min-h-[800px] overflow-hidden sm:text-left text-center">
      <div className="relative flex lg:flex-row flex-col flex-grow sm:justify-between gap-8 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col lg:justify-center px-4 sm:px-8">
          <h1 className="mb-4 sm:max-w-[580px] font-unbounded font-bold text-[36px] sm:text-[48px] leading-[40px] sm:leading-[56px] tracking-[0.5%] tracking-0">
            {t("Pay.AboutUs.hero.title")}
          </h1>

          <h2 className="mb-8 lg:max-w-[680px] font-medium text-[16px] text-neutral-700 sm:text-[20px] leading-[24px] sm:leading-[26px]">
            {t("Pay.AboutUs.hero.subtitle")}
          </h2>
        </div>

        <Image
          src={heroBackgroundImagePng}
          alt={t("Pay.AboutUs.hero.imageAlt")}
          className="lg:w-[505px] h-[475px] lg:h-[640px] object-contain"
        />
      </div>
    </section>
  );
}
