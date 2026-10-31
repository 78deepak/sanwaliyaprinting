import React from "react";
import { LucideIcon } from "lucide-react";

interface FormSectionProps {
  title: string;
  titleHi?: string;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  titleHi,
  icon: Icon,
  badge,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <section
      className={`bg-surface-lowest p-5 md:p-6 rounded-xl border border-border shadow-2xs flex flex-col gap-4 relative ${className}`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4" />
            </span>
          )}
          <div>
            <h2 className="text-sm md:text-base text-foreground font-bold tracking-tight">
              {title}
            </h2>
            {titleHi && (
              <p className="text-xs text-muted-foreground font-normal mt-0.5">
                {titleHi}
              </p>
            )}
          </div>
        </div>

        {badge && <div>{badge}</div>}
      </div>

      <div className="flex flex-col gap-3.5">{children}</div>
    </section>
  );
}
