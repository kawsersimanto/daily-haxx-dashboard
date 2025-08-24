"use client";

import { queryClient } from "@/lib/queryClient";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function QueryClient({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={null}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
