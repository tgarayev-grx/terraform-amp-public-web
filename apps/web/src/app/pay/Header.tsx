"use client";

import Link from "next/link";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import Logo from "@grx/ui/icons/brand/pay/logo.svg";
import { ButtonRoot, ButtonText } from "@grx/ui";

import { PartnerProgramIcon } from "./(icons)/PartnerProgramIcon";
import { NewsIcon } from "./(icons)/NewsIcon";
import { FaqIcon } from "./(icons)/FaqIcon";
import { ApiIcon } from "./(icons)/ApiIcon";
import { AboutUsIcon } from "./(icons)/AboutUsIcon";
import { ShevronDownIcon } from "./(icons)/ShevronDownIcon";
import { GlobeIcon } from "./(icons)/GlobeIcon";
import { FlagEn } from "./(icons)/FlagEn";
import { FlagBg } from "./(icons)/FlagBg";
import { FlagFr } from "./(icons)/FlagFr";
import { FlagEs } from "./(icons)/FlagEs";
import { MenuIcon } from "./(icons)/MenuIcon";
import { CloseIcon } from "./(icons)/CloseIcon";

export function Header() {
  return (
    <header className="top-0 z-50 sticky bg-neutral border-neutral-200 border-b w-full">
      <div className="flex justify-between items-center mx-auto px-4 max-w-[1180px] h-16">
        <Link href="/pay" className="flex items-center">
          <Logo className="w-auto h-8 text-neutral-900" />
        </Link>

        <nav className="hidden lg:flex justify-center items-center gap-8">
          <Link
            href="/pay/crypto-acquiring"
            className="py-1.5 font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
          >
            Crypto Acquiring
          </Link>
          <Link
            href="/pay/gaming"
            className="font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
          >
            Gaming
          </Link>
          <Link
            href="/pay/pricing"
            className="font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
          >
            Pricing
          </Link>

          <ResourcesPopover />
        </nav>

        <div className="hidden lg:flex justify-end items-center gap-6">
          <LocalizationSelect />

          <div className="flex items-center gap-3">
            <ButtonRoot
              asChild
              palette="secondary"
              variant="contained"
              size="sm"
            >
              <Link href="/sign-in" target="_blank">
                <ButtonText>Sign in</ButtonText>
              </Link>
            </ButtonRoot>

            <ButtonRoot asChild palette="primary" variant="contained" size="sm">
              <Link href="/create-account" target="_blank">
                <ButtonText>Create account</ButtonText>
              </Link>
            </ButtonRoot>
          </div>
        </div>

        <div className="lg:hidden flex justify-end">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

const RESOURCES_LINKS = [
  {
    title: "Partner Program",
    description: "Collaboration for mutual benefit",
    href: "/pay/partner-program",
    icon: <PartnerProgramIcon width={20} height={20} />,
  },
  {
    title: "News",
    description: "Crypto industry latest updates",
    href: "/pay/news",
    icon: <NewsIcon width={20} height={20} />,
  },
  {
    title: "FAQ",
    description: "Popular queries, simplified explanations",
    href: "/pay/faq",
    icon: <FaqIcon width={20} height={20} />,
  },
  {
    title: "API References",
    description: "Efficient integration guides",
    href: "/pay/api",
    icon: <ApiIcon width={20} height={20} />,
  },
  {
    title: "About us",
    description: "Find out the goals of our company",
    href: "/pay/about",
    icon: <AboutUsIcon width={20} height={20} />,
  },
];

function ResourcesPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="group flex items-center gap-1 font-medium text-neutral-700 hover:text-neutral-900 text-sm">
          <span>Resources</span>
          <ShevronDownIcon className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 hidden lg:block bg-neutral shadow-lg p-[8px] border border-neutral-200 rounded-xl min-w-[200px] [transform-origin:var(--radix-popover-content-transform-origin)] data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in"
          sideOffset={28}
          align="start"
        >
          {RESOURCES_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-[12px] hover:bg-neutral-100 px-4 py-3 rounded-xl min-w-[300px] text-sm transition-colors"
            >
              <div className="flex justify-center items-center bg-neutral border border-neutral-300 rounded-[12px] w-[40px] h-[40px]">
                {link.icon}
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="font-medium text-neutral-1000">
                  {link.title}
                </div>
                <div className="mt-0.5 text-neutral-500 text-xs">
                  {link.description}
                </div>
              </div>
            </Link>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function MobileMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex justify-center items-center w-10 h-10 text-neutral-700 hover:text-neutral-900 transition-colors">
          <MenuIcon className="w-6 h-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-50 fixed inset-0 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="top-0 right-0 z-50 fixed flex flex-col bg-neutral shadow-lg w-full max-w-[375px] h-full overflow-y-auto data-[state=closed]:animate-slide-out-to-right data-[state=open]:animate-slide-in-from-right"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center px-4 py-3 border-neutral-200 border-b">
              <Logo className="w-auto h-8 text-neutral-900" />
              <Dialog.Close asChild>
                <button className="flex justify-center items-center w-10 h-10 text-neutral-700 hover:text-neutral-900 transition-colors">
                  <CloseIcon className="w-6 h-6" />
                </button>
              </Dialog.Close>
            </div>

            <nav className="flex flex-col flex-grow px-2 pt-6">
              <Link
                href="/pay/crypto-acquiring"
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
              >
                Crypto Acquiring
              </Link>
              <Link
                href="/pay/gaming"
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
              >
                Gaming
              </Link>
              <Link
                href="/pay/pricing"
                className="px-2 py-3 font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors"
              >
                Pricing
              </Link>

              <Accordion.Root type="single" collapsible className="w-full">
                <Accordion.Item value="resources" className="border-b-0">
                  <Accordion.Trigger className="group flex justify-between items-center px-2 py-3 w-full font-medium text-neutral-700 hover:text-neutral-900 text-sm transition-colors">
                    <span>Resources</span>
                    <ShevronDownIcon className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="flex flex-col gap-2">
                      {RESOURCES_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-3 hover:bg-neutral-100 px-2 py-3 rounded-xl text-sm transition-colors"
                        >
                          <div className="flex justify-center items-center bg-neutral border border-neutral-300 rounded-[12px] w-[40px] h-[40px]">
                            {link.icon}
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <div className="font-medium text-neutral-1000 text-sm">
                              {link.title}
                            </div>
                            <div className="text-neutral-500 text-xs">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </nav>

            <div className="flex flex-col gap-6 px-2 pt-4 pb-6">
              <LocalizationSelect />

              <div className="flex flex-col gap-3">
                <ButtonRoot
                  asChild
                  palette="primary"
                  variant="contained"
                  size="md"
                >
                  <Link href="/create-account" target="_blank">
                    <ButtonText>Create account</ButtonText>
                  </Link>
                </ButtonRoot>

                <ButtonRoot
                  asChild
                  palette="secondary"
                  variant="contained"
                  size="md"
                >
                  <Link href="/sign-in" target="_blank">
                    <ButtonText>Sign in</ButtonText>
                  </Link>
                </ButtonRoot>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function LocalizationSelect() {
  const languages = [
    { code: "en", name: "English", flag: <FlagEn /> },
    { code: "bg", name: "Bulgarian", flag: <FlagBg /> },
    { code: "fr", name: "French", flag: <FlagFr /> },
    { code: "es", name: "Spanish", flag: <FlagEs /> },
  ];
  const currentLanguage =
    languages.find((lang) => lang.code === "en") || languages[0];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="group flex items-center gap-2 text-neutral-700 hover:text-neutral-900 text-sm transition-colors">
          <GlobeIcon className="w-6 h-6" />

          <span className="text-neutral-1000 hover:text-neutral-900 text-sm uppercase transition-colors">
            {currentLanguage.code}
          </span>

          <ShevronDownIcon className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 bg-neutral shadow-lg p-2 border border-neutral-200 rounded-xl min-w-[180px] [transform-origin:var(--radix-popover-content-transform-origin)] data-[state=closed]:animate-popover-out data-[state=open]:animate-popover-in"
          sideOffset={24}
          align="start"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="flex items-center gap-3 hover:bg-neutral-100 p-2 rounded-lg w-full transition-colors"
            >
              <div className="flex justify-center items-center rounded-full w-6 h-6">
                {lang.flag}
              </div>

              <div className="flex flex-col items-center py-0.5">
                <span className="text-neutral-1000 text-sm text-left">
                  {lang.name} ({lang.code.toUpperCase()})
                </span>
              </div>
            </button>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
