"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/features/user/user.interface";
import {
  ArrowLeftIcon,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import Link from "next/link";

export const UserProfileCard = ({ user }: { user: IUser }) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              {user?.firstName} {user?.lastName}
            </CardTitle>
            <p className="text-muted-foreground">{user?.jobTitle}</p>
          </div>
          <div className="flex gap-2">
            {user?.isEmailVerified && (
              <Badge variant="secondary">
                <CheckCircle2 />
                Verified
              </Badge>
            )}
            {user?.isActive && <Badge variant="default"> Active</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-primary uppercase">
            Contact Information
          </h3>
          <div className="space-y-2">
            <Link
              href={`mailto:${user?.email}`}
              className="flex items-center gap-3 text-sm"
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user?.email}</span>
            </Link>
            <Link
              href={`tel:${user?.phone}`}
              className="flex items-center gap-3 text-sm"
            >
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user?.phone}</span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {user?.postalCode}, {user?.country}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-primary uppercase">
            Professional Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm">Job Function</span>
                <Badge variant={"outline"} className="text-sm font-medium">
                  {user?.jobFunction}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm">Job Level</span>
                <Badge variant={"outline"} className="text-sm font-medium">
                  {user?.jobLevel}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-primary uppercase">
            Company Information
          </h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-sm">Industry</span>
                  <Badge variant={"outline"} className="text-sm font-medium">
                    {user?.companyIndustry}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-sm">Company Size</span>
                  <Badge variant={"outline"} className="text-sm font-medium">
                    <Users className="h-3 w-3 text-muted-foreground" />{" "}
                    {user?.companySize}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" aria-label="Go Back" asChild>
          <Link href="/users" className="mt-10">
            <ArrowLeftIcon /> Go Back
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
