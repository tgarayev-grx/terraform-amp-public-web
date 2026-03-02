import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("Home");
  return (
    <section
      className="relative flex flex-col justify-center items-center bg-neutral-1000 bg-cover bg-no-repeat bg-center min-h-[800px] overflow-hidden text-center"
      style={{ backgroundImage: `url(${heroBackgroundImg.src})` }}
    >
      <div className="relative flex flex-col flex-grow sm:justify-between lg:justify-center lg:items-center gap-8 mx-auto pt-[160px] md:pt-[116px] lg:pt-[80px] pb-20 lg:pb-[160px] w-full max-w-[1080px]">
        <div className="flex flex-col px-4 md:px-8 lg:px-8 xl:px-0">
          <h1 className="mb-4 md:mb-6 font-unbounded font-bold text-[36px] text-neutral md:text-[64px] leading-[40px] md:leading-[72px] md:tracking-[0.32px]">
            {t.rich("hero.title", {
              highlight: (chunks) => (
                <span className="text-gold-500">{chunks}</span>
              ),
            })}
          </h1>

          <h2 className="mb-8 md:mb-14 font-medium text-neutral-300 md:text-[24px] text-base md:leading-[28px]">
            {t("hero.subtitle")} <br className="lg:hidden" />
            {t("hero.subtitleLine2")}
          </h2>

          <div className="min-[425px]:flex min-[425px]:justify-center min-[425px]:items-center gap-3 grid grid-cols-1 md:grid-cols-2">
            <ButtonRoot
              className="min-[425px]:min-w-[186px]"
              asChild
              variant="secondary"
              size="lg"
            >
              <Link href={ROUTES.pay}>
                <ButtonText>{t("hero.exploreGrxPay")}</ButtonText>
              </Link>
            </ButtonRoot>

            <ContactUsModal
              defaultValues={{
                interestedIn: ["grxPay"],
              }}
            >
              <Button
                className="min-[425px]:min-w-[184px]"
                variant="outlined"
                size="lg"
              >
                {t("hero.contactUs")}
              </Button>
            </ContactUsModal>
          </div>
        </div>
      </div>
    </section>
  );
}
