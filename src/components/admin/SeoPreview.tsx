import React from "react";
import { Globe, Search } from "lucide-react";
import { getCategorySeoMeta } from "@/data/category-seo";

interface SeoPreviewProps {
  title: string;
  slug: string;
  description: string;
  category?: string;
  className?: string;
}

export function SeoPreview({
  title,
  slug,
  description,
  category = "wedding-cards",
  className = "",
}: SeoPreviewProps) {
  const categoryMeta = getCategorySeoMeta(category);

  const displayTitle = title
    ? `${title} | Sanwaliya Printing Press Suwasra`
    : categoryMeta
    ? `${categoryMeta.categoryName} | Sanwaliya Printing Press Suwasra`
    : "Bespoke Printing Suite | Sanwaliya Printing Press Suwasra";

  const displaySlug = slug || "untitled-product";

  const displayDescription =
    description ||
    categoryMeta?.suggestedSerpSnippet ||
    "Bespoke artisanal print design crafted at Sanwaliya Printing Press atelier in Suwasra, Mandsaur. Premium cotton rag, hot gold foil stamping, and direct WhatsApp consultations.";

  const categoryLabel = categoryMeta?.categoryName || category;

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs md:text-sm text-foreground font-semibold flex items-center gap-1.5">
          <Search className="w-4 h-4 text-primary" />
          Google SERP Search Preview
        </span>
        <span className="text-xs text-secondary flex items-center gap-1 font-medium">
          <Globe className="w-3.5 h-3.5" />
          Live Snippet
        </span>
      </div>

      <div className="p-4 md:p-5 rounded-xl bg-surface-container/70 border border-border flex flex-col gap-2 shadow-xs transition-colors">
        {/* URL Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
            S
          </div>
          <div className="flex flex-col text-xs text-muted-foreground truncate">
            <span className="font-semibold text-foreground text-[11px]">
              Sanwaliya Printing Press
            </span>
            <span className="truncate text-[11px] text-primary/80">
              https://sanwaliyapress.in › {categoryLabel} › {displaySlug}
            </span>
          </div>
        </div>

        {/* Title Link */}
        <h3 className="text-base md:text-lg font-headline-sm text-primary hover:underline cursor-pointer font-bold leading-snug line-clamp-2">
          {displayTitle}
        </h3>

        {/* Meta Description */}
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {displayDescription}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span className={displayTitle.length > 60 ? "text-amber-600 dark:text-amber-400 font-medium" : ""}>
          Title: {displayTitle.length} / 60 optimal chars
        </span>
        <span className={displayDescription.length > 160 ? "text-amber-600 dark:text-amber-400 font-medium" : ""}>
          Meta Description: {displayDescription.length} / 160 optimal chars
        </span>
      </div>
    </div>
  );
}
