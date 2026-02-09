import clsx from "clsx";
import { ReactNode } from "react";
import { OpenFinanceIcon } from "./(icons)/OpenFinanceIcon";
import { WarehousingIcon } from "./(icons)/WarehousingIcon";
import { MarketingIcon } from "./(icons)/MarketingIcon";
import { SoftwareDevelopmentIcon } from "./(icons)/SoftwareDevelopmentIcon";

export type TargetAudienceItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export const TARGET_AUDIENCES: readonly TargetAudienceItem[] = [
  {
    icon: <OpenFinanceIcon className="size-6 text-neutral-500" />,
    title: "Open Finance solutions",
    description:
      "Your company supports the collaboration of fintechs, businesses and financial institutions and would like to endorse GRX Pay for your audience.",
  },
  {
    icon: <WarehousingIcon className="size-6 text-neutral-500" />,
    title: "Warehousing and shipping company",
    description:
      "Extend payment services to clients utilizing your fulfillment solutions. Businesses engaged in the sale of physical products can significantly broaden their reach by incorporating our diverse payment methods.",
  },
  {
    icon: <MarketingIcon className="size-6 text-neutral-500" />,
    title: "Marketing and digital businesses",
    description:
      "If you're part of a marketing or digital business on the lookout for a robust crypto payment solution to enhance your client offerings, our platform is the perfect fit.",
  },
  {
    icon: <SoftwareDevelopmentIcon className="size-6 text-neutral-500" />,
    title: "Software development agencies",
    description:
      "For developers who are actively seeking a crypto payment solution to empower your clients",
  },
] as const;

type TargetAudienceCardProps = TargetAudienceItem & {
  className?: string;
};

function TargetAudienceCard({
  icon,
  title,
  description,
  className,
}: TargetAudienceCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-6 rounded-2xl bg-white p-6 min-h-[272px] sm:h-full shadow-light-sm",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-[10px] flex-shrink-0">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-neutral-900 text-[18px] leading-[22px] md:text-[24px] md:leading-[28px]">
          {title}
        </h3>
        <p className="text-neutral-700 text-sm leading-[20px] md:text-base md:leading-[24px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export function TargetAudienceSection() {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-20 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="flex flex-col gap-4 items-center text-center mb-12 sm:mb-14">
          <h2 className="font-unbounded font-bold text-[28px] sm:text-[36px] leading-[32px] sm:leading-[40px] text-neutral-900 max-w-[780px]">
            Are you a good fit?
          </h2>
          <p className="font-medium text-neutral-700 text-base sm:text-xl leading-[24px] sm:leading-[26px] max-w-full">
            Whether you are a representative of large businesses or individual,
            you can participate in GRX Pay partner program
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-5">
          {TARGET_AUDIENCES.map((audience) => (
            <TargetAudienceCard key={audience.title} {...audience} />
          ))}
        </div>
      </div>
    </section>
  );
}
