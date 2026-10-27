"use client";

import React from "react";
import Link from "next/link";
import { Heart, MessageCircle, ArrowRight, IndianRupee } from "lucide-react";
import { Product } from "@/types/product";
import { useSelection } from "@/context/selection-context";
import { buildProductEnquiryUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  onOpenLightbox?: (product: Product, index: number) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const { hasItem, toggleItem } = useSelection();
  const isSelected = hasItem(product.id);

  const primaryImage =
    product.images.find((img) => img.isPrimary) || product.images[0];

  const detailUrl = `/${product.category}/${product.slug}`;
  const whatsappUrl = buildProductEnquiryUrl({
    product,
  });

  return (
    <article className="group bg-card rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col border border-border/70">
      {/* 4:5 Image Container matching Stitch */}
      <div className="relative aspect-[4/5] bg-surface-low overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={primaryImage?.url}
          alt={primaryImage?.alt || product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1 z-10 pointer-events-none">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-primary text-primary-foreground font-label-sm text-[9px] sm:text-[10px] tracking-wide uppercase font-bold shadow-xs">
            {product.productCode}
          </span>
          {product.tags[0] && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-surface-lowest/90 backdrop-blur-sm text-secondary font-label-sm text-[10px] tracking-wide uppercase font-bold shadow-xs border border-border/40">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Shortlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product);
          }}
          aria-label={isSelected ? "Remove from shortlist" : "Add to shortlist"}
          className={`shortlist-btn absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all shadow-xs z-10 ${
            isSelected
              ? "bg-primary text-primary-foreground scale-105"
              : "bg-surface-lowest/90 text-muted-foreground hover:text-primary hover:bg-surface-lowest"
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
              isSelected ? "fill-current text-white" : ""
            }`}
          />
        </button>

        {/* Bottom Tactile Layer Pills matching Stitch Screen */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between pointer-events-none">
          <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded bg-surface/90 backdrop-blur-sm text-foreground font-label-sm text-[9px] sm:text-[10px] font-semibold border border-border/30 truncate max-w-[120px]">
            {product.minimumQuantity ? `Min. ${product.minimumQuantity} Sets` : "3 Layered Inserts"}
          </span>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-secondary-container text-secondary-foreground font-label-sm text-[10px] font-bold shadow-2xs">
            24k Brass Monogram
          </span>
        </div>
      </div>

      {/* Card Content & Spacing: p-3 on mobile, p-5 sm:p-6 on desktop */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between gap-2 sm:gap-4">
        <div className="flex flex-col gap-1 sm:gap-2">
          {/* Heading */}
          <div className="flex items-center justify-between gap-2">
            <Link href={detailUrl} className="block group/title w-full">
              <h3 className="font-headline-sm text-xs sm:text-base text-primary font-semibold group-hover:text-primary-container transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>

          {product.nameHi && (
            <p className="text-[11px] sm:text-xs text-secondary font-devanagari font-medium -mt-0.5 sm:-mt-1 line-clamp-1">
              {product.nameHi}
            </p>
          )}

          {/* Description (desktop) */}
          <p className="hidden sm:block font-body-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Tags Chips (desktop) */}
          <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-muted-foreground border border-border/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Strip & Action Buttons */}
        <div className="flex flex-col gap-2 sm:gap-3 pt-1.5 sm:pt-2 border-t border-border/40">
          {/* Mobile compact price row */}
          <div className="sm:hidden flex items-baseline justify-between text-xs font-semibold text-foreground">
            <span>
              {product.price.show && product.price.startingFrom
                ? `₹${product.price.startingFrom}`
                : "₹450"}
              <span className="text-[10px] text-muted-foreground font-normal"> / {product.price.unit || "suite"}</span>
            </span>
            <span className="text-[10px] text-secondary font-devanagari font-medium">हैंडमेड</span>
          </div>

          {/* Desktop pricing pill */}
          <div className="hidden sm:flex p-2.5 rounded-lg bg-surface-low items-center gap-2 text-muted-foreground font-body-sm border border-border/30">
            <IndianRupee className="w-4 h-4 text-secondary shrink-0" />
            <span className="text-[12px] leading-tight font-medium">
              {product.price.show && product.price.startingFrom
                ? `Starting from ₹${product.price.startingFrom} / ${product.price.unit || "suite"}. Tap for bespoke quote.`
                : `Price depends on quantity (Min. ${product.minimumQuantity || 50} pcs). Tap for bespoke quote.`}
            </span>
          </div>

          {/* Mobile single full-width button */}
          <div className="sm:hidden flex flex-col gap-1.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-8 rounded-lg bg-surface-container-high hover:bg-primary hover:text-white text-primary text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors border border-border/50 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>जांच करें • Quote</span>
            </a>
          </div>

          {/* Desktop 2-column buttons */}
          <div className="hidden sm:grid grid-cols-2 gap-2">
            <Link
              href={detailUrl}
              className="py-2.5 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary-container font-label-md font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-lg bg-[#128C7E] text-white hover:bg-[#0e7064] font-label-md font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Quote</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
