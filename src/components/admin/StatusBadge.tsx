import React from "react";
import { AlertCircle, Eye, Archive } from "lucide-react";

export type StatusType = "published" | "draft" | "archived" | "action_needed" | "view_only";

interface StatusBadgeProps {
  status: StatusType | boolean;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({
  status,
  className = "",
  showIcon = true,
}: StatusBadgeProps) {
  // Normalize boolean to status string
  const normalizedStatus: StatusType =
    typeof status === "boolean"
      ? status
        ? "published"
        : "draft"
      : status;

  switch (normalizedStatus) {
    case "published":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-semibold tracking-wide bg-tertiary/15 text-tertiary dark:bg-tertiary/20 dark:text-emerald-300 border border-tertiary/30 ${className}`}
        >
          {showIcon && <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />}
          Published
        </span>
      );

    case "draft":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-semibold tracking-wide bg-secondary/15 text-secondary dark:bg-secondary/25 dark:text-amber-300 border border-secondary/30 ${className}`}
        >
          {showIcon && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
          Draft
        </span>
      );

    case "action_needed":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-semibold tracking-wide bg-destructive/15 text-destructive dark:bg-destructive/25 dark:text-rose-300 border border-destructive/30 ${className}`}
        >
          {showIcon && <AlertCircle className="w-3 h-3 text-destructive" />}
          Action Needed
        </span>
      );

    case "view_only":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-surface-container-high text-muted-foreground border border-border ${className}`}
        >
          {showIcon && <Eye className="w-3 h-3" />}
          View-only
        </span>
      );

    case "archived":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-surface-container text-muted-foreground border border-border ${className}`}
        >
          {showIcon && <Archive className="w-3 h-3" />}
          Archived
        </span>
      );

    default:
      return null;
  }
}
