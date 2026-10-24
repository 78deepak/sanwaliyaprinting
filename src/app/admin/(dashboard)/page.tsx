"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  PlusCircle,
  Package,
  Layers,
  Star,
  ExternalLink,
  MessageCircle,
  Edit3,
  Eye,
  Store,
  Camera,
  Languages,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  adminMetrics,
  shopkeeperNotes,
  getMockAdminProducts,
  AdminProduct,
} from "@/data/admin-mock";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // // TODO(backend): Fetch dashboard summary and recent products from GET /api/admin/dashboard
    const fetchDashboard = async () => {
      try {
        const list = await getMockAdminProducts({ sortBy: "newest" });
        setProducts(list.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Top Welcome & Atelier Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-lowest border border-border p-6 md:p-8 shadow-sm">
        {/* Ambient glow backgrounds matching Stitch screen */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-gradient-to-br from-secondary/15 via-primary/5 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-primary/5 blur-xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10">
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary/15 text-secondary text-label-sm font-bold uppercase tracking-wider border border-secondary/30">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                {adminMetrics.atelierStatus}
              </span>
              <span className="text-label-sm text-muted-foreground font-medium">
                {adminMetrics.branch}
              </span>
            </div>

            <h1 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold tracking-tight">
              Namaste Ramesh ji{" "}
              <span className="font-headline-md text-xl md:text-2xl font-normal text-muted-foreground ml-1">
                (दुकानदार डैशबोर्ड)
              </span>
            </h1>

            <p className="text-body-md text-muted-foreground leading-relaxed">
              Here is what&apos;s happening in your Suwasra printing catalogue and production desk today. 42 live client-facing suites are synchronized.
            </p>
          </div>

          {/* Sync Status Badge Widget */}
          <div className="flex items-center gap-3 self-start lg:self-auto bg-surface-container p-3 rounded-xl border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-surface-lowest flex items-center justify-center text-secondary shadow-xs">
              <Store className="w-6 h-6" />
            </div>
            <div className="flex flex-col pr-2">
              <span className="text-[11px] font-label-sm uppercase tracking-wider text-muted-foreground">
                Sync Status
              </span>
              <span className="text-label-md text-foreground font-bold flex items-center gap-1.5">
                {adminMetrics.syncStatus}
                <span className="w-2 h-2 rounded-full bg-tertiary inline-block animate-pulse" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Four High-Impact Metrical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Published Designs"
          value={adminMetrics.publishedProducts}
          total={`/ ${adminMetrics.totalProducts} items`}
          description="Live on public website catalog"
          icon={CheckCircle2}
          accentColor="primary"
          badge={{ text: "Public", variant: "success" }}
        />

        <StatCard
          title="Draft Items"
          value="06"
          total="in progress"
          description="Needs photos or client pricing"
          icon={Clock}
          accentColor="secondary"
          badge={{ text: "Action Needed", variant: "warning" }}
        />

        <StatCard
          title="Product Categories"
          value="07"
          total="sections"
          description="Managed securely by developer"
          icon={Layers}
          accentColor="neutral"
          badge={{ text: "Route Fixed", variant: "neutral" }}
        />

        <StatCard
          title="Featured on Home"
          value="08"
          total="showcased"
          description="Showcased in top homepage banner"
          icon={Star}
          accentColor="secondary"
          badge={{ text: "Hero Spot", variant: "warning" }}
        />
      </div>

      {/* Primary Quick Actions Bar (Touch-Optimized CTA Row) */}
      <div className="p-4 md:p-5 rounded-xl bg-surface-container-high border border-border shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="font-headline-sm text-lg text-primary font-bold">
              Desk Actions
            </span>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <span className="text-body-sm text-muted-foreground hidden sm:inline">
              Frequent shop owner operations
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* + Add New Product */}
            <Link
              href="/admin/products/new"
              className="min-h-[46px] px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <PlusCircle className="w-5 h-5" />
              <span>+ Add New Product</span>
            </Link>

            {/* Manage All Products */}
            <Link
              href="/admin/products"
              className="min-h-[46px] px-4 py-2.5 rounded-lg bg-surface-lowest hover:bg-surface-container border border-border text-primary text-label-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
            >
              <Package className="w-5 h-5" />
              <span>Manage Products ({adminMetrics.totalProducts})</span>
            </Link>

            {/* View Public Website */}
            <Link
              href="/"
              target="_blank"
              className="min-h-[46px] px-4 py-2.5 rounded-lg bg-surface-lowest hover:bg-surface-container border border-border text-foreground hover:text-primary text-label-lg font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
            >
              <ExternalLink className="w-4 h-4 text-secondary" />
              <span className="hidden sm:inline">View Public Website</span>
              <span className="sm:hidden">Website</span>
            </Link>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] px-4 py-2.5 rounded-lg bg-tertiary hover:bg-tertiary/90 text-white text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Link</span>
            </a>
          </div>
        </div>
      </div>

      {/* Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recently Updated Designs (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-surface-lowest rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-headline-sm text-lg text-primary font-bold">
                  Recently Updated Designs
                </h2>
                <p className="text-body-sm text-muted-foreground">
                  Wedding collections, commercial cards, and custom prints
                </p>
              </div>
            </div>

            <Link
              href="/admin/products"
              className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground hover:text-primary text-label-sm font-semibold transition-colors"
            >
              All Categories
            </Link>
          </div>

          {/* Product List Stack */}
          <div className="bg-surface-lowest rounded-xl border border-border shadow-xs overflow-hidden flex flex-col divide-y divide-border/60">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">
                Loading recently updated items...
              </div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No items found.
              </div>
            ) : (
              products.map((product) => {
                const heroImage =
                  product.images.find((img) => img.isPrimary) ||
                  product.images[0] || {
                    url: "/placeholder-print.jpg",
                    alt: product.name,
                  };

                return (
                  <div
                    key={product.id}
                    className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-surface-container/40 transition-colors"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="relative w-16 h-16 rounded-lg bg-surface-container shrink-0 overflow-hidden border border-border">
                        <Image
                          src={heroImage.url}
                          alt={heroImage.alt}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-bold capitalize">
                            {product.category.replace(/-/g, " ")}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container font-mono text-muted-foreground text-label-sm font-semibold">
                            SKU: {product.productCode}
                          </span>
                          <StatusBadge status={product.status} />
                        </div>

                        <h3 className="font-headline-sm text-base text-foreground font-bold truncate mt-1">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-3 text-body-sm text-muted-foreground mt-0.5 flex-wrap">
                          {product.price.show && product.price.startingFrom ? (
                            <span className="text-label-md text-primary font-bold">
                              ₹{product.price.startingFrom.toLocaleString("en-IN")}{" "}
                              {product.price.maxPrice
                                ? `– ₹${product.price.maxPrice.toLocaleString("en-IN")}`
                                : ""}{" "}
                              / {product.price.unit || "suite"}
                            </span>
                          ) : (
                            <span className="text-label-md text-secondary font-bold">
                              Custom Quote
                            </span>
                          )}
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[13px]">
                            <Clock className="w-3.5 h-3.5" />
                            Updated: {product.updatedAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-label-md font-bold flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </Link>

                      <Link
                        href={`/category/${product.category}/${product.slug}`}
                        target="_blank"
                        className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                        title="Preview Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer action below table */}
          <div className="p-4 rounded-xl bg-surface-lowest border border-border flex items-center justify-between shadow-xs">
            <span className="text-body-sm text-muted-foreground">
              Showing latest {products.length} of {adminMetrics.totalProducts} printing suites
            </span>
            <Link
              href="/admin/products"
              className="text-label-md font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              <span>Go to complete catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Shopkeeper Notes & Catalogue Health (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card: Ramesh ji's Notes & Reminders */}
          <div className="p-6 rounded-xl bg-surface-lowest border border-border shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center font-bold">
                  <Star className="w-4 h-4" />
                </div>
                <h2 className="font-headline-sm text-lg text-primary font-bold">
                  Ramesh ji&apos;s Notes
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-label-sm font-semibold">
                Active
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {shopkeeperNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-3.5 rounded-lg flex flex-col gap-1 border ${
                    note.type === "warning"
                      ? "bg-secondary/10 border-secondary/20 text-foreground"
                      : "bg-primary/5 border-primary/20 text-foreground"
                  }`}
                >
                  <span className="text-label-sm font-bold text-primary flex items-center gap-1.5">
                    {note.title}
                  </span>
                  <p className="text-body-sm text-muted-foreground leading-relaxed">
                    {note.content}
                  </p>
                  <span className="text-[11px] text-muted-foreground/80 mt-1">
                    {note.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Catalogue Health & Readiness */}
          <div className="p-6 rounded-xl bg-surface-lowest border border-border shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-tertiary/15 text-tertiary flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="font-headline-sm text-lg text-foreground font-bold">
                  Catalogue Health
                </h2>
              </div>
              <span className="text-label-sm font-bold text-tertiary">
                {adminMetrics.catalogueHealth}% Ready
              </span>
            </div>

            {/* Metric 1: High Res Studio Photos */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-label-sm">
                <span className="text-foreground font-semibold flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-secondary" />
                  High-Res Studio Photos
                </span>
                <span className="font-bold text-primary">42 / 48 items</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "87.5%" }} />
              </div>
              <span className="text-[11px] text-muted-foreground">
                6 draft items still need photo shoot
              </span>
            </div>

            {/* Metric 2: Hindi Search Tags */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-label-sm">
                <span className="text-foreground font-semibold flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-secondary" />
                  Hindi Search Tags (शगुन, शादी, बिल)
                </span>
                <span className="font-bold text-primary">38 / 48 items</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: "79%" }} />
              </div>
              <span className="text-[11px] text-muted-foreground">
                Helps local Mandsaur/Suwasra buyers search
              </span>
            </div>

            {/* Metric 3: WhatsApp Routing Verification */}
            <div className="p-3.5 rounded-lg bg-surface-container flex items-start gap-3 border border-border/50">
              <div className="w-8 h-8 rounded-full bg-tertiary/15 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-label-sm font-bold text-foreground">
                  Direct WhatsApp Link Active
                </span>
                <span className="text-body-sm text-muted-foreground truncate">
                  Linked to +91 98765 43210
                </span>
                <span className="text-label-sm text-tertiary font-semibold mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> All 48 items route correctly
                </span>
              </div>
            </div>

            {/* Quick Metadata Audit button */}
            <Link
              href="/admin/settings"
              className="w-full min-h-[42px] px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground hover:text-primary text-label-md font-bold flex items-center justify-center gap-2 transition-colors border border-border/50"
            >
              <span>Manage Store Parameters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
