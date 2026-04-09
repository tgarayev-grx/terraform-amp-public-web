"use client";

import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import type { PropsWithChildren, ReactNode } from "react";
import { DirectionDownIcon } from "@grx/ui/icons/DirectionDownIcon";

export function OpenApiAccordionRoot({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Accordion.Root type="single" collapsible className={className}>
      {children}
    </Accordion.Root>
  );
}

export function OpenApiAccordionItem({
  value,
  children,
  className,
}: PropsWithChildren<{ value: string; className?: string }>) {
  return (
    <Accordion.Item value={value} className={className}>
      {children}
    </Accordion.Item>
  );
}

export function OpenApiAccordionTrigger({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Accordion.Header>
      <Accordion.Trigger
        className={clsx(
          "group flex items-center gap-3 w-full text-left",
          className
        )}
      >
        <DirectionDownIcon
          className={clsx(
            "size-5 text-text-subtle-700 transition-transform",
            "group-data-[state=open]:rotate-180"
          )}
        />

        <span className="text-body-md-regular text-text-strong-1000">
          {children}
        </span>
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

export function OpenApiAccordionContent({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Accordion.Content className={className}>{children}</Accordion.Content>
  );
}
