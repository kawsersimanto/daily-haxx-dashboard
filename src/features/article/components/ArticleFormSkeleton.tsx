"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const ArticleFormSkeleton = () => {
  return (
    <div className="space-y-5 py-5">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-40 w-full" />
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Button */}
      <div className="pt-2">
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};
