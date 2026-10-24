"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="w-20 h-8 rounded-lg bg-surface-container animate-pulse" />
    );
  }

  return (
    <div
      className="flex items-center bg-surface-container-high/60 p-0.5 rounded-lg border border-border/60"
      title="Toggle Light / Dark / System"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        className={`p-1.5 rounded transition-all ${
          theme === "light"
            ? "bg-surface-lowest text-secondary shadow-xs font-bold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        className={`p-1.5 rounded transition-all ${
          theme === "dark"
            ? "bg-surface-high text-secondary shadow-xs font-bold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="System preference"
        className={`p-1.5 rounded transition-all ${
          theme === "system"
            ? "bg-surface-lowest dark:bg-surface-high text-secondary shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
