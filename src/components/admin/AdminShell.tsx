"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Store,
  User,
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Sidebar } from "./Sidebar";
import { MobileDrawer } from "./MobileDrawer";

interface AdminShellProps {
  children: React.ReactNode;
  ownerName?: string;
}

export function AdminShell({ children, ownerName }: AdminShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Desktop Left Sidebar */}
      <Sidebar ownerName={ownerName} />

      {/* Mobile Slide-in Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ownerName={ownerName}
      />

      {/* Right Content Area with Desktop Left Margin */}
      <div className="md:pl-72 flex flex-col min-h-screen flex-1">
        {/* Fixed Top Bar */}
        <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl border-b border-border z-30">
          <div className="h-16 w-full px-4 md:px-8 flex items-center justify-between gap-4">
            {/* Left: Hamburger (mobile) & Title */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-container hover:text-foreground transition-colors"
                aria-label="Open navigation drawer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-label-md text-muted-foreground hidden sm:inline">
                  Sanwaliya Royal Mudran
                </span>
                <span className="text-muted-foreground/60 hidden sm:inline">/</span>
                <span className="font-headline-sm text-base md:text-lg text-primary font-bold">
                  Console
                </span>
              </div>
            </div>

            {/* Right: Atelier Desk indicator, Public Catalog link, Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-border/50 text-muted-foreground text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span>Atelier Control Desk • Suwasra</span>
              </div>

              {/* Theme toggle quick button */}
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                title="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-secondary" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-primary hover:bg-surface-container text-label-md font-semibold transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>View Live Catalog</span>
              </Link>

              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Page Workspace */}
        <main className="w-full pt-16 flex-1 bg-surface px-4 md:px-8 py-6 pb-24 md:pb-12">
          {children}
        </main>

        {/* Sticky Mobile Bottom Navigation Bar (Screens < 768px) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-lowest/95 backdrop-blur-md border-t border-border z-40 px-3 flex items-center justify-around shadow-lg">
          <Link
            href="/admin"
            className={`flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-lg text-[11px] font-bold transition-colors ${
              pathname === "/admin"
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/products"
            className={`flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
              pathname.startsWith("/admin/products") && pathname !== "/admin/products/new"
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Products</span>
          </Link>

          {/* Prominent Center "+ Add" CTA */}
          <Link
            href="/admin/products/new"
            className="flex flex-col items-center justify-center -mt-5"
          >
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-container active:scale-95 transition-all">
              <PlusCircle className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-primary mt-0.5">+ Add</span>
          </Link>

          <Link
            href="/admin/settings"
            className={`flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
              pathname.startsWith("/admin/settings")
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
