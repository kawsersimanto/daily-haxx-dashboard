import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ArticleDetailsCardSkeleton = () => {
  return (
    <div>
      <Card className="w-full p-3.5 rounded-md shadow-none gap-9">
        <div>
          {/* Cover image */}
          <Skeleton className="w-full lg:h-[438px] h-[280px] rounded" />

          {/* Meta info (date, company, share buttons) */}
          <div className="flex items-center justify-between mt-3.5">
            <div className="flex items-center sm:gap-3 gap-2">
              <Skeleton className="h-4 w-20" />
              <span className="text-light-muted">•</span>
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center sm:gap-5 gap-2">
              <Button variant="link" className="p-0 h-auto">
                <Skeleton className="h-5 w-5 rounded-full" />
              </Button>
              <Button variant="link" className="p-0 h-auto">
                <Skeleton className="h-5 w-5 rounded-full" />
              </Button>
              <Button variant="link" className="p-0 h-auto">
                <Skeleton className="h-5 w-5 rounded-full" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-0 relative">
          {/* Title */}
          <Skeleton className="h-7 w-3/4 mb-4" />

          {/* Body text lines */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Unlock card placeholder */}
          <div className="mt-6">
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
