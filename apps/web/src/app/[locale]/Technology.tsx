import { getTranslations } from "next-intl/server";
import { memo, ReactNode } from "react";
import clsx from "clsx";

import { ShieldIcon } from "./pay/(icons)/ShieldIcon";
import { CubeIcon } from "./pay/(icons)/CubeIcon";
import { ZoomOutIcon } from "./pay/(icons)/ZoomOutIcon";

export async function TechnologySection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col gap-4 mb-14 text-center">
          <h3 className="mx-auto max-w-[580px] font-unbounded font-bold text-[28px] sm:text-4xl leading-[32px] sm:leading-[40px]">
            Technology
          </h3>
          <h4 className="font-medium text-neutral-700 sm:text-[20px] text-base sm:leading-[26px]">
            Infrastructure designed for secure, scalable asset operations
          </h4>
        </div>

        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          <FeatureCard
            title={"Cloud‑Native & Modular"}
            description={
              "Built on microservices with x3 redundancy for maximum reliability."
            }
            icon={<CubeIcon width={24} height={24} />}
          />
          <FeatureCard
            title={"Secure & Compliant"}
            description={"Advanced encryption, AML/KYC, and chain analysis."}
            icon={<ShieldIcon width={24} height={24} />}
          />
          <FeatureCard
            title={"Scalable & Flexible"}
            description={"API-first architecture for fast integrations."}
            icon={<ZoomOutIcon width={24} height={24} />}
          />
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  className?: string;
  classes?: {
    root?: string;
    icon?: string;
    content?: string;
    title?: string;
    description?: string;
  };
  title: string;
  description: ReactNode;
  icon: ReactNode;
};
const FeatureCard = memo(
  ({ className, classes, title, description, icon }: FeatureCardProps) => {
    return (
      <div
        className={clsx(
          "flex flex-col items-center gap-10 shadow-light-sm p-10 rounded-2xl min-h-[292px]",
          classes?.root,
          className
        )}
      >
        <div
          className={clsx(
            "flex justify-center items-center bg-neutral-100 rounded-xl w-12 h-12 text-neutral-500",
            classes?.icon
          )}
        >
          {icon}
        </div>

        <div
          className={clsx("flex flex-col items-center gap-2", classes?.content)}
        >
          <h3
            className={clsx(
              "font-bold text-[24px] text-center leading-[28px]",
              classes?.title
            )}
          >
            {title}
          </h3>

          <div
            className={clsx(
              "text-neutral-500 text-base text-center",
              classes?.description
            )}
          >
            {description}
          </div>
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";
