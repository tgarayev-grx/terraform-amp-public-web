import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Badge } from "@grx/ui/components/badge";
import { Theme } from "@grx/ui/theme";

import { WaitlistForm } from "@/modules/waitlist";
import dashboardSvg from "./(assets)/dashboard.svg";
import iphoneFrameSvg from "./(assets)/iphone-frame.svg";

export async function HeroSection() {
  const t = await getTranslations("Rwa.hero");

  return (
    <Theme theme="dark" asChild>
      <section className="relative flex flex-col items-center bg-bg-base overflow-hidden">
        <div className="flex flex-col items-center gap-8 px-4 pt-20 sm:pt-40 w-full max-w-[1180px] text-center sm:px-8">
          <div className="flex flex-col items-center gap-4 w-full max-w-[780px]">
            <div className="flex flex-col items-center gap-4">
              <Badge size="xs" palette="info" variant="light">
                {t("badge")}
              </Badge>

              <span className="font-unbounded text-sm uppercase tracking-[-0.56px] leading-[1.1] rwa-gold-gradient">
                {t("product")}
              </span>
            </div>

            <h1 className="font-unbounded text-display-md text-text-strong-1000 sm:text-display-xl">
              {t("title")}
            </h1>

            <p className="text-body-lg-medium text-text-subtle-700 sm:text-body-xl-medium">
              {t("subtitle")}
            </p>
          </div>

          <WaitlistForm />
        </div>

        <div className="hidden sm:flex justify-center w-full px-8 mt-10 md:mt-16">
          <Image
            className="w-full max-w-[980px]"
            src={dashboardSvg}
            alt={t("dashboardAlt")}
            priority
            unoptimized
          />
        </div>

        <div className="flex sm:hidden justify-center w-full px-7 mt-10">
          <Image
            className="w-full max-w-[321px]"
            src={iphoneFrameSvg}
            alt={t("dashboardAlt")}
            priority
            unoptimized
          />
        </div>
      </section>
    </Theme>
  );
}
