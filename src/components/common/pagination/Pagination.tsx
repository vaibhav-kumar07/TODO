"use client";

import PaginationBar from "@/components/common/pagination/PaginationBar";
import {
  useURLParams,
  useGetSearchParamValue,
} from "@/components/hooks/request";
import { cn } from "@/lib/utils";

export const STARTPAGE = 1;

export default function Pagination({
  recordCount,
  className,
}: {
  recordCount: number;
  className?: string;
}) {
  const { appendSearchParams } = useURLParams();

  // Get the page number from the query string
  let page = parseInt(useGetSearchParamValue("page") || STARTPAGE.toString());

  // Get the rows per page from the query string
  let rowsPerPage = parseInt(useGetSearchParamValue("rowsperpage") || "10");
  // Handle page number greater than the total pages or less than 0
  // Total number of pages is calculated dynamically based on the record count and rows per page
  rowsPerPage = rowsPerPage > 50 ? 50 : rowsPerPage;
  page = page > Math.ceil(recordCount / rowsPerPage) ? STARTPAGE : page;

  // Push the user selected page to the query string
  const handleChangePage = (newPage: number) => {
    appendSearchParams("page", newPage.toString());
  };

  // Push the user selected rows per page to the query string
  const handleChangeRowsPerPage = (value: string) => {
    const newRowsPerPage = parseInt(value, 10);
    appendSearchParams("rowsperpage", newRowsPerPage.toString());
  };

  return (
    <PaginationBar
      className={cn("text-red-bg", className)}
      recordCount={recordCount}
      page={page}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onPageChange={handleChangePage}
    />
  );
}
