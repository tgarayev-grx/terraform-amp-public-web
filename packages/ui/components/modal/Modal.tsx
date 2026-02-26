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
      className={clsx(
        "z-50 fixed inset-0 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
});

const Content = forwardRef<
  ComponentRef<typeof Dialog.Content>,
  ComponentPropsWithoutRef<typeof Dialog.Content>
>(function ModalContent({ className, style, children, ...props }, ref) {
  return (
    <Dialog.Content
      ref={ref}
      className={clsx(
        "fixed flex flex-col bg-neutral dark:bg-neutral-900 rounded-2xl focus:outline-none text-neutral-1000 dark:text-neutral",
        "max-sm:top-8 sm:top-1/2 right-0 bottom-0 sm:bottom-auto left-0 sm:left-1/2 z-[101] w-full sm:max-w-[600px] max-h-[100dvh] sm:-translate-x-1/2 sm:-translate-y-1/2 rounded-t-2xl sm:rounded-2xl data-[state=closed]:animate-out data-[state=open]:animate-in duration-200 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom sm:data-[state=closed]:slide-out-to-top-[48%] sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%] sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95",
        className
      )}
      style={{
        boxShadow:
          "0 20px 48px -4px rgba(16, 24, 40, 0.08), 0 8px 16px -4px rgba(16, 24, 40, 0.03)",
        ...style,
      }}
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
        className={clsx(
          "top-4 right-4 absolute flex justify-center items-center w-6 h-6 text-neutral-500 hover:text-neutral-700 active:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300 dark:active:text-neutral-200 transition-colors",
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
