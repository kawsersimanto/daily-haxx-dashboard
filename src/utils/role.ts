import {
  ALL_MENU_ITEMS,
  COMMON_ROUTES,
  ROLE_MENU_CONFIG,
} from "@/constants/sidebarMenu";
import { IRole } from "@/features/user/user.interface";
import { SidebarMenuItem } from "@/types/sidebar";

/**
 * Get sidebar menu items based on user role
 */
export const getSidebarMenu = (role: IRole | null): SidebarMenuItem[] => {
  if (!role) return [];

  const menuKeys = ROLE_MENU_CONFIG[role] || [];
  return menuKeys
    .map((key) => ALL_MENU_ITEMS[key])
    .filter((item): item is SidebarMenuItem => Boolean(item));
};

/**
 * Check if a route is accessible by the user
 * Returns true if route is in role-specific menu or in common routes
 */
export const isRouteAccessible = (
  role: IRole | null,
  pathname: string
): boolean => {
  if (!role) return false;

  // Check if route is in common routes (accessible by all authenticated users)
  if (COMMON_ROUTES.some((route) => pathname.startsWith(route))) {
    return true;
  }

  // Check if route is in role-specific menu
  const menuItems = getSidebarMenu(role);
  return menuItems.some((item) => {
    if (item.url !== "#" && pathname.startsWith(item.url)) return true;
    return (
      item.items?.some((subItem) => pathname.startsWith(subItem.url)) ?? false
    );
  });
};

/**
 * Get all accessible routes for a role (menu items + common routes)
 */
export const getAllAccessibleRoutes = (role: IRole | null): string[] => {
  if (!role) return [];

  const menuItems = getSidebarMenu(role);
  const menuRoutes = menuItems.flatMap((item) => [
    item.url,
    ...(item.items?.map((sub) => sub.url) ?? []),
  ]);

  return [...menuRoutes, ...COMMON_ROUTES];
};
