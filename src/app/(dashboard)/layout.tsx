"use client";

import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { CSSProperties } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17.5rem",
        } as CSSProperties
      }
    >
      <AppSidebar />
      <main className="grow p-5">{children}</main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
