import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { memo } from "react";
import { ArrowRightIcon } from "./(icons)/ArrowRightIcon";
import { ButtonRoot, ButtonText } from "@grx/ui/components/button/Button";

import featureBankAccountsPng from "./(assets)/features-bank-accounts.png";
import featureInvoicesPng from "./(assets)/features-invoices.png";
import featureIncomePng from "./(assets)/features-income.png";
import featurePayoutsPng from "./(assets)/features-payouts.png";

export const FeaturesSection = memo(() => {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            Manage all your crypto flows in one place
          </h3>
          <h4 className="font-medium text-neutral-700 sm:text-[20px] text-base sm:leading-[26px]">
            Start your journey with GRX Pay by registering your account
          </h4>
        </div>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
          <FeatureCard
            title="Create crypto bank accounts"
            description="Instantly create and manage as many crypto bank accounts as required, enabling flexible and unlimited financial operations for your business"
            img={featureBankAccountsPng}
            action="Accept crypto now"
          />
          <FeatureCard
            title="Generate an invoices"
            description="Generate secure, shareable payment links to receive crypto payments instantly from anyone, anywhere"
            img={featureInvoicesPng}
            action="Explore invoicing"
          />
          <FeatureCard
            title="Track income and withdrawals"
            description="Seamlessly monitor your crypto transactions and maintain a separate EUR balance with our advanced reporting feature "
            img={featureIncomePng}
            action="Realtime reporting"
          />
          <FeatureCard
            title="Create mass payouts"
            description="Effortlessly send crypto payments to multiple recipients worldwide with our streamlined mass payout feature"
            img={featurePayoutsPng}
            action="Try mass payouts"
          />
        </div>
      </div>
    </section>
  );
});
FeaturesSection.displayName = "FeaturesSection";

type FeatureCardProps = {
  title: string;
  description: string;
  img: StaticImageData;
  action: string;
};

const FeatureCard = memo(
  ({ title, description, img, action }: FeatureCardProps) => {
    return (
      <div
        className="flex flex-col gap-4 p-1 rounded-2xl"
        style={{
          boxShadow:
            "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
        }}
      >
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
            <ButtonRoot
              palette="secondary"
              variant="contained"
              size="md"
              asChild
            >
              <Link href="/sign-in" target="_blank">
                <ButtonText>{action}</ButtonText>

                <ArrowRightIcon />
              </Link>
            </ButtonRoot>
          </div>
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";
