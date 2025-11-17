import { IRole } from "@/features/user/user.interface";
import { DecodedToken } from "@/middleware";
import { jwtDecode } from "jwt-decode";

/**
 * Decode a JWT token and return its payload.
 * Returns `null` if the token is invalid or can't be decoded.
 */

export function decodeToken(token: string) {
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

/**
 * Check whether a JWT token is expired.
 * Returns `true` if the token is expired or invalid.
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const TOKEN_KEY = "token";
export const TOKEN_COOKIE_NAME = "token";

export interface TokenStorageOptions {
  useLocalStorage?: boolean;
  useCookie?: boolean;
}

/**
 * Save token to storage (localStorage and/or cookie)
 */
export const saveToken = (
  token: string,
  options: TokenStorageOptions = { useLocalStorage: true, useCookie: true }
): void => {
  if (options.useLocalStorage) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (options.useCookie) {
    document.cookie = `${TOKEN_COOKIE_NAME}=${token}; path=/; max-age=86400`;
  }
};

/**
 * Remove token from all storage locations
 */
export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

/**
 * Extract error message from API response
 */
export const extractErrorMessage = (
  error: unknown,
  fallbackMessage: string = "An error occurred"
): string => {
  return (
    (error as { data?: { message?: string } })?.data?.message || fallbackMessage
  );
};

/**
 * Get token from localStorage (client-side only)
 */
export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY) || null;
};

/**
 * Decode token safely
 */
export const decodeStoredToken = (): DecodedToken | null => {
  const token = getStoredToken();
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    clearToken();
    return null;
  }
};

/**
 * Check if token is valid and not expired
 */
export const isTokenValid = (): boolean => {
  const decoded = decodeStoredToken();
  if (!decoded) return false;
  return Date.now() < decoded.exp * 1000;
};

/**
 * Get user role from token
 */
export const getUserRole = (): IRole | null => {
  const decoded = decodeStoredToken();
  return decoded?.role || null;
};
