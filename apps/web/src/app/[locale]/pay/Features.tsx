import { getTranslations } from "next-intl/server";
import Image, { StaticImageData } from "next/image";
import { ArrowRightIcon } from "./(icons)/ArrowRightIcon";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";

import featureBankAccountsPng from "./(assets)/features-bank-accounts.png";
import featureInvoicesPng from "./(assets)/features-invoices.png";
import featureIncomePng from "./(assets)/features-income.png";
import featurePayoutsPng from "./(assets)/features-payouts.png";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";

export async function FeaturesSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            {t("Pay.Root.features.title")}
          </h3>
          <h4 className="font-medium text-neutral-700 sm:text-[20px] text-base sm:leading-[26px]">
            {t("Pay.Root.features.subtitle")}
          </h4>
        </div>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
          <FeatureCard
            title={t("Pay.Root.features.bankAccounts.title")}
            description={t("Pay.Root.features.bankAccounts.description")}
            img={featureBankAccountsPng}
            action={t("Pay.Root.features.bankAccounts.action")}
          />
          <FeatureCard
            title={t("Pay.Root.features.invoices.title")}
            description={t("Pay.Root.features.invoices.description")}
            img={featureInvoicesPng}
            action={t("Pay.Root.features.invoices.action")}
          />
          <FeatureCard
            title={t("Pay.Root.features.income.title")}
            description={t("Pay.Root.features.income.description")}
            img={featureIncomePng}
            action={t("Pay.Root.features.income.action")}
          />
          <FeatureCard
            title={t("Pay.Root.features.payouts.title")}
            description={t("Pay.Root.features.payouts.description")}
            img={featurePayoutsPng}
            action={t("Pay.Root.features.payouts.action")}
          />
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  img: StaticImageData;
  action: string;
};

function FeatureCard({ title, description, img, action }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 shadow-sm p-1 rounded-2xl">
      <div className="bg-gradient-to-r from-neutral-50 hover:from-[#FDEDCD] to-neutral-50 hover:to-[#FFFBF4] rounded-xl overflow-hidden transition-all duration-300">
        <Image
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
          src={img}
          alt=""
        />
      </div>

      <div className="flex flex-col gap-8 px-5 py-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[18px] leading-[22px] tracking-[0.4%]">
            {title}
          </h3>
          <p className="text-neutral-500 text-sm">{description}</p>
        </div>

        <div className="flex justify-start">
          <ButtonRoot variant="secondary" size="md" asChild>
            <Link href={EXTERNAL_LINKS.Pay.signIn.href} target="_blank">
              <ButtonText>{action}</ButtonText>

              <ArrowRightIcon width={24} height={24} />
            </Link>
          </ButtonRoot>
        </div>
      </div>
    </div>
  );
}
