import { memo, ReactNode } from "react";

import { ShieldIcon } from "../(icons)/ShieldIcon";
import { GlobeIcon } from "../(icons)/GlobeIcon";
import { CheckIcon } from "../(icons)/CheckIcon";
import { AMLIcon } from "../(icons)/AMLIcon";
import { ChartWaveIcon } from "../(icons)/ChartWaveIcon";
import { ChattingIcon } from "../(icons)/ChattingIcon";
import { PuzzleIcon } from "../(icons)/PuzzleIcon";
import { FeatureCard } from "../FeatureCard";

export const WhatsIncludedSection = memo(() => {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <h3 className="flex flex-col gap-4 mx-auto mb-14 max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl text-center leading-[32px] sm:leading-[40px]">
          What&apos;s included
        </h3>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <WhatsIncludedFeatureCard
            title="Global payments with a single integration"
            items={[
              "Ready to go checkout",
              "Easy invoice generation",
              "Custom invoice branding",
              "Get paid in your preferred currency",
            ]}
            icon={<GlobeIcon width={24} height={24} />}
          />

          <WhatsIncludedFeatureCard
            title="Comprehensive security"
            items={[
              "Data security and encryption",
              "Regulatory licenses",
              "Permissions management",
              "Two-step authentiaction",
            ]}
            icon={<ShieldIcon width={24} height={24} />}
          />

          <WhatsIncludedFeatureCard
            title="AML check with Chainalysis"
            items={[
              "Prevent high-risk users",
              "Fraud protection",
              "Transaction monitoring for AML/CFT compliance",
            ]}
            icon={<AMLIcon width={24} height={24} />}
          />

          <WhatsIncludedFeatureCard
            title="Financial reconciliation and reporting"
            items={[
              "Real-time analytics",
              "Unified reporting",
              "Prebuilt analytics dashboard",
            ]}
            icon={<ChartWaveIcon width={24} height={24} />}
          />

          <WhatsIncludedFeatureCard
            title="Robust developer platform and third-party integrations"
            items={["API documentation", "Seamless integration"]}
            icon={<PuzzleIcon width={24} height={24} />}
          />

          <WhatsIncludedFeatureCard
            title="24/7 support team"
            items={[
              "24/7 support",
              "World-class documentation",
              "Comprehensive knowledge base",
              "Dedicated account manager",
              "On-site training",
            ]}
            icon={<ChattingIcon width={24} height={24} />}
          />
        </div>
      </div>
    </section>
  );
});
WhatsIncludedSection.displayName = "WhatsIncludedSection";

type WhatsIncludedFeatureCardProps = {
  title: string;
  items: string[];
  icon: ReactNode;
};
const WhatsIncludedFeatureCard = memo(
  ({ title, items, icon }: WhatsIncludedFeatureCardProps) => {
    return (
      <FeatureCard
        classes={{
          content: "gap-4",
        }}
        title={title}
        description={
          <ul className="flex flex-col gap-2 list-inside list-none">
            {items.map((item) => (
              <li className="flex items-center gap-1.5" key={item}>
                <CheckIcon
                  width={20}
                  height={20}
                  className="flex-shrink-0 text-green-500"
                />{" "}
                {item}
              </li>
            ))}
          </ul>
        }
        icon={icon}
      />
    );
  }
);
WhatsIncludedFeatureCard.displayName = "WhatsIncludedFeatureCard";
