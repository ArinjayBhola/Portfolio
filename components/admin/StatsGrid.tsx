"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Map, Clock, LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
  ring: string;
  trend: string;
}

interface StatsGridProps {
  totalVisitors: number;
  uniqueVisitors: number;
  countriesCount: number;
  peakVisits: number;
}

export function StatsGrid({
  totalVisitors,
  uniqueVisitors,
  countriesCount,
  peakVisits
}: StatsGridProps) {
  const stats: StatItem[] = [
    { label: "Total Sessions", value: totalVisitors, icon: Users, color: "text-primary", bg: "bg-primary/10", ring: "group-hover:shadow-[0_0_25px_-8px_hsl(var(--primary))]", trend: "LOGS" },
    { label: "Unique Visitors", value: uniqueVisitors, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", ring: "group-hover:shadow-[0_0_25px_-8px_#10b981]", trend: "RETENTION" },
    { label: "Countries", value: countriesCount, icon: Map, color: "text-sky-500", bg: "bg-sky-500/10", ring: "group-hover:shadow-[0_0_25px_-8px_#0ea5e9]", trend: "GLOBAL" },
    { label: "Peak Visits", value: peakVisits, icon: Clock, color: "text-violet-500", bg: "bg-violet-500/10", ring: "group-hover:shadow-[0_0_25px_-8px_#8b5cf6]", trend: "PERFORMANCE" }
  ];

  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm backdrop-blur-sm transition-colors duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 md:p-5 group relative ${
              i % 4 !== 3 ? 'lg:border-r border-border/40' : ''
            } ${
              i % 2 !== 1 ? 'sm:border-r border-border/40' : ''
            } ${
              i < 3 ? 'border-b md:border-b-0 border-border/40' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 ${stat.bg} ${stat.ring} rounded-xl flex items-center justify-center border border-white/20 shadow-inner transform group-hover:scale-110 transition-all duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="px-2 py-0.5 rounded-full bg-secondary/10 text-[9px] font-bold text-muted-foreground border border-border/20 italic transition-transform group-hover:scale-105">
                {stat.trend}
              </div>
            </div>
            <div className="mt-6 space-y-0.5">
              <p className="text-muted-foreground/50 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground tabular-nums tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
