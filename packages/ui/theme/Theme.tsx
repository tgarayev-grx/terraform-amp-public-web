import * as Slot from "@radix-ui/react-slot";
import { PropsWithChildren } from "react";

type ThemeProps = PropsWithChildren & {
  theme: "light" | "dark";
  asChild?: boolean;
};

export function Theme({
  theme,
  asChild = false,
  children,
  ...props
}: ThemeProps) {
  const Root = asChild ? Slot.Root : "div";

  return (
    <Root data-theme={theme} {...props}>
      {children}
    </Root>
  );
}
