"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const PaymentSkeleton = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-1">
            <Skeleton className="h-6 w-48 rounded-md" />
          </div>
          <Skeleton className="h-4 w-32 rounded-md mt-1" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Payment information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Skeleton className="h-3 w-24 rounded-sm mb-2" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>

        <div>
          <Skeleton className="h-3 w-24 rounded-sm mb-2" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>

        <div>
          <Skeleton className="h-3 w-28 rounded-sm mb-2" />
          <Skeleton className="h-5 w-28 rounded-md" />
        </div>

        <div>
          <Skeleton className="h-3 w-36 rounded-sm mb-2" />
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Plan details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Skeleton className="h-4 w-28 rounded-sm mb-2" />
          <Skeleton className="h-5 w-36 rounded-md" />
        </div>

        <div>
          <Skeleton className="h-4 w-28 rounded-sm mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Skeleton className="h-4 w-36 rounded-sm mb-2" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      <Separator className="mb-4" />

      {/* Customer information */}
      <div className="mb-6">
        <Skeleton className="h-4 w-40 rounded-sm mb-3" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-3 w-20 rounded-sm mb-2" />
            <Skeleton className="h-5 w-40 rounded-md" />
          </div>

          <div>
            <Skeleton className="h-3 w-20 rounded-sm mb-2" />
            <Skeleton className="h-5 w-48 rounded-md" />
          </div>

          <div>
            <Skeleton className="h-3 w-20 rounded-sm mb-2" />
            <Skeleton className="h-5 w-40 rounded-md" />
          </div>

          <div>
            <Skeleton className="h-3 w-20 rounded-sm mb-2" />
            <Skeleton className="h-5 w-36 rounded-md" />
          </div>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Subscription details */}
      <div className="mb-6">
        <Skeleton className="h-4 w-44 rounded-sm mb-3" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-3 w-28 rounded-sm mb-2" />
            <Skeleton className="h-5 w-56 rounded-md" />
          </div>
          <div>
            <Skeleton className="h-3 w-28 rounded-sm mb-2" />
            <Skeleton className="h-5 w-56 rounded-md" />
          </div>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Timestamps */}
      <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-36 rounded-md" />
        <Skeleton className="h-4 w-36 rounded-md" />
      </div>
    </div>
  );
};
