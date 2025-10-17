import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface PaginationWrapperProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

const PaginationWrapper: React.FC<PaginationWrapperProps> = ({ totalPages, currentPage, goToPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) goToPage(currentPage - 1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
            />
          </PaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                isActive={currentPage === idx + 1}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(idx + 1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) goToPage(currentPage + 1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationWrapper;
