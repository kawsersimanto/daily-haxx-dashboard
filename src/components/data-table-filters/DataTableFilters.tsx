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
  filterLabel?: string;
}

export function TableFilters<TData>({ table }: { table: Table<TData> }) {
  const filterableColumns = table
    .getAllColumns()
    .filter((col) =>
      Array.isArray((col.columnDef.meta as ExtendedColumnMeta)?.filterOptions)
    );

  if (filterableColumns.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {filterableColumns.map((col) => {
        const filterOptions = (col.columnDef.meta as ExtendedColumnMeta)
          ?.filterOptions as FilterOption[];
        const currentValue = col.getFilterValue() as any[] | undefined;
        const hasActiveFilter = currentValue && currentValue.length > 0;

        const handleToggle = (optionValue: any) => {
          const currentFilters = currentValue || [];
          const isSelected = currentFilters.includes(optionValue);

          if (isSelected) {
            // Remove from filters
            const newFilters = currentFilters.filter((v) => v !== optionValue);
            col.setFilterValue(newFilters.length > 0 ? newFilters : undefined);
          } else {
            // Add to filters
            col.setFilterValue([...currentFilters, optionValue]);
          }
        };

        return (
          <DropdownMenu key={col.id}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter />
                {(col.columnDef.meta as ExtendedColumnMeta)?.filterLabel ||
                  col.id}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel className="capitalize">
                Filter{" "}
                {(col.columnDef.meta as ExtendedColumnMeta)?.filterLabel ||
                  col.id}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {filterOptions.map((opt) => {
                const isActive = currentValue?.includes(opt.value) || false;

                return (
                  <DropdownMenuItem
                    key={String(opt.value)}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleToggle(opt.value)}
                  >
                    <Checkbox
                      checked={isActive}
                      className="data-[state=checked]:[&_svg]:stroke-white"
                    />
                    <span>{opt.label}</span>
                  </DropdownMenuItem>
                );
              })}

              {hasActiveFilter && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => col.setFilterValue(undefined)}
                    className="text-destructive cursor-pointer"
                  >
                    Clear filter
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}
