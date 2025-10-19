/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row } from "@tanstack/react-table";

export const multiSelectFilterFn = <TData>(
  row: Row<TData>,
  columnId: string,
  value: any
) => {
  if (!value || value.length === 0) return true;
  return value.includes(row.getValue(columnId));
};

export const generateFilterOptions = <T>(
  data: T[],
  accessor: (item: T) => string | number | boolean | undefined | null,
  options?: {
    sort?: boolean;
    removeEmpty?: boolean;
  }
) => {
  const uniqueValues = new Map();

  data.forEach((item) => {
    const value = accessor(item);
    if (value !== undefined && value !== null) {
      if (options?.removeEmpty && value === "") return;

      uniqueValues.set(value, {
        label: String(value),
        value: value,
      });
    }
  });

  let result = Array.from(uniqueValues.values());

  if (options?.sort) {
    result = result.sort((a, b) => a.label.localeCompare(b.label));
  }

  return result;
};
