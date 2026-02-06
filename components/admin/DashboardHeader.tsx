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
          <div className="w-10 h-10 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/20 dark:border-indigo-500/30">
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-heading">
            Admin <span className="text-indigo-600 dark:text-indigo-400">Dashboard</span>
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm ml-1">Monitor visitor traffic and manage records</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <ThemeToggle />
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={onSync}
            disabled={loading || isActionInProgress}
            className="h-10 px-4 rounded-xl font-semibold border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync
          </Button>
        
        <Button
          variant="destructive"
          onClick={onClearAll}
          disabled={loading || visitorCount === 0 || isActionInProgress}
          className="h-10 px-4 rounded-xl font-semibold shadow-lg shadow-red-500/10 bg-red-600 hover:bg-red-700 text-white"
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
