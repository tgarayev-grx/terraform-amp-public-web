"use client";

import * as Popover from "@radix-ui/react-popover";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/modules/cross-cutting-concerns/i18n/navigation";
import { GlobeIcon, ShevronDownIcon } from "../../icons";
import { FlagEn, FlagBg } from "../../icons";
import clsx from "clsx";

export type HeaderTheme = "light" | "dark";

const themeClasses = {
  light: {
    langTrigger: "text-neutral-700 hover:text-neutral-900",
    langDropdown: "bg-neutral border-neutral-200",
    langItem: "hover:bg-neutral-100 text-neutral-1000",
  },
  dark: {
    langTrigger: "text-neutral-300 hover:text-neutral",
    langDropdown: "bg-neutral-900 border-neutral-800",
    langItem: "hover:bg-neutral-800 text-neutral",
  },
} as const;

interface LocalizationSelectProps {
  theme: HeaderTheme;
}

export function LocalizationSelect({ theme }: LocalizationSelectProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const tc = themeClasses[theme];

  const languages = [
    { code: "en", name: t("CommonHeader.languages.en"), flag: <FlagEn /> },
    { code: "bg", name: t("CommonHeader.languages.bg"), flag: <FlagBg /> },
  ] as const;
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={clsx(
            "group flex items-center gap-2 text-sm transition-colors",
            tc.langTrigger
          )}
        >
          <GlobeIcon className="w-6 h-6" />
          <span className="uppercase">{currentLanguage.code}</span>
          <ShevronDownIcon className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={clsx(
            "z-50 shadow-lg p-2 border rounded-xl min-w-[180px] [transform-origin:var(--radix-popover-content-transform-origin)]",
            "data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in",
            tc.langDropdown
          )}
          sideOffset={24}
          align="start"
        >
          {languages.map((lang) => (
            <Link
              key={lang.code}
              className={clsx(
                "flex items-center gap-3 p-2 rounded-lg w-full transition-colors",
                tc.langItem
              )}
              href={pathname}
              locale={lang.code}
            >
              <div className="flex justify-center items-center rounded-full w-6 h-6">
                {lang.flag}
              </div>
              <span className="text-sm">
                {lang.name} ({lang.code.toUpperCase()})
              </span>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
