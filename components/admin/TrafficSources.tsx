"use client";

import { motion } from "framer-motion";
import { Link2, Globe, Share2, Search, ExternalLink } from "lucide-react";

interface TrafficSourcesProps {
  referrerData: { name: string; value: number }[];
  totalVisitorsCount: number;
}

export function TrafficSources({
  referrerData,
  totalVisitorsCount
}: TrafficSourcesProps) {
  const getIcon = (url: string) => {
    const domain = url.toLowerCase();
    if (domain.includes("google")) return <Search className="w-4 h-4" />;
    if (domain.includes("linkedin")) return <Share2 className="w-4 h-4" />;
    if (domain.includes("github")) return <Globe className="w-4 h-4" />;
    if (domain === "direct") return <Link2 className="w-4 h-4" />;
    return <ExternalLink className="w-4 h-4" />;
  };

  return (
    <div className="bg-card p-5 rounded-3xl border border-border shadow-sm flex flex-col items-center justify-between text-center group transition-colors duration-500">
      <div className="space-y-1 w-full">
        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-border/20 shadow-inner mx-auto mb-4 transform group-hover:scale-110 transition-all duration-700">
          <Link2 className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground font-heading tabular-nums tracking-tight">Traffic Sources</h3>
        <p className="text-muted-foreground/50 text-[10px] font-bold uppercase tracking-wider">Top Referrers</p>
      </div>

      <div className="w-full mt-6 space-y-3.5">
        {referrerData.length > 0 ? referrerData.map((item, idx: number) => (
          <div key={item.name} className="group/item relative">
             <div className="flex items-center justify-between mb-1.5 px-0.5">
                <div className="flex items-center gap-1.5 overflow-hidden">
                    <div className="w-5 h-5 rounded bg-secondary/20 flex items-center justify-center border border-border/10 text-primary/70">
                        {getIcon(item.name)}
                    </div>
                    <span className="text-[10px] font-bold text-foreground/80 lowercase tracking-tight truncate max-w-[120px]">
                        {item.name}
                    </span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-black text-foreground tabular-nums">
                        {item.value}
                    </span>
                    <span className="text-[7.5px] font-black text-muted-foreground/30 uppercase tracking-widest">
                        {((item.value / totalVisitorsCount) * 100).toFixed(0)}%
                    </span>
                </div>
            </div>
            
            <div className="h-1.5 w-full bg-secondary/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / totalVisitorsCount) * 100}%` }}
                transition={{ duration: 1.5, delay: idx * 0.1 }}
                className="h-full bg-primary/40 group-hover/item:bg-primary transition-colors duration-500 rounded-full shadow-lg shadow-primary/10"
              />
            </div>
          </div>
        )) : (
          <div className="py-8 flex flex-col items-center gap-3 opacity-20 filter grayscale dark:invert">
            <Link2 className="w-10 h-10" />
            <p className="text-[9px] font-bold uppercase tracking-widest">No Referral Data</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-border/20 w-full">
        <div className="flex justify-between items-center bg-secondary/[0.03] p-3 rounded-2xl border border-border/10">
            <div className="text-left">
                <p className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest leading-none">Direct</p>
                <p className="text-base font-black text-primary tabular-nums mt-1.5 leading-none">
                    {referrerData.find(d => d.name.toLowerCase() === "direct")?.value || 0}
                </p>
            </div>
            <div className="h-6 w-px bg-border/20" />
            <div className="text-right">
                <p className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest leading-none">Referrals</p>
                <p className="text-base font-black text-foreground/80 tabular-nums mt-1.5 leading-none">
                    {referrerData.filter(d => d.name.toLowerCase() !== "direct").reduce((a, b) => a + b.value, 0)}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
