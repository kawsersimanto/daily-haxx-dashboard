"use client";

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
import { useDebounce } from "@/hooks/useDebounce";
import { ApiResponse } from "@/types/api";
import { formatDate } from "@/utils/date";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import {
  dateRangeFilterFn,
  generateFilterOptions,
  multiSelectFilterFn,
} from "@/utils/table";
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
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { data } = useGetArticlesQuery({
    page,
    limit,
    searchTerm: debouncedSearch,
  });
  const [deleteArticleFn, { isLoading: isDeletingArticle }] =
    useDeleteArticleMutation();

  const articles = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

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

  const categoryOptions = generateFilterOptions(
    articles,
    (article) => article.category.name,
    {
      sort: true,
      removeEmpty: true,
    }
  );

  const authorOptions = generateFilterOptions(
    articles,
    (article) => `${article.user.firstName} ${article.user.lastName}`,
    {
      sort: true,
      removeEmpty: true,
    }
  );

  const companyOptions = generateFilterOptions(
    articles,
    (article) => article.companyName,
    {
      sort: true,
      removeEmpty: true,
    }
  );

  const readingOptions = generateFilterOptions(
    articles,
    (article) => article.readingTime,
    {
      sort: true,
      removeEmpty: true,
    }
  );

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
      header: "Title",
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
      meta: {
        filterOptions: categoryOptions,
      },
      filterFn: multiSelectFilterFn,
    },
    {
      accessorKey: "companyName",
      header: "Company",
      meta: {
        filterLabel: "Company",
        filterOptions: companyOptions,
      },
      filterFn: multiSelectFilterFn,
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
      meta: {
        filterLabel: "Reading Time",
        filterOptions: readingOptions,
      },
      filterFn: multiSelectFilterFn,
    },
    {
      accessorFn: (row) => `${row.user?.firstName} ${row.user?.lastName}`,
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
      meta: {
        filterOptions: authorOptions,
      },
      filterFn: multiSelectFilterFn,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => formatDate(row.original.createdAt),
      meta: {
        filterLabel: "Created Date",
        filterType: "dateRange",
      },
      filterFn: dateRangeFilterFn,
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
      searchMode="server"
      onSearch={handleSearch}
      searchQuery={searchInput}
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
