import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  total?: string | number;
  description?: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant?: "success" | "warning" | "neutral" | "primary";
  };
  accentColor?: "primary" | "secondary" | "tertiary" | "neutral";
  className?: string;
  href?: string;
}

export function StatCard({
  title,
  value,
  total,
  description,
  icon: Icon,
  badge,
  accentColor = "primary",
  className = "",
  href,
}: StatCardProps) {
  const getIconWrapperClass = () => {
    switch (accentColor) {
      case "primary":
        return "bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20";
      case "secondary":
        return "bg-secondary/15 text-secondary border border-secondary/25 dark:bg-secondary/25";
      case "tertiary":
        return "bg-tertiary/15 text-tertiary border border-tertiary/25 dark:bg-tertiary/25";
      default:
        return "bg-surface-container text-foreground border border-border/60";
    }
  };

  const getBottomBarGradient = () => {
    switch (accentColor) {
      case "primary":
        return "bg-gradient-to-r from-primary via-primary-container to-transparent";
      case "secondary":
        return "bg-gradient-to-r from-secondary via-secondary-container to-transparent";
      case "tertiary":
        return "bg-gradient-to-r from-tertiary to-transparent";
      default:
        return "bg-gradient-to-r from-border to-transparent";
    }
  };

  const getValueColor = () => {
    switch (accentColor) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "tertiary":
        return "text-tertiary";
      default:
        return "text-foreground";
    }
  };

  const cardContent = (
    <div
      className={`relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-surface-lowest border border-border/80 shadow-xs hover:shadow-md hover:border-primary/25 transition-all duration-200 overflow-hidden group ${
        href ? "cursor-pointer hover:-translate-y-0.5" : ""
      } ${className}`}
    >
      {/* Top row: compact icon + badge pill */}
      <div className="flex items-center justify-between gap-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${getIconWrapperClass()}`}
        >
          <Icon className="w-4 h-4" />
        </div>

        {badge && (
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-tight shrink-0 flex items-center gap-1 ${
              badge.variant === "warning"
                ? "bg-secondary/15 text-secondary border border-secondary/25"
                : badge.variant === "success"
                ? "bg-tertiary/15 text-tertiary border border-tertiary/25"
                : badge.variant === "primary"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-surface-container text-muted-foreground border border-border/60"
            }`}
          >
            {badge.variant === "success" && (
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            )}
            {badge.text}
          </span>
        )}
      </div>

      {/* Metric details */}
      <div className="mt-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block truncate">
          {title}
        </span>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span
            className={`font-display-md text-2xl sm:text-[26px] font-extrabold tracking-tight ${getValueColor()}`}
          >
            {value}
          </span>
          {total && (
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate">
              {total}
            </span>
          )}
        </div>
        {description && (
          <p className="text-[11px] text-muted-foreground/80 truncate mt-0.5 font-normal">
            {description}
          </p>
        )}
      </div>

      {/* Decorative colored bottom indicator line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 opacity-75 group-hover:opacity-100 transition-opacity ${getBottomBarGradient()}`}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

