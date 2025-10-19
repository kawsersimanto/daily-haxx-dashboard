"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const UserProfileCardSkeleton = () => {
  return (
    <Card className="w-full max-w-2xl animate-in fade-in-50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">
              <Skeleton className="h-6 w-40" />
            </CardTitle>
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Contact Information */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
        </div>

        {/* Company Information */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
        </div>

        {/* Buttons */}
        <ButtonGroup className="mt-10">
          <Button variant="outline" disabled>
            <Skeleton className="h-4 w-12" />
          </Button>
          <Button variant="outline" disabled>
            <Skeleton className="h-4 w-12" />
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};
