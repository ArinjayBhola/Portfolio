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
    <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-between text-center group transition-colors duration-500">
      <div className="space-y-2">
        <div className="w-16 h-16 bg-indigo-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center border border-indigo-100 dark:border-slate-700 shadow-inner mx-auto mb-6 transform group-hover:scale-110 transition-all duration-700">
          <Globe className="w-8 h-8 text-indigo-400 dark:text-indigo-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading tabular-nums">Top Locations</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Visitor country distribution</p>
      </div>

      <div className="w-full mt-10 space-y-6">
        {countryData.length > 0 ? countryData.map((item, idx: number) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{item.name}</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums">
                {((item.value / totalVisitorsCount) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / totalVisitorsCount) * 100}%` }}
                transition={{ duration: 1.5, delay: idx * 0.1 }}
                className="h-full bg-indigo-500 dark:bg-indigo-600 rounded-full"
              />
            </div>
          </div>
        )) : (
          <div className="py-12 flex flex-col items-center gap-3 opacity-20 filter grayscale dark:invert">
            <Globe className="w-12 h-12" />
            <p className="text-[10px] font-bold uppercase tracking-widest">No Location Data</p>
          </div>
        )}
      </div>

      <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 w-full flex justify-between items-center">
        <div className="text-left">
          <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Global Reach</p>
          <div className="flex gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-1 w-3 rounded-full ${totalVisitorsCount > 0 && i < 2 ? 'bg-indigo-400 dark:bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums leading-none tracking-tight">{totalVisitorsCount}</p>
          <p className="text-[8px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Total Records</p>
        </div>
      </div>
    </div>
  );
}
