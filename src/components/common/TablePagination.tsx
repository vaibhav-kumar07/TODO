"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { paginationLimit } from "@/types/common";

interface TablePaginationProps {
  total: number;
  className?: string;
}

export default function TablePagination({ total, className = "" }: TablePaginationProps) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const limit = paginationLimit.LIMIT_10;
  const currentOffset = parseInt(searchParams.get('offset') || '0');
  const currentPage = Math.floor(currentOffset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newOffset: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('offset', newOffset.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);
      
      // Always show first page
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      // Show pages around current
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Always show last page
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(Math.max(0, currentOffset - limit))}
        disabled={currentPage <= 1}
        className="h-8 px-3 flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-500">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange((page as number - 1) * limit)}
                className={`h-8 w-8 p-0 ${
                  currentPage === page 
                    ? 'bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentOffset + limit)}
        disabled={currentPage >= totalPages}
        className="h-8 px-3 flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Page Info */}
      {/* <div className="text-sm text-gray-500 ml-4">
        Showing {Math.min(currentOffset + 1, total)} to {Math.min(currentOffset + limit, total)} of {total} results
      </div> */}
    </div>
  );
} 