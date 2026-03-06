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
          "flex flex-col gap-4 bg-surface-floating shadow-sm p-6 rounded-2xl min-h-[268px]",
          classes?.root,
          className
        )}
      >
        <div
          className={clsx(
            "flex justify-center items-center bg-bg-weak-100 rounded-[10px] w-12 h-12 text-icon-base-500",
            classes?.icon
          )}
        >
          {icon}
        </div>

        <div className={clsx("flex flex-col gap-2", classes?.content)}>
          <h3
            className={clsx(
              "text-text-strong-1000 text-title-lg",
              classes?.title
            )}
          >
            {title}
          </h3>

          <div
            className={clsx(
              "text-body-lg-regular text-text-soft-500",
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
