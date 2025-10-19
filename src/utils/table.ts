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
