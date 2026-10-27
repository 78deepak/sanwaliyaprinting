import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Info } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/types/product";

interface FeaturedSectionProps {
  products?: Product[];
}

export function FeaturedSection({ products = [] }: FeaturedSectionProps) {
  const featuredWeddingCards = products
    .filter((p) => p.category === "wedding-cards")
    .slice(0, 4);

  // If wedding cards category not in slice, use top featured products
  const displayProducts = featuredWeddingCards.length > 0 ? featuredWeddingCards : products.slice(0, 4);

  return (
    <section className="w-full bg-background py-16 px-4 sm:px-8 lg:px-12" id="wedding-catalog">
      <div className="mx-auto max-w-7xl">
        {/* Section Header & Notice Banner */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-label-sm uppercase tracking-widest text-secondary font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Regal Nuptials • शाही विवाह संकलन</span>
            </div>
            <h2 className="font-headline-lg text-primary font-medium">
              Featured Wedding Invitation Suites
            </h2>
            <p className="font-body-md text-muted-foreground max-w-2xl mt-1">
              Carefully curated masterworks combining time-honored Indian ornamentation with modern European letterpress artistry.
            </p>
          </div>

          {/* Distinct Atelier Notice Banner */}
          <div className="flex items-center gap-3 rounded-xl bg-surface-container p-4 shadow-xs max-w-lg border border-border/50">
            <Info className="w-6 h-6 text-secondary shrink-0" />
            <p className="font-body-sm text-muted-foreground">
              <strong className="text-primary font-semibold">No Cart or Rigid Checkout:</strong> Every order is tailored to your exact guest count, paper GSM, and custom bilingual script proofs on WhatsApp.
            </p>
          </div>
        </div>

        {/* 4-Item Responsive Product Grid: 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Link to Full Catalog */}
        <div className="mt-8 text-center">
          <Link
            href="/wedding-cards"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container transition-colors group"
          >
            <span>Browse All Wedding Designs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
