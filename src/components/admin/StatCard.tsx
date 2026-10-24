import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  total?: string | number;
  description: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant?: "success" | "warning" | "neutral" | "primary";
  };
  accentColor?: "primary" | "secondary" | "tertiary" | "neutral";
  className?: string;
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
}: StatCardProps) {
  const getIconWrapperClass = () => {
    switch (accentColor) {
      case "primary":
        return "bg-primary/10 text-primary dark:bg-primary/20";
      case "secondary":
        return "bg-secondary/15 text-secondary dark:bg-secondary/25";
      case "tertiary":
        return "bg-tertiary/15 text-tertiary dark:bg-tertiary/25";
      default:
        return "bg-surface-container-high text-foreground";
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

  return (
    <div
      className={`relative flex flex-col justify-between p-5 md:p-6 rounded-xl bg-surface-lowest border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconWrapperClass()}`}>
          <Icon className="w-6 h-6" />
        </div>

        {badge && (
          <span
            className={`px-2.5 py-1 rounded-full text-label-sm font-semibold flex items-center gap-1.5 ${
              badge.variant === "warning"
                ? "bg-secondary/15 text-secondary border border-secondary/30"
                : badge.variant === "success"
                ? "bg-tertiary/15 text-tertiary border border-tertiary/30"
                : badge.variant === "primary"
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-surface-container text-muted-foreground border border-border"
            }`}
          >
            {badge.variant === "success" && <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />}
            {badge.text}
          </span>
        )}
      </div>

      <div className="mt-5">
        <span className="text-label-md uppercase tracking-wider text-muted-foreground font-semibold">
          {title}
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className={`font-display-md text-3xl md:text-4xl font-bold ${getValueColor()}`}>
            {value}
          </span>
          {total && (
            <span className="text-label-sm text-muted-foreground font-medium">
              {total}
            </span>
          )}
        </div>
        <p className="text-body-sm text-muted-foreground mt-2">
          {description}
        </p>
      </div>

      {/* Decorative colored bottom indicator line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${getBottomBarGradient()}`} />
    </div>
  );
}
