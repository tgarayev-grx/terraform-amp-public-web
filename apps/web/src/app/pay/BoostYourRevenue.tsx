import Image from "next/image";
import Link from "next/link";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import boostYourRevenueImagePng from "./(assets)/boost-your-revenue.png";
import { TypingEffect } from "./TypingEffect";

const typeAroundWords = ["globally", "instantly", "effortlessly"];

export function BoostYourRevenueSection() {
  return (
    <section className="flex flex-col bg-neutral-1000 text-neutral-50">
      {/* 420px + 120px + 440px = 980px */}
      <div className="flex md:flex-row flex-col justify-between mx-auto px-4 py-20 sm:py-24 w-full max-w-[980px]">
        <div className="flex flex-col md:justify-center md:items-start mb-20 md:mb-0 md:text-left text-center">
          <h3 className="mb-8 font-bold text-[28px] leading-[32px]">
            Boost your revenue.
            <br /> Accept crypto payments{" "}
            <TypingEffect
              className="text-gold-500 text-left"
              words={typeAroundWords}
            />
          </h3>

          <div className="flex justify-center mb-4">
            <ButtonRoot
              className="min-w-[180px]"
              palette="secondary"
              variant="contained"
              size="md"
              asChild
            >
              <Link href="/sign-up" target="_blank">
                <ButtonText>Create account</ButtonText>
              </Link>
            </ButtonRoot>
          </div>

          <p className="text-neutral-400 text-xs text-center">
            Its free to sign up
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
