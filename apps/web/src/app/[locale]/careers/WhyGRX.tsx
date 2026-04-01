import iconFlash from "@/app/[locale]/careers/(assets)/flash-front-premium.webp";
import iconKey from "@/app/[locale]/careers/(assets)/key-front-premium.webp";
import iconMedal from "@/app/[locale]/careers/(assets)/medal-front-premium.webp";
import iconRocket from "@/app/[locale]/careers/(assets)/rocket-dynamic-premium.webp";
import iconSetting from "@/app/[locale]/careers/(assets)/setting-front-premium.webp";
import iconTarget from "@/app/[locale]/careers/(assets)/target-front-premium.webp";
import { getTranslations } from "next-intl/server";
import type { StaticImageData } from "next/image";
import Image from "next/image";

type CardKey =
  | "bigAmbition"
  | "buildFromGround"
  | "workThatMatters"
  | "freshCulture"
  | "autonomy"
  | "moveFast";

const CARDS: { key: CardKey; icon: StaticImageData; alt: string }[] = [
  { key: "bigAmbition", icon: iconTarget, alt: "" },
  { key: "buildFromGround", icon: iconSetting, alt: "" },
  { key: "workThatMatters", icon: iconMedal, alt: "" },
  { key: "freshCulture", icon: iconFlash, alt: "" },
  { key: "autonomy", icon: iconKey, alt: "" },
  { key: "moveFast", icon: iconRocket, alt: "" },
];

export async function WhyGRX() {
  const t = await getTranslations("CareersPage.whyGRX");

  return (
    <section className="w-full bg-surface-canvas">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-10 px-4 py-14 md:gap-14 md:py-20 lg:py-24">
        <h2 className="font-bounded text-[26px] font-bold leading-[30px] text-white sm:text-[28px] sm:leading-[32px] md:text-[32px] md:leading-[36px] lg:text-[36px] lg:leading-[40px]">
          {t("title")}
        </h2>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ key, icon, alt }) => (
            <div
              key={key}
              className="flex flex-col gap-4 rounded-2xl bg-surface-floating p-6 shadow-sm"
            >
              <Image src={icon} alt={alt} width={64} height={64} />
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] font-bold leading-[22px] text-text-strong-1000 md:text-[24px] md:leading-[28px]">
                  {t(`cards.${key}.title` as `cards.${CardKey}.title`)}
                </h3>
                <p className="text-[14px] font-normal leading-[20px] text-text-soft-500 md:text-[16px] md:leading-[24px]">
                  {t(`cards.${key}.body` as `cards.${CardKey}.body`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
