"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DateRangeFilterProps<TData> {
  column: Column<TData, unknown>;
  title?: string;
}

export function DateRangeFilter<TData>({
  column,
  title,
}: DateRangeFilterProps<TData>) {
  const filterValue = column.getFilterValue() as
    | { from?: Date; to?: Date }
    | undefined;

  const hasActiveFilter = filterValue && (filterValue.from || filterValue.to);

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    column.setFilterValue(range);
  };

  const clearFilter = () => {
    column.setFilterValue(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <CalendarIcon />
          {title || column.id}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-3xs p-0" align="end">
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Select Range</p>
          </div>

          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filterValue?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {filterValue?.from ? (
                    format(filterValue.from, "PPP")
                  ) : (
                    <span>From</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterValue?.from}
                  onSelect={(date) =>
                    handleSelect({ ...filterValue, from: date })
                  }
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filterValue?.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {filterValue?.to ? (
                    format(filterValue.to, "PPP")
                  ) : (
                    <span>To</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterValue?.to}
                  onSelect={(date) =>
                    handleSelect({ ...filterValue, to: date })
                  }
                  disabled={(date) =>
                    filterValue?.from ? date < filterValue.from : false
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {hasActiveFilter && (
            <Button
              variant="link"
              size="sm"
              onClick={clearFilter}
              className="!p-0 !m-0 text-destructive"
            >
              Clear Filter
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
