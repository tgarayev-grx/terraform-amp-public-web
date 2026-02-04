import Link from "next/link";
import { memo } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import clsx from "clsx";
import { QuoteIcon } from "./(icons)/QuoteIcon";

import avatar1Png from "./(assets)/avatar-1.png";
import avatar2Png from "./(assets)/avatar-2.png";
import avatar3Png from "./(assets)/avatar-3.png";
import avatar4Png from "./(assets)/avatar-4.png";

export const ReviewedBySection = memo(() => {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 py-[80px] sm:py-[96px]">
      <div className="mx-auto w-full max-w-[1180px]">
        <h3 className="mb-14 font-bold text-[24px] text-center leading-[28px]">
          Reviewed by
        </h3>

        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ReviewedByCard
            className="bg-neutral-1000 text-neutral-50"
            title="Account manager of digital service business"
            avatar={avatar1Png.src}
            quote="We integrated this service into our operations and were thoroughly impressed. It provided a seamless experience, enhancing our ability to transact globally with ease. Highly recommended for businesses seeking efficiency in their payment processes."
          />
          <ReviewedByCard
            title="Customer story from freelance platform"
            avatar={avatar2Png.src}
            quote="I bill my clients with crypto on a daily basis using GRX Pay. I have been working as a freelancer for the last 5 years and now expanding my payment options to include crypto payments. Great job!"
          />
          <ReviewedByCard
            title="Partner and COO of a marketing agency"
            avatar={avatar3Png.src}
            quote="Smoothly onboarding and great customer support.
The operational principles are clear and easy to grasp."
          />
          <ReviewedByCard
            title="Owner of a car rental company"
            avatar={avatar4Png.src}
            quote="I've been in this industry for quite a while, searching for an application that's straightforward and uncomplicated. Honestly, other apps are a maze, but with GRX Pay, everything flows smoothly, making it fast, simple, and incredibly convenient!"
          />
        </div>
      </div>
    </section>
  );
});
ReviewedBySection.displayName = "ReviewedBySection";

type ReviewedByCardProps = {
  className?: string;

  title: string;
  avatar: string;
  avatarFallback?: string;
  quote: string;
};

const ReviewedByCard = memo(
  ({
    quote,
    avatar,
    avatarFallback = "",
    title,
    className,
  }: ReviewedByCardProps) => {
    return (
      <div
        className={clsx(
          "flex flex-col justify-between gap-10 p-4 rounded-xl min-h-[256px] sm:min-h-[316px]",
          className
        )}
        style={{
          boxShadow:
            "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
        }}
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
);
ReviewedByCard.displayName = "ReviewedByCard";
