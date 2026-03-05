import { getTranslations } from "next-intl/server";
import Image, { StaticImageData } from "next/image";
import { ArrowRightIcon } from "@grx/ui/icons/ArrowRightIcon";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";

import featureBankAccountsPng from "./(assets)/features-bank-accounts-dark.png";
import featureInvoicesPng from "./(assets)/features-invoices-dark.png";
import featureIncomePng from "./(assets)/features-income-dark.png";
import featurePayoutsPng from "./(assets)/features-payouts-dark.png";
import { EXTERNAL_LINKS } from "@/modules/cross-cutting-concerns/routing";
import clsx from "clsx";

export async function FeaturesSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded text-display-sm text-text-strong-1000 sm:text-display-md">
            {t("Pay.Root.features.title")}
          </h3>
          <h4 className="text-body-lg-medium text-text-subtle-700 sm:text-body-xl-medium">
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
    <div className="flex flex-col justify-between gap-4 bg-surface-floating shadow-sm p-1 rounded-2xl">
      <div
        className={clsx(
          "bg-gradient-to-b rounded-xl overflow-hidden transition-all duration-300",
          "from-bg-weak-100 to-bg-weak-100",
          "hover:from-gold-700 hover:via-gold-800 hover:to-natural-800"
        )}
      >
        <Image
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
          src={img}
          alt=""
        />
      </div>

      <div className="flex flex-col flex-grow justify-between gap-8 px-5 py-6">
        <div className="flex flex-col flex-grow gap-2">
          <h3 className="text-text-strong-1000 text-title-sm md:text-title-lg">
            {title}
          </h3>

          <p className="text-body-md-regular text-text-soft-500 md:text-body-lg-regular">
            {description}
          </p>
        </div>

        <div className="flex justify-start">
          <ButtonRoot variant="secondary" size="lg" asChild>
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
