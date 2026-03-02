"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ComponentRef,
  forwardRef,
  SVGProps,
} from "react";
import { twMerge } from "tailwind-merge";

const Root = Dialog.Root;
const Trigger = Dialog.Trigger;
const Portal = Dialog.Portal;
const Title = Dialog.Title;
const Description = Dialog.Description;

const Overlay = forwardRef<
  ComponentRef<typeof Dialog.Overlay>,
  ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(function ModalOverlay({ className, ...props }, ref) {
  return (
    <Dialog.Overlay
      ref={ref}
      className={twMerge(
        "z-50 fixed inset-0 bg-neutral-1000/40 backdrop-blur-sm",
        "data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
});

const Content = forwardRef<
  ComponentRef<typeof Dialog.Content>,
  ComponentPropsWithoutRef<typeof Dialog.Content>
>(function ModalContent({ className, children, ...props }, ref) {
  return (
    <Dialog.Content
      ref={ref}
      className={clsx(
        "fixed flex flex-col rounded-2xl outline-none focus-visible:outline-none focus:outline-none focus-visible:ring-0",
        "bg-surface-floating text-text-strong-1000",

        "rounded-t-2xl sm:rounded-2xl w-full shadow-md",

        "max-sm:top-8 sm:top-1/2 right-0 bottom-0 sm:bottom-auto left-0 sm:left-1/2 z-[101] sm:max-w-[600px] max-h-[100dvh] sm:-translate-x-1/2 sm:-translate-y-1/2 data-[state=closed]:animate-out data-[state=open]:animate-in duration-200 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom sm:data-[state=closed]:slide-out-to-top-[48%] sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%] sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95",

        className
      )}
      {...props}
    >
      {children}
    </Dialog.Content>
  );
});

const Close = forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">
>(function ModalClose({ className, ...props }, ref) {
  return (
    <Dialog.Close asChild>
      <button
        ref={ref}
        type="button"
        className={twMerge(
          "top-4 right-4 absolute",
          "flex justify-center items-center",
          "w-6 h-6",
          "text-icon-base-500 hover:text-icon-subtle-700 active:text-icon-strong-1000 transition-colors",
          className
        )}
        {...props}
      >
        <CloseIcon aria-hidden />
      </button>
    </Dialog.Close>
  );
});

export const Modal = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
};

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
