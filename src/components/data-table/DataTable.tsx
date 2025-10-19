"use client";

import { TableFilters } from "@/components/data-table-filters/DataTableFilters";
import { DataTableViewOptions } from "@/components/data-table-view-options/DataTableViewOptions";
import { TablePagination } from "@/components/table-pagination/TablePagination";
import { Button } from "@/components/ui/button";
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
import { handleExportCsv } from "@/utils/exportToCsv";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
} from "@tanstack/react-table";
import { Download, Search, Trash } from "lucide-react";
import { useState } from "react";
import { DataTablePagination } from "../data-table-pagination/DataTablePagination";

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  // Pagination mode: 'server' or 'client'
  paginationMode?: "server" | "client";
  // Server-side pagination props
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (limit: number) => void;
  // Common props
  csvFileName?: string;
  onDeleteSelected?: (rows: T[], ids: string[]) => void;
  isLoading?: boolean;
  renderActions?: (
    table: ReturnType<typeof useReactTable<T>>
  ) => React.ReactNode;
}

export const DataTable = <T extends { id: string }>({
  data,
  columns,
  paginationMode = "server",
  total,
  page = 1,
  limit = 10,
  totalPages,
  onPageChange,
  onPageSizeChange,
  csvFileName = "data.csv",
  onDeleteSelected,
  renderActions,
}: DataTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // Client-side pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: limit,
  });

  const isServerSide = paginationMode === "server";

  const table = useReactTable<T>({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel<T>(),
    getFilteredRowModel: getFilteredRowModel<T>(),

    // Pagination configuration based on mode
    ...(isServerSide
      ? {
          manualPagination: true,
          pageCount: totalPages || Math.ceil((total || 0) / limit),
        }
      : {
          getPaginationRowModel: getPaginationRowModel<T>(),
          onPaginationChange: setPagination,
        }),

    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      globalFilter,
      columnFilters,
      ...(isServerSide ? {} : { pagination }),
    },
  });

  const visibleCount = table.getRowModel().rows.length;

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const handleDelete = () => {
    if (!onDeleteSelected || selectedCount === 0) return;
    const rows = selectedRows.map((row) => row.original);
    const ids = rows.map((r) => r.id);
    onDeleteSelected(rows, ids);
  };

  // Client-side pagination handlers
  const handleClientPageChange = (newPage: number) => {
    table.setPageIndex(newPage - 1);
  };

  const handleClientPageSizeChange = (newLimit: number) => {
    table.setPageSize(newLimit);
  };

  // Determine pagination props based on mode
  const paginationProps = isServerSide
    ? {
        page,
        limit,
        total: total || 0,
        totalPages: totalPages || Math.ceil((total || 0) / limit),
        onPageChange: onPageChange || (() => {}),
        onPageSizeChange: onPageSizeChange || (() => {}),
      }
    : {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        total: table.getFilteredRowModel().rows.length,
        totalPages: table.getPageCount(),
        onPageChange: handleClientPageChange,
        onPageSizeChange: handleClientPageSizeChange,
      };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 justify-between">
        <InputGroup className="max-w-[300px]">
          <InputGroupInput
            placeholder="Search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <div className="flex items-center gap-2">
          {renderActions?.(table)}
          <TableFilters table={table} />
          <DataTableViewOptions table={table} />
          <Button
            variant="outline"
            onClick={() => handleExportCsv(table, csvFileName)}
            size="sm"
          >
            <Download />
            Export
          </Button>
          {selectedCount > 0 && (
            <Button variant="destructive" onClick={handleDelete} size="sm">
              <Trash />
              Delete ({selectedCount})
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
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

      {/* Pagination - conditionally render based on mode */}
      {isServerSide ? (
        <TablePagination {...paginationProps} visibleCount={visibleCount} />
      ) : (
        <DataTablePagination table={table} />
      )}
    </div>
  );
};
