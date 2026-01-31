"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Trash2, ChevronLeft, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { JourneyTrace } from "./JourneyTrace";
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
          isExpanded ? 'bg-indigo-50/50' : isAnyVisitSelected ? 'bg-indigo-50/30' : 'hover:bg-slate-50/50'
        }`}
      >
        <td className="px-6 md:px-8 py-5 text-center">
          <Checkbox
            checked={isAnyVisitSelected}
            onCheckedChange={(checked) => {
              const ids = group.visits.map((v: any) => v.id);
              onToggleSelectGroup(ids, checked as boolean);
            }}
            className="w-5 h-5 rounded-md border-slate-200 bg-white data-[state=checked]:bg-white data-[state=checked]:text-slate-900 data-[state=checked]:border-slate-300 transition-all duration-300"
          />
        </td>
        <td className="px-6 md:px-8 py-5 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 tracking-tight">
                  {new Date(group.latestVisit).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </span>
                {group.count > 1 && (
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md border border-indigo-100">
                    {group.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {new Date(group.latestVisit).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
              {group.ip}
            </span>
            {group.count > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleExpand(group.ip)}
                className={`w-7 h-7 rounded-lg transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-indigo-100 text-indigo-600' : 'text-slate-300 hover:text-indigo-400'}`}
              >
                <ChevronLeft className="w-3 h-3 -rotate-90" />
              </Button>
            )}
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 min-w-[200px]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-slate-800 truncate">{group.city || 'Restricted Content'}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{group.country || 'Unknown Sector'}</span>
            </div>
          </div>
        </td>
        <td className="px-6 md:px-8 py-5 text-right whitespace-nowrap pr-12">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(group.visits[0].id)}
              disabled={isActionInProgress}
              className="w-10 h-10 rounded-xl text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all duration-300 flex items-center justify-center translate-x-2"
            >
              {isActionInProgress && group.visits.some((v: any) => v.id === deletingId) ? (
                <RefreshCw className="w-4 h-4 animate-spin text-red-600" />
              ) : (
                <Trash2 className="w-4.5 h-4.5" />
              )}
            </Button>
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
