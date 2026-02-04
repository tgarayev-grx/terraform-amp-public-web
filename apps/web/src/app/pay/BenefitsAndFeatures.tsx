import { memo } from "react";

import { ShieldIcon } from "./(icons)/ShieldIcon";
import { APIAndDocumentationIcon } from "./(icons)/APIAndDocumentationIcon";
import { AutoConvertIcon } from "./(icons)/AutoConvertIcon";
import { CustomizeYourSpaceIcon } from "./(icons)/CustomizeYourSpaceIcon";
import { InstantEuroWithdrawalIcon } from "./(icons)/InstantEuroWithdrawalIcon";
import { InvoiceIcon } from "./(icons)/InvoiceIcon";
import { MassPayoutsIcon } from "./(icons)/MassPayoutsIcon";
import { ReportsIcon } from "./(icons)/ReportsIcon";
import { RolesAndPermissionsIcon } from "./(icons)/RolesAndPermissionsIcon";
import { FeatureCard } from "./FeatureCard";

export const BenefitsAndFeaturesSection = memo(() => {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h3 className="flex flex-col gap-4 mx-auto mb-14 max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl text-center leading-[32px] sm:leading-[40px]">
          Our benefits and features
        </h3>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Effortless invoicing"
            description="Create, send, and manage your invoices with ease. Invoicing feature allows you to provide the crypto payment method for your clients, customize professional-looking invoices, and receive updates."
            icon={<InvoiceIcon width={24} height={24} />}
          />
          <FeatureCard
            title="Auto-convert"
            description="No need to keep track of crypto volatility — our instant currency exchange system automatically converts your funds into Euro or Tether at the best available rates."
            icon={<AutoConvertIcon width={24} height={24} />}
          />
          <FeatureCard
            title="Instant Euro withdrawal"
            description="Access your funds swiftly and securely. No waiting, no hassle — just your money in your account, instantly. Perfect for when you need your funds without delay."
            icon={<InstantEuroWithdrawalIcon width={24} height={24} />}
          />
          <FeatureCard
            title="Customize your space"
            description="Reflect your brand's unique identity with our easy-to-use customization features. Effortlessly upload your company logo and update your contact information to ensure your customers know how to reach you."
            icon={<CustomizeYourSpaceIcon width={24} height={24} />}
          />
          <FeatureCard
            title="Mass payouts"
            description="Whether you're paying freelancers, distributing refunds, or handling payroll, GRX Pay ensures secure, swift, and seamless crypto transactions across borders."
            icon={<MassPayoutsIcon width={24} height={24} />}
          />
          <FeatureCard
            title="API and documentation"
            description="Save your time by configuring the API to automatically process cryptocurrency payments and make payouts."
            icon={<APIAndDocumentationIcon width={24} height={24} />}
          />
          <FeatureCard
            title="AML & KYB"
            description="All transactions undergo verification through Chainalysis to ensure that no suspicious activities reach your wallet reduced processing fees and real-time tracking."
            icon={<ShieldIcon width={24} height={24} />}
          />
          <FeatureCard
            title="Roles and permissions"
            description="Invite an unlimited number of team members and set each person’s permission levels to manage access."
            icon={<RolesAndPermissionsIcon width={24} height={24} />}
          />
          <div className="flex sm:justify-center sm:col-span-2 lg:col-span-1">
            <div className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-full">
              <FeatureCard
                title="Comprehensive reports"
                description="Our settlement and statement reports are easily accessible for downloading and sharing with your bank."
                icon={<ReportsIcon width={24} height={24} />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
BenefitsAndFeaturesSection.displayName = "BenefitsAndFeaturesSection";
