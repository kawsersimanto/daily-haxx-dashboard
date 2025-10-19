"use client";

import { DataTableViewOptions } from "@/components/data-table-view-options/DataTableViewOptions";
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
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Download, Search, Trash } from "lucide-react";
import { useState } from "react";
import { TablePagination } from "../table-pagination/TablePagination";

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
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
  total,
  page,
  limit,
  onPageChange,
  onPageSizeChange,
  csvFileName = "data.csv",
  onDeleteSelected,
  totalPages,
  renderActions,
}: DataTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<T>(),
    getFilteredRowModel: getFilteredRowModel<T>(),
    manualPagination: true,
    pageCount: Math.ceil(total / limit),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      globalFilter,
      columnFilters,
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
            {table.getRowModel().rows.length ? (
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

      {/* Pagination */}
      <TablePagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        visibleCount={visibleCount}
        totalPages={totalPages}
      />
    </div>
  );
};
