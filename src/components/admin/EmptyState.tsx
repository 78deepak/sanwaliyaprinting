import React from "react";
import { LucideIcon, PackageOpen } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export function EmptyState({
  title = "No Products Found",
  description = "No items matched your current search filters or category query. Try adjusting your search keywords.",
  icon: Icon = PackageOpen,
  actionText,
  actionHref,
  onActionClick,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`p-10 md:p-14 rounded-2xl bg-surface-lowest border border-dashed border-border text-center flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-muted-foreground shadow-sm">
        <Icon className="w-8 h-8 text-primary/70" />
      </div>

      <div className="max-w-md flex flex-col gap-1.5">
        <h3 className="font-headline-sm text-xl text-primary font-bold">
          {title}
        </h3>
        <p className="text-body-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {(actionText && (actionHref || onActionClick)) && (
        <div className="pt-2">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-label-md font-semibold transition-all shadow-sm active:scale-[0.98]"
            >
              {actionText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-foreground text-label-md font-semibold transition-all shadow-sm active:scale-[0.98]"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
