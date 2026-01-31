"use client";

import { useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, RefreshCw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a brief delay for a better UX feeling of "authenticating"
    await new Promise(resolve => setTimeout(resolve, 600));

    if (password === process.env.NEXT_ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("Unauthorized access. Invalid secure key.");
    }
    setIsLoading(false);
  };

  if (isAuthorized) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-[Inter] transition-colors duration-500 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full quartz-grid-pattern text-slate-500/5 pointer-events-none" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-[3rem] relative overflow-hidden group shadow-2xl transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-primary/5 dark:bg-primary/10 rounded-[1.5rem] flex items-center justify-center border border-slate-200 dark:border-slate-800 mb-8 transform group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3 font-heading">
              Secure <span className="text-primary">Portal</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium mb-10 max-w-[240px]">
              Access the high-performance analytics engine
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                  Security Token
                </label>
                <div className="relative group/input">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground rounded-2xl py-4 pr-12 pl-5 text-lg font-medium transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-muted-foreground/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted-foreground/50 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-destructive font-bold text-xs mt-2 ml-1"
                  >
                    <div className="w-1 h-1 bg-destructive rounded-full" />
                    {error}
                  </motion.div>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm rounded-2xl transition-all shadow-xl shadow-primary/10 dark:shadow-none flex items-center justify-center gap-2 group-active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Authorizing...</span>
                  </div>
                ) : (
                  <>
                    <span>Enter Dashboard</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-12 flex items-center gap-4 text-xs font-semibold text-muted-foreground/40 tracking-widest">
              <div className="h-px w-8 bg-slate-200 dark:bg-slate-800" />
              <span>V3.0 QUARTZ</span>
              <div className="h-px w-8 bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
