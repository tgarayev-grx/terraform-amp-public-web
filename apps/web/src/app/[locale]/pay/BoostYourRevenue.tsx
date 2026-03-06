"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import boostYourRevenueImagePng from "./(assets)/boost-your-revenue.png";
import { TypingEffect } from "./TypingEffect";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { defaultRichComponents } from "@/modules/cross-cutting-concerns/i18n/components/Rich/defaultRichComponents";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing/links";

export function BoostYourRevenueSection() {
  const t = useTranslations();
  const typeAroundWords = [
    t("Pay.Root.typingWords.globally"),
    t("Pay.Root.typingWords.instantly"),
    t("Pay.Root.typingWords.effortlessly"),
  ];
  return (
    <section className="flex flex-col bg-bg-weak-100 text-text-strong-1000">
      {/* 420px + 120px + 440px = 980px */}
      <div className="flex md:flex-row flex-col justify-between mx-auto px-4 py-20 sm:py-24 w-full max-w-[980px]">
        <div className="flex flex-col md:justify-center md:items-start mb-20 md:mb-0 md:text-left text-center">
          <h3 className="mb-8 md:max-w-[400px] lg:max-w-[440px] text-heading-h5 text-text-strong-1000 md:text-heading-h3">
            {t.rich("Pay.Root.boostYourRevenue.title", {
              ...defaultRichComponents,
              typing: () => (
                <TypingEffect
                  className="text-primary-gold text-left"
                  words={typeAroundWords}
                />
              ),
            })}
          </h3>

          <div className="flex justify-center mb-4">
            <ButtonRoot
              className="min-w-[180px]"
              variant="primary"
              size="lg"
              asChild
            >
              <Link href={EXTERNAL_LINKS.Pay.signUp.href} target="_blank">
                <ButtonText>
                  {t("Pay.Root.boostYourRevenue.createAccount")}
                </ButtonText>
              </Link>
            </ButtonRoot>
          </div>

          <p className="text-body-sm-medium text-text-soft-500">
            {t("Pay.Root.boostYourRevenue.freeSignUp")}
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src={boostYourRevenueImagePng}
            alt=""
            className="flex-shrink-0 w-full max-w-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
