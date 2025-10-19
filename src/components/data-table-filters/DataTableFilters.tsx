/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Filter } from "lucide-react";

interface FilterOption {
  label: string;
  value: any;
}

interface ExtendedColumnMeta {
  filterOptions?: FilterOption[];
}

export function TableFilters<TData>({ table }: { table: Table<TData> }) {
  const filterableColumns = table
    .getAllColumns()
    .filter((col) =>
      Array.isArray((col.columnDef.meta as ExtendedColumnMeta)?.filterOptions)
    );

  if (filterableColumns.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter />
          Filters
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Filter columns</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {filterableColumns.map((col) => {
          const filterOptions = (col.columnDef.meta as ExtendedColumnMeta)
            ?.filterOptions as FilterOption[];
          const currentValue = col.getFilterValue();

          return (
            <div key={col.id}>
              <DropdownMenuLabel className="capitalize text-sm text-muted-foreground px-2 py-1 font-semibold">
                {col.id}
              </DropdownMenuLabel>

              {filterOptions.map((opt) => {
                const isActive = currentValue === opt.value;

                return (
                  <DropdownMenuItem
                    key={String(opt.value)}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      col.setFilterValue(isActive ? undefined : opt.value)
                    }
                  >
                    <Checkbox
                      checked={isActive}
                      className="data-[state=checked]:[&_svg]:stroke-white"
                    />
                    <span>{opt.label}</span>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator />
            </div>
          );
        })}

        <DropdownMenuItem
          onClick={() => table.resetColumnFilters()}
          className="text-destructive cursor-pointer"
        >
          Reset filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
