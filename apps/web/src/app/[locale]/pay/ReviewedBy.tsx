import { getTranslations } from "next-intl/server";
import * as Avatar from "@radix-ui/react-avatar";
import clsx from "clsx";
import { QuoteIcon } from "./(icons)/QuoteIcon";

import avatar1Png from "./(assets)/avatar-1.png";
import avatar2Png from "./(assets)/avatar-2.png";
import avatar3Png from "./(assets)/avatar-3.png";
import avatar4Png from "./(assets)/avatar-4.png";

export async function ReviewedBySection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-[80px] sm:py-[96px]">
      <div className="mx-auto w-full max-w-[1180px]">
        <h3 className="mb-14 font-bold text-[24px] text-center leading-[28px]">
          {t("Pay.Root.reviewedBy.title")}
        </h3>

        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ReviewedByCard
            className="bg-neutral-1000 text-neutral-50"
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

  title: string;
  avatar: string;
  avatarFallback?: string;
  quote: string;
};

function ReviewedByCard({
  quote,
  avatar,
  avatarFallback = "",
  title,
  className,
}: ReviewedByCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-between gap-10 shadow-light-sm p-4 rounded-xl min-h-[256px] sm:min-h-[316px]",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <QuoteIcon className="flex-shrink-0 w-5 h-5 text-gold-500" />

        <p className="text-sm sm:text-base">{quote}</p>
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

        <span className="max-w-[180px] text-xs">©{title}</span>
      </div>
    </div>
  );
}
