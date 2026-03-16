"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-[Outfit] overflow-hidden relative">
      {/* Decorative Warm Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

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
            <Ghost className="w-32 h-32 md:w-48 md:h-48 text-muted-foreground/30" />
          </motion.div>
          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-muted-foreground/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-primary italic">
            Lost in the digital void?
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
            The page you're looking for has either drifted away or never existed in this universe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-7 text-lg group shadow-xl shadow-primary/20"
            >
              <Home className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
              Return Home
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground rounded-full hover:bg-muted border border-border py-7 px-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
