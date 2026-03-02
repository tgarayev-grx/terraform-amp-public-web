import Image from "next/image";
import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import { Button } from "@grx/ui/components/button/Button";
import { ContactUsModal } from "@/modules/contact-us";

import partnerProgramHeroImage from "./(assets)/partner-program-hero.png";
import partnerProgramCoinImage from "./(assets)/partner-program-coin.png";

function ContactUsButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ContactUsModal defaultValues={{ interestedIn: ["grxPay"] }}>
      <Button className={className} variant="primary" size="lg">
        {children}
      </Button>
    </ContactUsModal>
  );
}

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section
      className={clsx(
        "relative flex flex-col bg-neutral-50 pt-[80px] pb-16 overflow-hidden text-center",
        "sm:pt-[112px] sm:pb-20 sm:text-left",
        "md:pt-24 md:pb-24",
        "2xl:pt-[110px] 2xl:pb-[110px]"
      )}
    >
      <div className="px-4 sm:px-8">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4 lg:gap-6 mx-auto w-full max-w-[1180px]">
          <div className="z-10 flex flex-col flex-shrink-0 gap-8 lg:max-w-[650px]">
            <h1
              className={clsx(
                "font-unbounded font-bold text-neutral-900 tracking-[0.5%]",
                "text-[36px] leading-[40px]",
                "sm:text-[42px] sm:leading-[50px]",
                "md:text-[48px] md:leading-[56px]"
              )}
            >
              {t("Pay.PartnerProgram.hero.title")}
            </h1>
            <p className="font-medium text-neutral-700 text-base sm:text-lg lg:text-xl leading-[24px] lg:leading-[26px]">
              {t("Pay.PartnerProgram.hero.subtitle")}
            </p>
            <div className="hidden lg:flex justify-center md:justify-start">
              <ContactUsButton className="w-[180px]">
                {t("Pay.PartnerProgram.hero.contactUs")}
              </ContactUsButton>
            </div>
          </div>

          <div className="flex md:flex-row flex-col lg:flex-col lg:flex-shrink-0 md:justify-between items-center md:items-start md:gap-6 mt-8 lg:mt-0 w-full lg:w-auto">
            <div className="lg:hidden flex justify-center md:justify-start w-full md:w-auto">
              <ContactUsButton className="w-[180px]">
                {t("Pay.PartnerProgram.hero.contactUs")}
              </ContactUsButton>
            </div>

            <div className="relative flex-shrink-0 mx-auto md:mx-0 md:-mt-[72px] lg:mt-0 w-full md:w-[320px] lg:w-[580px] sm:max-w-[500px] md:max-w-none h-[320px] sm:h-auto sm:aspect-square">
              <Image
                className="w-full h-full object-contain"
                src={partnerProgramHeroImage}
                alt="Partnership handshake illustration"
                width={580}
                height={580}
                priority
              />
              <div className="bottom-0 left-0 z-20 absolute w-[68.8%] scale-[1.01] pointer-events-none">
                <Image
                  className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full h-auto"
                  src={partnerProgramCoinImage}
                  alt=""
                  aria-hidden
                  width={399}
                  height={448}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
