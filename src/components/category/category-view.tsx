"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Home,
  Package,
} from "lucide-react";
import { Category, Product } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";

interface CategoryViewProps {
  category: Category;
  allCategories: Category[];
  initialProducts: Product[];
}

export function CategoryView({
  category,
  allCategories,
  initialProducts,
}: CategoryViewProps) {
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("popular");

  // Filtering products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      if (selectedPaper) {
        const hasPaper = p.availableOptions.papers?.some((paper) =>
          paper.toLowerCase().includes(selectedPaper.toLowerCase())
        );
        if (!hasPaper) return false;
      }
      if (selectedFinish) {
        const hasFinish = p.availableOptions.finishes?.some((finish) =>
          finish.toLowerCase().includes(selectedFinish.toLowerCase())
        );
        if (!hasFinish) return false;
      }
      return true;
    });
  }, [initialProducts, selectedPaper, selectedFinish]);

  const handleResetFilters = () => {
    setSelectedPaper(null);
    setSelectedFinish(null);
    setSelectedColor(null);
  };

  const hasActiveFilters = Boolean(selectedPaper || selectedFinish || selectedColor);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="w-full flex flex-col pt-16 sm:pt-28">
      {/* Top Archival Notice Ribbon */}
      <section className="w-full bg-surface-high/80 border-b border-border/50 py-2 sm:py-2.5 px-4 sm:px-8 lg:px-12 font-label-sm text-muted-foreground text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
            <span className="tracking-wide">
              शादी निमंत्रण संकलन • 2025 • {filteredProducts.length} राजसी डिज़ाइन
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-primary font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary" /> 100% Acid-Free Cotton Rag
            </span>
            <span className="text-border">/</span>
            <span className="text-secondary font-medium">Standard Atelier Lead Time: 12-16 Days</span>
          </div>
        </div>
      </section>

      {/* Sticky Horizontal Scrollable Category Filter Pills matching Stitch Screen 2 */}
      <section className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md py-2.5 px-4 border-b border-border/50 shadow-xs lg:hidden">
        <div className="flex gap-2 overflow-x-auto scrollbar-none items-center">
          <button
            type="button"
            onClick={() => handleResetFilters()}
            className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              !hasActiveFilters
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-surface-container text-foreground hover:bg-surface-high"
            }`}
          >
            <span>सभी ({initialProducts.length})</span>
          </button>
          {allCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                c.slug === category.slug
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-surface-container text-foreground hover:bg-surface-high"
              }`}
            >
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Mobile Quick Filter & Sort Bar matching Stitch Screen 2 */}
      <section className="px-4 pt-3 pb-2 flex items-center justify-between gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex-1 h-9 px-3 rounded-lg bg-surface-container text-foreground flex items-center justify-between border border-border/60 text-xs font-semibold shadow-2xs"
        >
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
            <span>फ़िल्टर</span>
            {hasActiveFilters && (
              <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                {[selectedPaper, selectedFinish].filter(Boolean).length}
              </span>
            )}
          </div>
          <span className="text-[11px] text-muted-foreground truncate max-w-[90px]">
            {selectedPaper || selectedFinish || "All Filters"}
          </span>
        </button>

        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-2.5 rounded-lg bg-surface-container text-foreground border border-border/60 text-xs font-medium outline-none cursor-pointer"
          >
            <option value="popular">क्रम: लोकप्रिय</option>
            <option value="featured">नवीनतम 2025</option>
            <option value="name">नाम अनुसार</option>
          </select>
        </div>
      </section>

      {/* Mobile Active Filter Chips */}
      {hasActiveFilters && (
        <section className="px-4 pb-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none lg:hidden">
          <span className="text-[11px] text-muted-foreground shrink-0 font-devanagari">चयन:</span>
          {selectedPaper && (
            <button
              onClick={() => setSelectedPaper(null)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-foreground text-[11px] border border-border/50 shrink-0 font-medium"
            >
              <span>{selectedPaper}</span>
              <span className="text-muted-foreground">×</span>
            </button>
          )}
          {selectedFinish && (
            <button
              onClick={() => setSelectedFinish(null)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-foreground text-[11px] border border-border/50 shrink-0 font-medium"
            >
              <span>{selectedFinish}</span>
              <span className="text-muted-foreground">×</span>
            </button>
          )}
          <button
            onClick={handleResetFilters}
            className="text-[11px] text-destructive hover:underline shrink-0 ml-1"
          >
            Clear
          </button>
        </section>
      )}

      {/* Mobile Collapsible Filter Drawer / Accordion */}
      {mobileFilterOpen && (
        <div className="mx-4 mb-3 p-4 rounded-xl bg-card border border-border shadow-md lg:hidden space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Filter By Substrate & Technique
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="text-xs font-bold text-primary"
            >
              Apply ✓
            </button>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold text-foreground">Paper Weight</span>
            <div className="flex flex-wrap gap-1.5">
              {["300 GSM Cotton", "600 GSM Cotton Rag", "Dutch Velvet Mount", "Tussar Raw Silk"].map((paper) => {
                const isSelected = selectedPaper === paper;
                return (
                  <button
                    key={paper}
                    type="button"
                    onClick={() => setSelectedPaper(isSelected ? null : paper)}
                    className={`px-2.5 py-1 rounded-full text-[11px] border transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary font-bold"
                        : "bg-surface-container text-foreground border-border/60"
                    }`}
                  >
                    {paper}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-border/40">
            <span className="text-xs font-semibold text-foreground">Technique</span>
            <div className="flex flex-wrap gap-1.5">
              {["Gold Foil Stamping", "Letterpress Deboss", "Laser Cut Jali", "Screen Metallic"].map((finish) => {
                const isSelected = selectedFinish === finish;
                return (
                  <button
                    key={finish}
                    type="button"
                    onClick={() => setSelectedFinish(isSelected ? null : finish)}
                    className={`px-2.5 py-1 rounded-full text-[11px] border transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary font-bold"
                        : "bg-surface-container text-foreground border-border/60"
                    }`}
                  >
                    {finish}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Editorial Category Header Section (hidden on small screens to prioritize products) */}
      <section className="hidden sm:block w-full bg-surface py-8 sm:py-10 px-4 sm:px-8 lg:px-12 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-muted-foreground text-xs sm:text-sm">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span>Catalogue</span>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-primary font-bold">{category.name}</span>
          </nav>

          {/* Main Headline Block with Asymmetric Foil Plate Badge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-surface-container text-secondary font-label-sm rounded-full uppercase tracking-widest text-xs">
                  Monograph Series RM-{category.slug.slice(0, 3).toUpperCase()}25
                </span>
                <span className="font-label-sm text-muted-foreground/70 uppercase tracking-widest text-xs">
                  Suwasra Atelier Specimen
                </span>
              </div>
              <h1 className="font-display-lg text-2xl sm:text-4xl text-primary tracking-tight">
                {category.name} <span className="italic font-normal text-secondary">&amp; Royal Stationery</span>
              </h1>
              {/* Bilingual Specimen Ribbon */}
              <div className="flex items-center gap-3 py-1">
                <span className="w-8 h-px bg-secondary/50" />
                <span className="font-headline-sm text-secondary font-devanagari font-medium tracking-normal text-sm sm:text-base">
                  {category.nameHi}
                </span>
                <span className="text-border font-label-sm uppercase tracking-wider text-xs">
                  • Handcrafted Heirloom Sets
                </span>
              </div>
              <p className="font-body-lg text-xs sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                {category.description} Handcrafted with certified archival handmade paper, imported Dutch velvet, and hand-pressed 24k gold foil. Each invitation suite includes matching ceremony cards and shagun lifafas.
              </p>
            </div>

            {/* Micro Atelier Stats Panel */}
            <div className="lg:col-span-4 bg-surface-low p-6 rounded-xl border border-border/70 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-label-sm uppercase tracking-wider text-secondary text-xs">
                  Atelier Capacity
                </span>
                <span className="font-label-sm px-2.5 py-0.5 rounded-full bg-surface-lowest text-primary border border-border/40 text-xs">
                  Accepting Orders
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 rounded-lg bg-surface-lowest border border-border/40">
                  <div className="font-display-md text-primary text-xl font-bold">{category.itemCount.split(" ")[0]}</div>
                  <div className="font-label-sm text-muted-foreground text-[10px]">Archived</div>
                </div>
                <div className="p-2 rounded-lg bg-surface-lowest border border-border/40">
                  <div className="font-display-md text-secondary text-xl font-bold">30+</div>
                  <div className="font-label-sm text-muted-foreground text-[10px]">Specialty Foils</div>
                </div>
                <div className="p-2 rounded-lg bg-surface-lowest border border-border/40">
                  <div className="font-display-md text-tertiary text-xl font-bold">800</div>
                  <div className="font-label-sm text-muted-foreground text-[10px]">Max GSM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {allCategories.map((cat) => {
              const isActive = cat.slug === category.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className={`px-4 py-2 rounded-full font-label-md text-xs sm:text-sm whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-surface-container text-foreground hover:bg-surface-high border border-border/50"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Filter Sidebar + Products Grid */}
      <section className="w-full bg-background py-6 sm:py-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filter Sidebar (Desktop 3 cols, hidden on mobile) */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-28 bg-card p-6 rounded-xl border border-border/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <div className="flex items-center gap-2 font-headline-sm text-primary">
                <SlidersHorizontal className="w-4 h-4 text-secondary" />
                <span>Atelier Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-1 underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset All
                </button>
              )}
            </div>

            {/* Paper Weights Filter */}
            <div className="flex flex-col gap-3">
              <span className="font-label-lg text-foreground font-semibold tracking-wide">
                Paper Weight &amp; Texture
              </span>
              <div className="flex flex-col gap-2 font-body-sm text-muted-foreground">
                {[
                  "300 GSM Cotton",
                  "600 GSM Cotton Rag",
                  "Dutch Velvet Mount",
                  "Tussar Raw Silk",
                ].map((paper) => {
                  const isChecked = selectedPaper === paper;
                  return (
                    <label
                      key={paper}
                      className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          setSelectedPaper(isChecked ? null : paper)
                        }
                        className="w-4 h-4 rounded text-primary focus:ring-secondary accent-primary"
                      />
                      <span>{paper}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Printing Technique Filter */}
            <div className="flex flex-col gap-3 pt-3 border-t border-border/40">
              <span className="font-label-lg text-foreground font-semibold tracking-wide">
                Printing Technique
              </span>
              <div className="flex flex-col gap-2 font-body-sm text-muted-foreground">
                {[
                  "Gold Foil Stamping",
                  "Letterpress Deboss",
                  "Laser Cut Jali",
                  "Screen Metallic",
                ].map((finish) => {
                  const isChecked = selectedFinish === finish;
                  return (
                    <label
                      key={finish}
                      className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          setSelectedFinish(isChecked ? null : finish)
                        }
                        className="w-4 h-4 rounded text-primary focus:ring-secondary accent-primary"
                      />
                      <span>{finish}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Swatch Kit Callout in Sidebar */}
            <div className="p-4 rounded-xl bg-surface-high/70 border border-border/70 space-y-2">
              <div className="flex items-center gap-2 font-label-lg text-primary font-bold">
                <Package className="w-4 h-4 text-secondary" />
                <span>Request Swatch Book</span>
              </div>
              <p className="font-body-sm text-muted-foreground leading-relaxed">
                Touch 12 curated paper samples, foil swatches, and wax seals delivered to your doorstep.
              </p>
              <a
                href="#swatch-kit"
                className="inline-flex items-center justify-center py-2 px-3 bg-surface-lowest text-primary rounded font-label-sm font-semibold hover:bg-surface-container transition-colors shadow-2xs border border-border/50"
              >
                Order ₹0 Sample Kit
              </a>
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* Top Sort / Counter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border/80 shadow-xs">
              <div className="font-body-sm text-muted-foreground">
                Showing{" "}
                <span className="font-bold text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                of {category.itemCount}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-label-md text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-low border border-border/70 px-3 py-1.5 rounded-lg font-label-md text-foreground outline-none cursor-pointer"
                >
                  <option value="popular">Most Popular • सर्वाधिक लोकप्रिय</option>
                  <option value="featured">Newly Added 2025</option>
                  <option value="name">Traditional Classics</option>
                </select>
              </div>
            </div>

            {/* 2-Column Responsive Product Cards Grid matching Stitch Screen 2 */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-card rounded-xl border border-border p-8 space-y-3">
                <p className="font-headline-sm text-foreground">
                  No designs matched your active filters.
                </p>
                <p className="font-body-sm text-muted-foreground">
                  Try clearing your paper or technique filters to view all available stationery.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-label-md font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
