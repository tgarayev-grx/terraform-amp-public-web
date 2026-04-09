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
>(function ModalOverlay({ className, style = {}, ...props }, ref) {
  return (
    <Dialog.Overlay
      ref={ref}
      className={clsx(
        "z-50 fixed inset-0 backdrop-blur-sm",
        "data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      style={{
        background: "var(--overlay-backdrop)",
        ...style,
      }}
      {...props}
    />
  );
});

/** Where the modal panel is anchored. `center` matches the original full-screen / centered sheet behavior. */
export type ModalContentPlacement = "center" | "top";

const modalContentBase = [
  "fixed flex flex-col outline-none focus-visible:outline-none focus:outline-none focus-visible:ring-0",
  "bg-surface-floating text-text-strong-1000",
  "max-sm:rounded-t-2xl max-sm:rounded-b-none sm:rounded-2xl w-full shadow-md",
  "z-[101] max-h-[100dvh]",
  "data-[state=closed]:animate-out data-[state=open]:animate-in duration-200",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
].join(" ");

const modalContentPlacementCenter = [
  "max-sm:top-8 sm:top-1/2 right-0 bottom-0 sm:bottom-auto left-0 sm:left-1/2 sm:max-w-[600px]",
  "sm:-translate-x-1/2 sm:-translate-y-1/2",
  "max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom",
  "sm:data-[state=closed]:slide-out-to-top-[48%] sm:data-[state=closed]:slide-out-to-left-1/2",
  "sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%]",
  "sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95",
].join(" ");

/**
 * Under the app header on `sm+`, horizontally centered without `translateX` so zoom animations do not fight centering.
 * On small viewports, behaves like a bottom sheet (pinned to bottom, slide animation) for native mobile UX.
 */
const modalContentPlacementTop = [
  "max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:ml-0 max-sm:w-full",
  "max-sm:max-h-[min(92dvh,100dvh)]",
  "max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]",
  "max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom",
  "sm:left-1/2 sm:-ml-[min(300px,calc(50vw-1rem))] sm:bottom-auto sm:top-20",
  "sm:w-[min(600px,calc(100vw-2rem))]",
  "sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95",
].join(" ");

export type ModalContentProps = ComponentPropsWithoutRef<
  typeof Dialog.Content
> & {
  placement?: ModalContentPlacement;
};

const Content = forwardRef<
  ComponentRef<typeof Dialog.Content>,
  ModalContentProps
>(function ModalContent({ className, placement = "center", ...props }, ref) {
  return (
    <Dialog.Content
      ref={ref}
      className={twMerge(
        modalContentBase,
        placement === "top"
          ? modalContentPlacementTop
          : modalContentPlacementCenter,
        className
      )}
      {...props}
    />
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
