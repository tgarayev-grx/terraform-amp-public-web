"use client";

import clsx from "clsx";
import { toast as sonnerToast } from "sonner";
import { SVGProps } from "react";

type ToastProps = {
  id: string | number;
  message: string;
  type: "success" | "error" | "warning" | "info";
};

export const toast = {
  success: (message: string) =>
    sonnerToast.custom((id) => (
      <Toast id={id} message={message} type="success" />
    )),

  error: (message: string) =>
    sonnerToast.custom((id) => (
      <Toast id={id} message={message} type="error" />
    )),

  warning: (message: string) =>
    sonnerToast.custom((id) => (
      <Toast id={id} message={message} type="warning" />
    )),

  info: (message: string) =>
    sonnerToast.custom((id) => <Toast id={id} message={message} type="info" />),
};

function Toast({ id, message, type }: ToastProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={clsx(
          "flex justify-between items-center gap-2 bg-bg-base shadow-xs p-[11px] border border-solid rounded-[10px] max-[600px]:w-full",
          {
            "border-success-soft-400": type === "success",
            "border-error-soft-400": type === "error",
            "border-warning-soft-400": type === "warning",
            "border-info-soft-400": type === "info",
          }
        )}
      >
        <div
          className={clsx(
            "flex justify-center items-center self-start w-4 h-4",
            {
              "text-success-subtle-500": type === "success",
              "text-error-subtle-500": type === "error",
              "text-warning-subtle-500": type === "warning",
              "text-info-subtle-500": type === "info",
            }
          )}
        >
          <ToastIcon type={type} />
        </div>

        <span className="text-body-md-regular text-text-strong-1000">
          {message}
        </span>

        <button
          className="flex justify-center items-center self-start w-4 h-4 text-icon-base-500 hover:text-icon-subtle-700 shrink-0"
          onClick={() => sonnerToast.dismiss(id)}
        >
          <RemoveIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ToastIcon({
  type,
}: {
  type: "success" | "error" | "warning" | "info";
}) {
  switch (type) {
    case "success": {
      return <CheckCircleFilledIcon className="w-4 h-4 shrink-0" />;
    }
    case "error": {
      return <RemoveCircleFilledIcon className="w-4 h-4" />;
    }
    case "warning": {
      return <WarningCircleFilledIcon className="w-4 h-4" />;
    }
    case "info": {
      return <InfoCircleFilledIcon className="w-4 h-4" />;
    }
    default: {
      const _: never = type;
      console.error(`[ToastIcon] Invalid type: ${_}`);

      return null;
    }
  }
}

function CheckCircleFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4594 7.21501C13.206 7.01796 12.8405 7.06327 12.6433 7.31645L9.53725 11.3105C9.46817 11.3993 9.33774 11.4108 9.25412 11.3355L7.28964 9.56709C7.05098 9.3523 6.68307 9.37161 6.46827 9.61024C6.25348 9.84889 6.27279 10.2168 6.51142 10.4316L8.47665 12.2C9.06203 12.7267 9.97131 12.646 10.4548 12.0244L13.5608 8.03108C13.7579 7.77773 13.7126 7.4122 13.4594 7.21501ZM10.0013 18.3327C14.6037 18.3327 18.3346 14.6017 18.3346 9.99935C18.3346 5.39698 14.6037 1.66602 10.0013 1.66602C5.39893 1.66602 1.66797 5.39698 1.66797 9.99935C1.66797 14.6017 5.39893 18.3327 10.0013 18.3327Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RemoveCircleFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0826 5.91725C9.90101 5.73561 9.60658 5.73561 9.42494 5.91725L7.99992 7.34228L6.57489 5.91725C6.39326 5.73561 6.09883 5.73561 5.91719 5.91725C5.73555 6.09889 5.73555 6.39332 5.91719 6.57496L7.34222 7.99998L5.91719 9.425C5.73555 9.60664 5.73555 9.90107 5.91719 10.0827C6.09883 10.2643 6.39326 10.2643 6.57489 10.0827L7.99992 8.65768L9.42494 10.0827C9.60658 10.2643 9.90101 10.2643 10.0826 10.0827C10.2643 9.90107 10.2643 9.60664 10.0826 9.425L8.65762 7.99998L10.0826 6.57496C10.2643 6.39332 10.2643 6.09889 10.0826 5.91725ZM7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WarningCircleFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.33618 2.95081C7.06362 1.68339 8.93621 1.68339 9.66366 2.95081L14.42 11.2376C15.1402 12.4925 14.1914 14.0002 12.7562 14.0002H3.2436C1.80839 14.0002 0.859613 12.4925 1.57986 11.2376L6.33618 2.95081ZM7.53494 6.15398C7.53494 5.89908 7.74312 5.69244 7.99992 5.69244C8.2567 5.69246 8.46489 5.89909 8.46489 6.15398V9.23095C8.46488 9.48583 8.25669 9.69247 7.99992 9.69249C7.74312 9.69249 7.53495 9.48584 7.53494 9.23095V6.15398ZM7.99988 11.6925C8.34228 11.6925 8.61985 11.417 8.61985 11.0771C8.61985 10.7372 8.34228 10.4617 7.99988 10.4617C7.65748 10.4617 7.37991 10.7372 7.37991 11.0771C7.37991 11.417 7.65748 11.6925 7.99988 11.6925Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InfoCircleFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5348 7.6899C7.5348 7.43303 7.74304 7.22479 7.99992 7.22479C8.2568 7.22479 8.46503 7.43303 8.46503 7.6899V10.4806C8.46503 10.7375 8.2568 10.9457 7.99992 10.9457C7.74304 10.9457 7.5348 10.7375 7.5348 10.4806V7.6899ZM14.6666 7.99998C14.6666 11.6819 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6819 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998ZM7.5348 5.51936V6.13951C7.5348 6.39639 7.74304 6.60463 7.99992 6.60463C8.2568 6.60463 8.46503 6.39639 8.46503 6.13951V5.51936C8.46503 5.26248 8.2568 5.05424 7.99992 5.05424C7.74304 5.05424 7.5348 5.26248 7.5348 5.51936Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RemoveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.4752 4.81832C10.6705 4.6231 10.987 4.62307 11.1823 4.81832C11.3775 5.01357 11.3775 5.33009 11.1823 5.52535L8.70699 7.99996L11.1823 10.4752C11.3775 10.6705 11.3775 10.987 11.1823 11.1823C10.987 11.3775 10.6705 11.3775 10.4752 11.1823L7.99996 8.70699L5.52535 11.1823C5.33009 11.3775 5.01358 11.3775 4.81832 11.1823C4.62306 10.987 4.62307 10.6705 4.81832 10.4752L7.29293 7.99996L4.81832 5.52535C4.62306 5.33009 4.62306 5.01358 4.81832 4.81832C5.01358 4.62306 5.33009 4.62306 5.52535 4.81832L7.99996 7.29293L10.4752 4.81832Z"
        fill="currentColor"
      />
    </svg>
  );
}
