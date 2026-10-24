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
      className={`bg-surface-lowest p-6 md:p-7 rounded-xl border border-border shadow-sm flex flex-col gap-5 relative ${className}`}
    >
      <div className="flex items-center justify-between pb-1 border-b border-border/40">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 flex items-center justify-center font-semibold">
              <Icon className="w-5 h-5" />
            </span>
          )}
          <div>
            <h2 className="font-headline-sm text-lg md:text-xl text-foreground font-bold">
              {title}
            </h2>
            {titleHi && (
              <p className="text-label-sm text-muted-foreground font-normal">
                {titleHi}
              </p>
            )}
          </div>
        </div>

        {badge && <div>{badge}</div>}
      </div>

      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
