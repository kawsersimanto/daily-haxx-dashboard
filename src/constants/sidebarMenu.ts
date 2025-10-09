import { LayoutDashboard, LayoutList, Users } from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Articles",
    icon: LayoutList,
    url: "#",
    items: [
      { title: "All Articles", url: "/articles" },
      { title: "Add New", url: "/articles/create" },
      { title: "Categories", url: "/articles/categories" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    url: "#",
    items: [
      { title: "All Users", url: "/users" },
      { title: "Add New", url: "/users/create" },
    ],
  },
];
