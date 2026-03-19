import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ReactNode } from "react";
import tokenSwapAsset from "./(assets)/token-swap.webp";
import safeCheckAsset from "./(assets)/safe-check.webp";

export async function MidStatementSection() {
  const t = await getTranslations("AboutUsPage.midStatement");

  return (
    <section className="bg-bg-weak-100 py-24 overflow-visible">
      <div className="flex lg:flex-row flex-col justify-between items-center gap-12 lg:gap-16 mx-auto px-4 md:px-8 max-w-[1180px]">
        <p className="max-w-[680px] font-bold text-heading-h3 text-text-strong-1000 md:text-heading-h3 shrink-0">
          {t.rich("text", {
            secure: (chunks: ReactNode) => (
              <span className="text-gold-500">{chunks}</span>
            ),
            transparent: (chunks: ReactNode) => (
              <span className="text-gold-500">{chunks}</span>
            ),
            innovative: (chunks: ReactNode) => (
              <span className="text-gold-500">{chunks}</span>
            ),
          })}
        </p>

        <div className="hidden lg:block -mt-36 pt-36 shrink-0">
          <div className="relative w-[480px] h-[400px]">
            <div className="top-[-26.07%] bottom-[6%] left-[calc(50%+48px)] absolute flex justify-center items-center w-[367px] h-[367px] -translate-x-1/2">
              <div className="relative w-[367px] h-[367px] overflow-hidden rotate-[20.92deg] shrink-0">
                <Image
                  className="object-cover"
                  src={tokenSwapAsset}
                  alt=""
                  fill
                  sizes="367px"
                />
              </div>
            </div>
            <div className="top-[9.49%] bottom-[-17.22%] left-[calc(50%-64px)] absolute flex justify-center items-center w-[400px] h-[400px] -translate-x-1/2">
              <div className="relative w-[400px] h-[400px] overflow-hidden rotate-[4.62deg] shrink-0">
                <Image
                  className="object-cover"
                  src={safeCheckAsset}
                  alt=""
                  fill
                  sizes="400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
