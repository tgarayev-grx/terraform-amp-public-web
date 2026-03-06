import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ReactNode } from "react";
import tokenSwapAsset from "./(assets)/token-swap.png";
import safeCheckAsset from "./(assets)/safe-check.png";

export async function MidStatementSection() {
  const t = await getTranslations("AboutUsPage.midStatement");

  return (
    <section className="bg-bg-weak-100 py-24 overflow-visible">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <p className="text-heading-h3 md:text-heading-h3 font-bold text-text-strong-1000 max-w-[680px] shrink-0">
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

        <div className="hidden lg:block shrink-0 pt-36 -mt-36">
          <div className="relative w-[480px] h-[400px]">
            <div className="absolute -translate-x-1/2 bottom-[6%] left-[calc(50%+48px)] top-[-26.07%] flex items-center justify-center w-[367px] h-[367px]">
              <div className="rotate-[20.92deg] w-[367px] h-[367px] overflow-hidden relative shrink-0">
                <Image
                  className="object-cover"
                  src={tokenSwapAsset}
                  alt=""
                  fill
                  sizes="367px"
                />
              </div>
            </div>
            <div className="absolute -translate-x-1/2 bottom-[-17.22%] left-[calc(50%-64px)] top-[9.49%] flex items-center justify-center w-[400px] h-[400px]">
              <div className="rotate-[4.62deg] w-[400px] h-[400px] overflow-hidden relative shrink-0">
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
