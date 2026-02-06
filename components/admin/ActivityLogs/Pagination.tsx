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
    <div className="px-6 md:px-8 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">Per page:</span>
        <div className="flex bg-white dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
          {[10, 15, 25].map((count) => (
            <button
              key={count}
              onClick={() => onItemsPerPageChange(count)}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                itemsPerPage === count 
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-8">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Page <span className="text-indigo-600 dark:text-indigo-400">{currentPage}</span> / {totalPages}
        </p>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all duration-300"
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
                  elements.push(<span key={`ellipsis-${pageNum}`} className="text-slate-300 dark:text-slate-700 text-xs px-1">...</span>);
                }
                elements.push(
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-10 h-10 text-[10px] font-black rounded-xl transition-all ${
                      currentPage === pageNum
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 shadow-sm'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
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
            className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
