"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Trash2, ChevronLeft, RefreshCw, Globe } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { JourneyTrace } from "./JourneyTrace";
import { formatDate } from "@/lib/utils";
import React from "react";

interface ActivityRowProps {
  group: any;
  selectedIds: number[];
  onToggleSelectGroup: (ids: number[], checked: boolean) => void;
  isExpanded: boolean;
  onToggleExpand: (ip: string) => void;
  onDelete: (id: number) => void;
  isActionInProgress: boolean;
  deletingId: number | null;
}

export function ActivityRow({
  group,
  selectedIds,
  onToggleSelectGroup,
  isExpanded,
  onToggleExpand,
  onDelete,
  isActionInProgress,
  deletingId
}: ActivityRowProps) {
  const isAnyVisitSelected = group.visits.some((v: any) => selectedIds.includes(v.id));

  return (
    <React.Fragment>
      <motion.tr
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`group transition-all duration-300 ${
          isExpanded 
            ? 'bg-indigo-50/50 dark:bg-indigo-500/10' 
            : isAnyVisitSelected 
              ? 'bg-indigo-50/30 dark:bg-indigo-500/5' 
              : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
        }`}
      >
        <td className="px-6 md:px-8 py-5 text-center">
          <Checkbox
            checked={isAnyVisitSelected}
            onCheckedChange={(checked) => {
              const ids = group.visits.map((v: any) => v.id);
              onToggleSelectGroup(ids, checked as boolean);
            }}
            className="w-5 h-5 rounded-md border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 data-[state=checked]:bg-white dark:data-[state=checked]:bg-slate-800 data-[state=checked]:text-slate-900 dark:data-[state=checked]:text-slate-100 data-[state=checked]:border-slate-300 dark:data-[state=checked]:border-slate-700 transition-all duration-300"
          />
        </td>
        <td className="px-6 md:px-8 py-5 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
              <Clock className="w-4 h-4 text-indigo-400 dark:text-indigo-500" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {formatDate(group.latestVisit)}
                </span>
                {group.count > 1 && (
                  <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
                    {group.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                {new Date(group.latestVisit).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
              {group.ip}
            </span>
            {group.count > 1 && (
              <button
                onClick={() => onToggleExpand(group.ip)}
                className={`w-7 h-7 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isExpanded 
                    ? 'rotate-180 bg-indigo-100 dark:bg-indigo-500 text-indigo-600 dark:text-white' 
                    : 'text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/30'
                }`}
              >
                <ChevronLeft className="w-3 h-3 -rotate-90" />
              </button>
            )}
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 min-w-[200px]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400 dark:text-indigo-500" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{group.city || 'Restricted Content'}</span>
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">{group.country || 'Unknown Sector'}</span>
            </div>
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 min-w-[150px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-slate-800 flex items-center justify-center border border-indigo-100/50 dark:border-slate-700">
              <Globe className="w-3 h-3 text-indigo-400 dark:text-indigo-500" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[180px]" title={group.org || ''}>
              {group.org || 'Direct Access'}
            </span>
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 text-right whitespace-nowrap pr-12">
          <div className="flex justify-end">
            <button
              onClick={() => onDelete(group.visits[0].id)}
              disabled={isActionInProgress}
              className="w-10 h-10 rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center translate-x-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isActionInProgress && group.visits.some((v: any) => v.id === deletingId) ? (
                <RefreshCw className="w-4 h-4 animate-spin text-red-600 dark:text-red-500" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </td>
      </motion.tr>

      <AnimatePresence>
        {isExpanded && (
          <JourneyTrace 
            visits={group.visits} 
            onDeleteVisit={onDelete} 
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
