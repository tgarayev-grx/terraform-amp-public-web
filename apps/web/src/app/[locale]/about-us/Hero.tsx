import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ButtonRoot, ButtonText, Theme } from "@grx/ui";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import heroPng from "./(assets)/hero.webp";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <Theme theme="dark" asChild>
      <section className="relative flex flex-col bg-bg-base min-h-[800px] overflow-hidden text-center">
        <Image
          className="bottom-[-44px] md:bottom-[-180px] left-1/2 absolute w-full max-w-[1180px] h-[450px] md:h-[640px] object-cover -translate-x-1/2"
          src={heroPng}
          alt=""
        />

        <div className="relative flex flex-col flex-grow sm:justify-between items-center gap-8 mx-auto w-full max-w-[1180px]">
          <div className="flex flex-col flex-grow items-center gap-8 px-4 sm:px-8 pt-[160px] md:pt-[224px]">
            <div className="flex flex-col items-center gap-4">
              <h1 className="mb-4 sm:max-w-[580px] font-unbounded text-display-md text-text-strong-1000 md:text-display-lg">
                {t("AboutUsPage.hero.title")}
              </h1>

              <h2 className="lg:max-w-[680px] text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
                {t("AboutUsPage.hero.subtitle")}
              </h2>
            </div>

            <ButtonRoot
              className="min-w-[180px]"
              variant="primary"
              size="xl"
              asChild
            >
              <Link href="#contact-us">
                <ButtonText>{t("AboutUsPage.hero.contactUs")}</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>
      </section>
    </Theme>
  );
}
