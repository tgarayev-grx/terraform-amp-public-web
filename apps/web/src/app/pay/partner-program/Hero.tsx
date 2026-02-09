import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";
import { SALES_EMAIL } from "./constants";

import partnerProgramHeroImage from "./(assets)/partner-program-hero.png";
import partnerProgramCoinImage from "./(assets)/partner-program-coin.png";

export function HeroSection() {
  return (
    <section
      className={clsx(
        "relative flex flex-col overflow-hidden bg-neutral-50 pt-[80px] pb-16 text-center",
        "sm:pt-[112px] sm:pb-20 sm:text-left",
        "md:pt-24 md:pb-24",
        "2xl:pt-[110px] 2xl:pb-[110px]"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col justify-between pl-4 pr-4 sm:pr-8 lg:flex-row lg:items-center">
        <div className="z-10 flex flex-shrink-0 flex-col gap-8 lg:max-w-[650px]">
          <h1
            className={clsx(
              "font-unbounded font-bold text-neutral-900 tracking-[0.5%]",
              "text-[36px] leading-[40px]",
              "sm:text-[42px] sm:leading-[50px]",
              "md:text-[48px] md:leading-[56px]"
            )}
          >
            Earn passive income with the GRX Pay partnership program
          </h1>
          <p className="font-medium text-neutral-700 text-base leading-[24px] sm:text-lg lg:text-xl lg:leading-[26px]">
            Partner Program is for agencies and service providers looking to
            expand their offerings and build expertise in GRX Pay.
          </p>
          <div className="hidden lg:flex justify-center md:justify-start">
            <ButtonRoot
              className="w-[180px]"
              palette="primary"
              variant="contained"
              size="lg"
              asChild
            >
              <Link
                href={`mailto:${SALES_EMAIL}`}
                rel="noopener noreferrer"
                aria-label="Contact sales team via email"
              >
                <ButtonText>Contact us</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col items-center md:flex-row md:items-start md:justify-between md:gap-6 lg:mt-0 lg:w-auto lg:flex-col lg:flex-shrink-0">
          <div className="flex w-full justify-center md:w-auto md:justify-start lg:hidden">
            <ButtonRoot
              className="w-[180px]"
              palette="primary"
              variant="contained"
              size="lg"
              asChild
            >
              <Link
                href={`mailto:${SALES_EMAIL}`}
                rel="noopener noreferrer"
                aria-label="Contact sales team via email"
              >
                <ButtonText>Contact us</ButtonText>
              </Link>
            </ButtonRoot>
          </div>

          <div className="relative mx-auto w-full h-[320px] flex-shrink-0 sm:max-w-[500px] sm:h-auto sm:aspect-square md:mx-0 md:max-w-none md:w-[320px] md:-mt-[72px] lg:mt-0 lg:w-[580px]">
            <Image
              className="h-full w-full object-contain"
              src={partnerProgramHeroImage}
              alt="Partnership handshake illustration"
              width={580}
              height={580}
              priority
            />
            <div className="absolute bottom-0 left-0 z-20 w-[68.8%] scale-[1.01] pointer-events-none">
              <Image
                className="h-auto w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                src={partnerProgramCoinImage}
                alt=""
                aria-hidden={true}
                width={399}
                height={448}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
