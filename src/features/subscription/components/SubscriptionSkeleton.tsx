import { Skeleton } from "@/components/ui/skeleton";

export const SubscriptionSkeleton = () => {
  return (
    <div className="space-y-5 py-5 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="mt-2">
            <Skeleton className="h-6 w-3/4 rounded-md" />
          </div>
        </div>
        <div>
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="mt-2">
            <Skeleton className="h-6 w-1/2 rounded-md" />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="border-dashed border border-border rounded-2xl px-4 pt-5 pb-3">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};
