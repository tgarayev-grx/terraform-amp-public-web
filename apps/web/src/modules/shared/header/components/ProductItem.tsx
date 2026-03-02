import { memo, PropsWithChildren } from "react";
import * as Slot from "@radix-ui/react-slot";
import { ComingSoonBadge } from "./ComingSoonBadge";
import { useTranslations } from "next-intl";
import clsx from "clsx";

type ProductItemProps = PropsWithChildren & {
  title: string;
  description: string;
  comingSoon?: boolean;
};

export const ProductItem = memo(
  ({ title, description, comingSoon }: ProductItemProps) => {
    return (
      <ProductItemRoot disabled={comingSoon}>
        <ProductItemContainer>
          <ProductItemTitle>{title}</ProductItemTitle>

          {comingSoon && <ProductItemComingSoon />}
        </ProductItemContainer>

        <ProductItemDescription>{description}</ProductItemDescription>
      </ProductItemRoot>
    );
  }
);
ProductItem.displayName = "ProductItem";

type ProductItemRootProps = PropsWithChildren & {
  disabled?: boolean;
  asChild?: boolean;
};
export const ProductItemRoot = memo(
  ({ children, disabled = false, asChild = false }: ProductItemRootProps) => {
    const Root = asChild ? Slot.Root : "div";
    return (
      <Root
        className={clsx(
          "flex flex-col gap-0.5 p-3 rounded-lg outline-none",
          disabled
            ? "cursor-not-allowed"
            : "hover:bg-bg-weak-100 cursor-pointer transition-colors"
        )}
      >
        {children}
      </Root>
    );
  }
);
ProductItemRoot.displayName = "ProductItemRoot";

type ProductItemTitleProps = PropsWithChildren & {
  asChild?: boolean;
};
export const ProductItemTitle = memo(
  ({ children, asChild = false }: ProductItemTitleProps) => {
    const Title = asChild ? Slot.Root : "span";
    return (
      <Title className="text-body-md-medium text-text-strong-1000">
        {children}
      </Title>
    );
  }
);
ProductItemTitle.displayName = "ProductItemTitle";

type ProductItemDescriptionProps = PropsWithChildren & {
  asChild?: boolean;
};
export const ProductItemDescription = memo(
  ({ children, asChild = false }: ProductItemDescriptionProps) => {
    const Description = asChild ? Slot.Root : "span";
    return (
      <Description className="text-body-sm-regular text-text-soft-500">
        {children}
      </Description>
    );
  }
);
ProductItemDescription.displayName = "ProductItemDescription";

type ProductItemContainerProps = PropsWithChildren & {
  asChild?: boolean;
};
export const ProductItemContainer = memo(
  ({ children, asChild = false }: ProductItemContainerProps) => {
    const Container = asChild ? Slot.Root : "div";

    return (
      <Container className="flex items-center gap-2">{children}</Container>
    );
  }
);
ProductItemContainer.displayName = "ProductItemContainer";

export const ProductItemComingSoon = memo(() => {
  const t = useTranslations();

  return (
    <ComingSoonBadge>{t("CommonHeader.products.comingSoon")}</ComingSoonBadge>
  );
});
ProductItemComingSoon.displayName = "ProductItemComingSoon";
