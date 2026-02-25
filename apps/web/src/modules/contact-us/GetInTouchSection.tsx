import { getTranslations } from "next-intl/server";
import { ContactUsForm } from "./ContactUsForm";

export async function GetInTouchSection() {
  const t = await getTranslations("ContactUs.getInTouch");
  return (
    <section
      id="contact-us"
      className="flex flex-col items-center bg-neutral-50 px-4 sm:px-8 py-20 sm:py-24 text-neutral-1000"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[500px] font-unbounded font-bold text-[28px] lg:text-4xl leading-[32px]">
            {t("title")}
          </h3>
          <h4 className="font-medium text-neutral-700 lg:text-[20px] text-base lg:leading-[26px]">
            {t("subtitle")}
          </h4>
        </div>

        <ContactUsForm className="mx-auto max-w-[580px]" />
      </div>
    </section>
  );
}
