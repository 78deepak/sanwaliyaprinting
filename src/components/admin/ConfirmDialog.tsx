"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  subtitle,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-surface-lowest border border-border rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col gap-5 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Icon button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-surface-container hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              variant === "danger"
                ? "bg-destructive/15 text-destructive dark:bg-destructive/25"
                : "bg-secondary/15 text-secondary dark:bg-secondary/25"
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="flex flex-col pr-6">
            <span
              className={`text-label-sm uppercase tracking-widest font-bold ${
                variant === "danger" ? "text-destructive" : "text-secondary"
              }`}
            >
              {variant === "danger" ? "Destructive Action" : "Notice"}
            </span>
            <h3 className="font-headline-sm text-xl text-primary font-bold mt-0.5 leading-snug">
              {title}
            </h3>
            {subtitle && (
              <span className="text-label-md text-secondary font-semibold mt-1">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 rounded-xl bg-surface-container text-foreground text-body-md leading-relaxed flex flex-col gap-2 border border-border/50">
          <p>{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground text-label-md font-semibold transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`min-h-[44px] px-5 py-2.5 rounded-lg text-white text-label-md font-bold shadow-md transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 ${
              variant === "danger"
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary-container"
            }`}
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
