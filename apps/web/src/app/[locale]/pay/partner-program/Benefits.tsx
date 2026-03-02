import Image, { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";
import clsx from "clsx";
import { ArrowRightIcon } from "../(icons)/ArrowRightIcon";
import benefitsPercentImage from "./(assets)/benefits-percent.png";
import benefitsPayoutsImage from "./(assets)/benefits-payouts.png";
import benefitsCreativeLibraryImage from "./(assets)/benefits-creative-library.png";
import { ButtonRoot, ButtonText } from "@grx/ui/index";

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
        "flex flex-col gap-4 bg-surface-floating shadow-sm p-6 rounded-2xl",
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
              "text-text-strong-1000",
              isSmall
                ? "text-title-sm md:text-title-lg"
                : "text-title-lg md:text-heading-h4"
            )}
          >
            {title}
          </h3>

          <p
            className={clsx(
              "text-text-subtle-700",
              isSmall
                ? "text-body-md-medium md:text-body-lg-medium"
                : "text-body-lg-medium md:text-body-xl-medium"
            )}
          >
            {description}
          </p>
        </div>

        {button && (
          <ButtonRoot
            className="max-w-[180px]"
            variant="secondary"
            size="lg"
            asChild
          >
            <Link href={button.href}>
              <ButtonText>{button.text}</ButtonText>
              <ArrowRightIcon className="w-6 h-6" />
            </Link>
          </ButtonRoot>
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
    <section className="flex flex-col items-center bg-surface-canvas px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[980px]">
        <h2 className="mb-12 sm:mb-14 font-unbounded text-display-sm text-text-strong-1000 sm:text-display-md text-center">
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
