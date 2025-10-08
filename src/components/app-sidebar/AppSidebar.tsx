"use client";

import { AppUser } from "@/components/app-user/AppUser";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { sidebarMenu } from "@/constants/sidebarMenu";
import { cn } from "@/lib/utils"; // <- shadcn utility
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const AppSidebar = () => {
  const [openItems, setOpenItems] = useState<string[]>(["Analytics"]);
  const pathname = usePathname();

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar className="shadow-[0_10px_30px_0_rgba(38,3,71,0.06)] !border-0">
      {/* Logo */}
      <SidebarHeader className="py-4 md:px-5 px-1">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/logo.svg"
            width={150}
            height={50}
            className="md:w-[150px] md:h-[50px] w-[150px] h-auto object-contain"
            alt={`${process.env.NEXT_PUBLIC_APP_NAME}`}
          />
        </Link>
      </SidebarHeader>

      {/* Sidebar Menu */}
      <SidebarContent className="md:px-5 px-2">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenu.map((item) => {
                const isParentActive =
                  item.items?.some((sub) => pathname.startsWith(sub.url)) ||
                  pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.items ? (
                      <Collapsible
                        open={openItems.includes(item.title)}
                        onOpenChange={() => toggleItem(item.title)}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={cn(
                              "[&>svg:first-child]:size-5 md:p-3 p-2",
                              isParentActive
                                ? "bg-primary-100 text-primary"
                                : "text-muted-foreground hover:bg-muted"
                            )}
                            asChild
                          >
                            <Link href={item.url} className="h-auto text-base">
                              <item.icon className="w-6 h-6 object-contain" />
                              <span className="text-base font-medium">
                                {item.title}
                              </span>
                              {openItems.includes(item.title) ? (
                                <ChevronDown className="ml-auto size-4" />
                              ) : (
                                <ChevronRight className="ml-auto size-4" />
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => {
                              const isSubActive = pathname === subItem.url;

                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <Link
                                      href={subItem.url}
                                      className={cn(
                                        "text-base",
                                        isSubActive
                                          ? "!text-primary font-medium"
                                          : "text-muted-foreground hover:text-foreground"
                                      )}
                                    >
                                      <span className="text-inherit">
                                        {subItem.title}
                                      </span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={cn(
                          "[&>svg:first-child]:size-5 md:p-3 p-2",
                          pathname === item.url
                            ? "bg-primary-100 text-black"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                        asChild
                      >
                        <Link href={item.url} className="h-auto text-base">
                          <item.icon className="w-6 h-6 object-contain" />
                          <span className="text-base font-medium">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User */}
      <SidebarFooter className="md:px-5 px-1">
        <AppUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
