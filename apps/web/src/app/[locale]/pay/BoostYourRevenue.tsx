"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import boostYourRevenueImagePng from "./(assets)/boost-your-revenue.png";
import { TypingEffect } from "./TypingEffect";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { defaultRichComponents } from "@/modules/cross-cutting-concerns/i18n/components/Rich/defaultRichComponents";

export function BoostYourRevenueSection() {
  const t = useTranslations();
  const typeAroundWords = [
    t("Pay.Root.typingWords.globally"),
    t("Pay.Root.typingWords.instantly"),
    t("Pay.Root.typingWords.effortlessly"),
  ];
  return (
    <section className="flex flex-col bg-neutral-1000 text-neutral-50">
      {/* 420px + 120px + 440px = 980px */}
      <div className="flex md:flex-row flex-col justify-between mx-auto px-4 py-20 sm:py-24 w-full max-w-[980px]">
        <div className="flex flex-col md:justify-center md:items-start mb-20 md:mb-0 md:text-left text-center">
          <h3 className="mb-8 font-bold text-[28px] leading-[32px]">
            {t.rich("Pay.Root.boostYourRevenue.title", {
              ...defaultRichComponents,
              typing: () => (
                <TypingEffect
                  className="text-gold-500 text-left"
                  words={typeAroundWords}
                />
              ),
            })}
          </h3>

          <div className="flex justify-center mb-4">
            <ButtonRoot
              className="min-w-[180px]"
              variant="secondary"
              size="md"
              asChild
            >
              <Link href="/sign-up" target="_blank">
                <ButtonText>
                  {t("Pay.Root.boostYourRevenue.createAccount")}
                </ButtonText>
              </Link>
            </ButtonRoot>
          </div>

          <p className="text-neutral-400 text-xs text-center">
            {t("Pay.Root.boostYourRevenue.freeSignUp")}
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src={boostYourRevenueImagePng}
            alt=""
            className="w-full max-w-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
