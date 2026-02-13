import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { defaultRichComponents } from "@/modules/cross-cutting-concerns/i18n/components/Rich/defaultRichComponents";

import smoothIntegrationImage from "./(assets)/smooth-integration.webp";

export async function SmoothIntegrationSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col bg-neutral-100 px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="flex md:flex-row flex-col md:justify-center md:items-center gap-10 md:gap-12 xl:gap-16 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-6 min-w-0 md:max-w-[500px] text-left">
          <h2 className="font-unbounded font-bold text-[28px] text-neutral-900 sm:text-4xl leading-[32px] sm:leading-[40px]">
            {t("Pay.AboutUs.smoothIntegration.title")}
          </h2>
          <p className="font-medium text-[16px] text-neutral-600 sm:text-[18px] leading-[24px] sm:leading-[26px]">
            {t("Pay.AboutUs.smoothIntegration.paragraph1")}
          </p>
          <p className="font-medium text-[16px] text-neutral-600 sm:text-[18px] leading-[24px] sm:leading-[26px]">
            {t.rich("Pay.AboutUs.smoothIntegration.paragraph2", {
              ...defaultRichComponents,
              "link-documentation": (chunks) => (
                <Link
                  href="/pay/docs"
                  className="text-blue-600 hover:text-blue-500"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <p className="font-medium text-[16px] text-neutral-600 sm:text-[18px] leading-[24px] sm:leading-[26px]">
            {t("Pay.AboutUs.smoothIntegration.paragraph3")}
          </p>
        </div>
        <div className="flex flex-shrink-0 justify-center">
          <Image
            src={smoothIntegrationImage}
            alt={t("Pay.AboutUs.smoothIntegration.imageAlt")}
            className="w-full max-w-[400px] md:max-w-[300px] lg:max-w-[420px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
