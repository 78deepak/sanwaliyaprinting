import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  Package,
  Star,
  Edit3,
  Eye,
  Store,
  ArrowRight,
  Layers,
  PlusCircle,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getDashboardStats, getAdminProducts } from "@/lib/products";
import { getSiteSettingsAction } from "@/app/admin/actions";
import { categories } from "@/data/categories";
import { adminMetrics, AdminProduct } from "@/data/admin-mock";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [stats, recentResult, settings] = await Promise.all([
    getDashboardStats(),
    getAdminProducts({ limit: 5, sort: "newest" }),
    getSiteSettingsAction(),
  ]);

  const products: AdminProduct[] = recentResult.items.map((p) => {
    const raw = p as unknown as Record<string, unknown>;
    return {
      ...p,
      featured: Boolean(p.featured),
      status: p.published ? "published" : "draft",
      createdAt: p.createdAt || new Date().toISOString(),
      updatedAt: String(raw.updatedAt || p.createdAt || new Date().toISOString()),
      inquiriesCount: Number(raw.inquiriesCount) || 0,
    };
  });

  const total = stats.totalProducts;
  const published = stats.publishedCount;
  const drafts = stats.draftCount;
  const featured = stats.featuredCount;

  return (
    <div className="flex flex-col w-full gap-5 sm:gap-6">
      {/* Top Welcome & Atelier Status Banner */}
      <div className="relative overflow-hidden rounded-xl bg-surface-lowest border border-border p-4 sm:p-5 md:p-6 shadow-xs">
        {/* Ambient glow backgrounds matching Stitch screen */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-gradient-to-br from-secondary/15 via-primary/5 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-primary/5 blur-xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 z-10">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[11px] font-bold uppercase tracking-wider border border-secondary/30">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                {adminMetrics.atelierStatus}
              </span>
              <span className="text-[12px] text-muted-foreground font-medium">
                {adminMetrics.branch}
              </span>
            </div>

            <h1 className="font-headline-lg text-xl md:text-2xl text-primary font-bold tracking-tight">
              Namaste {settings.ownerName ? settings.ownerName.replace(/\s*\(Owner\)/i, "").trim() : "Ramesh ji"}{" "}
              <span className="font-headline-md text-lg md:text-xl font-normal text-muted-foreground ml-1">
                (दुकानदार डैशबोर्ड)
              </span>
            </h1>

            {/* <p className="text-body-sm text-muted-foreground leading-relaxed">
              Here is what&apos;s happening in your Suwasra printing catalogue and production desk today. {published} live client-facing suites are synchronized with MongoDB Atlas.
            </p> */}
          </div>

          {/* Sync Status Badge Widget */}
          <div className="flex items-center gap-3 self-start lg:self-auto bg-surface-container p-2.5 px-3 rounded-xl border border-border/50 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-surface-lowest flex items-center justify-center text-secondary shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-muted-foreground font-semibold">
                Sync Status
              </span>
              <span className="text-label-sm text-foreground font-bold flex items-center gap-1.5">
                Atlas Connected
                <span className="w-2 h-2 rounded-full bg-tertiary inline-block animate-pulse" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Impact Metrical Cards (Small & Readable) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5">
        <StatCard
          title="Total Designs"
          value={String(total).padStart(2, "0")}
          total="in catalog"
          description="Master printing suites"
          icon={Package}
          accentColor="primary"
          badge={{ text: "Catalogue", variant: "primary" }}
          href="/admin/products"
        />

        <StatCard
          title="Live Published"
          value={String(published).padStart(2, "0")}
          total={`/ ${total} items`}
          description="Live on public website"
          icon={CheckCircle2}
          accentColor="tertiary"
          badge={{ text: "Public", variant: "success" }}
          href="/admin/products"
        />

        <StatCard
          title="Draft / Review"
          value={String(drafts).padStart(2, "0")}
          total="pending"
          description="Draft items requiring photos or pricing"
          icon={Clock}
          accentColor="secondary"
          badge={{
            text: drafts > 0 ? "Action Needed" : "All Good",
            variant: drafts > 0 ? "warning" : "neutral",
          }}
          href="/admin/products"
        />

        <StatCard
          title="Categories"
          value={String(categories.length).padStart(2, "0")}
          total="sections"
          description="Managed in master index"
          icon={Layers}
          accentColor="neutral"
          badge={{ text: "Route Fixed", variant: "neutral" }}
        />

        <StatCard
          title="Featured on Home"
          value={String(featured).padStart(2, "0")}
          total="showcased"
          description="Top homepage banner carousel"
          icon={Star}
          accentColor="secondary"
          badge={{ text: "Hero Spot", variant: "warning" }}
          href="/admin/products"
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {/* Primary Quick Actions Bar (Single-Line Compact Action Toolbar) */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-surface-container-high border border-border shadow-xs">
        <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar flex-nowrap">
          {/* Left: Desk Actions Label */}
          <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <span className="font-headline-sm text-sm sm:text-base text-primary font-bold whitespace-nowrap">
              Desk Actions
            </span>
          </div>

          {/* Right: Quick Action Buttons in a Single Clean Line */}
          <div className="flex items-center gap-2 shrink-0 flex-nowrap">
            {/* + Add Product */}
            <Link
              href="/admin/products/new"
              className="h-8.5 sm:h-9 px-3 rounded-lg bg-primary hover:bg-primary-container text-white text-xs sm:text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 shrink-0" />
              <span>+ Add Product</span>
            </Link>

            {/* Manage All Products */}
            <Link
              href="/admin/products"
              className="h-8.5 sm:h-9 px-3 rounded-lg bg-surface-lowest hover:bg-surface-container border border-border text-primary text-xs sm:text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <Package className="w-3.5 h-3.5 shrink-0" />
              <span>Manage Products ({total})</span>
            </Link>

            {/* View Website */}
            <Link
              href="/"
              target="_blank"
              className="h-8.5 sm:h-9 px-3 rounded-lg bg-surface-lowest hover:bg-surface-container border border-border text-foreground hover:text-primary text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>View Website</span>
            </Link>

            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8.5 sm:h-9 px-3 rounded-lg bg-tertiary hover:bg-tertiary/90 text-white text-xs sm:text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp Link</span>
            </a>
          </div>
        </div>
      </div>

      {/* Recently Updated Designs (Full-Width Clean Layout) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-3.5 sm:p-4 bg-surface-lowest rounded-xl border border-border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Package className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="font-headline-sm text-base sm:text-lg text-primary font-bold">
                Recently Updated Designs
              </h2>
              <p className="text-body-sm text-muted-foreground hidden sm:block">
                Wedding collections, visiting cards, flex banners, and custom prints
              </p>
            </div>
          </div>

          <Link
            href="/admin/products"
            className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground hover:text-primary text-label-sm font-semibold transition-colors shrink-0"
          >
            All Products ({total})
          </Link>
        </div>

        {/* Product List Stack */}
        <div className="bg-surface-lowest rounded-xl border border-border shadow-xs overflow-hidden flex flex-col divide-y divide-border/60">
          {products.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No items found in database catalogue. Add your first design above!
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
                            / {product.price.unit || "piece"}
                          </span>
                        ) : (
                          <span className="text-label-md text-secondary font-bold">
                            Custom Quote
                          </span>
                        )}
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[13px]">
                          <Clock className="w-3.5 h-3.5" />
                          SKU: {product.productCode}
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
                      href={`/${product.category}/${product.slug}`}
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
        <div className="p-3.5 sm:p-4 rounded-xl bg-surface-lowest border border-border flex items-center justify-between shadow-xs">
          <span className="text-body-sm text-muted-foreground">
            Showing latest {products.length} of {total} printing suites
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
    </div>
  );
}
