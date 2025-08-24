"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Archive,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  Home,
  Mail,
  Menu,
  Settings,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    children: [
      { id: "overview", label: "Overview", icon: BarChart3 },
      { id: "reports", label: "Reports", icon: FileText },
      { id: "insights", label: "Insights", icon: Star },
    ],
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    children: [
      { id: "all-users", label: "All Users", icon: Users },
      { id: "user-roles", label: "User Roles", icon: Settings },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: FileText,
    children: [
      { id: "posts", label: "Posts", icon: FileText },
      { id: "pages", label: "Pages", icon: Folder },
      { id: "archived", label: "Archived", icon: Archive },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icon: Mail,
    children: [
      { id: "messages", label: "Messages", icon: Mail },
      { id: "calendar", label: "Calendar", icon: Calendar },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export function SidebarLayout() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (itemId: string, hasChildren: boolean) => {
    if (hasChildren) {
      toggleExpanded(itemId);
    } else {
      setActiveItem(itemId);
      setIsMobileSidebarOpen(false);
    }
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeItem === item.id;

    return (
      <div key={item.id}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2 h-9 px-3",
            level > 0 && "ml-4 w-[calc(100%-1rem)]",
            isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
          onClick={() => handleItemClick(item.id, hasChildren)}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="truncate">{item.label}</span>
          {hasChildren && (
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </Button>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block fixed left-0 top-0 z-40 w-64 h-full border-r border-sidebar-border bg-sidebar">
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Navigation
          </h2>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => renderSidebarItem(item))}
          </div>
        </ScrollArea>
      </div>

      {isMobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          <div className="fixed left-0 top-0 z-50 w-64 h-full border-r border-sidebar-border bg-sidebar md:hidden">
            <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                Navigation
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 px-3 py-4">
              <div className="space-y-1">
                {sidebarItems.map((item) => renderSidebarItem(item))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col md:ml-64">
        <header className="h-14 border-b border-border bg-background px-4 md:px-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-8 w-8 p-0"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <h1 className="text-xl font-semibold capitalize">
            {sidebarItems.find((item) => item.id === activeItem)?.label ||
              sidebarItems
                .flatMap((item) => item.children || [])
                .find((child) => child.id === activeItem)?.label ||
              "Dashboard"}
          </h1>
        </header>

        <ScrollArea className="flex-1">
          <div className="p-4 md:p-6">
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-4 md:p-6">
                <h2 className="text-lg font-medium mb-4">
                  Welcome to the{" "}
                  {sidebarItems.find((item) => item.id === activeItem)?.label ||
                    sidebarItems
                      .flatMap((item) => item.children || [])
                      .find((child) => child.id === activeItem)?.label ||
                    "Dashboard"}{" "}
                  Section
                </h2>
                <p className="text-muted-foreground">
                  This is the main content area. It&apos;s fully scrollable and
                  will adapt based on your sidebar selection.
                </p>
              </div>

              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <h3 className="font-medium mb-2">Content Block {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is sample content to demonstrate the scrollable area.
                    You can add any content here - forms, tables, charts, or any
                    other components your application needs.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
