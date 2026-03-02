import { getTranslations } from "next-intl/server";
import Image from "next/image";

import heroBackgroundImagePng from "./(assets)/ill_buycrypto.webp";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col bg-surface-canvas pt-[80px] sm:pt-[112px] lg:pt-[80px] pb-12 min-h-[800px] overflow-hidden sm:text-left text-center">
      <div className="relative flex lg:flex-row flex-col flex-grow sm:justify-between gap-8 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col lg:justify-center px-4 sm:px-8">
          <h1 className="mb-4 sm:max-w-[580px] font-unbounded text-display-md text-text-strong-1000 sm:text-display-lg">
            {t("Pay.AboutUs.hero.title")}
          </h1>

          <h2 className="mb-8 lg:max-w-[680px] text-body-md-medium text-text-subtle-700 md:text-body-lg-medium">
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
