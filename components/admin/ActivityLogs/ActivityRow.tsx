"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Trash2, ChevronLeft, RefreshCw, Globe, Monitor, Smartphone, Bot, Layout, Server, ShieldAlert } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { JourneyTrace } from "./JourneyTrace";
import { formatDate } from "@/lib/utils";
import React from "react";

interface ActivityRowProps {
  group: any;
  selectedIds: number[];
  onToggleSelectGroup: (ids: number[], checked: boolean) => void;
  isExpanded: boolean;
  onToggleExpand: (ip: string) => void;
  onDelete: (id: number) => void;
  isActionInProgress: boolean;
  deletingId: number | null;
}

export function ActivityRow({
  group,
  selectedIds,
  onToggleSelectGroup,
  isExpanded,
  onToggleExpand,
  onDelete,
  isActionInProgress,
  deletingId
}: ActivityRowProps) {
  const isAnyVisitSelected = group.visits.some((v: any) => selectedIds.includes(v.id));

  return (
    <React.Fragment>
      <motion.tr
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`group transition-all duration-300 ${
          isExpanded 
            ? 'bg-primary/10' 
            : isAnyVisitSelected 
              ? 'bg-secondary/20' 
              : 'hover:bg-secondary/5'
        }`}
      >
        <td className="px-4 md:px-6 py-2.5 text-center">
          <Checkbox
            checked={isAnyVisitSelected}
            onCheckedChange={(checked) => {
              const ids = group.visits.map((v: any) => v.id);
              onToggleSelectGroup(ids, checked as boolean);
            }}
            className="w-4 h-4 rounded border-border bg-card data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-all duration-300"
          />
        </td>
        <td className="px-4 md:px-6 py-2.5 whitespace-nowrap">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center border border-border/10">
              <Clock className="w-3.5 h-3.5 text-primary/70" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-foreground tracking-tight">
                  {formatDate(group.latestVisit)}
                </span>
                {group.count > 1 && (
                   <span className="text-[8px] font-black text-primary bg-primary/10 px-1 py-0.5 rounded border border-primary/20">
                    {group.count}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-black text-muted-foreground/40 uppercase select-none leading-none">
                {new Date(group.latestVisit).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </td>
        <td className="px-4 md:px-6 py-2.5 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">
              {group.ip}
            </span>
            {group.isBot && (
              <div
                title={group.botReason ? `Flagged: ${group.botReason}` : "Automated traffic"}
                className="flex items-center gap-1 bg-amber-500/5 text-amber-500/80 px-1.5 py-0.5 rounded border border-amber-500/10"
              >
                <Bot className="w-2.5 h-2.5" />
                <span className="text-[7px] font-black uppercase tracking-tighter">Bot</span>
              </div>
            )}
            {group.isHosting && (
              <div title="Datacenter / hosting IP" className="flex items-center gap-1 bg-destructive/5 text-destructive/70 px-1.5 py-0.5 rounded border border-destructive/10">
                <Server className="w-2.5 h-2.5" />
                <span className="text-[7px] font-black uppercase tracking-tighter">Datacenter</span>
              </div>
            )}
            {group.isProxy && (
              <div title="Proxy / VPN / Tor" className="flex items-center gap-1 bg-amber-500/5 text-amber-500/70 px-1.5 py-0.5 rounded border border-amber-500/10">
                <ShieldAlert className="w-2.5 h-2.5" />
                <span className="text-[7px] font-black uppercase tracking-tighter">Proxy</span>
              </div>
            )}
            {group.count > 1 && (
              <button
                onClick={() => onToggleExpand(group.ip)}
                className={`w-6 h-6 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isExpanded 
                    ? 'rotate-180 bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-primary hover:bg-secondary/10'
                }`}
              >
                <ChevronLeft className="w-3 h-3 -rotate-90" />
              </button>
            )}
          </div>
        </td>
        <td className="px-4 md:px-6 py-2.5 min-w-[160px]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-primary/60" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] font-bold text-foreground truncate leading-tight">{group.city || 'Localhost'}</span>
              <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest truncate">{group.country || 'Dev'}</span>
            </div>
          </div>
        </td>
        {/* Tech Details Cells */}
        <td className="px-4 md:px-6 py-2.5 whitespace-nowrap">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 opacity-80">
                {group.device === "mobile" ? <Smartphone className="w-3.5 h-3.5 text-muted-foreground/60" /> : <Monitor className="w-3.5 h-3.5 text-muted-foreground/60" />}
                <span className="text-[10px] font-bold text-foreground/70 tracking-tight leading-none">{group.browser || "—"}</span>
             </div>
             <div className="h-3 w-px bg-border/20" />
             <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest truncate max-w-[60px]">
                {group.os || "—"}
             </span>
          </div>
        </td>
        {/* Path Cell */}
        <td className="px-4 md:px-6 py-2.5 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-secondary/5 flex items-center justify-center border border-border/10">
                <Layout className="w-3 h-3 text-primary/40" />
            </div>
            <span className="text-[10px] font-black text-foreground/50 font-mono tracking-tighter">{group.path || "/"}</span>
          </div>
        </td>
        <td className="px-4 md:px-6 py-2.5 min-w-[180px]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/[0.03] flex items-center justify-center border border-border/10 text-primary group-hover:bg-primary transition-all duration-500 group-hover:text-primary-foreground">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-black text-foreground/80 lowercase tracking-tight truncate leading-tight">
                    {group.referrer && group.referrer !== "Direct" 
                        ? (group.referrer.includes('://') ? new URL(group.referrer).hostname.replace('www.', '') : group.referrer)
                        : "direct traffic"}
                </span>
                <span className="text-[7px] font-black text-muted-foreground/20 uppercase tracking-widest truncate" title={group.asName || group.org || ''}>
                    {group.asName || group.org || 'Local Network'}
                </span>
            </div>
          </div>
        </td>
        <td className="px-4 md:px-6 py-2.5 text-right whitespace-nowrap pr-9">
          <div className="flex justify-end">
            <button
              onClick={() => onDelete(group.visits[0].id)}
              disabled={isActionInProgress}
              className="w-8 h-8 rounded-lg text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all duration-300 flex items-center justify-center group/delete disabled:opacity-50 disabled:pointer-events-none"
            >
              {isActionInProgress && group.visits.some((v: any) => v.id === deletingId) ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-destructive" />
              ) : (
                <Trash2 className="w-3.5 h-3.5 group-hover/delete:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </td>
      </motion.tr>

      <AnimatePresence>
        {isExpanded && (
          <JourneyTrace 
            visits={group.visits} 
            onDeleteVisit={onDelete} 
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
