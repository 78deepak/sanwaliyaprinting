"use client";

import React from "react";
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
  Moon,
  Sun,
  Laptop,
  CheckCircle2,
  Stamp,
} from "lucide-react";
import { useTheme } from "next-themes";
import { logoutAction } from "@/app/admin/auth-actions";

interface SidebarProps {
  className?: string;
  totalProductsCount?: number;
}

export function Sidebar({ className = "", totalProductsCount = 48 }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

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
    // For /admin/products, keep active unless on /admin/products/new
    if (item.href === "/admin/products") {
      return pathname.startsWith("/admin/products") && pathname !== "/admin/products/new";
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full w-72 bg-surface-lowest border-r border-border z-40 flex flex-col justify-between hidden md:flex ${className}`}
    >
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
            <Stamp className="w-5 h-5 text-secondary-fixed" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg text-primary tracking-tight font-bold leading-tight">
              Sanwaliya Admin
            </span>
            <span className="text-[11px] font-label-sm text-muted-foreground uppercase tracking-widest">
              Shop Management
            </span>
          </div>
        </div>

        {/* Verified Owner Badge */}
        <div className="px-4 py-3 border-b border-border/40">
          <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between border border-border/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span className="text-label-sm text-foreground font-semibold">
                Ramesh Patidar (Owner)
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-secondary" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 px-4 mt-4">
          {navItems.map((item) => {
            const active = isLinkActive(item);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-label-md font-semibold transition-all ${
                  active
                    ? "bg-primary text-white shadow-sm font-bold"
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

      {/* Footer Navigation & System Controls */}
      <div className="p-4 flex flex-col gap-2.5 border-t border-border/40 bg-surface-container/30">
        {/* Public Website Link */}
        <Link
          href="/"
          target="_blank"
          className="min-h-[40px] flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:bg-surface-container hover:text-foreground text-label-md font-semibold transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-secondary" />
          <span>View Public Website</span>
        </Link>

        {/* Theme Switcher Toggle */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container border border-border/40">
          <span className="text-label-sm text-muted-foreground font-medium">Theme</span>
          <div className="flex items-center gap-1 bg-surface-lowest p-1 rounded-full border border-border">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                theme === "light"
                  ? "bg-secondary/20 text-secondary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                theme === "dark"
                  ? "bg-secondary/20 text-secondary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                theme === "system"
                  ? "bg-secondary/20 text-secondary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="System Default"
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Logout Action */}
        <button
          type="button"
          onClick={() => logoutAction()}
          className="w-full min-h-[40px] flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive text-label-md font-semibold transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Logout</span>
        </button>
      </div>
    </aside>
  );
}
