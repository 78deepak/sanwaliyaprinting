"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Home,
  ChevronRight,
  Share2,
  Check,
  Store,
  Percent,
  Maximize2,
  Palette,
  Sparkles,
  Languages,
  Package,
} from "lucide-react";
import { Product } from "@/types/product";
import { ProductGallery } from "./product-gallery";
import { ProductCard } from "./product-card";
import { useSelection } from "@/context/selection-context";
import { buildProductEnquiryUrl } from "@/lib/whatsapp";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { hasItem, addItem } = useSelection();
  const isShortlisted = hasItem(product.id);

  // Customizer state
  const [selectedSize, setSelectedSize] = useState(
    product.availableOptions.sizes?.[0] || 'Royal Grand (8.5" × 6.5")'
  );
  const [selectedPaper, setSelectedPaper] = useState(
    product.availableOptions.papers?.[0] || "600 GSM Dutch Velvet Mount"
  );
  const [selectedFinish, setSelectedFinish] = useState(
    product.availableOptions.finishes?.[0] || "Antique Matte Gold"
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    product.availableOptions.languages?.[0] || "Bilingual (Hindi + English)"
  );
  const [quantity, setQuantity] = useState(product.minimumQuantity || 100);
  const [customNotes, setCustomNotes] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddToShortlist = () => {
    addItem(product, {
      quantity,
      selectedSize,
      selectedPaper,
      selectedFinish,
      selectedLanguage,
      note: customNotes,
    });
  };

  const whatsappUrl = buildProductEnquiryUrl({
    product,
    quantity,
    selectedSize,
    selectedPaper,
    selectedFinish,
    selectedLanguage,
    customizationNotes: customNotes,
    currentUrl: typeof window !== "undefined" ? window.location.href : undefined,
  });

  return (
    <div className="w-full flex flex-col pt-24 sm:pt-28">
      {/* Top Breadcrumb & Archival Reference Strip */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-4 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Atelier Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <Link href={`/${product.category}`} className="hover:text-primary transition-colors capitalize">
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-primary font-bold line-clamp-1">{product.name}</span>
          </nav>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-high font-label-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>Suwasra Studio Archival Specimen</span>
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-low transition-colors"
              title="Share Collection Link"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-tertiary" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Product Detail Workspace: 12-Column Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column: Gallery & Tactile Presentation (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:sticky lg:top-32">
            <ProductGallery
              images={product.images}
              productCode={product.productCode}
              productName={product.name}
            />
          </div>

          {/* Right Column: Bespoke Customizer & Order Suite (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header & Typography Ribbon */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="font-label-sm uppercase tracking-widest text-secondary font-bold">
                  Heritage Farman Collection
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="inline-flex items-center gap-1 font-label-sm text-tertiary">
                  <Store className="w-3.5 h-3.5" />
                  <span>In Suwasra Showroom</span>
                </span>
              </div>
              <h1 className="font-headline-lg text-primary tracking-tight font-bold">
                {product.name}
              </h1>
              {product.nameHi && (
                <div className="font-headline-sm text-secondary italic font-devanagari">
                  {product.nameHi}
                </div>
              )}
              <p className="font-body-md text-muted-foreground pt-1 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tiered Pricing & Turnaround Strip */}
            <div className="p-4 rounded-xl bg-surface-high/70 flex items-center justify-between gap-4 border border-border/50">
              <div>
                <div className="font-label-sm text-muted-foreground uppercase tracking-wider">
                  Estimated Atelier Rate
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-headline-md text-primary font-bold">
                    {product.price.show && product.price.startingFrom
                      ? `₹${product.price.startingFrom} – ₹${product.price.startingFrom + 350}`
                      : "Price on Request"}
                  </span>
                  <span className="font-body-sm text-muted-foreground">
                    / {product.price.unit || "complete suite"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-md bg-surface-lowest font-label-sm text-secondary font-semibold shadow-2xs border border-border/40">
                  Hand-Cooled Foil
                </span>
                <div className="font-label-sm text-muted-foreground mt-1">
                  7-10 Days Production
                </div>
              </div>
            </div>

            {/* Customizer Controls */}
            <div className="space-y-6">
              {/* 1. Box Dimension & Silhouette Selector */}
              {product.availableOptions.sizes && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-lg text-foreground font-semibold flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-secondary" />
                      <span>Box Dimension &amp; Silhouette</span>
                    </label>
                    <span className="font-label-sm text-primary font-bold">
                      {selectedSize}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {product.availableOptions.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`text-left p-3 rounded-lg transition-all border ${
                            isSelected
                              ? "bg-surface-lowest shadow-sm shadow-[0_0_0_2px_#5b0617] border-primary font-bold text-primary"
                              : "bg-surface-low hover:bg-surface-container border-border/60 text-foreground"
                          }`}
                        >
                          <div className="font-label-md font-bold">{size.split("(")[0]}</div>
                          <div className="font-body-sm text-muted-foreground font-normal">
                            {size.includes("(") ? `(${size.split("(")[1]}` : ""}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Velvet Fabric Swatch Selector */}
              {product.availableOptions.papers && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-lg text-foreground font-semibold flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-secondary" />
                      <span>Paper &amp; Material Substrate</span>
                    </label>
                    <span className="font-label-sm text-primary font-bold">
                      {selectedPaper}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {product.availableOptions.papers.map((paper) => {
                      const isSelected = selectedPaper === paper;
                      return (
                        <button
                          key={paper}
                          type="button"
                          onClick={() => setSelectedPaper(paper)}
                          className={`p-3 rounded-lg text-left transition-all border ${
                            isSelected
                              ? "bg-surface-lowest shadow-sm shadow-[0_0_0_2px_#5b0617] border-primary font-bold text-primary"
                              : "bg-surface-low hover:bg-surface-container border-border/60 text-foreground"
                          }`}
                        >
                          <div className="font-label-md font-bold truncate">{paper}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Hot Foil Stamping Grade */}
              {product.availableOptions.finishes && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-lg text-foreground font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-secondary" />
                      <span>Foil Inlay Finish</span>
                    </label>
                    <span className="font-label-sm text-primary font-bold">
                      {selectedFinish}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.availableOptions.finishes.map((finish) => {
                      const isSelected = selectedFinish === finish;
                      return (
                        <button
                          key={finish}
                          type="button"
                          onClick={() => setSelectedFinish(finish)}
                          className={`px-3 py-1.5 rounded-full font-label-md transition-all border ${
                            isSelected
                              ? "bg-surface-lowest text-primary font-bold shadow-xs shadow-[0_0_0_1.5px_#5b0617] border-primary"
                              : "bg-surface-low text-foreground hover:bg-surface-container border-border/60"
                          }`}
                        >
                          {finish}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Language & Typography Proofing */}
              {product.availableOptions.languages && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-lg text-foreground font-semibold flex items-center gap-1.5">
                      <Languages className="w-4 h-4 text-secondary" />
                      <span>Typography &amp; Proofing Language</span>
                    </label>
                    <span className="font-label-sm text-primary font-bold">
                      {selectedLanguage}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.availableOptions.languages.map((lang) => {
                      const isSelected = selectedLanguage === lang;
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setSelectedLanguage(lang)}
                          className={`p-2.5 rounded-lg text-left transition-all border ${
                            isSelected
                              ? "bg-surface-lowest text-primary font-bold shadow-xs shadow-[0_0_0_1.5px_#5b0617] border-primary"
                              : "bg-surface-low text-foreground hover:bg-surface-container border-border/60"
                          }`}
                        >
                          <div className="font-label-md font-semibold truncate">{lang}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. Quantity Selector & Tiered Savings Note */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-lg text-foreground font-semibold flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-secondary" />
                    <span>Select Order Quantity</span>
                  </label>
                  <span className="font-label-sm text-secondary font-bold">
                    {product.minimumQuantity || 50} sets minimum
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 150, 250, 500].map((qtyOption) => {
                    const isSelected = quantity === qtyOption;
                    return (
                      <button
                        key={qtyOption}
                        type="button"
                        onClick={() => setQuantity(qtyOption)}
                        className={`px-4 py-2 rounded-lg font-label-md transition-all border ${
                          isSelected
                            ? "bg-surface-lowest text-primary font-bold shadow-xs shadow-[0_0_0_1.5px_#5b0617] border-primary"
                            : "bg-surface-low text-foreground hover:bg-surface-container border-border/60"
                        }`}
                      >
                        {qtyOption}
                      </button>
                    );
                  })}
                </div>
                <div className="p-2.5 rounded-lg bg-surface-low flex items-center gap-2 border border-border/40">
                  <Percent className="w-4 h-4 text-secondary shrink-0" />
                  <p className="font-body-sm text-muted-foreground">
                    Higher quantities enjoy tiered artisan plate casting and raw silk print savings.
                  </p>
                </div>
              </div>

              {/* 6. Personalization Notes */}
              <div className="space-y-1.5">
                <label className="font-label-lg text-foreground font-semibold flex items-center justify-between">
                  <span>Wedding Date, Monogram Initials &amp; Custom Requests</span>
                  <span className="font-body-sm text-muted-foreground font-normal">
                    Optional
                  </span>
                </label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g. Wedding Date: Nov 18, 2026 • Monogram: 'R & P' • Additional Haldi Insert required..."
                  className="w-full rounded-lg bg-surface-low p-3 font-body-md text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-lg bg-tertiary hover:bg-tertiary-hover text-white font-semibold font-label-lg shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Request WhatsApp Quote for this Configuration</span>
                </a>

                <button
                  type="button"
                  onClick={handleAddToShortlist}
                  className={`w-full py-3.5 px-6 rounded-lg font-semibold font-label-md transition-all flex items-center justify-center gap-2 border ${
                    isShortlisted
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-surface-lowest text-foreground hover:bg-surface-low border-border/80"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isShortlisted ? "fill-current" : ""}`} />
                  <span>
                    {isShortlisted
                      ? "Configuration Saved in My Selection"
                      : "Add to My Selection (Shortlist)"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Designs Strip */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border/60 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-sm uppercase tracking-wider text-secondary font-bold">
                  Complementary Creations
                </span>
                <h2 className="font-headline-lg text-primary font-medium mt-1">
                  Similar Designs from the Atelier
                </h2>
              </div>
              <Link
                href={`/${product.category}`}
                className="font-label-md text-primary hover:underline font-semibold"
              >
                View Category →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
