"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Map, Clock, LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
  trend: string;
}

interface StatsGridProps {
  totalVisitors: number;
  uniqueIps: number;
  countriesCount: number;
  peakVisits: number;
}

export function StatsGrid({
  totalVisitors,
  uniqueIps,
  countriesCount,
  peakVisits
}: StatsGridProps) {
  const stats: StatItem[] = [
    { label: "Total Visitors", value: totalVisitors, icon: Users, color: "text-primary", bg: "bg-primary/10", trend: "+12%" },
    { label: "Unique IPs", value: uniqueIps, icon: TrendingUp, color: "text-primary", bg: "bg-secondary/20", trend: "+8%" },
    { label: "Countries", value: countriesCount, icon: Map, color: "text-primary", bg: "bg-primary/5", trend: "0%" },
    { label: "Peak Visits", value: peakVisits, icon: Clock, color: "text-primary", bg: "bg-secondary/40", trend: "High" }
  ];

  return (
    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm backdrop-blur-sm transition-colors duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 md:p-8 group relative ${
              i % 4 !== 3 ? 'lg:border-r border-border/40' : ''
            } ${
              i % 2 !== 1 ? 'sm:border-r border-border/40' : ''
            } ${
              i < 3 ? 'border-b md:border-b-0 border-border/40' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center border border-white/20 shadow-inner transform group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color} dark:text-primary`} />
              </div>
              <div className="px-3 py-1 rounded-full bg-secondary/20 text-[10px] font-bold text-muted-foreground border border-border/30 italic transition-transform group-hover:scale-105">
                {stat.trend}
              </div>
            </div>
            <div className="mt-8 space-y-1">
              <p className="text-muted-foreground/60 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
