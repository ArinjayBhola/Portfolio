"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 font-[Outfit] overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 z-10 max-w-2xl"
      >
        <div className="relative">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="flex justify-center"
          >
            <Ghost className="w-32 h-32 md:w-48 md:h-48 text-neutral-800" />
          </motion.div>
          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-neutral-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent italic">
            Lost in the digital void?
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-md mx-auto">
            The page you're looking for has either drifted away or never existed in this universe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 py-7 text-lg group shadow-xl shadow-blue-600/20"
            >
              <Home className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
              Return Home
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
            className="text-neutral-400 hover:text-white rounded-full hover:bg-neutral-900 border border-neutral-800 py-7 px-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
