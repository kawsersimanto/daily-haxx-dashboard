import { LayoutDashboard, Users } from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Users",
    icon: Users,
    url: "#",
    items: [
      { title: "All Users", url: "/users" },
      { title: "Roles", url: "#" },
      { title: "Permissions", url: "#" },
    ],
  },
];
