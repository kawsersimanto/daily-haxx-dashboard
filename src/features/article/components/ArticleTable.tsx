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
import { formatDate } from "@/utils/date";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { ColumnDef } from "@tanstack/react-table";
import {
  Clock,
  Edit,
  EyeIcon,
  MoreHorizontal,
  PlusCircle,
  Trash,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDeleteArticleMutation, useGetArticlesQuery } from "../article.api";
import { IArticle } from "../article.interface";

export const ArticleTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data } = useGetArticlesQuery({ page, limit });
  const [deleteArticleFn, { isLoading: isDeletingArticle }] =
    useDeleteArticleMutation();

  const articles = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const handleDelete = async (article: IArticle) => {
    console.log("delete article:", article.id);
    await handleMutationRequest(deleteArticleFn, article?.id, {
      loadingMessage: "Deleting Article",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });
  };

  const handleDeleteMany = (rows: IArticle[], ids: string[]) => {
    console.log("Deleting:", ids, rows);
  };

  const columns: ColumnDef<IArticle>[] = [
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
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 w-[400px] items-center">
            <Image
              src={row.original?.coverImage || "/placeholder.png"}
              alt={row.original.title}
              height={100}
              width={100}
              className="h-[50px] w-[50px] object-cover rounded-md border border-slate-200"
            />
            <p className="text-sm font-medium whitespace-break-spaces capitalize line-clamp-2">
              {row.original?.title}
            </p>
          </div>
        );
      },
      size: 400,
    },
    {
      accessorFn: (row) => row.category?.name,
      id: "category",
      header: "Category",
      cell: ({ row }) => row.original.category?.name || "-",
    },
    {
      accessorKey: "companyName",
      header: "Company",
    },
    {
      accessorKey: "readingTime",
      header: "Reading Time",
      cell: ({ row }) => {
        return (
          <Badge variant={"outline"}>
            <Clock />
            {row.original.readingTime} min
          </Badge>
        );
      },
    },
    {
      id: "author",
      header: "Author",
      cell: ({ row }) => {
        return (
          <Badge variant={"secondary"}>
            <UserCircle />
            {row.original?.user?.firstName} {row.original?.user?.lastName}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => formatDate(row.original.createdAt),
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
              <Link href={`/articles/${row.original.slug}`}>
                <EyeIcon className="text-inherit" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/articles/edit/${row.original.id}`}>
                <Edit className="text-inherit" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original)}
              disabled={isDeletingArticle}
            >
              <Trash className="text-inherit" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={articles}
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
          <Link href="/articles/create">
            <PlusCircle /> Add New
          </Link>
        </Button>
      )}
    />
  );
};
