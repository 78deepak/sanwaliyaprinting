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
  isDirty = true,
  isSubmitting = false,
  statusText = "Unsaved drafts auto-backed up locally",
  onDiscard,
  onSaveDraft,
  onPublish,
  saveButtonText = "Save & Publish",
  className = "",
}: StickySaveBarProps) {
  return (
    <div
      className={`sticky bottom-4 z-30 bg-surface-lowest/95 dark:bg-surface-lowest/90 backdrop-blur-md px-5 py-3.5 rounded-xl border border-border shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 transition-all ${className}`}
    >
      {/* Left Status Indicator */}
      <div className="flex items-center gap-2.5">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isDirty ? "bg-secondary animate-pulse" : "bg-tertiary"
          }`}
        />
        <span className="text-label-sm text-muted-foreground font-medium">
          {statusText}
        </span>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        {onDiscard && (
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground text-label-md font-semibold transition-colors disabled:opacity-50"
          >
            Discard
          </button>
        )}

        {onSaveDraft && (
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-label-md transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
        )}

        <button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-label-md font-bold shadow-md transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>{saveButtonText}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
