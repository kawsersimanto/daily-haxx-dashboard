"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getValidPage, getVisiblePages } from "@/utils/pagination";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage = 1,
  totalPages = 10,
  onPageChange = () => {},
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const maxVisible = isMobile ? 5 : 8;
  const visiblePages = getVisiblePages(totalPages, currentPage, maxVisible);

  const showEllipsis = visiblePages.length < totalPages;

  const changePage = (page: number) => {
    const validPage = getValidPage(page, currentPage, totalPages);
    if (validPage) onPageChange(validPage);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-lg md:gap-4 gap-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-auto w-auto p-0 disabled:opacity-50"
        >
          <ChevronLeft className="text-gray-600" />
        </Button>

        {visiblePages.map((page) => (
          <Button
            key={page}
            variant="ghost"
            size="sm"
            onClick={() => changePage(page)}
            className={cn(
              "h-8 w-8 p-0 mx-0.5 md:text-xl text-sm font-medium border-b-2 border-b-transparent rounded-none",
              page === currentPage
                ? "text-primary border-b-primary"
                : "text-foreground hover:bg-gray-50"
            )}
          >
            {page}
          </Button>
        ))}

        {showEllipsis && (
          <div className="flex items-center justify-center h-8 w-8 mx-0.5">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-auto w-auto p-0 hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronRight className="text-gray-600" />
        </Button>
      </div>
    </div>
  );
}
