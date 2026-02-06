"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, RefreshCw } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  variant?: "destructive" | "default";
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  variant = "destructive",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-300">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 ${variant === 'destructive' ? 'bg-red-50 dark:bg-red-500/10' : 'bg-indigo-50 dark:bg-indigo-500/10'} rounded-2xl flex items-center justify-center mb-2`}>
            {variant === 'destructive' ? (
              <Trash2 className="w-8 h-8 text-red-600 dark:text-red-500" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </div>
          <div className="flex w-full gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 border-none transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              variant={variant}
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 h-12 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                variant === 'destructive' 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20 text-white'
              }`}
            >
              {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
              {confirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
