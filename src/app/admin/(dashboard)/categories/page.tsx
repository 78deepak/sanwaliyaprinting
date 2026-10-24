import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Lock,
  Code,
} from "lucide-react";
import { categories } from "@/data/categories";

export default function AdminCategoriesPage() {
  return (
    <div className="flex flex-col w-full gap-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-secondary" />
            <span className="text-label-sm uppercase tracking-widest text-secondary font-bold">
              Catalogue Architecture
            </span>
          </div>

          <h1 className="font-headline-lg text-2xl md:text-3xl text-primary tracking-tight font-bold flex items-baseline gap-3 flex-wrap">
            <span>Product Categories</span>
            <span className="font-headline-md text-xl md:text-2xl text-muted-foreground font-normal">
              (श्रेणियाँ - View-Only)
            </span>
          </h1>

          <p className="text-body-md text-muted-foreground max-w-2xl">
            Overview of the primary taxonomy sections configured across the Sanwaliya Printing Press catalogue.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-label-sm font-bold flex items-center gap-1.5 self-start md:self-auto">
          <Lock className="w-3.5 h-3.5" />
          <span>View-Only Structure</span>
        </span>
      </div>

      {/* Developer Architectural Notice Callout Banner */}
      <div className="p-4 md:p-5 rounded-xl bg-surface-lowest border border-border shadow-xs flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
          <Code className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-label-md font-bold text-foreground">
            Architecture Notice: Fixed Next.js Dynamic Routing
          </span>
          <p className="text-body-sm text-muted-foreground leading-relaxed">
            The category slugs below (e.g. <code>wedding-cards</code>, <code>visiting-cards</code>, <code>bill-books</code>) map directly to high-performance statically pre-rendered routes on the customer site. To add a new root department or change URL slugs, contact your web engineer.
          </p>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={cat.slug}
            className="rounded-xl bg-surface-lowest border border-border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category Featured Image Banner */}
              <div className="relative h-44 w-full bg-surface-container overflow-hidden">
                <Image
                  src={cat.featuredImage}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-lg font-bold text-white drop-shadow-sm">
                      {cat.name}
                    </span>
                    <span className="text-body-sm text-white/90 drop-shadow-sm">
                      {cat.nameHi}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white">
                    {cat.itemCount}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-3.5">
                <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                <div className="flex items-center gap-2 text-label-sm font-mono text-muted-foreground bg-surface-container px-2.5 py-1.5 rounded-lg border border-border/40">
                  <span>Slug:</span>
                  <span className="text-primary font-bold">/{cat.slug}</span>
                </div>

                {cat.filterConfig && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
                    <span className="text-label-sm uppercase tracking-wider text-muted-foreground font-semibold">
                      Supported Finishes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.filterConfig.supportedFinishes?.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 rounded text-[11px] bg-surface-container text-foreground"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-surface-container/30 border-t border-border/40 flex items-center justify-between">
              <span className="text-label-sm text-muted-foreground">
                Priority: #{index + 1}
              </span>

              <Link
                href={`/${cat.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-label-sm font-bold text-primary hover:underline"
              >
                <span>View Live Section</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
