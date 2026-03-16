"use client";

import { Globe, RefreshCw, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-2">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-sm ml-1">Monitor visitor traffic and manage records</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <ThemeToggle />
        <div className="h-8 w-px bg-border/40 hidden md:block" />
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={onSync}
            disabled={loading || isActionInProgress}
            className="h-10 px-4 rounded-xl font-semibold border-border bg-card text-foreground hover:bg-secondary/20 hover:text-primary transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync
          </Button>
        
        <Button
          variant="destructive"
          onClick={onClearAll}
          disabled={loading || visitorCount === 0 || isActionInProgress}
          className="h-10 px-4 rounded-xl font-semibold shadow-lg shadow-destructive/10 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        >
          {isActionInProgress && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
          {!isActionInProgress && <Trash className="w-4 h-4 mr-2" />}
          Clear All
        </Button>
      </div>
    </div>
  </div>
);
}
