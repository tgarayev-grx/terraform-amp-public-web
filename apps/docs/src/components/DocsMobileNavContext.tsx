"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { DocsSearchItem } from "@/lib/docs-search.types";

export type MobileHeaderSearchState = {
  items: DocsSearchItem[];
  registerShortcut: boolean;
};

type DocsMobileNavContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Filled by `DocsShell` on doc product/version routes (mobile search in header). */
  mobileHeaderSearch: MobileHeaderSearchState | null;
  setMobileHeaderSearch: (v: MobileHeaderSearchState | null) => void;
};

const DocsMobileNavContext = createContext<DocsMobileNavContextValue | null>(
  null
);

export function DocsMobileNavProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mobileHeaderSearch, setMobileHeaderSearch] =
    useState<MobileHeaderSearchState | null>(null);
  const value = useMemo(
    () => ({
      open,
      setOpen,
      mobileHeaderSearch,
      setMobileHeaderSearch,
    }),
    [open, mobileHeaderSearch]
  );
  return (
    <DocsMobileNavContext.Provider value={value}>
      {children}
    </DocsMobileNavContext.Provider>
  );
}

export function useDocsMobileNav(): DocsMobileNavContextValue {
  const ctx = useContext(DocsMobileNavContext);
  if (!ctx) {
    throw new Error(
      "useDocsMobileNav must be used within DocsMobileNavProvider"
    );
  }
  return ctx;
}
