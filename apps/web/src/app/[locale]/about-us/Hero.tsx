import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ButtonRoot, ButtonText } from "@grx/ui";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import heroPng from "./(assets)/hero.webp";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="relative flex flex-col bg-neutral-1000 min-h-[800px] overflow-hidden text-neutral text-center">
      <Image
        className="bottom-[-44px] md:bottom-[-180px] left-1/2 absolute w-full max-w-[1180px] h-[450px] md:h-[640px] object-cover -translate-x-1/2"
        src={heroPng}
        alt=""
      />

      <div className="relative flex flex-col flex-grow sm:justify-between items-center gap-8 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col flex-grow items-center gap-8 px-4 sm:px-8 pt-[160px] md:pt-[224px]">
          <div className="flex flex-col items-center gap-4">
            <h1 className="mb-4 sm:max-w-[580px] font-unbounded font-bold text-[36px] sm:text-[48px] leading-[40px] sm:leading-[56px] tracking-[0.5%] tracking-0">
              {t("AboutUsPage.hero.title")}
            </h1>

            <h2 className="lg:max-w-[680px] font-medium text-[16px] text-neutral-300 sm:text-[20px] leading-[24px] sm:leading-[26px]">
              {t("AboutUsPage.hero.subtitle")}
            </h2>
          </div>

          <ButtonRoot
            className="min-w-[180px]"
            variant="secondary"
            size="lg"
            asChild
          >
            <Link href="#contact-us">
              <ButtonText>{t("AboutUsPage.hero.contactUs")}</ButtonText>
            </Link>
          </ButtonRoot>
        </div>
      </div>
    </section>
  );
}
