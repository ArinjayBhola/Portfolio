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
    <div className="lg:col-span-8 bg-card p-6 md:p-8 rounded-[2.5rem] border border-border shadow-sm transition-colors duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground font-heading tabular-nums">Visitor Traffic</h3>
          <p className="text-muted-foreground text-xs font-medium mt-1">Activity over selected period</p>
        </div>
        <div className="flex items-center bg-secondary/20 p-1 rounded-2xl border border-border self-start transition-colors duration-300">
          {(["24h", "7d", "30d", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-3 md:px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                timeRange === range
                  ? "bg-primary text-primary-foreground shadow-sm border border-primary/20"
                  : "text-muted-foreground hover:text-foreground"
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
                cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '5 5' }}
                contentStyle={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '1.25rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                  padding: '12px 16px'
                }}
                itemStyle={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px' }}
                labelStyle={{ color: 'var(--muted-foreground)', fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="visits" 
                stroke="var(--primary)" 
                strokeWidth={2} 
                fillOpacity={0.1} 
                fill="var(--primary)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center gap-4 opacity-20">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">No traffic data recorded</p>
          </div>
        )}
      </div>
    </div>
  );
}
