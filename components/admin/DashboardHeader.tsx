"use client";

import { Globe, RefreshCw, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onSync: () => void;
  onClearAll: () => void;
  loading: boolean;
  isActionInProgress: boolean;
  visitorCount: number;
}

export function DashboardHeader({
  onSync,
  onClearAll,
  loading,
  isActionInProgress,
  visitorCount
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
        </div>
        <p className="text-muted-foreground/60 text-xs ml-0.5">Website activity & log management</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={onSync}
            disabled={loading || isActionInProgress}
            className="h-9 px-3.5 rounded-xl font-semibold border-border bg-card text-foreground hover:bg-secondary/20 hover:text-primary transition-all duration-300 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync
          </Button>
        
        <Button
          variant="destructive"
          onClick={onClearAll}
          disabled={loading || visitorCount === 0 || isActionInProgress}
          className="h-9 px-3.5 rounded-xl font-semibold shadow-lg shadow-destructive/10 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs"
        >
          {isActionInProgress && <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />}
          {!isActionInProgress && <Trash className="w-3.5 h-3.5 mr-2" />}
          Clear Records
        </Button>
      </div>
    </div>
  </div>
);
}
