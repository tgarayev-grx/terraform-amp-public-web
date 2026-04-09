"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { DocsProduct, DocsVersion } from "@/config/docs-navigation";
import type { DocsSearchItem } from "@/lib/docs-search.types";
import { useDocsMobileNav } from "@/components/DocsMobileNavContext";

import { DocsMobileMenu } from "@/components/DocsMobileMenu";
import { DocsSidebar } from "./DocsSidebar";
import { ParsedOperation } from "@/lib/openapi/types";

export type EndpointNavOperation = {
  operationId: string;
  slug: string;
  method: ParsedOperation["method"];
  path: string;
  summary?: string;
  href: string;
};

export type EndpointNavTag = {
  tag: string;
  operations: EndpointNavOperation[];
};

type DocsShellProps = {
  product: DocsProduct;
  version: DocsVersion;
  endpointTags: EndpointNavTag[];
  searchItems: DocsSearchItem[];
  children: ReactNode;
};

function useViewportMinMd() {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const onChange = () => setIsMd(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMd;
}

function parseDocsRoute(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const [, , third, fourth] = parts;
  if (third === "api-reference" || third === "reference") {
    return {
      activeSegment: "reference" as const,
      activeSlug: undefined,
      activeOperationSlug: fourth,
    };
  }
  if (third) {
    return {
      activeSegment: "article" as const,
      activeSlug: third,
      activeOperationSlug: undefined,
    };
  }
  return {
    activeSegment: "article" as const,
    activeSlug: undefined,
    activeOperationSlug: undefined,
  };
}

export function DocsShell({
  product,
  version,
  endpointTags,
  searchItems,
  children,
}: DocsShellProps) {
  const pathname = usePathname();
  const isMd = useViewportMinMd();
  const {
    open: mobileNavOpen,
    setOpen: setMobileNavOpen,
    setMobileHeaderSearch,
  } = useDocsMobileNav();
  const { activeSegment, activeSlug, activeOperationSlug } =
    parseDocsRoute(pathname);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  useEffect(() => {
    setMobileHeaderSearch({
      items: searchItems,
      registerShortcut: !isMd,
    });
    return () => setMobileHeaderSearch(null);
  }, [searchItems, isMd, setMobileHeaderSearch]);

  return (
    <div className="flex gap-0 mx-auto pr-4 md:pr-6 w-full">
      <DocsSidebar
        product={product}
        version={version}
        activeSegment={activeSegment}
        activeSlug={activeSlug}
        activeOperationSlug={activeOperationSlug}
        endpointTags={endpointTags}
        searchItems={searchItems}
        searchRegisterShortcut={isMd}
      />

      <div className="flex flex-col flex-1 bg-surface-canvas px-4 md:px-0 py-6 md:pl-6 rounded min-w-0 min-h-0">
        <DocsMobileMenu
          open={mobileNavOpen}
          onOpenChange={setMobileNavOpen}
          product={product}
          version={version}
          activeSegment={activeSegment}
          activeSlug={activeSlug}
          activeOperationSlug={activeOperationSlug}
          endpointTags={endpointTags}
        />

        <main className="flex flex-col flex-1 bg-surface-base p-6 px-4 rounded-2xl min-w-0 min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}
