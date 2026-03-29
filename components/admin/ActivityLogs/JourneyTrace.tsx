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
      className="bg-secondary/[0.02] transition-colors duration-300"
    >
      <td colSpan={8} className="pl-6 md:pl-8 pr-0 py-4">
        <div className="space-y-3 border-l-2 border-primary/10 ml-3 pl-5 relative">
          <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-primary/40" />
          <h4 className="text-[9px] font-black text-primary/60 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <Route className="w-3 h-3" />
            Session Journey
          </h4>
          {visits.slice(1).map((visit: any) => (
            <div key={visit.id} className="flex items-center justify-between group/trace pr-9 md:pr-11">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover/trace:bg-primary/50 transition-colors" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-foreground/60 tracking-tight">
                      {formatDate(visit.at)} at {new Date(visit.at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Calendar className="w-2.5 h-2.5 text-muted-foreground/20" />
                  </div>
                  <div className="flex items-center gap-3 mt-1 opacity-50">
                    <span className="text-[7.5px] font-black bg-primary/5 text-primary px-1.5 py-0.5 rounded border border-primary/10 uppercase tracking-tighter">
                        {visit.path || "/"}
                    </span>
                    <span className="text-[7.5px] font-bold text-muted-foreground italic truncate max-w-[100px]">
                        via {visit.referrer && visit.referrer !== "Direct" ? visit.referrer.replace(/https?:\/\/(www\.)?/, '') : "direct"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDeleteVisit(visit.id)}
                className="w-7 h-7 rounded-lg text-muted-foreground/20 hover:text-destructive hover:bg-destructive/10 transition-all duration-300 flex items-center justify-center -translate-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </td>
    </motion.tr>
  );
}
