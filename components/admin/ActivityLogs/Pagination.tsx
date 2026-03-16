"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  totalItems
}: PaginationProps) {
  if (totalItems === 0) return null;

  return (
    <div className="px-6 md:px-8 py-6 bg-secondary/10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Per page:</span>
        <div className="flex bg-card p-0.5 rounded-xl border border-border shadow-sm transition-colors duration-300">
          {[10, 15, 25].map((count) => (
            <button
              key={count}
              onClick={() => onItemsPerPageChange(count)}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                itemsPerPage === count 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-8">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Page <span className="text-primary">{currentPage}</span> / {totalPages}
        </p>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl border-border bg-card text-foreground disabled:opacity-30 hover:bg-secondary/20 hover:text-primary shadow-sm transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="hidden sm:flex items-center gap-1.5 mx-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(pageNum => {
                if (totalPages <= 5) return true;
                if (pageNum === 1 || pageNum === totalPages) return true;
                return Math.abs(pageNum - currentPage) <= 1;
              })
              .map((pageNum, idx, arr) => {
                const elements = [];
                if (idx > 0 && arr[idx - 1] !== pageNum - 1) {
                  elements.push(<span key={`ellipsis-${pageNum}`} className="text-muted-foreground/30 text-xs px-1">...</span>);
                }
                elements.push(
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-10 h-10 text-[10px] font-black rounded-xl transition-all ${
                      currentPage === pageNum
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                        : 'text-muted-foreground/60 hover:text-foreground hover:bg-card hover:border-border'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
                return elements;
              })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-xl border-border bg-card text-foreground disabled:opacity-30 hover:bg-secondary/20 hover:text-primary shadow-sm transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
