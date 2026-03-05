import { getTranslations } from "next-intl/server";
import * as Avatar from "@radix-ui/react-avatar";
import clsx from "clsx";
import { QuoteIcon } from "@grx/ui/icons/QuoteIcon";

import avatar1Png from "./(assets)/avatar-1.png";
import avatar2Png from "./(assets)/avatar-2.png";
import avatar3Png from "./(assets)/avatar-3.png";
import avatar4Png from "./(assets)/avatar-4.png";
import { twMerge } from "tailwind-merge";

export async function ReviewedBySection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center bg-bg-base px-4 sm:px-8 py-[80px] sm:py-[96px]">
      <div className="mx-auto w-full max-w-[1180px]">
        <h3 className="mb-14 text-text-strong-1000 text-title-lg sm:text-heading-h4 text-center">
          {t("Pay.Root.reviewedBy.title")}
        </h3>

        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ReviewedByCard
            className="bg-bg-base-1000 text-text-inverce"
            classes={{
              title: "text-text-inverce",
            }}
            title={t("Pay.Root.reviewedBy.cards.0.title")}
            avatar={avatar1Png.src}
            quote={t("Pay.Root.reviewedBy.cards.0.quote")}
          />
          <ReviewedByCard
            title={t("Pay.Root.reviewedBy.cards.1.title")}
            avatar={avatar2Png.src}
            quote={t("Pay.Root.reviewedBy.cards.1.quote")}
          />
          <ReviewedByCard
            title={t("Pay.Root.reviewedBy.cards.2.title")}
            avatar={avatar3Png.src}
            quote={t("Pay.Root.reviewedBy.cards.2.quote")}
          />
          <ReviewedByCard
            title={t("Pay.Root.reviewedBy.cards.3.title")}
            avatar={avatar4Png.src}
            quote={t("Pay.Root.reviewedBy.cards.3.quote")}
          />
        </div>
      </div>
    </section>
  );
}

type ReviewedByCardProps = {
  className?: string;
  classes?: {
    title?: string;
  };

  title: string;
  avatar: string;
  avatarFallback?: string;
  quote: string;
};

function ReviewedByCard({
  className,
  classes,
  quote,
  avatar,
  avatarFallback = "",
  title,
}: ReviewedByCardProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-between gap-10 bg-surface-floating shadow-sm p-4 rounded-xl min-h-[256px] sm:min-h-[316px] text-text-strong-1000",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <QuoteIcon className="flex-shrink-0 w-5 h-5 text-gold-500" />

        <p className="text-body-md-regular md:text-body-lg-regular">{quote}</p>
      </div>

      <div className="flex items-center gap-2">
        <Avatar.Root className="flex-shrink-0 rounded-full w-8 h-8">
          <Avatar.Image
            className="flex-shrink-0 rounded-full w-8 h-8"
            src={avatar}
            alt=""
          />
          <Avatar.Fallback>{avatarFallback}</Avatar.Fallback>
        </Avatar.Root>

        <span
          className={clsx(
            "max-w-[180px] text-body-sm-regular md:text-body-sm-medium",
            twMerge("text-text-soft-500", classes?.title)
          )}
        >
          ©{title}
        </span>
      </div>
    </div>
  );
}
