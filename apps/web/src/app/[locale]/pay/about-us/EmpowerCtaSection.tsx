import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import { SALES_EMAIL } from "@/config/emails";

import empowerJpeg from "./(assets)/empower.jpg";

export async function EmpowerCtaSection() {
  const t = await getTranslations();

  return (
    <section className="relative flex flex-col justify-center min-h-[480px] sm:min-h-[560px] overflow-hidden">
      <Image
        src={empowerJpeg}
        alt={t("Pay.AboutUs.empowerCta.imageAlt")}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="relative z-10 flex flex-col justify-center px-4 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-col items-start mx-auto w-full max-w-[1180px] text-left">
          <h2 className="mb-4 max-w-[640px] font-unbounded font-bold text-[28px] text-white sm:text-[40px] leading-[32px] sm:leading-[48px]">
            {t("Pay.AboutUs.empowerCta.title")}
          </h2>
          <p className="mb-8 max-w-[520px] font-medium text-[16px] text-white sm:text-[18px] leading-[24px] sm:leading-[26px]">
            {t("Pay.AboutUs.empowerCta.subtitle")}
          </p>

          <ButtonRoot
            className="min-w-[160px]"
            variant="contained"
            palette="secondary"
            size="lg"
            asChild
          >
            <Link href={`mailto:${SALES_EMAIL}`}>
              <ButtonText>
                {t("Pay.AboutUs.empowerCta.contactSales")}
              </ButtonText>
            </Link>
          </ButtonRoot>
        </div>
      </div>
    </section>
  );
}
