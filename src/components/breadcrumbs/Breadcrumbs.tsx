"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type BreadcrumbItemType = {
  label: string;
  href?: string; // omit href for the current page
};

type BreadcrumbsProps = {
  fallback?: Record<string, string>; // optional label overrides for auto mode
  manual?: BreadcrumbItemType[]; // fully controlled breadcrumbs
};

export const Breadcrumbs = ({ fallback = {}, manual }: BreadcrumbsProps) => {
  const pathname = usePathname();

  // Determine breadcrumb items
  const items: BreadcrumbItemType[] = manual
    ? manual
    : pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, arr) => {
          const href = "/" + arr.slice(0, index + 1).join("/");
          const label =
            fallback[segment] ?? decodeURIComponent(segment).replace(/-/g, " ");
          return { label, href: index === arr.length - 1 ? undefined : href };
        });

  return (
    <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <React.Fragment key={item.label}>
                  <BreadcrumbItem>
                    {item.href && !isLast ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>

                  {/* Separator outside the li to avoid nested li */}
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
