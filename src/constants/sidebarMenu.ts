import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "#",
    items: [
      { title: "Overview", url: "#" },
      { title: "Reports", url: "#" },
      { title: "Insights", url: "#" },
    ],
  },
  {
    title: "E-commerce",
    icon: ShoppingCart,
    url: "#",
    items: [
      { title: "Products", url: "#", icon: Package },
      { title: "Orders", url: "#", icon: Truck },
      { title: "Payments", url: "#", icon: CreditCard },
    ],
  },
  {
    title: "Users",
    icon: Users,
    url: "#",
    items: [
      { title: "All Users", url: "#" },
      { title: "Roles", url: "#" },
      { title: "Permissions", url: "#" },
    ],
  },
  {
    title: "Content",
    icon: FileText,
    url: "#",
    items: [
      { title: "Posts", url: "#" },
      { title: "Pages", url: "#" },
      { title: "Media", url: "#" },
    ],
  },
];
