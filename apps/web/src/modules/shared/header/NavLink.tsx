"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { DEFAULT_LOCALE } from "@/modules/cross-cutting-concerns/i18n/config";
import { Link } from "@/modules/cross-cutting-concerns/i18n/navigation";

type HeaderNavLinkProps = PropsWithChildren & {
  className?: string;
  href: string;
  exact?: boolean;
};

export function HeaderNavLink({
  href,
  exact,
  className,
  children,
}: HeaderNavLinkProps) {
  const isActive = useNavLink(href, exact);

  return (
    <Link
      href={href}
      className={clsx(
        "whitespace-nowrap transition-colors",
        isActive
          ? "text-body-md-semibold text-text-strong-1000"
          : "text-body-md-medium text-text-subtle-700 hover:text-text-strong-1000",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function useNavLink(href: string, exact?: boolean) {
  const pathname = usePathname();
  const locale = useLocale();

  const segments = hrefToPathSegments(pathname, {
    isNotDefaultLocale: locale !== DEFAULT_LOCALE,
  });
  const segmentedHref = hrefToPathSegments(href);

  const isActive =
    segments.every((segment, index) => segment === segmentedHref[index]) &&
    (exact
      ? segments.length === segmentedHref.length
      : segments.length >= segmentedHref.length);

  return isActive;
}

export function hrefToPathSegments(
  href: string,
  config?: { trailingSlash?: boolean; isNotDefaultLocale?: boolean }
) {
  return href.split("/").slice(config?.isNotDefaultLocale ? 2 : 1, -1);
}
