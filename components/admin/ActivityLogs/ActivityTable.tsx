"use client";

import { AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ActivityRow } from "./ActivityRow";
import { Pagination } from "./Pagination";

interface ActivityTableProps {
  visitors: any[];
  paginatedVisitors: any[];
  selectedIds: number[];
  onToggleSelectAll: () => void;
  onToggleSelectGroup: (ids: number[], checked: boolean) => void;
  expandedIp: string | null;
  onToggleExpand: (ip: string) => void;
  onDelete: (id: number) => void;
  isActionInProgress: boolean;
  deletingId: number | null;
  loading: boolean;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

export function ActivityTable({
  visitors,
  paginatedVisitors,
  selectedIds,
  onToggleSelectAll,
  onToggleSelectGroup,
  expandedIp,
  onToggleExpand,
  onDelete,
  isActionInProgress,
  deletingId,
  loading,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: ActivityTableProps) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-2xl transition-colors duration-500">
      <div className="overflow-x-auto scroller-primary">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-secondary/5 border-b border-border transition-colors duration-300">
              <th className="px-4 md:px-6 py-3.5 w-12 text-center">
                <Checkbox
                  checked={visitors.length > 0 && selectedIds.length === visitors.length}
                  onCheckedChange={onToggleSelectAll}
                  className="w-4 h-4 rounded border-border bg-card data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary transition-all duration-300"
                />
              </th>
              <th className="px-4 md:px-6 py-3.5 text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.15em]">Time</th>
              <th className="px-4 md:px-6 py-3.5 text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.15em]">IP Address</th>
              <th className="px-4 md:px-6 py-3.5 text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.15em]">Location</th>
              <th className="px-4 md:px-6 py-3.5 text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.15em]">Tech</th>
              <th className="px-4 md:px-6 py-3.5 text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.15em]">Path</th>
              <th className="px-4 md:px-6 py-3.5 text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.15em]">Discovery / Source</th>
              <th className="px-4 md:px-6 py-3.5 text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.15em] text-right pr-9">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            <AnimatePresence mode="popLayout">
              {paginatedVisitors.map((group) => (
                <ActivityRow
                  key={group.ip}
                  group={group}
                  selectedIds={selectedIds}
                  onToggleSelectGroup={onToggleSelectGroup}
                  isExpanded={expandedIp === group.ip}
                  onToggleExpand={() => onToggleExpand(expandedIp === group.ip ? "" : group.ip)}
                  onDelete={onDelete}
                  isActionInProgress={isActionInProgress}
                  deletingId={deletingId}
                />
              ))}
            </AnimatePresence>

            {!loading && visitors.length === 0 && (
              <tr>
                <td colSpan={8} className="px-8 py-32 text-center">
                  <div className="flex flex-col items-center gap-4 opacity-5">
                    <Globe className="w-20 h-20 text-foreground" />
                    <p className="text-sm font-black uppercase tracking-[0.5em] text-foreground">No Activity Detected</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
        totalItems={paginatedVisitors.length > 0 ? totalPages * itemsPerPage : 0} 
      />
    </div>
  );
}
