import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { categories } from "@/data/categories";

interface CategoriesGridProps {
  categoryCounts?: Record<string, number>;
}

export function CategoriesGrid({ categoryCounts }: CategoriesGridProps) {
  return (
    <section className="w-full bg-surface-low py-10 sm:py-16 px-4 sm:px-8 lg:px-12 border-y border-border/60" id="categories">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-6 sm:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 font-label-sm uppercase tracking-widest text-secondary font-bold mb-1 sm:mb-2 text-xs">
              <BookOpen className="w-4 h-4" />
              <span>Artisan Catalogue • मुद्रण संकलन</span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-medium">
              Popular Print Categories
            </h2>
          </div>
          <p className="font-body-md text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed hidden sm:block">
            Explore our signature press styles. Every category is custom crafted to your exact specifications, quantities, and language requirements.
          </p>
        </div>

        {/* Responsive Grid: 2 columns on mobile matching Stitch, 2-3 on tablet/desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group flex flex-col rounded-xl bg-card p-3 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/70 justify-between"
            >
              <div>
                {/* Category Thumbnail */}
                <div className="relative mb-2.5 sm:mb-5 h-24 sm:h-48 w-full overflow-hidden rounded-lg bg-surface-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.featuredImage}
                    alt={cat.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-1.5 right-1.5 sm:bottom-3 sm:left-3 sm:top-auto sm:right-auto rounded-md bg-primary/95 text-primary-foreground font-label-sm text-[9px] sm:text-[10px] px-1.5 sm:px-2.5 py-0.5 sm:py-1 font-bold">
                    {cat.itemCount.includes("+") ? cat.itemCount : `${cat.itemCount} DESIGNS`}
                  </span>
                </div>

                {/* Title & Hindi Subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                  <h3 className="font-headline-sm text-sm sm:text-lg text-foreground font-semibold group-hover:text-primary transition-colors truncate">
                    {cat.name}
                  </h3>
                  <span className="font-headline-sm text-secondary font-medium font-devanagari text-xs sm:text-base truncate block sm:inline mt-0.5 sm:mt-0">
                    {cat.nameHi}
                  </span>
                </div>

                {/* Description (desktop) */}
                <p className="hidden sm:block font-body-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* Footer link & count */}
              <div className="mt-2 sm:mt-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50 text-primary font-label-sm text-[11px] sm:text-xs">
                <span className="truncate">
                  {categoryCounts && typeof categoryCounts[cat.slug] === "number"
                    ? `${categoryCounts[cat.slug]} Design${categoryCounts[cat.slug] === 1 ? "" : "s"}`
                    : `Browse ${cat.itemCount}`}
                </span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
