import Image from "next/image";
import Link from "next/link";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import buildYourCryptoBusinessWithUsImagePng from "./(assets)/build-your-crypto-business-with-us.png";

export function BuildYourCryptoBusinessWithUsSection() {
  return (
    <section className="flex flex-col bg-gold-500 text-neutral-1000">
      {/* 420px + 120px + 440px = 980px */}
      <div className="flex md:flex-row flex-col justify-between mx-auto px-4 py-20 sm:py-24 w-full max-w-[980px]">
        <div className="flex flex-col md:justify-center md:items-start mb-20 md:mb-0 md:max-w-[420px] md:text-left text-center">
          <div className="flex flex-col gap-4 mb-8">
            <h3 className="font-bold text-[28px] md:text-[36px] leading-[32px] md:leading-[40px]">
              Build your crypto business with{" "}
              <span className="text-nowrap">GRX Pay</span>
            </h3>
            <h4 className="font-medium text-[16px] text-neutral-700 md:text-[20px] leading-[20px] md:leading-[26px]">
              Get started with <span className="text-nowrap">GRX Pay</span>{" "}
              today. What are you waiting for?
            </h4>
          </div>

          <div className="flex justify-center mb-4">
            <ButtonRoot
              className="min-w-[180px]"
              palette="primary"
              variant="contained"
              size="md"
              asChild
            >
              <Link href="mailto:sales@goldenratio.exchange">
                <ButtonText>Contact sales</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={buildYourCryptoBusinessWithUsImagePng}
            alt=""
            className="w-full max-w-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
