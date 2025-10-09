import { Table } from "@tanstack/react-table";
import Papa from "papaparse";

export const exportToCsv = <T extends object>(
  data: T[],
  filename = "export.csv"
) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.click();
};

export const handleExportCsv = <T extends object>(
  table: Table<T>,
  filename = "export.csv"
) => {
  const rows = table.getFilteredRowModel().rows;
  const exportData = rows.map((row) => row.original);
  exportToCsv(exportData, filename);
};
