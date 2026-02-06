"use client";

import { motion } from "framer-motion";
import { Route, Calendar, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface JourneyTraceProps {
  visits: any[];
  onDeleteVisit: (id: number) => void;
}

export function JourneyTrace({
  visits,
  onDeleteVisit
}: JourneyTraceProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-slate-50/30 dark:bg-slate-800/10 transition-colors duration-300"
    >
      <td colSpan={6} className="pl-8 md:pl-10 pr-0 py-6">
        <div className="space-y-4 border-l-2 border-indigo-100 dark:border-slate-800 ml-4 pl-6 relative">
          <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-indigo-500" />
          <h4 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Route className="w-3 h-3" />
            Journey Trace
          </h4>
          {visits.slice(1).map((visit: any) => (
            <div key={visit.id} className="flex items-center justify-between group/trace pr-10 md:pr-12">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 group-hover/trace:bg-indigo-400 transition-colors" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      {formatDate(visit.at)} at {new Date(visit.at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Calendar className="w-2.5 h-2.5 text-slate-300 dark:text-slate-600" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                    {visit.city || 'Restricted Content'}, {visit.country || 'Unknown Sector'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDeleteVisit(visit.id)}
                className="w-8 h-8 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center translate-x-1 md:translate-x-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </td>
    </motion.tr>
  );
}
