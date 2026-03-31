import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { ROUTES } from "@/modules/shared/header/routes";
import { defaultRichComponents } from "@/modules/cross-cutting-concerns/i18n/components/Rich/defaultRichComponents";

import smoothIntegrationImage from "./(assets)/smooth-integration.webp";

export async function SmoothIntegrationSection() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col bg-bg-weak-100 px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="flex md:flex-row flex-col md:justify-center md:items-center gap-10 md:gap-12 xl:gap-16 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-6 min-w-0 md:max-w-[500px] text-left">
          <h2 className="font-bounded text-heading-h5 text-text-strong-1000 md:text-heading-h3">
            {t("Pay.AboutUs.smoothIntegration.title")}
          </h2>

          <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t("Pay.AboutUs.smoothIntegration.paragraph1")}
          </p>

          <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
            {t.rich("Pay.AboutUs.smoothIntegration.paragraph2", {
              ...defaultRichComponents,
              "link-documentation": (chunks) => (
                <Link
                  href={ROUTES.payDocs}
                  className="text-info-base-600 hover:text-info-strong-800"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <p className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium">
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
