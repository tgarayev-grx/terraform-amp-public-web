"use client";

import Link, { LinkProps } from "next/link";

import clsx from "clsx";

import type {
  DocsProduct,
  DocsVersion,
  NavNode,
} from "@/config/docs-navigation";
import type { EndpointNavTag } from "@/components/DocsShell";
import type { DocsSearchItem } from "@/lib/docs-search.types";
import { ComponentPropsWithRef, forwardRef } from "react";
import { DocsSearch } from "@/components/DocsSearch";
import { DocsApiMethodBadge } from "@/components/DocsApiMethodBadge";

type DocsSidebarProps = {
  product: DocsProduct;
  version: DocsVersion;
  activeSegment: "article" | "reference";
  activeSlug?: string;
  activeOperationSlug?: string;
  endpointTags: EndpointNavTag[];
  searchItems: DocsSearchItem[];
  searchRegisterShortcut: boolean;
};

export type DocsNavContentProps = {
  product: DocsProduct;
  version: DocsVersion;
  activeSegment: "article" | "reference";
  activeSlug?: string;
  activeOperationSlug?: string;
  endpointTags: EndpointNavTag[];
  /** Called after a nav link is activated (e.g. close mobile drawer). */
  onNavigate?: () => void;
};

function OpenApiNavGroup({
  endpointTags,
  activeOperationSlug,
  onNavigate,
}: {
  endpointTags: EndpointNavTag[];
  activeOperationSlug?: string;
  onNavigate?: () => void;
}) {
  return (
    <li className="flex flex-col gap-5">
      {endpointTags.map((group) => (
        <div key={group.tag} className="flex flex-col gap-1">
          <div className="px-2 pt-2 pb-[2px] font-medium text-[11px]/[16px] text-text-soft-500 uppercase tracking-[0.055px]">
            {group.tag}
          </div>

          <ul className="flex flex-col gap-1">
            {group.operations.map((op) => {
              const label = op.summary ?? op.operationId;
              const active = activeOperationSlug === op.slug;
              return (
                <li key={`${op.method}-${op.path}-${op.operationId}`}>
                  <SidebarNavLink
                    className="flex items-start gap-2"
                    href={op.href}
                    active={active}
                    onNavigate={onNavigate}
                  >
                    <DocsApiMethodBadge method={op.method} />

                    <span>{label}</span>
                  </SidebarNavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </li>
  );
}

function NavItems({
  className,
  nodes,
  productSlug,
  versionSlug,
  depth,
  activeSegment,
  activeSlug,
  activeOperationSlug,
  endpointTags,
  onNavigate,
}: {
  nodes: NavNode[];
  productSlug: string;
  versionSlug: string;
  depth: number;
  activeSegment: "article" | "reference";
  activeSlug?: string;
  activeOperationSlug?: string;
  endpointTags: EndpointNavTag[];
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className={clsx("flex flex-col", className)}>
      {nodes.map((node, i) => (
        <NavEntry
          key={
            node.type === "article"
              ? `a-${node.slug}`
              : node.type === "openapi"
                ? "openapi"
                : `g-${node.title}-${i}`
          }
          node={node}
          productSlug={productSlug}
          versionSlug={versionSlug}
          depth={depth}
          activeSegment={activeSegment}
          activeSlug={activeSlug}
          activeOperationSlug={activeOperationSlug}
          endpointTags={endpointTags}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  );
}

function NavEntry({
  node,
  productSlug,
  versionSlug,
  depth,
  activeSegment,
  activeSlug,
  activeOperationSlug,
  endpointTags,
  onNavigate,
}: {
  node: NavNode;
  productSlug: string;
  versionSlug: string;
  depth: number;
  activeSegment: "article" | "reference";
  activeSlug?: string;
  activeOperationSlug?: string;
  endpointTags: EndpointNavTag[];
  onNavigate?: () => void;
}) {
  if (node.type === "group") {
    return (
      <li className="flex flex-col gap-1">
        <div className="px-2 pt-2 pb-[2px] font-medium text-[11px]/[16px] text-text-soft-500 uppercase tracking-[0.055px]">
          {node.title}
        </div>

        <NavItems
          className="gap-1"
          nodes={node.children}
          productSlug={productSlug}
          versionSlug={versionSlug}
          depth={depth + 1}
          activeSegment={activeSegment}
          activeSlug={activeSlug}
          activeOperationSlug={activeOperationSlug}
          endpointTags={endpointTags}
          onNavigate={onNavigate}
        />
      </li>
    );
  }

  if (node.type === "openapi") {
    return (
      <OpenApiNavGroup
        endpointTags={endpointTags}
        activeOperationSlug={activeOperationSlug}
        onNavigate={onNavigate}
      />
    );
  }

  const href = `/${productSlug}/${versionSlug}/${node.slug}/`;
  const active = activeSegment === "article" && activeSlug === node.slug;
  return (
    <li>
      <SidebarNavLink href={href} active={active} onNavigate={onNavigate}>
        {node.title}
      </SidebarNavLink>
    </li>
  );
}

export function DocsNavContent({
  product,
  version,
  activeSegment,
  activeSlug,
  activeOperationSlug,
  endpointTags,
  onNavigate,
}: DocsNavContentProps) {
  return (
    <nav aria-label="Documentation">
      <NavItems
        className="gap-5"
        nodes={version.nav}
        productSlug={product.slug}
        versionSlug={version.slug}
        depth={0}
        activeSegment={activeSegment}
        activeSlug={activeSlug}
        activeOperationSlug={activeOperationSlug}
        endpointTags={endpointTags}
        onNavigate={onNavigate}
      />
    </nav>
  );
}

export function DocsSidebar({
  product,
  version,
  activeSegment,
  activeSlug,
  activeOperationSlug,
  endpointTags,
  searchItems,
  searchRegisterShortcut,
}: DocsSidebarProps) {
  return (
    <aside className="hidden md:block w-[272px] shrink-0">
      <div className="top-16 sticky px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="mb-4">
          <DocsSearch
            items={searchItems}
            variant="sidebar"
            registerShortcut={searchRegisterShortcut}
          />
        </div>

        <DocsNavContent
          product={product}
          version={version}
          activeSegment={activeSegment}
          activeSlug={activeSlug}
          activeOperationSlug={activeOperationSlug}
          endpointTags={endpointTags}
        />
      </div>
    </aside>
  );
}

const SidebarNavLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithRef<typeof Link> & {
    active: boolean;
    onNavigate?: () => void;
  }
>(({ className, active, onNavigate, onClick, ...props }, ref) => {
  return (
    <Link
      {...props}
      ref={ref}
      onClick={(e) => {
        onNavigate?.();
        onClick?.(e);
      }}
      className={clsx(
        "block hover:bg-bg-weak-100 active:bg-bg-soft-200 px-3 py-2.5 rounded-lg text-body-md-medium transition-colors",
        active
          ? "bg-bg-weak-100 text-primary-base-1000"
          : "text-text-subtle-700 hover:text-primary-base-1000 ",
        className
      )}
    />
  );
});
SidebarNavLink.displayName = "SidebarNavLink";
