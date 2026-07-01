"use client";

import { useState, useEffect, useMemo } from "react";
import { getVisitors, deleteVisitor, deleteVisitorsBulk, clearAllVisitors } from "@/app/actions";
import { DashboardHeader } from "./admin/DashboardHeader";
import { StatsGrid } from "./admin/StatsGrid";
import { VisitorTrafficChart } from "./admin/VisitorTrafficChart";
import { TopLocations } from "./admin/TopLocations";
import { DeviceDistribution } from "./admin/DeviceDistribution";
import { TrafficSources } from "./admin/TrafficSources";
import { ActivityTable } from "./admin/ActivityLogs/ActivityTable";
import { ConfirmDialog } from "./admin/shared/ConfirmDialog";
import { formatDate } from "@/lib/utils";

interface Visitor {
  id: number;
  visitorId: string | null;
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  loc: string | null;
  org: string | null;
  userAgent: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  referrer: string | null;
  path: string | null;
  asName: string | null;
  isHosting: boolean | null;
  isProxy: boolean | null;
  isMobile: boolean | null;
  botReason: string | null;
  isBot: boolean;
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
  const [showBots, setShowBots] = useState(false);

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
          region: v.region,
          country: v.country,
          org: v.org,
          asName: v.asName,
          isHosting: v.isHosting,
          isProxy: v.isProxy,
          isMobile: v.isMobile,
          botReason: v.botReason,
          userAgent: v.userAgent,
          browser: v.browser,
          os: v.os,
          device: v.device,
          path: v.path,
          isBot: v.isBot,
          visits: [],
          latestVisit: v.visitedAt,
          referrer: v.referrer
        };
      }
      acc[v.ip].count++;

      // Smarter metadata grouping: Prioritize high-value sources (referrers) 
      // even if the latest visit is "Direct"
      if ((!acc[v.ip].referrer || acc[v.ip].referrer === "Direct") && v.referrer && v.referrer !== "Direct") {
          acc[v.ip].referrer = v.referrer;
      }

      acc[v.ip].visits.push({
        id: v.id,
        at: v.visitedAt,
        city: v.city,
        country: v.country,
        referrer: v.referrer,
        path: v.path
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
        return formatDate(d);
      }).reverse();

      const counts = visitors.reduce((acc: any, v) => {
        const date = formatDate(v.visitedAt);
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      chart = labels.map(date => {
        return {
          date: date,
          visits: counts[date] || 0
        };
      });
    }

    return { chart, hourly, grouped };
  }, [visitors, timeRange]);

  const { chart: chartData, grouped: groupedVisitors } = processedData;

  const countryData = useMemo(() => {
    const counts = visitors.filter(v => !v.isBot).reduce((acc: any, v) => {
      const country = v.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [visitors]);

  const deviceData = useMemo(() => {
    const counts = visitors.filter(v => !v.isBot).reduce((acc: any, v) => {
      const device = v.device || 'desktop';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => b.value - a.value);
  }, [visitors]);

  const referrerData = useMemo(() => {
    const counts = visitors.filter(v => !v.isBot).reduce((acc: any, v) => {
      let referrer = "Direct";
      if (v.referrer && v.referrer !== "Direct") {
        try {
          referrer = new URL(v.referrer).hostname.replace('www.', '');
        } catch (e) {
          referrer = v.referrer;
        }
      }
      acc[referrer] = (acc[referrer] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [visitors]);

  const uniqueVisitors = useMemo(() => {
    return new Set(visitors.filter(v => !v.isBot).map(v => v.visitorId || v.ip)).size;
  }, [visitors]);
  
  // Pagination Logic
  const filteredGroupedVisitors = useMemo(() => {
    return showBots ? groupedVisitors : (groupedVisitors as any[]).filter(g => !g.isBot);
  }, [groupedVisitors, showBots]);

  const totalPages = Math.ceil(filteredGroupedVisitors.length / itemsPerPage);
  const paginatedVisitors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredGroupedVisitors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredGroupedVisitors, currentPage, itemsPerPage]);

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

  const toggleSelectGroup = (ids: number[], checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...new Set([...prev, ...ids])]);
    } else {
      setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-3 md:p-6 pt-20 font-[Inter] relative overflow-hidden selection:bg-secondary/30 selection:text-foreground transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full quartz-grid-pattern text-border/20 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto space-y-6 relative z-10">
        
        <DashboardHeader 
          onSync={fetchVisitors}
          onClearAll={() => setShowConfirmClear(true)}
          loading={loading}
          isActionInProgress={isActionInProgress}
          visitorCount={visitors.length}
        />

        <StatsGrid 
          totalVisitors={visitors.filter(v => !v.isBot).length}
          uniqueVisitors={uniqueVisitors}
          countriesCount={new Set(visitors.filter(v => !v.isBot).map(v => v.country).filter(Boolean)).size}
          peakVisits={Math.max(...chartData.map(d => d.visits), 0)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <VisitorTrafficChart 
            chartData={chartData}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            hasVisitors={visitors.length > 0}
          />

          <TopLocations 
            countryData={countryData}
            totalVisitorsCount={visitors.filter(v => !v.isBot).length}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeviceDistribution deviceData={deviceData} />
          <TrafficSources referrerData={referrerData} totalVisitorsCount={visitors.filter(v => !v.isBot).length} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-foreground font-heading">Recent Activity</h2>
              <div className="h-px w-12 bg-border/40" />
              <button
                onClick={() => setShowBots(!showBots)}
                className={`h-9 px-4 rounded-xl border transition-all duration-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 ${
                    showBots 
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_15px_-5px_#f59e0b20]" 
                    : "bg-secondary/10 border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${showBots ? "bg-amber-500 animate-pulse" : "bg-muted-foreground/30"}`} />
                {showBots ? "Showing All Logs (Incl. Bots)" : "Human Traffic Only"}
              </button>
              {selectedIds.length > 0 && (
                <button
                  onClick={() => setShowConfirmBulkDelete(true)}
                  disabled={isActionInProgress}
                  className="h-9 px-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-semibold rounded-full shadow-lg shadow-destructive/10 flex items-center gap-2 transition-all duration-300"
                >
                  {isActionInProgress ? "Deleting..." : `Delete Selected (${selectedIds.length})`}
                </button>
              )}
            </div>
          </div>

          <ActivityTable 
            visitors={visitors}
            paginatedVisitors={paginatedVisitors}
            selectedIds={selectedIds}
            onToggleSelectAll={toggleSelectAll}
            onToggleSelectGroup={toggleSelectGroup}
            expandedIp={expandedIp}
            onToggleExpand={setExpandedIp}
            onDelete={(id) => {
              setDeletingId(id);
              setShowConfirmDelete(true);
            }}
            isActionInProgress={isActionInProgress}
            deletingId={deletingId}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={(count) => {
              setItemsPerPage(count);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <ConfirmDialog 
        open={showConfirmDelete}
        onOpenChange={setShowConfirmDelete}
        onConfirm={handleSingleDelete}
        title="Delete Visitor?"
        description="This will permanently remove the visitor record from your logs. This action cannot be undone."
        isLoading={isActionInProgress}
      />

      <ConfirmDialog 
        open={showConfirmBulkDelete}
        onOpenChange={setShowConfirmBulkDelete}
        onConfirm={handleBulkDelete}
        title="Delete Selected?"
        description={`You are about to delete ${selectedIds.length} visitor records. Are you sure?`}
        isLoading={isActionInProgress}
      />

      <ConfirmDialog 
        open={showConfirmClear}
        onOpenChange={setShowConfirmClear}
        onConfirm={handleClearAll}
        title="Clear All Logs?"
        description="This will wipe the entire visitor history. This is a destructive operation and cannot be reversed."
        confirmText="Clear All Records"
        isLoading={isActionInProgress}
      />
    </div>
  );
}
