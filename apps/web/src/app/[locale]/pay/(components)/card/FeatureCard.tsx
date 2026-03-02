import clsx from "clsx";
import { ReactNode, memo } from "react";

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
export const FeatureCard = memo(
  ({ className, classes, title, description, icon }: FeatureCardProps) => {
    return (
      <div
        className={clsx(
          "flex flex-col gap-4 shadow-sm p-6 rounded-2xl min-h-[292px]",
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

        <div className={clsx("flex flex-col gap-2", classes?.content)}>
          <h3
            className={clsx(
              "font-bold text-[24px] leading-[28px]",
              classes?.title
            )}
          >
            {title}
          </h3>

          <div
            className={clsx("text-neutral-500 text-base", classes?.description)}
          >
            {description}
          </div>
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";
