/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row } from "@tanstack/react-table";

export const multiSelectFilterFn = <TData>(
  row: Row<TData>,
  columnId: string,
  value: any
) => {
  if (!value || value.length === 0) return true;

  const cellValue = row.getValue(columnId);

  return value.some(
    (filterValue: any) =>
      String(cellValue).toLowerCase() === String(filterValue).toLowerCase()
  );
};

export const generateFilterOptions = <T>(
  data: T[],
  accessor: (item: T) => string | number | boolean | undefined | null,
  options?: {
    sort?: boolean;
    removeEmpty?: boolean;
    normalize?: (value: string) => string; // Add this
  }
) => {
  const uniqueValues = new Map();

  data.forEach((item) => {
    const value = accessor(item);
    if (value !== undefined && value !== null) {
      if (options?.removeEmpty && value === "") return;

      const normalizedKey = options?.normalize
        ? options.normalize(String(value))
        : String(value);

      uniqueValues.set(normalizedKey, {
        label: String(value), // Keep original for display
        value: normalizedKey,
      });
    }
  });

  let result = Array.from(uniqueValues.values());

  if (options?.sort) {
    result = result.sort((a, b) => a.label.localeCompare(b.label));
  }

  return result;
};

export const dateRangeFilterFn = <TData>(
  row: Row<TData>,
  columnId: string,
  value: { from?: Date; to?: Date }
) => {
  if (!value || (!value.from && !value.to)) return true;

  const cellValue = row.getValue(columnId);
  if (!cellValue) return false;

  const date = new Date(cellValue as string);

  if (value.from && date < value.from) return false;
  if (value.to) {
    const toEndOfDay = new Date(value.to);
    toEndOfDay.setHours(23, 59, 59, 999);
    if (date > toEndOfDay) return false;
  }

  return true;
};
