import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Theme } from "@grx/ui/theme";

import phoneMockupAssetsImg from "./(assets)/phone-mockup-assets.webp";
import phoneMockupBitcoinImg from "./(assets)/phone-mockup-bitcoin.webp";
import phoneMockupExchangeImg from "./(assets)/phone-mockup-exchange.webp";
import coin3dLeftImg from "./(assets)/coin-3d-left.webp";
import coin3dRightImg from "./(assets)/coin-3d-right.webp";

export function PhoneMockup({
  src,
  alt,
  className,
}: {
  src: typeof phoneMockupAssetsImg;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 flex justify-center items-center ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        className="w-full h-auto pointer-events-none"
        sizes="(max-width: 768px) 250px, 400px"
        unoptimized
      />
    </div>
  );
}

export async function AssetsSection() {
  const t = await getTranslations("Exchange.assets");

  return (
    <Theme theme="dark" asChild>
      <section className="relative bg-bg-muted-50 pt-24 pb-20 overflow-hidden">
        <div className="z-10 relative flex flex-col items-center mx-auto px-4 sm:px-8 max-w-[73.75rem]">
          <div className="flex flex-col items-center gap-4 mb-20 px-4 md:px-0 w-[48.75rem] max-w-full text-center">
            <h2 className="font-unbounded text-heading-h4 text-text-strong-1000 sm:text-heading-h3 md:text-display-md">
              {t("title")}
            </h2>
            <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
              {t("subtitle")}
            </p>
          </div>

          <div className="relative flex justify-center items-start gap-4 sm:gap-8 md:gap-10 lg:gap-[5.625rem] w-full">
            <PhoneMockup
              src={phoneMockupExchangeImg}
              alt={t("phoneMockup1Alt")}
              className="hidden md:block z-[1] relative w-[12.5rem] sm:w-60 md:w-[16.875rem] lg:w-[19.375rem]"
            />
            <PhoneMockup
              src={phoneMockupAssetsImg}
              alt={t("phoneMockup2Alt")}
              className="z-[2] relative md:mt-20 lg:mt-0 md:-ml-20 lg:ml-0 w-[12.5rem] sm:w-60 md:w-[16.875rem] lg:w-[19.375rem]"
            />
            <PhoneMockup
              src={phoneMockupBitcoinImg}
              alt={t("phoneMockup3Alt")}
              className="z-[3] relative mt-[3.125rem] sm:mt-15 md:mt-20 lg:mt-24 -ml-[3.125rem] sm:-ml-15 md:-ml-20 lg:-ml-[8.75rem] w-[12.5rem] sm:w-60 md:w-[16.875rem] lg:w-[19.375rem]"
            />
          </div>
        </div>

        <div className="z-0 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="-bottom-[8.7413125rem] sm:-bottom-[12.5rem] -left-[6.25725rem] sm:-left-[12.75rem] absolute flex flex-col justify-center items-center w-60 sm:w-[37.8125rem] h-[15.0625rem] sm:h-[37.8125rem] aspect-[240/241]">
            <Image
              src={coin3dLeftImg}
              alt=""
              className="opacity-30 w-full h-full object-contain"
              style={{ transform: "rotate(158.916deg)" }}
            />
          </div>

          <div className="-top-10 sm:-top-px -right-[5.625rem] sm:-right-[11.25rem] absolute flex justify-center items-center opacity-30 w-60 sm:w-[29.25rem] h-60 sm:h-[29.25rem]">
            <Image
              src={coin3dRightImg}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    </Theme>
  );
}
