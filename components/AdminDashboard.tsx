"use client";

import { useState, useEffect, useMemo } from "react";
import { getVisitors, deleteVisitor, deleteVisitorsBulk, clearAllVisitors } from "@/app/actions";
import { 
  Trash2, 
  Trash, 
  RefreshCw, 
  MapPin, 
  Globe, 
  Sun, 
  Moon, 
  AlertTriangle,
  Users,
  TrendingUp,
  Map,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useTheme } from "@/lib/theme-provider";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

interface Visitor {
  id: number;
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  loc: string | null;
  org: string | null;
  visitedAt: Date | string;
}

export default function AdminDashboard() {
  const { theme, toggleTheme } = useTheme();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  // Busy states for UX
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  
  // Dialog States
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmBulkDelete, setShowConfirmBulkDelete] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const data = await getVisitors();
      setVisitors(data as Visitor[]);
    } finally {
      setLoading(false);
      setSelectedIds([]);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // Data Processing for Charts
  const chartData = useMemo(() => {
    if (!visitors.length) return [];
    
    const last30Days = [...Array(30)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString('en-GB');
    }).reverse();

    const counts = visitors.reduce((acc: any, v) => {
      const date = new Date(v.visitedAt).toLocaleDateString('en-GB');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return last30Days.map(date => ({
      date: date.split('/')[0] + '/' + date.split('/')[1], // Short format
      visits: counts[date] || 0
    }));
  }, [visitors]);

  const countryData = useMemo(() => {
    const counts = visitors.reduce((acc: any, v) => {
      const country = v.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a: any, b: any) => b.value - a.value)
      .slice(0, 5);
  }, [visitors]);


  const handleSingleDelete = async () => {
    if (deletingId === null) return;
    setIsActionInProgress(true);
    try {
      const result = await deleteVisitor(deletingId);
      if (result.success) {
        setVisitors(prev => prev.filter(v => v.id !== deletingId));
        setSelectedIds(prev => prev.filter(id => id !== deletingId));
      }
    } finally {
      setIsActionInProgress(false);
      setDeletingId(null);
      setShowConfirmDelete(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsActionInProgress(true);
    try {
      const result = await deleteVisitorsBulk(selectedIds);
      if (result.success) {
        setVisitors(prev => prev.filter(v => !selectedIds.includes(v.id)));
        setSelectedIds([]);
      }
    } finally {
      setIsActionInProgress(false);
      setShowConfirmBulkDelete(false);
    }
  };

  const handleClearAll = async () => {
    setIsActionInProgress(true);
    try {
      const result = await clearAllVisitors();
      if (result.success) {
        setVisitors([]);
        setSelectedIds([]);
      }
    } finally {
      setIsActionInProgress(false);
      setShowConfirmClear(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === visitors.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visitors.map(v => v.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 pt-24 font-[Inter] transition-colors duration-500 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full quartz-grid-pattern text-slate-500/5 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto space-y-10 relative z-10">
        
        {/* Top Navigation / Header */}
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
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-800"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-primary" />}
            </Button>

            <Button
              variant="outline"
              onClick={fetchVisitors}
              disabled={loading || isActionInProgress}
              className="h-10 px-4 rounded-xl font-semibold border-slate-200 dark:border-slate-800"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Sync
            </Button>
            
            <Button
              variant="destructive"
              onClick={() => setShowConfirmClear(true)}
              disabled={loading || visitors.length === 0 || isActionInProgress}
              className="h-10 px-4 rounded-xl font-semibold shadow-lg shadow-destructive/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isActionInProgress ? 'animate-spin' : 'hidden'}`} />
              {!isActionInProgress && <Trash className="w-4 h-4 mr-2" />}
              Clear All
            </Button>
          </div>
        </div>

        {/* Stats Bento Grid */}
        {/* Stats Section with Borders & Partitions */}
        <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Visitors", value: visitors.length, icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10", trend: "+12%" },
              { label: "Unique IPs", value: new Set(visitors.map(v => v.ip)).size, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+8%" },
              { label: "Countries", value: new Set(visitors.map(v => v.country).filter(Boolean)).size, icon: Map, color: "text-blue-500", bg: "bg-blue-500/10", trend: "0%" },
              { label: "Peak Visits", value: Math.max(...chartData.map(d => d.visits), 0), icon: Clock, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10", trend: "High" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 group relative ${
                  i % 4 !== 3 ? 'lg:border-r border-slate-200 dark:border-slate-800' : ''
                } ${
                  i % 2 !== 1 ? 'md:border-r border-slate-200 dark:border-slate-800' : ''
                } ${
                  i < 3 ? 'border-b md:border-b-0 border-slate-200 dark:border-slate-800' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center border border-white/20 dark:border-white/5 shadow-inner transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {stat.trend}
                  </div>
                </div>
                <div className="mt-8 space-y-1">
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-4xl font-bold text-foreground tabular-nums tracking-tight">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Visualization Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Traffic Chart */}
      <div className="lg:col-span-8 quartz-card p-8 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold text-foreground font-heading">Visitor Traffic</h3>
                <p className="text-muted-foreground text-xs font-medium mt-1">Activity over the last 30 days</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live Flow</span>
              </div>
            </div>
            
            <div className="h-[320px] w-full flex items-center justify-center relative">
              {visitors.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="10 10" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontWeight: 900 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontWeight: 900 }}
                      dx={-10}
                    />
                    <Tooltip 
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '5 5' }}
                      contentStyle={{ 
                        backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '1.5rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        padding: '12px 16px'
                      }}
                      itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 900, fontSize: '14px' }}
                      labelStyle={{ color: 'var(--muted-foreground)', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorVisits)" 
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center gap-4 opacity-20">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em]">No traffic data recorded</p>
                </div>
              )}
            </div>
          </div>

          {/* Regional Breakdown */}
          <div className="lg:col-span-4 quartz-card p-10 rounded-[3rem] flex flex-col items-center justify-between text-center group">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-[2rem] flex items-center justify-center border border-primary/20 shadow-inner mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-1000">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-heading">Top Locations</h3>
              <p className="text-muted-foreground text-xs font-medium">Visitor country distribution</p>
            </div>

            <div className="w-full mt-10 space-y-6">
              {countryData.length > 0 ? (countryData as { name: string; value: number }[]).map((item, idx: number) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black text-foreground/80 uppercase tracking-widest">{item.name}</span>
                    <span className="text-[10px] font-black text-primary tabular-nums">
                      {((item.value / visitors.length) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / visitors.length) * 100}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              )) : (
                <div className="py-12 flex flex-col items-center gap-3 opacity-20 filter grayscale">
                  <Globe className="w-12 h-12" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">No Location Data</p>
                </div>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 w-full flex justify-between items-center">
              <div className="text-left">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Global Reach</p>
                <div className="flex gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-1 w-3 rounded-full ${visitors.length > 0 && i < 2 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground tabular-nums leading-none tracking-tight">{visitors.length}</p>
                <p className="text-[8px] font-bold text-primary uppercase tracking-widest mt-1">Total Records</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-foreground font-heading">Recent Activity</h2>
              <div className="h-px w-12 bg-slate-200 dark:bg-slate-800" />
              <AnimatePresence>
                {selectedIds.length > 0 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.8, opacity: 0, x: -20 }}
                  >
                    <Button
                      onClick={() => setShowConfirmBulkDelete(true)}
                      disabled={isActionInProgress}
                      className="h-9 px-6 bg-destructive hover:bg-destructive/90 text-white text-xs font-semibold rounded-full shadow-lg shadow-destructive/10 flex items-center gap-2"
                    >
                      {isActionInProgress ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        `Delete Selected (${selectedIds.length})`
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="quartz-card rounded-[2.5rem] overflow-hidden border-none shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-8 py-6 w-12">
                      <Checkbox
                        checked={visitors.length > 0 && selectedIds.length === visitors.length}
                        onCheckedChange={toggleSelectAll}
                        className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </th>
                    <th className="px-8 py-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</th>
                    <th className="px-8 py-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">IP Address</th>
                    <th className="px-8 py-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                    <th className="px-8 py-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  <AnimatePresence mode="popLayout">
                    {visitors.map((visitor) => (
                      <motion.tr
                        key={visitor.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className={`group transition-all duration-300 ${
                          selectedIds.includes(visitor.id) ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900/40'
                        }`}
                      >
                        <td className="px-8 py-5">
                          <Checkbox
                            checked={selectedIds.includes(visitor.id)}
                            onCheckedChange={() => toggleSelect(visitor.id)}
                            className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-foreground tracking-tight">
                                {new Date(visitor.visitedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                              </span>
                              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                                {new Date(visitor.visitedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <span className="font-mono text-xs font-black text-primary/80 bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10 shadow-sm">
                            {visitor.ip}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary animate-bounce-slow" />
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-foreground">{visitor.city || 'Restricted Content'}</span>
                              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{visitor.country || 'Unknown Sector'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDeletingId(visitor.id);
                              setShowConfirmDelete(true);
                            }}
                            disabled={isActionInProgress}
                            className="w-10 h-10 rounded-xl text-slate-300 hover:text-destructive hover:bg-destructive/10 transition-all flex items-center justify-center"
                          >
                            {isActionInProgress && deletingId === visitor.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin text-destructive" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>

                  {!loading && visitors.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-32 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-10">
                          <Globe className="w-20 h-20" />
                          <p className="text-sm font-black uppercase tracking-[0.5em]">No Activity Detected</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Clean & Professional Delete Modals */}
      <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-2">
              <Trash2 className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground font-heading">Delete Visitor?</h3>
              <p className="text-sm text-muted-foreground">
                This will permanently remove the visitor record from your logs. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmDelete(false)}
              disabled={isActionInProgress}
              className="flex-1 h-12 rounded-xl font-semibold border-slate-200 dark:border-slate-700"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleSingleDelete}
              disabled={isActionInProgress}
              className="flex-1 h-12 rounded-xl font-semibold shadow-lg shadow-destructive/20"
            >
              {isActionInProgress ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmBulkDelete} onOpenChange={setShowConfirmBulkDelete}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-2">
              <Trash2 className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground font-heading">Delete Selected?</h3>
              <p className="text-sm text-muted-foreground">
                You are about to delete <span className="text-foreground font-bold">{selectedIds.length}</span> visitor records. Are you sure?
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmBulkDelete(false)}
              className="flex-1 h-12 rounded-xl font-semibold border-slate-200 dark:border-slate-700"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={isActionInProgress}
              className="flex-1 h-12 rounded-xl font-semibold shadow-lg shadow-destructive/20"
            >
              {isActionInProgress ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Delete All"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmClear} onOpenChange={setShowConfirmClear}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground font-heading">Clear All Logs?</h3>
              <p className="text-sm text-muted-foreground px-2">
                This will wipe the entire visitor history. This is a destructive operation and cannot be reversed.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <Button 
              variant="destructive"
              onClick={handleClearAll}
              disabled={isActionInProgress}
              className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-destructive/20"
            >
              {isActionInProgress ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Clear All Records"}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowConfirmClear(false)}
              className="w-full h-12 rounded-xl font-semibold text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
