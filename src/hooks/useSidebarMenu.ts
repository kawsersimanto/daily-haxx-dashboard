"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { getSidebarMenu } from "@/utils/role";
import { useMemo } from "react";

export const useSidebarMenu = () => {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  const sidebarMenu = useMemo(() => {
    return getSidebarMenu(role);
  }, [role]);

  return sidebarMenu;
};
