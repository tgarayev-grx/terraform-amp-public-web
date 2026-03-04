import { memo, PropsWithChildren } from "react";
import * as Slot from "@radix-ui/react-slot";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { Badge } from "@grx/ui";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";

type ProductItemProps = PropsWithChildren & {
  title: string;
  description?: string;
  comingSoon?: boolean;
  underDevelopment?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export const ProductItemUnderDevelopment = memo(() => {
  const t = useTranslations();

  return (
    <Badge palette="info" variant="light" size="sm">
      {(t as (key: string) => string)("CommonHeader.products.underDevelopment")}
    </Badge>
  );
});
ProductItemUnderDevelopment.displayName = "ProductItemUnderDevelopment";

export const ProductItem = memo(
  ({
    title,
    description,
    comingSoon,
    underDevelopment,
    href,
    onClick,
    className,
  }: ProductItemProps) => {
    const isDisabled = (comingSoon || underDevelopment) && !href;

    const content = (
      <>
        <ProductItemContainer>
          <ProductItemTitle>{title}</ProductItemTitle>

          {comingSoon && <ProductItemComingSoon />}
          {underDevelopment && <ProductItemUnderDevelopment />}
        </ProductItemContainer>

        {description && (
          <ProductItemDescription>{description}</ProductItemDescription>
        )}
      </>
    );

    if (href) {
      return (
        <ProductItemRoot asChild disabled={isDisabled} className={className}>
          <Link href={href} onClick={onClick} className="block outline-none">
            {content}
          </Link>
        </ProductItemRoot>
      );
    }

    return (
      <ProductItemRoot disabled={isDisabled} className={className}>
        {content}
      </ProductItemRoot>
    );
  }
);
ProductItem.displayName = "ProductItem";

type ProductItemRootProps = PropsWithChildren & {
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
};
export const ProductItemRoot = memo(
  ({
    children,
    disabled = false,
    asChild = false,
    className,
  }: ProductItemRootProps) => {
    const Root = asChild ? Slot.Root : "div";
    return (
      <Root
        className={clsx(
          "flex flex-col gap-0.5 p-3 rounded-lg outline-none",
          disabled
            ? "cursor-not-allowed"
            : "hover:bg-bg-weak-100 cursor-pointer transition-colors",
          className
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
    <Badge palette="warning" variant="light" size="sm">
      {(t as (key: string) => string)("CommonHeader.products.comingSoon")}
    </Badge>
  );
});
ProductItemComingSoon.displayName = "ProductItemComingSoon";
