import { getTranslations } from "next-intl/server";

import { ShieldIcon } from "./(icons)/ShieldIcon";
import { APIAndDocumentationIcon } from "./(icons)/APIAndDocumentationIcon";
import { AutoConvertIcon } from "./(icons)/AutoConvertIcon";
import { CustomizeYourSpaceIcon } from "./(icons)/CustomizeYourSpaceIcon";
import { InstantEuroWithdrawalIcon } from "./(icons)/InstantEuroWithdrawalIcon";
import { InvoiceIcon } from "./(icons)/InvoiceIcon";
import { MassPayoutsIcon } from "./(icons)/MassPayoutsIcon";
import { ReportsIcon } from "./(icons)/ReportsIcon";
import { RolesAndPermissionsIcon } from "./(icons)/RolesAndPermissionsIcon";
import { FeatureCard } from "./(components)/card";

export async function BenefitsAndFeaturesSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h3 className="flex flex-col gap-4 mx-auto mb-14 max-w-[580px] font-unbounded text-display-sm text-text-strong-1000 sm:text-display-md">
          {t("Pay.Root.benefitsAndFeatures.title")}
        </h3>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title={t("Pay.Root.benefitsAndFeatures.invoicing.title")}
            description={t(
              "Pay.Root.benefitsAndFeatures.invoicing.description"
            )}
            icon={<InvoiceIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("Pay.Root.benefitsAndFeatures.autoConvert.title")}
            description={t(
              "Pay.Root.benefitsAndFeatures.autoConvert.description"
            )}
            icon={<AutoConvertIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("Pay.Root.benefitsAndFeatures.instantEuro.title")}
            description={t(
              "Pay.Root.benefitsAndFeatures.instantEuro.description"
            )}
            icon={<InstantEuroWithdrawalIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("Pay.Root.benefitsAndFeatures.customize.title")}
            description={t(
              "Pay.Root.benefitsAndFeatures.customize.description"
            )}
            icon={<CustomizeYourSpaceIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("Pay.Root.benefitsAndFeatures.massPayouts.title")}
            description={t(
              "Pay.Root.benefitsAndFeatures.massPayouts.description"
            )}
            icon={<MassPayoutsIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("Pay.Root.benefitsAndFeatures.apiDocs.title")}
            description={t("Pay.Root.benefitsAndFeatures.apiDocs.description")}
            icon={<APIAndDocumentationIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("Pay.Root.benefitsAndFeatures.amlKyb.title")}
            description={t("Pay.Root.benefitsAndFeatures.amlKyb.description")}
            icon={<ShieldIcon width={24} height={24} />}
          />
          <FeatureCard
            title={t("Pay.Root.benefitsAndFeatures.rolesPermissions.title")}
            description={t(
              "Pay.Root.benefitsAndFeatures.rolesPermissions.description"
            )}
            icon={<RolesAndPermissionsIcon width={24} height={24} />}
          />
          <div className="flex sm:justify-center sm:col-span-2 lg:col-span-1">
            <div className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-full">
              <FeatureCard
                title={t("Pay.Root.benefitsAndFeatures.reports.title")}
                description={t(
                  "Pay.Root.benefitsAndFeatures.reports.description"
                )}
                icon={<ReportsIcon width={24} height={24} />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
