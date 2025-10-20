"use client";

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
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { generateFilterOptions, multiSelectFilterFn } from "@/utils/table";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Ban,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash,
  Unlock,
} from "lucide-react";
import Link from "next/link";

import { ISubscription } from "@/features/subscription/subscription.interface";
import {
  useDeleteSubscriptionMutation,
  useGetSubscriptionsQuery,
  useUpdateSubscriptionMutation,
} from "../subscription.api";

export const SubscriptionTable = () => {
  const { data } = useGetSubscriptionsQuery();
  const subscriptions = data?.data || [];
  const [updateSubscriptionFn, { isLoading: isUpdating }] =
    useUpdateSubscriptionMutation();
  const [deleteSubscriptionFn] = useDeleteSubscriptionMutation();

  const handleToggleActive = async (sub: ISubscription) => {
    const newStatus = !sub.isActive;
    await handleMutationRequest(
      updateSubscriptionFn,
      { id: sub.id, isActive: newStatus },
      {
        loadingMessage: newStatus
          ? "Activating plan..."
          : "Deactivating plan...",
        successMessage: () =>
          newStatus
            ? "Plan activated successfully!"
            : "Plan deactivated successfully!",
      }
    );
  };

  const handleDelete = async (sub: ISubscription) => {
    await handleMutationRequest(deleteSubscriptionFn, sub.id, {
      loadingMessage: "Deleting plan...",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });
  };

  const intervalOptions = generateFilterOptions(
    subscriptions,
    (subscription) => subscription?.interval,
    {
      sort: true,
      removeEmpty: true,
    }
  );

  const pricingOptions = generateFilterOptions(
    subscriptions,
    (subscription) => subscription?.price,
    {
      sort: true,
      removeEmpty: true,
    }
  ).map((opt) => ({
    label: opt.value === 0 ? "Free" : `$${opt.value}`,
    value: opt.value,
  }));

  const columns: ColumnDef<ISubscription>[] = [
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Plan Name" />
      ),
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => (
        <span>
          {row.original.price > 0
            ? `$${row.original.price.toFixed(2)}`
            : "Free"}
        </span>
      ),
      meta: {
        filterOptions: pricingOptions,
      },
      filterFn: (row, columnId, filterValue) => {
        const price = row.getValue(columnId) as number;
        if (!filterValue || filterValue.length === 0) return true;
        return filterValue.some((selectedValue: string | number) => {
          if (selectedValue === "Free") {
            return price === 0;
          }
          return price === Number(selectedValue);
        });
      },
    },
    {
      accessorKey: "interval",
      header: "Interval",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.interval}
        </Badge>
      ),
      meta: {
        filterOptions: intervalOptions,
        filterFn: multiSelectFilterFn,
      },
    },
    {
      accessorKey: "currency",
      header: "Currency",
      cell: ({ row }) => row.original.currency.toUpperCase(),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "destructive"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
      meta: {
        filterLabel: "Status",
        filterOptions: [
          { label: "Active", value: true },
          { label: "Inactive", value: false },
        ],
      },
      filterFn: multiSelectFilterFn,
    },
    {
      accessorKey: "features",
      header: "Features",
      cell: ({ row }) => (
        <span>{row.original.features?.length ?? 0} features</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
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
              <Link href={`subscriptions/${row.original.id}`}>
                <Pencil className="text-inherit" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleToggleActive(row.original)}
              disabled={isUpdating}
            >
              {row.original.isActive ? (
                <>
                  <Ban className="text-inherit" /> Deactivate
                </>
              ) : (
                <>
                  <Unlock className="text-inherit" /> Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original)}>
              <Trash className="text-inherit" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDeleteMany = (rows: ISubscription[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  return (
    <DataTable
      data={subscriptions}
      columns={columns}
      paginationMode="client"
      csvFileName="subscription.csv"
      onDeleteSelected={(rows, ids) => {
        handleDeleteMany(rows, ids);
      }}
      renderActions={() => (
        <Button variant="outline" size="sm" asChild>
          <Link href="/subscriptions/create">
            <PlusCircle /> Add New
          </Link>
        </Button>
      )}
    />
  );
};
