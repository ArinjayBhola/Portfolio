"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 p-1 flex items-center transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      aria-label="Toggle Theme"
    >
      <motion.div
        className="z-10 w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center p-1.5"
        animate={{ x: theme === "dark" ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-full h-full text-amber-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-full h-full text-indigo-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <Sun className="w-3 h-3 text-amber-500/40 opacity-100 dark:opacity-0 transition-opacity duration-300" />
        <Moon className="w-3 h-3 text-indigo-400/40 opacity-0 dark:opacity-100 transition-opacity duration-300" />
      </div>
    </button>
  );
}
