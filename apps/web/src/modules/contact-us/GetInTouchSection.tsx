import { getTranslations } from "next-intl/server";
import { ContactUsForm } from "./ContactUsForm";

export async function GetInTouchSection() {
  const t = await getTranslations("ContactUs.getInTouch");
  return (
    <section
      id="contact-us"
      className="flex flex-col items-center bg-bg-muted-50 px-4 sm:px-8 py-20 sm:py-24 text-neutral-1000 dark:text-neutral"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-bounded text-display-sm text-text-strong-1000 md:text-display-md">
            {t("title")}
          </h3>
          <h4 className="text-body-lg-medium text-text-subtle-700 md:text-body-xl-medium text-center">
            {t("subtitle")}
          </h4>
        </div>

        <ContactUsForm className="mx-auto max-w-[580px]" />
      </div>
    </section>
  );
}
