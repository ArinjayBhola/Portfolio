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
            ? 'bg-primary/10' 
            : isAnyVisitSelected 
              ? 'bg-secondary/20' 
              : 'hover:bg-secondary/5'
        }`}
      >
        <td className="px-6 md:px-8 py-5 text-center">
          <Checkbox
            checked={isAnyVisitSelected}
            onCheckedChange={(checked) => {
              const ids = group.visits.map((v: any) => v.id);
              onToggleSelectGroup(ids, checked as boolean);
            }}
            className="w-5 h-5 rounded-md border-border bg-card data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-all duration-300"
          />
        </td>
        <td className="px-6 md:px-8 py-5 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center border border-border/20">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground tracking-tight">
                  {formatDate(group.latestVisit)}
                </span>
                {group.count > 1 && (
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded-md border border-primary/20">
                    {group.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                {new Date(group.latestVisit).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
              {group.ip}
            </span>
            {group.count > 1 && (
              <button
                onClick={() => onToggleExpand(group.ip)}
                className={`w-7 h-7 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isExpanded 
                    ? 'rotate-180 bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-primary hover:bg-secondary/20 border border-transparent hover:border-primary/20'
                }`}
              >
                <ChevronLeft className="w-3 h-3 -rotate-90" />
              </button>
            )}
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 min-w-[200px]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-foreground truncate">{group.city || 'Restricted Content'}</span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">{group.country || 'Unknown Sector'}</span>
            </div>
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 min-w-[150px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-secondary/20 flex items-center justify-center border border-border/20">
              <Globe className="w-3 h-3 text-primary" />
            </div>
            <span className="text-xs font-bold text-foreground/80 truncate max-w-[180px]" title={group.org || ''}>
              {group.org || 'Direct Access'}
            </span>
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 text-right whitespace-nowrap pr-12">
          <div className="flex justify-end">
            <button
              onClick={() => onDelete(group.visits[0].id)}
              disabled={isActionInProgress}
              className="w-10 h-10 rounded-xl text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-300 flex items-center justify-center translate-x-2 disabled:opacity-50 disabled:pointer-events-none"
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
