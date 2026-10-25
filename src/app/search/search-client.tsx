"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, Home, ChevronRight, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";

interface SearchClientProps {
  initialProducts: Product[];
  initialQuery?: string;
}

export function SearchClient({ initialProducts, initialQuery = "" }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery);

  const fuse = useMemo(() => {
    return new Fuse(initialProducts, {
      keys: [
        { name: "name", weight: 0.35 },
        { name: "nameHi", weight: 0.35 },
        { name: "productCode", weight: 0.3 },
        { name: "searchAliases", weight: 0.25 },
        { name: "shortDescription", weight: 0.15 },
        { name: "tags", weight: 0.1 },
      ],
      threshold: 0.35,
    });
  }, [initialProducts]);

  const results = useMemo(() => {
    if (!query.trim()) return initialProducts;
    return fuse.search(query.trim()).map((res) => res.item);
  }, [query, fuse, initialProducts]);

  return (
    <div className="w-full flex flex-col pt-24 sm:pt-28">
      {/* Top Banner */}
      <section className="w-full bg-surface-low border-b border-border/60 py-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-primary font-bold">Search Catalogue</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Search Printing Catalogue
          </h1>

          <div className="relative w-full max-w-2xl bg-card rounded-2xl border border-border shadow-xs overflow-hidden flex items-center px-4 py-3">
            <Search className="w-5 h-5 text-secondary mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers, velvet boxes, bill books, visiting cards (e.g. RM-W-101, शादी)..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary" /> Suggestions:
            </span>
            {["RM-W-101", "Velvet Box", "Farman Scroll", "Visiting Cards", "Bill Book", "शगुन लिफाफे"].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-1 rounded-lg bg-surface-lowest text-[11px] font-medium text-foreground hover:bg-surface-container border border-border/50"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-12">
        <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Found <strong className="text-foreground">{results.length}</strong> design specimens
          </span>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-primary hover:underline font-semibold"
            >
              Clear Search
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border border-border p-8 space-y-3">
            <p className="font-serif text-lg font-bold text-foreground">
              No designs found matching &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground">
              Try searching with general terms like &quot;wedding&quot;, &quot;cotton&quot;, &quot;card&quot;, or browse our categories.
            </p>
            <Link
              href="/wedding-cards"
              className="inline-block px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs"
            >
              Browse Wedding Catalogue
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
