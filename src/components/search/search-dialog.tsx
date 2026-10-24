"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  // Fuse instance over products and categories
  const fuse = useMemo(() => {
    const searchableItems = [
      ...products.map((p) => ({
        type: "product" as const,
        id: p.id,
        title: p.name,
        titleHi: p.nameHi,
        code: p.productCode,
        category: p.category,
        url: `/${p.category}/${p.slug}`,
        description: p.shortDescription,
        tags: p.tags.join(" "),
        aliases: p.searchAliases.join(" "),
        image: p.images[0]?.url,
      })),
      ...categories.map((c) => ({
        type: "category" as const,
        id: c.slug,
        title: c.name,
        titleHi: c.nameHi,
        code: c.slug,
        category: c.slug,
        url: `/${c.slug}`,
        description: c.description,
        tags: "",
        aliases: c.nameHi,
        image: c.featuredImage,
      })),
    ];

    return new Fuse(searchableItems, {
      keys: [
        { name: "title", weight: 0.35 },
        { name: "titleHi", weight: 0.35 },
        { name: "code", weight: 0.3 },
        { name: "aliases", weight: 0.25 },
        { name: "description", weight: 0.1 },
        { name: "tags", weight: 0.1 },
      ],
      threshold: 0.35,
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query.trim()).map((res) => res.item).slice(0, 8);
  }, [query, fuse]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Toggle search
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-md">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-surface-lowest rounded-2xl shadow-2xl border border-border overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border/70 bg-surface-low">
          <Search className="w-5 h-5 text-secondary shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, cards, codes (e.g. RM-W-101, शादी कार्ड)..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
            autoFocus
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 hover:bg-surface-container rounded-md text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-muted-foreground bg-surface-container rounded border border-border">
              ESC
            </kbd>
          )}
        </div>

        {/* Results / Quick Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === "" ? (
            <div className="space-y-4 py-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "RM-W-101",
                  "Rajwada Velvet Box",
                  "Farman Scroll",
                  "Visiting Cards 800 GSM",
                  "Bill Book",
                  "विवाह पत्रिका",
                  "शगुन लिफाफे",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg bg-surface-low hover:bg-surface-container text-xs font-medium text-foreground transition-colors border border-border/50"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1">
                Matching Designs & Collections ({results.length})
              </div>
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-low transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-border/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      {item.titleHi && (
                        <span className="text-xs text-secondary font-devanagari shrink-0">
                          {item.titleHi}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="px-1.5 py-0.2 rounded bg-surface-container text-primary font-mono font-medium">
                        {item.code}
                      </span>
                      <span className="truncate">{item.description}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-sm">No matches found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-secondary">
                Try searching for &quot;Wedding&quot;, &quot;Velvet&quot;, &quot;Visiting Card&quot; or &quot;शादी&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
