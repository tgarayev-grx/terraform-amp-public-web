"use client";

import { DocsSearch } from "@/components/DocsSearch";
import { useDocsMobileNav } from "@/components/DocsMobileNavContext";

export function DocsHeaderMobileSearch() {
  const { mobileHeaderSearch } = useDocsMobileNav();

  if (!mobileHeaderSearch) {
    return null;
  }

  return (
    <div className="md:hidden shrink-0">
      <DocsSearch
        items={mobileHeaderSearch.items}
        variant="headerIcon"
        registerShortcut={mobileHeaderSearch.registerShortcut}
      />
    </div>
  );
}
