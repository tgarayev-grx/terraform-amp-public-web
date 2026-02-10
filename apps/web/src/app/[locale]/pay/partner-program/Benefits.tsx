import Image, { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import clsx from "clsx";
import { ArrowRightIcon } from "../(icons)/ArrowRightIcon";
import benefitsPercentImage from "./(assets)/benefits-percent.png";
import benefitsPayoutsImage from "./(assets)/benefits-payouts.png";
import benefitsCreativeLibraryImage from "./(assets)/benefits-creative-library.png";

type BenefitItem = {
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
        "flex flex-col gap-4 bg-white shadow-light-sm p-6 rounded-2xl",
        !isSmall && "items-center",
        className
      )}
    >
      <div
        className={clsx(
          "relative flex-shrink-0 rounded-xl overflow-hidden",
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
            className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 px-4 py-2.5 rounded-[10px] w-fit font-semibold text-neutral-900 text-base leading-6 transition-colors"
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

export async function BenefitsSection() {
  const t = await getTranslations();

  const largeBenefit: BenefitItem = {
    title: t("Pay.PartnerProgram.benefits.from10.title"),
    description: t("Pay.PartnerProgram.benefits.from10.description"),
    image: {
      src: benefitsPercentImage,
      alt: t("Pay.PartnerProgram.benefits.from10.imageAlt"),
      size: "large",
    },
  };

  const smallBenefits: BenefitItem[] = [
    {
      title: t("Pay.PartnerProgram.benefits.monthlyPayouts.title"),
      description: t("Pay.PartnerProgram.benefits.monthlyPayouts.description"),
      image: {
        src: benefitsPayoutsImage,
        alt: t("Pay.PartnerProgram.benefits.monthlyPayouts.imageAlt"),
        size: "small",
      },
    },
    {
      title: t("Pay.PartnerProgram.benefits.creativeLibrary.title"),
      description: t("Pay.PartnerProgram.benefits.creativeLibrary.description"),
      image: {
        src: benefitsCreativeLibraryImage,
        alt: t("Pay.PartnerProgram.benefits.creativeLibrary.imageAlt"),
        size: "small",
      },
      button: {
        text: t("Pay.PartnerProgram.benefits.creativeLibrary.viewApi"),
        href: "/api/docs",
      },
    },
  ];

  return (
    <section className="flex flex-col items-center bg-white px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[980px]">
        <h2 className="mb-12 sm:mb-14 font-unbounded font-bold text-[28px] text-neutral-900 sm:text-[36px] text-center leading-[32px] sm:leading-[40px]">
          {t("Pay.PartnerProgram.benefits.title")}
        </h2>

        <div className="flex lg:flex-row flex-col gap-5">
          <div className="flex-1 lg:h-[688px]">
            <BenefitCard className="h-full" {...largeBenefit} />
          </div>

          <div className="flex flex-col flex-1 gap-5">
            {smallBenefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
