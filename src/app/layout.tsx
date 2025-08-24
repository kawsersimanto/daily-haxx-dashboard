import { QueryClient } from "@/providers/QueryClient";
import { ThemeProvider } from "@/providers/theme-provider";
import { getDefaultMetadata } from "@/utils/seo";
import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = getDefaultMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryClient>{children}</QueryClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
