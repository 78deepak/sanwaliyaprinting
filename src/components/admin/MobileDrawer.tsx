"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  Settings,
  ExternalLink,
  LogOut,
  X,
  CheckCircle2,
  Stamp,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import { useTheme } from "next-themes";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  totalProductsCount?: number;
}

export function MobileDrawer({
  isOpen,
  onClose,
  totalProductsCount = 48,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Close drawer on path change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: Package,
      badge: totalProductsCount ? String(totalProductsCount) : "48",
      exact: false,
    },
    {
      title: "+ Add Product",
      href: "/admin/products/new",
      icon: PlusCircle,
      exact: true,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
      badge: "View-only",
      badgeVariant: "gold",
      exact: true,
    },
    {
      title: "Shop Settings",
      href: "/admin/settings",
      icon: Settings,
      exact: true,
    },
  ];

  const isLinkActive = (item: (typeof navItems)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    if (item.href === "/admin/products") {
      return pathname.startsWith("/admin/products") && pathname !== "/admin/products/new";
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-surface-lowest h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200 border-r border-border">
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                <Stamp className="w-5 h-5 text-secondary-fixed" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-base text-primary font-bold">
                  Sanwaliya Admin
                </span>
                <span className="text-[11px] font-label-sm text-muted-foreground uppercase tracking-widest">
                  Shop Management
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-surface-container"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Owner info */}
          <div className="p-4 border-b border-border/40">
            <div className="p-2 rounded-lg bg-surface-container flex items-center justify-between border border-border/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span className="text-label-sm font-semibold text-foreground">
                  Ramesh Patidar (Owner)
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-secondary" />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1 p-3">
            {navItems.map((item) => {
              const active = isLinkActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-label-md font-semibold transition-all ${
                    active
                      ? "bg-primary text-white shadow-xs font-bold"
                      : "text-muted-foreground hover:bg-surface-container hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.title}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        item.badgeVariant === "gold"
                          ? active
                            ? "bg-white/20 text-white"
                            : "bg-secondary/15 text-secondary"
                          : active
                          ? "bg-white/20 text-white"
                          : "bg-surface-container-high text-muted-foreground"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 flex flex-col gap-2 border-t border-border/40 bg-surface-container/30">
          <Link
            href="/"
            target="_blank"
            className="min-h-[40px] flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:bg-surface-container hover:text-foreground text-label-md font-semibold transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-secondary" />
            <span>View Public Website</span>
          </Link>

          {/* Theme switcher */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container">
            <span className="text-label-sm text-muted-foreground">Theme</span>
            <div className="flex items-center gap-1 bg-surface-lowest p-1 rounded-full border border-border">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  theme === "light" ? "bg-secondary/20 text-secondary" : "text-muted-foreground"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-secondary/20 text-secondary" : "text-muted-foreground"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  theme === "system" ? "bg-secondary/20 text-secondary" : "text-muted-foreground"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <Link
            href="/admin/login"
            className="min-h-[40px] flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive text-label-md font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
