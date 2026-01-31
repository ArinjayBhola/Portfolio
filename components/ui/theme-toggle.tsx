"use client";

import { useTheme } from "../../lib/theme-provider";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative flex items-center justify-center w-11 h-11 rounded-xl backdrop-blur bg-white/50 dark:bg-black/30 border border-neutral-200 dark:border-neutral-700 shadow-md transition-all duration-300 hover:bg-white/70 dark:hover:bg-black/50"
      style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}>
      <AnimatePresence
        mode="wait"
        initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-white">
            <Moon
              size={22}
              strokeWidth={2}
              suppressHydrationWarning
            />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-yellow-400">
            <Sun
              size={22}
              strokeWidth={2}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
