import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Badge } from "@grx/ui/components/badge";
import { Theme } from "@grx/ui/theme";

import { WaitlistForm } from "./WaitlistForm";
import exchangePreviewImg from "./(assets)/exchange-desktop-preview.webp";
import phoneMockupExchangeImg from "./(assets)/exchange-mobile.webp";
import { PhoneMockup } from "./AssetsSection";

export async function HeroSection() {
  const t = await getTranslations("Exchange.hero");

  return (
    <Theme theme="dark" asChild>
      <section className="relative flex flex-col items-center bg-surface-canvas overflow-hidden h-auto md:h-[71.625rem]">
        <div className="relative z-10 flex flex-col items-center gap-8 px-4 pt-[6.25rem] sm:pt-30 md:pt-44 md:px-0 w-[48.75rem] max-w-full text-center">
          <div className="flex flex-col items-center gap-4">
            <Badge size="xs" palette="warning" variant="light">
              {t("badge")}
            </Badge>

            <span className="font-unbounded text-body-md-medium uppercase tracking-[-0.56px] leading-[1.1] gold-gradient-text">
              {t("product")}
            </span>
          </div>

          <h1 className="font-unbounded text-heading-h2 md:text-display-xl text-text-strong-1000 tracking-[0.28px]">
            {t("title")}
          </h1>

          <p className="text-body-lg-medium md:text-body-xl-medium text-text-subtle-700">
            {t("subtitle")}
          </p>

          <WaitlistForm />
        </div>

        <div className="relative mt-16 md:mt-20 w-full max-w-[61.25rem] flex-1 flex flex-col justify-end">
          <div className="flex justify-center w-full md:hidden">
            <PhoneMockup
              src={phoneMockupExchangeImg}
              alt={t("platformPreviewAlt")}
              className="w-[85%] max-w-[26.25rem]"
            />
          </div>

          <Image
            src={exchangePreviewImg}
            alt={t("platformPreviewAlt")}
            className="hidden md:block w-full h-auto rounded-t-[1.875rem]"
            sizes="(max-width: 768px) 100vw, 980px"
            priority
            unoptimized
          />
        </div>
      </section>
    </Theme>
  );
}
