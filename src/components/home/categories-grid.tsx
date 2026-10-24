import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { categories } from "@/data/categories";

export function CategoriesGrid() {
  return (
    <section className="w-full bg-surface-low py-16 px-4 sm:px-8 lg:px-12 border-y border-border/60">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-label-sm uppercase tracking-widest text-secondary font-bold mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Artisan Catalogue • मुद्रण संकलन</span>
            </div>
            <h2 className="font-headline-lg text-primary font-medium">
              Popular Print Categories
            </h2>
          </div>
          <p className="font-body-md text-muted-foreground max-w-md leading-relaxed">
            Explore our signature press styles. Every category is custom crafted to your exact specifications, quantities, and language requirements.
          </p>
        </div>

        {/* Grid of 6 Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group flex flex-col rounded-xl bg-card p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/70"
            >
              {/* Category Thumbnail */}
              <div className="relative mb-5 h-48 w-full overflow-hidden rounded-lg bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.featuredImage}
                  alt={cat.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 rounded-md bg-primary/95 text-primary-foreground font-label-sm text-[10px] px-2.5 py-1">
                  Popular • लोकप्रिय
                </span>
              </div>

              {/* Title & Hindi Subtitle */}
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-headline-sm text-foreground font-semibold group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="font-headline-sm text-secondary font-medium font-devanagari text-base shrink-0">
                  {cat.nameHi}
                </span>
              </div>

              {/* Description */}
              <p className="font-body-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {cat.description}
              </p>

              {/* Footer link & count */}
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50 text-primary font-label-sm">
                <span>Browse {cat.itemCount}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
