"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import clsx from "clsx";

import { Modal } from "@grx/ui";
import { CloseIcon } from "@grx/ui/icons/CloseIcon";
import { HeaderLogo } from "@grx/ui/icons/HeaderLogo";

import {
  DocsNavContent,
  type DocsNavContentProps,
} from "@/components/DocsSidebar";

type DocsMobileMenuProps = DocsNavContentProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Mobile navigation sheet — same layout and motion as `apps/web` `MobileMenu`. */
export function DocsMobileMenu({
  open,
  onOpenChange,
  ...navProps
}: DocsMobileMenuProps) {
  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Dialog.Content
          id="docs-mobile-nav"
          className={clsx(
            "top-0 right-0 z-50 fixed flex flex-col shadow-lg w-full max-w-[375px] h-full overflow-y-auto outline-none",
            "data-[state=closed]:animate-slide-out-to-right data-[state=open]:animate-slide-in-from-right",
            "bg-bg-base"
          )}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">
            Documentation navigation
          </Dialog.Title>

          <div className="flex flex-col flex-grow min-h-0">
            <div className="flex justify-between items-center border-stroke-soft-200 px-4 py-3 border-b shrink-0">
              <Link
                href="/"
                className="flex items-center text-text-strong-1000 shrink-0"
                onClick={() => onOpenChange(false)}
              >
                <HeaderLogo className="w-auto h-8" />
              </Link>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="flex justify-center items-center w-10 h-10 text-icon-base-500 hover:text-icon-subtle-700 transition-colors"
                  aria-label="Close menu"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-2 pt-6 pb-6">
              <DocsNavContent
                {...navProps}
                onNavigate={() => onOpenChange(false)}
              />
            </div>
          </div>
        </Dialog.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}
