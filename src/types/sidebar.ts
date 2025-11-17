import { LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
  title: string;
  icon: LucideIcon;
  url: string;
  items?: SidebarSubItem[];
}

export interface SidebarSubItem {
  title: string;
  url: string;
}
