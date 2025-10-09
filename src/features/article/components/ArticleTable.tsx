"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header/DataTableColumnHeader";
import { DataTablePagination } from "@/components/data-table-pagination/DataTablePagination";
import { DataTableViewOptions } from "@/components/data-table-view-options/DataTableViewOptions";
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IArticle } from "@/features/article/article.interface";
import { formatDate } from "@/utils/date";
import { handleExportCsv } from "@/utils/exportToCsv";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Download,
  Edit,
  EyeIcon,
  MoreHorizontal,
  PlusCircle,
  Search,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ArticleTable = ({ data }: { data: IArticle[] }) => {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const handleAction = (action: string, article: IArticle) => {
    switch (action) {
      case "preview":
        router.push(`/articles/${article.slug}`);
        break;
      case "edit":
        // router.push(`/articles/edit/${article.slug}`);
        break;
      case "delete":
        console.log("delete article:", article.id);
        break;
      default:
        break;
    }
  };

  const handleDeleteSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log(
      "Deleting articles:",
      selectedRows.map((row) => row.original.id)
    );
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
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Image
              src={row.original?.coverImage || "/placeholder.png"}
              alt={row.original.title}
              height={100}
              width={100}
              className="h-[50px] w-[50px] object-cover rounded-md border border-slate-200"
            />
            <p className="truncate text-sm font-medium mt-2">
              {row.original?.title}
            </p>
          </div>
        );
      },
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
          <Badge variant={"outline"}>{row.original.readingTime} min</Badge>
        );
      },
    },
    {
      id: "author",
      header: "Author",
      cell: ({ row }) => {
        return (
          <Badge variant={"secondary"}>
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
            <DropdownMenuItem
              onClick={() => handleAction("preview", row.original)}
            >
              <EyeIcon className="text-inherit" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAction("edit", row.original)}
            >
              <Edit className="text-inherit" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAction("delete", row.original)}
            >
              <Trash className="text-inherit" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const searchLower = String(filterValue).toLowerCase();
      const article = row.original;
      return (
        article.title.toLowerCase().includes(searchLower) ||
        article.companyName?.toLowerCase().includes(searchLower) ||
        article.category?.name.toLowerCase().includes(searchLower) ||
        article.user?.firstName.toLowerCase().includes(searchLower) ||
        article.user?.lastName.toLowerCase().includes(searchLower)
      );
    },
    state: {
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <InputGroup className="max-w-[300px]">
          <InputGroupInput
            placeholder="Search"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleDeleteSelected}
            size="sm"
            asChild
          >
            <Link href="/articles/create">
              <PlusCircle />
              Add User
            </Link>
          </Button>
          <DataTableViewOptions table={table} />
          <Button
            variant="outline"
            onClick={() => handleExportCsv(table, "articles.csv")}
            size="sm"
          >
            <Download />
            Export
          </Button>
          {selectedCount > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Delete ({selectedCount})
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
};
