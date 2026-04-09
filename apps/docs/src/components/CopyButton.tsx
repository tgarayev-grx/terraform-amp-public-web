"use client";

import { useEffect, useRef, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CheckIcon } from "@grx/ui/icons/CheckIcon";
import { CopyIcon } from "@grx/ui/icons/CopyIcon";

export type CopyButtonProps = {
  /** Text written to the clipboard (line endings normalized to CRLF). */
  text: string;
  className?: string;
};

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  async function onCopy() {
    try {
      if (!text) return;
      const clipboardText = text.replace(/\r?\n/g, "\r\n");
      await navigator.clipboard.writeText(clipboardText);
      setCopied(true);
      setCopyTooltipOpen(true);
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        setCopyTooltipOpen(false);
        copyTimeoutRef.current = null;
      }, 1000);
    } catch {
      // ignore; clipboard may be blocked by browser permissions
    }
  }

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={copyTooltipOpen} onOpenChange={setCopyTooltipOpen}>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={onCopy}
            disabled={!text}
            aria-label={copied ? "Copied" : "Copy"}
            className={className}
          >
            {copied ? (
              <CheckIcon className="size-5" />
            ) : (
              <CopyIcon className="size-5" />
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            align="end"
            sideOffset={6}
            className="bg-neutral-900 shadow-sm px-2 py-1 border border-white/10 rounded-md text-[11px]/[14px] text-white/80"
          >
            {copied ? "Copied" : "Copy"}
            <Tooltip.Arrow className="fill-neutral-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
