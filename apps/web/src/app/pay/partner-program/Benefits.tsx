import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRightIcon } from "../(icons)/ArrowRightIcon";
import benefitsPercentImage from "./(assets)/benefits-percent.png";
import benefitsPayoutsImage from "./(assets)/benefits-payouts.png";
import benefitsCreativeLibraryImage from "./(assets)/benefits-creative-library.png";

export type BenefitItem = {
  title: string;
  description: string;
  image: {
    src: StaticImageData;
    alt: string;
    size: "small" | "large";
  };
  button?: {
    text: string;
    href: string;
  };
};

export const BENEFITS: readonly BenefitItem[] = [
  {
    title: "From 10% recurring commission",
    description:
      "Boost your income by receiving a recurring fee taken from a commission on every transaction facilitated through your referral",
    image: {
      src: benefitsPercentImage,
      alt: "Recurring commission illustration",
      size: "large",
    },
  },
  {
    title: "Monthly payouts",
    description: "Ensure a predictable and consistent income",
    image: {
      src: benefitsPayoutsImage,
      alt: "Monthly payouts icon",
      size: "small",
    },
  },
  {
    title: "Creative Library",
    description:
      "Gain access to promotional assets, training guides, and a wealth of valuable tips and tricks to ensure your success",
    image: {
      src: benefitsCreativeLibraryImage,
      alt: "Creative library icon",
      size: "small",
    },
    button: {
      text: "View API",
      href: "/api/docs",
    },
  },
] as const;

type BenefitCardProps = BenefitItem & {
  className?: string;
};

function BenefitCard({
  title,
  description,
  image,
  button,
  className,
}: BenefitCardProps) {
  const isSmall = image.size === "small";

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-light-sm",
        !isSmall && "items-center",
        className
      )}
    >
      <div
        className={clsx(
          "relative rounded-xl overflow-hidden flex-shrink-0",
          isSmall
            ? "w-[160px] h-[160px]"
            : "w-full aspect-square md:w-[316px] md:h-[316px] lg:w-[432px] lg:h-[432px]"
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={isSmall ? 160 : 432}
          height={isSmall ? 160 : 432}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className={clsx("flex flex-col", isSmall ? "gap-8" : "gap-4")}>
        <div className={clsx("flex flex-col", isSmall ? "gap-2" : "gap-4")}>
          <h3
            className={clsx(
              "font-bold text-neutral-900",
              isSmall
                ? "text-[18px] leading-[22px] md:text-[24px] md:leading-[28px]"
                : "text-[24px] leading-[28px] md:text-[32px] md:leading-[36px]"
            )}
          >
            {title}
          </h3>
          <p
            className={clsx(
              "text-neutral-700",
              isSmall
                ? "text-sm leading-[20px] md:text-base md:leading-[24px]"
                : "font-medium text-base leading-[24px] md:text-xl md:leading-[26px]"
            )}
          >
            {description}
          </p>
        </div>

        {button && (
          <Link
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-[10px] font-semibold text-base text-neutral-900 leading-6 transition-colors w-fit"
            href={button.href}
          >
            <span>{button.text}</span>
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function BenefitsSection() {
  const [largeBenefit, ...smallBenefits] = BENEFITS;

  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto w-full max-w-[980px]">
        <h2 className="mb-12 sm:mb-14 font-unbounded font-bold text-[28px] sm:text-[36px] text-center leading-[32px] sm:leading-[40px] text-neutral-900">
          Why become a GRX Pay partner?
        </h2>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1 lg:h-[688px]">
            <BenefitCard className="h-full" {...largeBenefit} />
          </div>

          <div className="flex flex-col gap-5 flex-1">
            {smallBenefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
