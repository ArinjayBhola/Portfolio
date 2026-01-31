"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getVisitors, deleteVisitor, deleteVisitorsBulk, clearAllVisitors } from "@/app/actions";
import { 
  Trash2, 
  Trash, 
  RefreshCw, 
  MapPin, 
  Globe, 
  AlertTriangle,
  Users,
  TrendingUp,
  Map,
  Clock,
  ChevronLeft,
  ChevronRight,
  Route,
  Activity,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
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
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Analytics State
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "all">("30d");
  const [expandedIp, setExpandedIp] = useState<string | null>(null);
  
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
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // Advanced Data Processing for Analytics & Tracking
  const processedData = useMemo(() => {
    if (!visitors.length) return { chart: [], hourly: [], grouped: [] };

    // 1. Grouped Visitors (IP Journey Tracking)
    const ipGroups = visitors.reduce((acc: any, v) => {
      if (!acc[v.ip]) {
        acc[v.ip] = {
          ip: v.ip,
          count: 0,
          city: v.city,
          country: v.country,
          visits: [],
          latestVisit: v.visitedAt
        };
      }
      acc[v.ip].count++;
      acc[v.ip].visits.push({
        id: v.id,
        at: v.visitedAt,
        city: v.city,
        country: v.country
      });
      return acc;
    }, {});

    const grouped = Object.values(ipGroups).sort((a: any, b: any) => 
      new Date(b.latestVisit).getTime() - new Date(a.latestVisit).getTime()
    );

    // 2. Hourly Activity (Peak Times)
    const hourlyCounts = Array(24).fill(0);
    visitors.forEach(v => {
      const hour = new Date(v.visitedAt).getHours();
      hourlyCounts[hour]++;
    });
    const hourly = hourlyCounts.map((count, hour) => ({
      hour: hour,
      label: `${hour % 12 || 12}${hour < 12 ? 'AM' : 'PM'}`,
      count
    }));

    // 3. Time-Series Chart Data based on timeRange
    let chart: any[] = [];
    const now = new Date();

    if (timeRange === "24h") {
      const last24Hours = [...Array(24)].map((_, i) => {
        const d = new Date(now);
        d.setHours(d.getHours() - i);
        // Format for grouping: YYYY-MM-DD-HH
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}`;
      }).reverse();

      const counts = visitors.reduce((acc: any, v) => {
        const d = new Date(v.visitedAt);
        const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      chart = last24Hours.map(key => {
        const h = parseInt(key.split('-')[3]);
        return {
          date: `${h % 12 || 12}${h < 12 ? 'AM' : 'PM'}`,
          visits: counts[key] || 0
        };
      });
    } else {
      let days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 365;
      if (timeRange === "all") {
        const earliest = new Date(Math.min(...visitors.map(v => new Date(v.visitedAt).getTime())));
        days = Math.ceil((now.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (days < 7) days = 7;
      }

      const labels = [...Array(days)].map((_, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('en-GB');
      }).reverse();

      const counts = visitors.reduce((acc: any, v) => {
        const date = new Date(v.visitedAt).toLocaleDateString('en-GB');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      chart = labels.map(date => ({
        date: date.split('/')[0] + '/' + date.split('/')[1],
        visits: counts[date] || 0
      }));
    }

    return { chart, hourly, grouped };
  }, [visitors, timeRange]);

  const { chart: chartData, hourly: hourlyData, grouped: groupedVisitors } = processedData;

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
  
  // Pagination Logic
  const totalPages = Math.ceil(groupedVisitors.length / itemsPerPage);
  const paginatedVisitors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return (groupedVisitors as any[]).slice(startIndex, startIndex + itemsPerPage);
  }, [groupedVisitors, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };


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



  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-8 pt-24 font-[Inter] transition-colors duration-500 relative overflow-hidden">
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
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-heading">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm ml-1">Monitor visitor traffic and manage records</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={fetchVisitors}
              disabled={loading || isActionInProgress}
              className="h-10 px-4 rounded-xl font-semibold border-slate-200"
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
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm backdrop-blur-sm">
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
                  i % 4 !== 3 ? 'lg:border-r border-slate-200' : ''
                } ${
                  i % 2 !== 1 ? 'md:border-r border-slate-200' : ''
                } ${
                  i < 3 ? 'border-b md:border-b-0 border-slate-200' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center border border-white shadow-inner transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 border border-slate-200">
                    {stat.trend}
                  </div>
                </div>
                <div className="mt-8 space-y-1">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-4xl font-bold text-slate-900 tabular-nums tracking-tight">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Visualization Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Traffic Chart */}
      <div className="lg:col-span-8 quartz-card p-8 rounded-[2.5rem]">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Visitor Traffic</h3>
                <p className="text-slate-500 text-xs font-medium mt-1">Activity over selected period</p>
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
                {(["24h", "7d", "30d", "all"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                      timeRange === range
                        ? "bg-white text-primary shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {range === "all" ? "All Time" : range}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-[320px] w-full flex items-center justify-center relative">
              {visitors.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(0,0,0,0.03)" />
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
                      cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '5 5' }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: '1.25rem',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                        padding: '12px 16px'
                      }}
                      itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 500, fontSize: '14px' }}
                      labelStyle={{ color: '#64748b', fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
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
              <div className="w-16 h-16 bg-primary/5 rounded-[2rem] flex items-center justify-center border border-primary/10 shadow-inner mx-auto mb-6 transform group-hover:scale-110 transition-all duration-1000">
                <Globe className="w-8 h-8 text-primary/60" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Top Locations</h3>
              <p className="text-slate-500 text-xs font-medium">Visitor country distribution</p>
            </div>

            <div className="w-full mt-10 space-y-6">
              {countryData.length > 0 ? (countryData as { name: string; value: number }[]).map((item, idx: number) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">{item.name}</span>
                    <span className="text-[10px] font-medium text-slate-400 tabular-nums">
                      {((item.value / visitors.length) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / visitors.length) * 100}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.1 }}
                      className="h-full bg-indigo-500/80 rounded-full"
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

            <div className="mt-10 pt-8 border-t border-slate-100 w-full flex justify-between items-center">
              <div className="text-left">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Global Reach</p>
                <div className="flex gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-1 w-3 rounded-full ${visitors.length > 0 && i < 2 ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none tracking-tight">{visitors.length}</p>
                <p className="text-[8px] font-medium text-slate-400 uppercase tracking-widest mt-1">Total Records</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-900 font-heading">Recent Activity</h2>
              <div className="h-px w-12 bg-slate-200" />
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
              <table className="w-full text-left table-fixed">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-6 w-12">
                      <Checkbox
                        checked={visitors.length > 0 && selectedIds.length === visitors.length}
                        onCheckedChange={toggleSelectAll}
                        className="border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </th>
                    <th className="px-8 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[240px]">Time</th>
                    <th className="px-8 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[240px]">IP Address</th>
                    <th className="px-8 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-8 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right w-[100px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence mode="popLayout">
                    {paginatedVisitors.map((group) => (
                      <React.Fragment key={group.ip}>
                        <motion.tr
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className={`group transition-all duration-300 ${
                            expandedIp === group.ip ? 'bg-primary/5' : 'hover:bg-slate-50/50'
                          }`}
                        >
                          <td className="px-8 py-5">
                            <Checkbox
                              checked={group.visits.some((v: any) => selectedIds.includes(v.id))}
                              onCheckedChange={(checked) => {
                                const ids = group.visits.map((v: any) => v.id);
                                if (checked) {
                                  setSelectedIds(prev => [...new Set([...prev, ...ids])]);
                                } else {
                                  setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
                                }
                              }}
                              className="border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-slate-400" />
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-slate-900 tracking-tight">
                                    {new Date(group.latestVisit).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                  </span>
                                  {group.count > 1 && (
                                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded-md border border-primary/10">
                                      {group.count}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] font-medium text-slate-400 uppercase">
                                  {new Date(group.latestVisit).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                                {group.ip}
                              </span>
                              {group.count > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setExpandedIp(expandedIp === group.ip ? null : group.ip)}
                                  className={`w-7 h-7 rounded-lg transition-transform duration-300 ${expandedIp === group.ip ? 'rotate-180 bg-primary/10 text-primary' : 'text-slate-400'}`}
                                >
                                  <ChevronLeft className="w-3 h-3 -rotate-90" />
                                </Button>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary/60" />
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-900">{group.city || 'Restricted Content'}</span>
                                <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">{group.country || 'Unknown Sector'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                // For simplicity, single delete in a group deletes the most recent one
                                setDeletingId(group.visits[0].id);
                                setShowConfirmDelete(true);
                              }}
                              disabled={isActionInProgress}
                              className="w-10 h-10 rounded-xl text-slate-300 hover:text-destructive hover:bg-destructive/10 transition-all flex items-center justify-center"
                            >
                              {isActionInProgress && group.visits.some((v: any) => v.id === deletingId) ? (
                                <RefreshCw className="w-4 h-4 animate-spin text-destructive" />
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                            </Button>
                          </td>
                        </motion.tr>

                        {/* Journey Trace Sub-row */}
                        <AnimatePresence>
                          {expandedIp === group.ip && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-slate-50/80"
                            >
                              <td colSpan={5} className="px-12 py-6">
                                <div className="space-y-4 border-l-2 border-primary/20 ml-4 pl-8 relative">
                                  <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-primary" />
                                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Route className="w-3 h-3" />
                                    Journey Trace
                                  </h4>
                                  {group.visits.slice(1).map((visit: any) => (
                                    <div key={visit.id} className="flex items-center justify-between group/trace">
                                      <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-slate-300 group-hover/trace:bg-primary transition-colors" />
                                        <div className="flex flex-col">
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-slate-600">
                                              {new Date(visit.at).toLocaleDateString('en-GB')} at {new Date(visit.at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <Calendar className="w-2.5 h-2.5 text-slate-300" />
                                          </div>
                                          <span className="text-[9px] text-slate-400 uppercase tracking-tighter">
                                            {visit.city}, {visit.country}
                                          </span>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          setDeletingId(visit.id);
                                          setShowConfirmDelete(true);
                                        }}
                                        className="w-6 h-6 rounded-lg text-slate-300 hover:text-destructive transition-colors"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
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
            
            {/* Pagination Controls */}
            {visitors.length > 0 && (
              <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Show per page:</span>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {[10, 15].map((count) => (
                      <button
                        key={count}
                        onClick={() => {
                          setItemsPerPage(count);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-all ${
                          itemsPerPage === count 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-slate-500 mr-4">
                    Page <span className="text-slate-900">{currentPage}</span> of <span className="text-slate-900">{totalPages}</span>
                  </p>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-9 h-9 rounded-xl border-slate-200 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(pageNum => {
                          if (totalPages <= 5) return true;
                          if (pageNum === 1 || pageNum === totalPages) return true;
                          return Math.abs(pageNum - currentPage) <= 1;
                        })
                        .map((pageNum, idx, arr) => {
                          const elements = [];
                          if (idx > 0 && arr[idx - 1] !== pageNum - 1) {
                            elements.push(<span key={`ellipsis-${pageNum}`} className="text-slate-300 text-xs px-1">...</span>);
                          }
                          elements.push(
                            <button
                              key={`page-${pageNum}`}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-9 h-9 text-xs font-semibold rounded-xl transition-all ${
                                currentPage === pageNum
                                  ? 'bg-primary/10 text-primary border border-primary/20'
                                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                          return elements;
                        })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-xl border-slate-200 disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clean & Professional Delete Modals */}
      <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 bg-white border border-slate-200 shadow-2xl">
          <DialogTitle className="sr-only">Delete Visitor Confirmation</DialogTitle>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-2">
              <Trash2 className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-heading">Delete Visitor?</h3>
              <p className="text-sm text-slate-500">
                This will permanently remove the visitor record from your logs. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmDelete(false)}
              disabled={isActionInProgress}
              className="flex-1 h-12 rounded-xl font-semibold border-slate-200"
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
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 bg-white border border-slate-200 shadow-2xl">
          <DialogTitle className="sr-only">Bulk Delete Confirmation</DialogTitle>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-2">
              <Trash2 className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-heading">Delete Selected?</h3>
              <p className="text-sm text-slate-500">
                You are about to delete <span className="text-slate-900 font-bold">{selectedIds.length}</span> visitor records. Are you sure?
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmBulkDelete(false)}
              className="flex-1 h-12 rounded-xl font-semibold border-slate-200"
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
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 bg-white border border-slate-200 shadow-2xl">
          <DialogTitle className="sr-only">Clear All Records Confirmation</DialogTitle>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-heading">Clear All Logs?</h3>
              <p className="text-sm text-slate-500 px-2">
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
              className="w-full h-12 rounded-xl font-semibold text-slate-500 hover:text-slate-900"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
