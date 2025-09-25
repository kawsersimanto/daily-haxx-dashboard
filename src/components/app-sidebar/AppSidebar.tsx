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
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const AppSidebar = () => {
  const [openItems, setOpenItems] = useState<string[]>(["Analytics"]);

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
    <Sidebar className="shadow-[0_10px_30px_0_rgba(38,3,71,0.06)]">
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

      <SidebarContent className="md:px-5 px-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible
                      open={openItems.includes(item.title)}
                      onOpenChange={() => toggleItem(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="[&>svg:first-child]:size-5"
                          asChild
                        >
                          <Link href="/" className="h-auto">
                            <item.icon />
                            <span>{item.title}</span>
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
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="[&>svg:first-child]:size-5"
                      asChild
                    >
                      <Link href={item.url} className="h-auto">
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="md:px-5 px-1">
        <AppUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
