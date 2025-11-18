"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
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
import {
  IPaymentRecord,
  IPaymentStatus,
} from "@/features/payment/payment.interface";
import { ApiResponse } from "@/types/api";
import { formatDate } from "@/utils/date";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { generateFilterOptions, multiSelectFilterFn } from "@/utils/table";
import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDeletePaymentMutation, useGetPaymentsQuery } from "../payment.api";
import { formatCurrency, getStatusColor } from "../payment.utils";

export const PaymentTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data } = useGetPaymentsQuery({ page, limit });
  const payments = data?.data?.data || [];
  const [deletePaymentFn] = useDeletePaymentMutation();

  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const statusOptions = generateFilterOptions(
    Object.values(IPaymentStatus),
    (status) => status,
    {
      sort: true,
      removeEmpty: true,
    }
  );

  const handleDelete = async (payment: IPaymentRecord) => {
    await handleMutationRequest(deletePaymentFn, payment?.id, {
      loadingMessage: "Deleting Payment",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });
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
      accessorKey: "id",
      header: "Payment ID",
      cell: ({ row }) => (
        <CopyableCell value={row.original.id}>
          <span className="font-mono text-sm">
            {row.original.id.slice(0, 15)}...
          </span>
        </CopyableCell>
      ),
    },
    {
      accessorKey: "subscriptionId",
      header: "Subscription ID",
      cell: ({ row }) => (
        <CopyableCell value={row.original.subscriptionId}>
          <span className="font-mono text-sm">
            {row.original.subscriptionId.slice(0, 15)}...
          </span>
        </CopyableCell>
      ),
    },
    {
      accessorKey: "stripePriceId",
      header: "Stripe Price ID",
      cell: ({ row }) => (
        <CopyableCell value={row.original.stripePriceId}>
          <span className="font-mono text-sm">
            {row.original.stripePriceId.slice(0, 15)}...
          </span>
        </CopyableCell>
      ),
    },
    {
      accessorFn: ({ user }) => `${user.firstName} ${user.lastName}`,
      header: "Name",
      cell: ({ row }) => (
        <div>
          {row.original.user.firstName} {row.original.user.lastName}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => formatCurrency(row.original.amount),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) =>
        row.original.endDate ? formatDate(row.original.endDate) : "-",
    },
    {
      accessorKey: "canceledAt",
      header: "Canceled Date",
      cell: ({ row }) =>
        row.original.canceledAt ? formatDate(row.original.canceledAt) : "-",
    },
    {
      accessorKey: "refundedAmount",
      header: "Refunded Amount",
      cell: ({ row }) =>
        row.original.refundedAmount
          ? formatCurrency(row.original.refundedAmount)
          : "-",
    },
    {
      accessorKey: "paymentStatus",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={getStatusColor(row.original.paymentStatus)}>
          {row.original.paymentStatus}
        </Badge>
      ),
      meta: {
        filterLabel: "Payment Status",
        filterOptions: statusOptions,
        filterFn: multiSelectFilterFn,
      },
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
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original)}>
              <Trash className="text-inherit" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDeleteMany = (rows: IPaymentRecord[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  return (
    <DataTable
      data={payments}
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
    />
  );
};
