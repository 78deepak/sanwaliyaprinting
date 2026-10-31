import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
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
    <section className="w-full bg-background py-14 sm:py-16 px-4 sm:px-8 lg:px-12" id="wedding-catalog">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-label-sm uppercase tracking-widest text-secondary font-bold mb-1.5">
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
          <Link
            href="/wedding-cards"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-container transition-colors shrink-0 group pb-0.5"
          >
            <span>View All Designs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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
