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
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  FolderTree,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getDashboardStats, getAdminProducts } from "@/lib/products";
import { getSiteSettingsAction } from "@/app/admin/actions";
import { categories } from "@/data/categories";
import { AdminProduct } from "@/data/admin-mock";
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
    <div className="flex flex-col w-full gap-7">
      {/* Four Operational Metric Cards */}

      {/* 2. Four Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Designs"
          value={String(total).padStart(2, "0")}
          total="products"
          description="Total items in Sanwaliya catalogue"
          icon={Package}
          accentColor="primary"
        />

        <StatCard
          title="Live Published"
          value={String(published).padStart(2, "0")}
          total={`/ ${total} active`}
          description="Visible to customers on the website"
          icon={CheckCircle2}
          accentColor="tertiary"
          badge={{ text: "Live", variant: "success" }}
        />

        <StatCard
          title="Draft / Review"
          value={String(drafts).padStart(2, "0")}
          total="pending"
          description="Draft items requiring photos or pricing"
          icon={Clock}
          accentColor="secondary"
          badge={drafts > 0 ? { text: "Action Needed", variant: "warning" } : undefined}
        />

        <StatCard
          title="Featured on Home"
          value={String(featured).padStart(2, "0")}
          total="showcased"
          description="Highlighted on main website banner"
          icon={Star}
          accentColor="secondary"
          badge={{ text: "Hero Spot", variant: "warning" }}
        />
      </div>

      {/* 3. Main Two-Column Content: Left = Recent Products, Right = Category Inventory & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column: Recently Updated Designs (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-surface-lowest rounded-xl border border-border shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-headline-sm text-base md:text-lg text-primary font-bold">
                  Recently Updated Designs
                </h2>
                <p className="text-body-sm text-muted-foreground text-xs">
                  Latest items added or modified in the catalogue
                </p>
              </div>
            </div>

            <Link
              href="/admin/products"
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground hover:text-primary text-xs font-semibold transition-colors"
            >
              Manage All ({total})
            </Link>
          </div>

          {/* Product List Stack */}
          <div className="bg-surface-lowest rounded-xl border border-border shadow-xs overflow-hidden flex flex-col divide-y divide-border/60">
            {products.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-muted-foreground">
                  <Package className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-foreground">No products in catalogue yet</div>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Add your first wedding card, visiting card, or flex design to start building your online catalogue.
                </p>
                <Link
                  href="/admin/products/new"
                  className="mt-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors"
                >
                  + Add First Product
                </Link>
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
                    className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-surface-container/30 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="relative w-14 h-14 rounded-lg bg-surface-container shrink-0 overflow-hidden border border-border/80">
                        <Image
                          src={heroImage.url}
                          alt={heroImage.alt}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold capitalize">
                            {product.category.replace(/-/g, " ")}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container font-mono text-muted-foreground text-[11px] font-semibold">
                            SKU: {product.productCode}
                          </span>
                          <StatusBadge status={product.status} />
                        </div>

                        <h3 className="font-headline-sm text-sm md:text-base text-foreground font-bold truncate mt-1">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-2.5 text-xs text-muted-foreground mt-0.5 flex-wrap">
                          {product.price.show && product.price.startingFrom ? (
                            <span className="text-xs text-primary font-bold">
                              ₹{product.price.startingFrom.toLocaleString("en-IN")}{" "}
                              {product.price.maxPrice
                                ? `– ₹${product.price.maxPrice.toLocaleString("en-IN")}`
                                : ""}{" "}
                              / {product.price.unit || "piece"}
                            </span>
                          ) : (
                            <span className="text-xs text-secondary font-bold">
                              Custom Quote
                            </span>
                          )}
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-muted-foreground/70" />
                            <span>
                              {product.createdAt
                                ? new Date(product.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                })
                                : "Recent"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="h-8 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>

                      <Link
                        href={`/${product.category}/${product.slug}`}
                        target="_blank"
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                        title="Preview Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer action below table */}
          <div className="p-3.5 rounded-xl bg-surface-lowest border border-border flex items-center justify-between shadow-xs">
            <span className="text-xs text-muted-foreground">
              Showing latest {products.length} of {total} printing suites
            </span>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              <span>Go to complete catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Live Category Distribution & Store Parameters (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Card 1: Live Catalogue Breakdown by Category (Interactive Quick Filters) */}
          <div className="p-5 rounded-xl bg-surface-lowest border border-border shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <FolderTree className="w-4 h-4" />
                </div>
                <h2 className="font-headline-sm text-sm md:text-base text-primary font-bold">
                  Categories Overview
                </h2>
              </div>
              <span className="text-xs text-muted-foreground font-semibold">
                {categories.length} Sections
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => {
                const count = stats.categoryCounts?.[cat.slug] || 0;
                const percent = total > 0 ? Math.round((count / total) * 100) : 0;

                return (
                  <Link
                    key={cat.slug}
                    href={`/admin/products?category=${cat.slug}`}
                    className="p-2.5 rounded-lg bg-surface-container/50 hover:bg-surface-container flex flex-col gap-1.5 transition-colors group border border-border/40"
                    title={`Click to view all ${cat.name} designs`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cat.name}
                        <span className="font-normal text-muted-foreground ml-1 font-devanagari">
                          ({cat.nameHi})
                        </span>
                      </span>
                      <span className="font-bold text-primary">
                        {count} items
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className="h-full bg-primary/80 group-hover:bg-primary rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/admin/categories"
              className="text-center text-xs font-semibold text-muted-foreground hover:text-primary transition-colors pt-1"
            >
              View Category Taxonomy Architecture →
            </Link>
          </div>

          {/* Card 2: Store Hotline & Quick Settings Access */}
          <div className="p-5 rounded-xl bg-surface-lowest border border-border shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-tertiary/15 text-tertiary flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="font-headline-sm text-sm md:text-base text-foreground font-bold">
                  Store Status
                </h2>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-bold">
                Active
              </span>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 rounded-lg bg-surface-container flex items-start gap-2.5 border border-border/40">
                <PhoneCall className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-foreground">WhatsApp Hotline</span>
                  <span className="text-muted-foreground">+{settings.whatsapp}</span>
                  <span className="text-[11px] text-tertiary font-medium mt-0.5">
                    Customer enquiry button routes here
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center px-1 text-muted-foreground">
                <span>Location:</span>
                <span className="font-semibold text-foreground">Suwasra (Mandsaur), M.P.</span>
              </div>

              <div className="flex justify-between items-center px-1 text-muted-foreground">
                <span>Working Hours:</span>
                <span className="font-semibold text-foreground">{settings.openingHours || "10:00 AM – 8:30 PM"}</span>
              </div>
            </div>

            <Link
              href="/admin/settings"
              className="w-full h-9 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground hover:text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-border/50 mt-1"
            >
              <span>Manage Store & Password Settings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
