"use client";

import React from "react";
import { CheckCircle2, FileText, Loader2, AlertCircle } from "lucide-react";

interface StickySaveBarProps {
  isDirty?: boolean;
  isSubmitting?: boolean;
  canSave?: boolean;
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
  canSave = true,
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

  const isSaveDisabled = isSubmitting || !canSave;

  return (
    <div
      className={`sticky bottom-20 md:bottom-6 z-40 bg-surface-lowest/95 dark:bg-surface-lowest/90 backdrop-blur-xl px-4 sm:px-5 py-3 rounded-2xl border shadow-xl md:shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 transition-all ${
        !canSave
          ? "border-border shadow-xs"
          : isDirty
          ? "border-amber-500/40 ring-1 ring-amber-500/20 shadow-amber-500/5"
          : "border-border shadow-xs"
      } ${className}`}
    >
      {/* Left Status Indicator */}
      <div className="flex items-center gap-2.5">
        <span
          className={`w-2.5 h-2.5 rounded-full transition-all shrink-0 ${
            !canSave
              ? "bg-amber-500 animate-pulse ring-4 ring-amber-500/20"
              : isDirty
              ? "bg-emerald-500 ring-2 ring-emerald-500/20"
              : "bg-emerald-500 ring-2 ring-emerald-500/20"
          }`}
        />
        <div className="flex items-center gap-1.5">
          {!canSave && (
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
          )}
          <span
            className={`text-xs sm:text-sm font-semibold transition-colors ${
              !canSave
                ? "text-amber-700 dark:text-amber-400"
                : isDirty
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {currentStatusText}
          </span>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-end">
        {onDiscard && (
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSubmitting || !isDirty}
            className="h-9 px-3.5 sm:px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-foreground text-xs sm:text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-transparent hover:border-border"
          >
            Discard
          </button>
        )}

        {onSaveDraft && (
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSaveDisabled}
            className="h-9 px-3.5 sm:px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold text-xs sm:text-sm transition-all border border-border/60 hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            title={!canSave ? "Please fill all required entries to save" : "Save as draft"}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
        )}

        <button
          type="button"
          onClick={onPublish}
          disabled={isSaveDisabled}
          className="h-9 px-4 sm:px-5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-bold shadow-md shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-1.5 shrink-0"
          title={!canSave ? "Please fill all required entries to enable save" : saveButtonText}
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
