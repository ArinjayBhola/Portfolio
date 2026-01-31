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
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl">
      <div className="overflow-x-auto scroller-indigo">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 md:px-8 py-6 w-12 text-center">
                <Checkbox
                  checked={visitors.length > 0 && selectedIds.length === visitors.length}
                  onCheckedChange={onToggleSelectAll}
                  className="w-5 h-5 rounded-md border-slate-200 bg-white data-[state=checked]:bg-white data-[state=checked]:text-slate-900 data-[state=checked]:border-slate-300 transition-all duration-300"
                />
              </th>
              <th className="px-6 md:px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Time</th>
              <th className="px-6 md:px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">IP Address</th>
              <th className="px-6 md:px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Location</th>
              <th className="px-6 md:px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right pr-12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
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
                <td colSpan={5} className="px-8 py-32 text-center">
                  <div className="flex flex-col items-center gap-4 opacity-5">
                    <Globe className="w-20 h-20 text-slate-900" />
                    <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-900">No Activity Detected</p>
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
