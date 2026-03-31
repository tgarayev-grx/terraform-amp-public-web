import Image from "next/image";
import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import { Button } from "@grx/ui/components/button/Button";
import { ContactUsModal } from "@/modules/contact-us";

import partnerProgramHeroImage from "./(assets)/partner-program-hero.webp";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section
      className={clsx(
        "relative flex flex-col bg-surface-canvas pt-[80px] pb-16 overflow-hidden text-center",
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
                "font-bounded text-display-md text-text-strong-1000 md:text-display-lg",
                "text-[36px] leading-[40px]",
                "sm:text-[42px] sm:leading-[50px]",
                "md:text-[48px] md:leading-[56px]"
              )}
            >
              {t("Pay.PartnerProgram.hero.title")}
            </h1>

            <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactUsButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ContactUsModal defaultValues={{ interestedIn: ["GRX_PAY"] }}>
      <Button className={className} variant="primary" size="xl">
        {children}
      </Button>
    </ContactUsModal>
  );
}
