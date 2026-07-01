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
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8 bg-card border border-border shadow-2xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 ${variant === 'destructive' ? 'bg-destructive/10' : 'bg-primary/10'} rounded-2xl flex items-center justify-center mb-2`}>
            {variant === 'destructive' ? (
              <Trash2 className="w-8 h-8 text-destructive" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-primary" />
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground font-heading">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex w-full gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-xl font-bold bg-secondary hover:bg-secondary/80 text-secondary-foreground border-none transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              variant={variant}
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 h-12 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                variant === 'destructive'
                  ? 'bg-destructive hover:bg-destructive/90 shadow-destructive/20 text-destructive-foreground'
                  : 'bg-primary hover:bg-primary/90 shadow-primary/20 text-primary-foreground'
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
