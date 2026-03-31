import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Badge } from "@grx/ui/components/badge";
import { Theme } from "@grx/ui/theme";

import exchangePreviewImg from "./(assets)/exchange-desktop-preview.webp";
import phoneMockupExchangeImg from "./(assets)/exchange-mobile.webp";
import { PhoneMockup } from "./AssetsSection";
import { WaitlistForm } from "@/modules/waitlist";

export async function HeroSection() {
  const t = await getTranslations("Exchange.hero");

  return (
    <Theme theme="dark" asChild>
      <section className="relative flex flex-col items-center bg-surface-canvas h-auto md:h-[71.625rem] overflow-hidden">
        <div className="z-10 relative flex flex-col items-center gap-8 px-4 md:px-0 pt-[6.25rem] sm:pt-30 md:pt-44 w-[48.75rem] max-w-full text-center">
          <div className="flex flex-col items-center gap-4">
            <Badge size="xs" palette="warning" variant="light">
              {t("badge")}
            </Badge>

            <span className="font-bounded text-body-md-medium uppercase leading-[1.1] tracking-[-0.56px] gold-gradient-text">
              {t("product")}
            </span>
          </div>

          <h1 className="font-bounded text-heading-h2 text-text-strong-1000 md:text-display-xl tracking-[0.28px]">
            {t("title")}
          </h1>

          <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("subtitle")}
          </p>

          <WaitlistForm source="EXCHANGE" />
        </div>

        <div className="relative flex flex-col flex-1 justify-end mt-16 md:mt-20 w-full max-w-[61.25rem]">
          <div className="md:hidden flex justify-center w-full">
            <PhoneMockup
              src={phoneMockupExchangeImg}
              alt={t("platformPreviewAlt")}
              className="w-[85%] max-w-[26.25rem]"
            />
          </div>

          <Image
            src={exchangePreviewImg}
            alt={t("platformPreviewAlt")}
            className="hidden md:block rounded-t-[1.875rem] w-full h-auto"
            sizes="(max-width: 768px) 100vw, 980px"
            priority
            unoptimized
          />
        </div>
      </section>
    </Theme>
  );
}
