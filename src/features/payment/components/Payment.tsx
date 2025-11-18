"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetPaymentByIdQuery } from "../payment.api";
import { getStatusColor } from "../payment.utils";
import { PaymentSkeleton } from "./PaymentSkeleton";

export const Payment = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetPaymentByIdQuery(id);
  const payment = data?.data;

  if (isLoading) return <PaymentSkeleton />;

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            <CopyableCell value={payment?.id || "-"}>
              #{payment?.id}
            </CopyableCell>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {payment?.plan?.name}
          </p>
        </div>

        <div className="flex gap-2">
          <Badge variant={getStatusColor(payment?.paymentStatus || "")}>
            {payment?.paymentStatus}
          </Badge>
          {payment?.cancelAtPeriodEnd && (
            <Badge variant="outline">Canceling</Badge>
          )}
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Payment Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Amount
          </h4>
          <p className="text-sm font-medium">
            {payment?.amount ? `$${payment?.amount.toFixed(2)}` : "—"}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Currency
          </h4>
          <p className="text-sm font-medium">
            {payment?.plan?.currency?.toUpperCase() || "—"}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Billing Period
          </h4>
          <p className="text-sm font-medium capitalize">
            {payment?.plan?.interval || "—"}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">
            Payment Method ID
          </h4>
          <CopyableCell value={payment?.paymentMethodId || "—"}>
            <p className="text-sm font-medium text-foreground">
              {payment?.paymentMethodId || "—"}
            </p>
          </CopyableCell>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Plan Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-bold mb-1">Plan Name</h4>
          <p className="text-sm text-foreground">
            {payment?.plan?.name || "—"}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-1">Plan Price</h4>
          <p className="text-sm text-foreground">
            ${payment?.plan?.price?.toFixed(2) || "—"} /{" "}
            {payment?.plan?.interval}
          </p>
        </div>
      </div>

      {payment?.plan?.description && (
        <div className="mb-6">
          <h4 className="text-sm font-bold mb-2">Plan Description</h4>
          <p className="text-sm text-foreground leading-relaxed">
            {payment?.plan?.description}
          </p>
        </div>
      )}

      <Separator className="mb-4" />

      {/* User Information */}
      <div className="mb-6">
        <h4 className="text-sm font-bold mb-3">Customer Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Name</p>
            <p className="text-sm font-medium">
              {payment?.user?.firstName} {payment?.user?.lastName}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <CopyableCell value={payment?.user?.email || "—"}>
              <p className="text-sm font-medium">
                {payment?.user?.email || "—"}
              </p>
            </CopyableCell>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Company</p>
            <p className="text-sm font-medium">
              {payment?.user?.companyName || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Job Title</p>
            <p className="text-sm font-medium">
              {payment?.user?.jobTitle || "—"}
            </p>
          </div>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Subscription Details */}
      <div className="mb-6">
        <h4 className="text-sm font-bold mb-3">Subscription Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Subscription ID
            </p>
            <CopyableCell value={payment?.subscriptionId || "—"}>
              <p className="text-sm font-medium text-foreground">
                {payment?.subscriptionId || "—"}
              </p>
            </CopyableCell>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Stripe Customer ID
            </p>
            <CopyableCell value={payment?.user?.stripeCustomerId || "—"}>
              <p className="text-sm font-medium text-foreground">
                {payment?.user?.stripeCustomerId || "—"}
              </p>
            </CopyableCell>
          </div>
          {payment?.refundedAmount && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Refunded Amount
              </p>
              <p className="text-sm font-medium">
                ${payment?.refundedAmount.toFixed(2)}
              </p>
            </div>
          )}
          {payment?.canceledAt && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Canceled At</p>
              <p className="text-sm font-medium">
                {new Date(payment?.canceledAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Timestamps */}
      <Separator className="mb-4" />
      <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
        <p>
          Created:{" "}
          {payment?.createdAt
            ? new Date(payment?.createdAt).toLocaleDateString()
            : "—"}
        </p>
        <p>
          Updated:{" "}
          {payment?.updatedAt
            ? new Date(payment?.updatedAt).toLocaleDateString()
            : "—"}
        </p>
      </div>
    </div>
  );
};
