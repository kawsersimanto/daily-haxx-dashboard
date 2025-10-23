"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
import { DataTableColumnHeader } from "@/components/data-table-column-header/DataTableColumnHeader";
import { DataTable } from "@/components/data-table/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreHorizontal, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDeletePaymentMutation, useGetPaymentsQuery } from "../payment.api";
import { IPaymentRecord } from "../payment.interface";

export const PaymentTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [updatePaymentFn, { isLoading: isUpdatingPayment }] = useUpdatePaymentMutation();
  const { data } = useGetPaymentsQuery();
  const [deletePaymentFn] = useDeletePaymentMutation();

  const payments = data?.data || [];
  const total = payments.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedPayments = payments.slice((page - 1) * limit, page * limit);

  const handleDelete = async (payment: IPaymentRecord) => {
    await handleMutationRequest(deletePaymentFn, payment?.id, {
      loadingMessage: "Deleting payment...",
      successMessage: () => "Payment deleted successfully!",
    });
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      "default" | "destructive" | "secondary" | "outline"
    > = {
      completed: "default",
      pending: "secondary",
      failed: "destructive",
      refunded: "outline",
    };
    return statusMap[status?.toLowerCase()] || "secondary";
  };

  const getActiveStatusBadge = (isActive: boolean) => {
    return isActive ? "default" : "secondary";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const columns: ColumnDef<IPaymentRecord>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 30,
    },
    {
      accessorKey: "stripeProductId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stripe Product ID" />
      ),
      cell: ({ row }) => (
        <CopyableCell value={row.original.stripeProductId}>
          <span className="font-medium text-xs">
            {row.original.stripeProductId}
          </span>
        </CopyableCell>
      ),
    },
    {
      accessorKey: "userId",
      header: "User ID",
      cell: ({ row }) => (
        <CopyableCell value={row.original.userId}>
          <span className="text-xs">{row.original.userId}</span>
        </CopyableCell>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => (
        <Badge variant={getPaymentStatusBadge(row.original.paymentStatus)}>
          {row.original.paymentStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "paymentMethodId",
      header: "Payment Method ID",
      cell: ({ row }) => (
        <CopyableCell value={row.original.paymentMethodId}>
          <span className="capitalize text-xs">
            {row.original.paymentMethodId}
          </span>
        </CopyableCell>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={getActiveStatusBadge(row.original.isActive)}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="End Date" />
      ),
      cell: ({ row }) => formatDate(row.original.endDate),
    },
    {
      accessorKey: "canceledAt",
      header: "Canceled Date",
      cell: ({ row }) => formatDate(row.original.canceledAt),
    },
    {
      accessorKey: "refundedAmount",
      header: "Refunded Amount",
      cell: ({ row }) =>
        row.original.refundedAmount !== null ? (
          `$${row.original.refundedAmount.toFixed(2)}`
        ) : (
          <Badge variant="outline" className="text-xs">
            None
          </Badge>
        ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`payments/${row?.original?.id}`}>
                <EyeIcon className="text-inherit" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original)}
              // disabled={isUpdatingPayment}
            >
              <Trash className="text-inherit" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDeleteMany = (rows: IPaymentRecord[], ids: string[]) => {
    console.log("Deleting multiple payments:", ids, rows);
    // Implement bulk delete if needed
  };

  return (
    <DataTable
      data={paginatedPayments}
      columns={columns}
      total={total}
      page={page}
      limit={limit}
      totalPages={totalPages}
      onPageChange={setPage}
      onDeleteSelected={handleDeleteMany}
      onPageSizeChange={(newLimit) => {
        setLimit(newLimit);
        setPage(1);
      }}
      renderActions={() => (
        <Button variant="outline" size="sm" asChild>
          <Link href="/payments/create">
            <PlusCircle /> Add Payment
          </Link>
        </Button>
      )}
    />
  );
};
