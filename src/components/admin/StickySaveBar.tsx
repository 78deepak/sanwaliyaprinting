"use client";

import React from "react";
import { CheckCircle2, FileText, Loader2 } from "lucide-react";

interface StickySaveBarProps {
  isDirty?: boolean;
  isSubmitting?: boolean;
  statusText?: string;
  onDiscard?: () => void;
  onSaveDraft?: () => void;
  onPublish?: () => void;
  saveButtonText?: string;
  className?: string;
}

export function StickySaveBar({
  isDirty = false,
  isSubmitting = false,
  statusText,
  onDiscard,
  onSaveDraft,
  onPublish,
  saveButtonText = "Save & Publish",
  className = "",
}: StickySaveBarProps) {
  const currentStatusText =
    statusText ||
    (isDirty ? "Unsaved changes" : "All changes saved");

  return (
    <div
      className={`sticky bottom-4 z-30 bg-surface-lowest/95 dark:bg-surface-lowest/90 backdrop-blur-md px-4 py-3 rounded-xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 transition-all ${
        isDirty ? "border-amber-500/40 ring-1 ring-amber-500/20" : "border-border shadow-xs"
      } ${className}`}
    >
      {/* Left Status Indicator */}
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            isDirty ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
          }`}
        />
        <span
          className={`text-xs font-medium transition-colors ${
            isDirty
              ? "text-amber-600 dark:text-amber-400 font-semibold"
              : "text-muted-foreground"
          }`}
        >
          {currentStatusText}
        </span>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {onDiscard && (
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSubmitting || !isDirty}
            className="h-9 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground text-xs md:text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Discard
          </button>
        )}

        {onSaveDraft && (
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSubmitting || !isDirty}
            className="h-9 px-3.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold text-xs md:text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
        )}

        <button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting || !isDirty}
          className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-container text-white text-xs md:text-sm font-bold shadow-xs transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{saveButtonText}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
