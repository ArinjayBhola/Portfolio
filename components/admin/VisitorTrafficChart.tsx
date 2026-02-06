"use client";

import { TrendingUp } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

interface VisitorTrafficChartProps {
  chartData: any[];
  timeRange: "24h" | "7d" | "30d" | "all";
  onTimeRangeChange: (range: "24h" | "7d" | "30d" | "all") => void;
  hasVisitors: boolean;
}

export function VisitorTrafficChart({
  chartData,
  timeRange,
  onTimeRangeChange,
  hasVisitors
}: VisitorTrafficChartProps) {
  return (
    <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading tabular-nums">Visitor Traffic</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">Activity over selected period</p>
        </div>
        <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 self-start transition-colors duration-300">
          {(["24h", "7d", "30d", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-3 md:px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                timeRange === range
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-600"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {range === "all" ? "All Time" : range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] md:h-[320px] w-full flex items-center justify-center relative">
        {hasVisitors ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 400 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 400 }}
                dx={-10}
              />
              <Tooltip 
                cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }}
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg, #ffffff)',
                  border: '1px solid var(--tooltip-border, #e2e8f0)',
                  borderRadius: '1.25rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                  padding: '12px 16px'
                }}
                itemStyle={{ color: '#6366f1', fontWeight: 600, fontSize: '14px' }}
                labelStyle={{ color: '#64748b', fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="visits" 
                stroke="#6366f1" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorVisits)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center gap-4 opacity-20">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-indigo-400" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">No traffic data recorded</p>
          </div>
        )}
      </div>
    </div>
  );
}
