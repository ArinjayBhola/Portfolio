"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface TopLocationsProps {
  countryData: { name: string; value: number }[];
  totalVisitorsCount: number;
}

export function TopLocations({
  countryData,
  totalVisitorsCount
}: TopLocationsProps) {
  return (
    <div className="lg:col-span-4 bg-card p-5 rounded-3xl border border-border shadow-sm flex flex-col items-center justify-between text-center group transition-colors duration-500">
      <div className="space-y-1">
        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-border/20 shadow-inner mx-auto mb-4 transform group-hover:scale-110 transition-all duration-700">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground font-heading tabular-nums tracking-tight">Top Locations</h3>
        <p className="text-muted-foreground/50 text-[10px] font-bold uppercase tracking-wider">Country Distribution</p>
      </div>

      <div className="w-full mt-6 space-y-4">
        {countryData.length > 0 ? countryData.map((item, idx: number) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.name}</span>
              <span className="text-[9px] font-bold text-muted-foreground/30 tabular-nums">
                {((item.value / totalVisitorsCount) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / totalVisitorsCount) * 100}%` }}
                transition={{ duration: 1.5, delay: idx * 0.1 }}
                className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]"
              />
            </div>
          </div>
        )) : (
          <div className="py-8 flex flex-col items-center gap-3 opacity-20 filter grayscale dark:invert">
            <Globe className="w-10 h-10" />
            <p className="text-[9px] font-bold uppercase tracking-widest">No Location Data</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-border/20 w-full flex justify-between items-center">
        <div className="text-left">
          <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">Reach</p>
          <div className="flex gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-0.5 w-3 rounded-full ${totalVisitorsCount > 0 && i < 2 ? 'bg-primary' : 'bg-secondary/40'}`} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-foreground tabular-nums leading-none tracking-tight">{totalVisitorsCount}</p>
          <p className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-widest mt-1">Total Records</p>
        </div>
      </div>
    </div>
  );
}
