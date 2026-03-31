import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Badge } from "@grx/ui/components/badge";
import { Theme } from "@grx/ui/theme";

import { WaitlistForm } from "@/modules/waitlist";
import dashboardImg from "./(assets)/dashboard.webp";
import iphoneFrameImg from "./(assets)/rwa-mobile.webp";

export async function HeroSection() {
  const t = await getTranslations("Rwa.hero");

  return (
    <Theme theme="dark" asChild>
      <section className="relative flex flex-col items-center bg-bg-base overflow-hidden">
        <div className="flex flex-col items-center gap-8 px-4 sm:px-8 pt-20 sm:pt-40 w-full max-w-[1180px] text-center">
          <div className="flex flex-col items-center gap-4 w-full max-w-[780px]">
            <div className="flex flex-col items-center gap-4">
              <Badge size="xs" palette="info" variant="light">
                {t("badge")}
              </Badge>

              <span className="font-bounded text-sm uppercase leading-[1.1] tracking-[-0.56px] rwa-gold-gradient">
                {t("product")}
              </span>
            </div>

            <h1 className="font-bounded text-display-md text-text-strong-1000 sm:text-display-xl">
              {t("title")}
            </h1>

            <p className="text-body-lg-medium text-text-subtle-700 sm:text-body-xl-medium">
              {t("subtitle")}
            </p>
          </div>

          <WaitlistForm source="RWA" />
        </div>

        <div className="hidden sm:flex justify-center mt-10 md:mt-16 px-8 w-full">
          <Image
            className="w-full max-w-[980px]"
            src={dashboardImg}
            alt={t("dashboardAlt")}
            priority
            unoptimized
          />
        </div>

        <div className="sm:hidden flex justify-center mt-10 px-7 w-full">
          <Image
            className="w-full max-w-[321px]"
            src={iphoneFrameImg}
            alt={t("dashboardAlt")}
            priority
            unoptimized
          />
        </div>
      </section>
    </Theme>
  );
}
