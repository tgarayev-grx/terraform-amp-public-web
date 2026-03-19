import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Theme } from "@grx/ui/theme";

import phoneMockupAssetsImg from "./(assets)/phone-mockup-assets.webp";
import phoneMockupBitcoinImg from "./(assets)/phone-mockup-bitcoin.webp";
import phoneMockupExchangeImg from "./(assets)/phone-mockup-exchange.webp";
import coin3dLeftImg from "./(assets)/coin-3d-left.png";
import coin3dRightImg from "./(assets)/coin-3d-right.png";

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
      <section className="relative bg-bg-muted-50 overflow-hidden pt-24 pb-20">
        <div className="relative z-10 flex flex-col items-center mx-auto px-4 sm:px-8 max-w-[73.75rem]">
          <div className="flex flex-col items-center gap-4 text-center w-[48.75rem] max-w-full px-4 md:px-0 mb-20">
            <h2 className="font-unbounded text-heading-h4 sm:text-heading-h3 md:text-display-md text-text-strong-1000">
              {t("title")}
            </h2>
            <p className="text-body-lg-medium md:text-body-xl-medium text-text-subtle-700">
              {t("subtitle")}
            </p>
          </div>

          <div className="relative flex justify-center items-start gap-4 sm:gap-8 md:gap-10 lg:gap-[5.625rem] w-full">
            <PhoneMockup
              src={phoneMockupExchangeImg}
              alt={t("phoneMockup1Alt")}
              className="relative z-[1] hidden md:block w-[12.5rem] sm:w-60 md:w-[16.875rem] lg:w-[19.375rem]"
            />
            <PhoneMockup
              src={phoneMockupAssetsImg}
              alt={t("phoneMockup2Alt")}
              className="relative z-[2] w-[12.5rem] sm:w-60 md:w-[16.875rem] lg:w-[19.375rem] md:-ml-20 lg:ml-0 md:mt-20 lg:mt-0"
            />
            <PhoneMockup
              src={phoneMockupBitcoinImg}
              alt={t("phoneMockup3Alt")}
              className="relative z-[3] w-[12.5rem] sm:w-60 md:w-[16.875rem] lg:w-[19.375rem] -ml-[3.125rem] sm:-ml-15 md:-ml-20 lg:-ml-[8.75rem] mt-[3.125rem] sm:mt-15 md:mt-20 lg:mt-24"
            />
          </div>
        </div>

        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="flex flex-col justify-center items-center absolute -left-[6.25725rem] -bottom-[8.7413125rem] sm:-left-[12.75rem] sm:-bottom-[12.5rem] w-60 h-[15.0625rem] aspect-[240/241] sm:w-[37.8125rem] sm:h-[37.8125rem]">
            <Image
              src={coin3dLeftImg}
              alt=""
              className="w-full h-full object-contain opacity-30"
              style={{ transform: "rotate(158.916deg)" }}
            />
          </div>

          <div className="flex justify-center items-center absolute -right-[5.625rem] -top-10 sm:-right-[11.25rem] sm:-top-px w-60 sm:w-[29.25rem] h-60 sm:h-[29.25rem] opacity-30">
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
