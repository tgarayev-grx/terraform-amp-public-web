import { getTranslations } from "next-intl/server";
import clsx from "clsx";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import {
  Button,
  ButtonRoot,
  ButtonText,
} from "@grx/ui/components/button/Button";
import { ContactUsModal } from "@/modules/contact-us";
import { ROUTES } from "@/modules/shared/header/routes";

import heroBackgroundImg from "./(assets)/hero-bg.webp";

export async function HeroSection() {
  const t = await getTranslations();
  return (
    <section
      className="relative flex flex-col justify-center items-center bg-neutral-1000 bg-cover bg-no-repeat bg-center min-h-[800px] overflow-hidden text-center"
      style={{ backgroundImage: `url(${heroBackgroundImg.src})` }}
    >
      <div className="relative flex flex-col flex-grow sm:justify-between lg:justify-center lg:items-center gap-8 mx-auto pt-[160px] md:pt-[116px] lg:pt-[80px] lg:pb-[160px] w-full max-w-[1080px]">
        <div className="flex flex-col px-4 md:px-8 lg:px-8 xl:px-0">
          <h1 className="mb-4 md:mb-6 font-unbounded font-bold text-[48px] text-neutral md:text-[64px] leading-[56px] md:leading-[72px] md:tracking-[0.32px]">
            Bridging Traditional Finance and{" "}
            <span className="text-gold-500">Digital Assets</span>
          </h1>

          <h2 className="mb-8 md:mb-14 font-medium text-neutral-300 md:text-[24px] text-base md:leading-[28px]">
            Borderless transactions. Secure exchange.{" "}
            <br className="lg:hidden" />
            Real‑world assets on‑chain.
          </h2>

          <div className="min-[425px]:flex min-[425px]:justify-center min-[425px]:items-center gap-3 grid grid-cols-2">
            <ButtonRoot
              className="min-[425px]:min-w-[186px]"
              asChild
              palette="secondary"
              variant="contained"
              size="lg"
            >
              <Link href={ROUTES.pay}>
                <ButtonText>Explore GRX Pay</ButtonText>
              </Link>
            </ButtonRoot>

            <ContactUsModal
              defaultValues={{
                interestedIn: ["grxPay"],
              }}
            >
              <Button
                className="min-[425px]:min-w-[184px]"
                palette="secondary"
                variant="outlined"
                size="lg"
              >
                Contact us
              </Button>
            </ContactUsModal>
          </div>
        </div>
      </div>
    </section>
  );
}
