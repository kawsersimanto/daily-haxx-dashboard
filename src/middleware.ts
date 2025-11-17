import { IRole } from "@/features/user/user.interface";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { isRouteAccessible } from "./utils/role";

export interface DecodedToken {
  id: string;
  email: string;
  role: IRole;
  iat: number;
  exp: number;
}

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/unauthorized",
];

function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}

function isTokenExpired(token: DecodedToken): boolean {
  return Date.now() >= token.exp * 1000;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && !isTokenExpired(decoded)) {
        // Redirect authenticated users away from auth pages
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check token expiration
  if (isTokenExpired(decoded)) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // Role-based access control
  if (!isRouteAccessible(decoded.role, pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico)).*)",
  ],
};
