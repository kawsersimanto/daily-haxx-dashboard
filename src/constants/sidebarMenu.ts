import {
  CalendarClock,
  CircleDollarSign,
  LayoutDashboard,
  LayoutList,
  ListTodo,
  Users,
} from "lucide-react";

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
    title: "Polls",
    icon: ListTodo,
    url: "#",
    items: [
      { title: "All Polls", url: "/polls" },
      { title: "Add New", url: "/polls/create" },
      { title: "Categories", url: "/polls/categories" },
    ],
  },
  {
    title: "Subscriptions",
    icon: CalendarClock,
    url: "#",
    items: [
      { title: "All Subscriptions", url: "/subscriptions" },
      { title: "Add New", url: "/subscriptions/create" },
    ],
  },
  {
    title: "Payments",
    icon: CircleDollarSign,
    url: "#",
    items: [
      { title: "All Payments", url: "/payments" },
      { title: "Add New", url: "/payments/create" },
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
