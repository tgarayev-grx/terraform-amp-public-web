"use client";

import * as Popover from "@radix-ui/react-popover";
import { useLocale, useTranslations } from "next-intl";
import {
  Link,
  usePathname,
} from "@/modules/cross-cutting-concerns/i18n/navigation";
import { GlobeIcon, ShevronDownIcon } from "../../icons";
import { FlagEn, FlagBg } from "../../icons";
import clsx from "clsx";

export function LocalizationSelect() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const languages = [
    { code: "en", name: t("CommonHeader.languages.en"), flag: <FlagEn /> },
    { code: "bg", name: t("CommonHeader.languages.bg"), flag: <FlagBg /> },
  ] as const;

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="group flex items-center gap-2 transition-colors">
          <GlobeIcon className="w-6 h-6 text-icon-base-500" />

          <span className="text-body-md-regular text-text-strong-1000 uppercase">
            {currentLanguage.code}
          </span>

          <ShevronDownIcon className="w-4 h-4 text-icon-base-500 group-hover:text-icon-strong-1000 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={clsx(
            "z-50 shadow-lg p-2 border rounded-xl min-w-[180px] [transform-origin:var(--radix-popover-content-transform-origin)]",
            "data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in",
            "bg-neutral dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
          )}
          sideOffset={24}
          align="start"
        >
          {languages.map((lang) => (
            <Link
              key={lang.code}
              className="flex items-center gap-3 hover:bg-bg-weak-100 p-2 rounded-lg w-full text-text-strong-1000 transition-colors"
              href={pathname}
              locale={lang.code}
            >
              <div className="flex justify-center items-center rounded-full w-6 h-6">
                {lang.flag}
              </div>
              <span className="text-body-md-regular">
                {lang.name} ({lang.code.toUpperCase()})
              </span>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
