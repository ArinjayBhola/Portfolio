"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Laptop, Smartphone, Tablet, Terminal } from "lucide-react";

interface DeviceDistributionProps {
  deviceData: { name: string; value: number }[];
}

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#22d3ee"];

export function DeviceDistribution({ deviceData }: DeviceDistributionProps) {
  const total = deviceData.reduce((acc, curr) => acc + curr.value, 0);

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      case "desktop":
        return <Laptop className="w-4 h-4" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-card p-5 rounded-3xl border border-border shadow-sm flex flex-col items-center justify-between text-center group transition-colors duration-500">
      <div className="space-y-1 w-full">
        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-border/20 shadow-inner mx-auto mb-4 transform group-hover:scale-110 transition-all duration-700">
          <Smartphone className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground font-heading tabular-nums tracking-tight">Device Distribution</h3>
        <p className="text-muted-foreground/50 text-[10px] font-bold uppercase tracking-wider">Technology Breakdown</p>
      </div>

      <div className="h-[180px] w-full mt-4 relative">
        {total > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={8}
                dataKey="value"
                animationDuration={1500}
                stroke="none"
              >
                {deviceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1.25rem",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  padding: "12px 16px",
                }}
                itemStyle={{ fontWeight: 600, fontSize: "14px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 opacity-20 filter grayscale dark:invert">
            <Laptop className="w-10 h-10" />
            <p className="text-[9px] font-bold uppercase tracking-widest">No Device Data</p>
          </div>
        )}
        {total > 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-xl font-bold text-foreground font-heading leading-tight">{total}</span>
            <span className="text-[7px] font-black text-muted-foreground uppercase tracking-widest leading-none">Visits</span>
          </div>
        )}
      </div>

      <div className="w-full mt-6 grid grid-cols-2 gap-2">
        {deviceData.map((item, idx) => (
          <div key={item.name} className="flex items-center gap-2 bg-secondary/5 p-2 rounded-xl border border-border/10">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-border/20"
              style={{ backgroundColor: `${COLORS[idx % COLORS.length]}10`, color: COLORS[idx % COLORS.length] }}
            >
              {getIcon(item.name)}
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-[9px] font-black text-foreground truncate uppercase tracking-tight">{item.name}</p>
              <p className="text-[9px] font-bold text-muted-foreground/40 tabular-nums">
                {((item.value / total) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
