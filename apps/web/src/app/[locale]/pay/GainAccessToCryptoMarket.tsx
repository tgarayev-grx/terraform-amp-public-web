import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import gainAccessToCryptoMarketImagePng from "./(assets)/gain-access-to-crypto-market.png";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";

export async function GainAccessToCryptoMarketSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col bg-neutral-1000 text-neutral-50">
      {/* 420px + 120px + 440px = 980px */}
      <div className="flex md:flex-row flex-col justify-between mx-auto px-4 py-20 sm:py-24 w-full max-w-[980px]">
        <div className="flex flex-col md:justify-center md:items-start mb-20 md:mb-0 md:text-left text-center">
          <h3 className="mb-8 font-bold text-[28px] leading-[32px]">
            {t("Pay.Root.gainAccess.title")}
          </h3>

          <div className="flex justify-center mb-4">
            <ButtonRoot
              className="min-w-[180px]"
              palette="secondary"
              variant="contained"
              size="md"
              asChild
            >
              <Link href={EXTERNAL_LINKS.Pay.signUp.href} target="_blank">
                <ButtonText>{t("Pay.Root.gainAccess.getStarted")}</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={gainAccessToCryptoMarketImagePng}
            alt=""
            className="w-full max-w-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
