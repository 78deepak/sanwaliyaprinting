"use client";

import React, { useState } from "react";
import { ZoomIn, Sparkles, ShieldCheck } from "lucide-react";
import { ProductImage } from "@/types/product";
import { Lightbox } from "./lightbox";

interface ProductGalleryProps {
  images: ProductImage[];
  productCode: string;
  productName: string;
}

export function ProductGallery({
  images,
  productCode,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col gap-5">
      {/* Main Specimen Viewer */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-surface-low border border-border shadow-xl group">
        {/* Subtle Gilded Border Inset */}
        <div className="absolute inset-3 rounded-xl pointer-events-none z-10 opacity-40 shadow-[inset_0_0_0_1px_#b8892e]" />

        {/* Main Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage?.url}
          alt={activeImage?.alt || productName}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Top Badges */}
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/95 backdrop-blur-md text-primary text-xs font-bold shadow-md border border-border/40">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Master Press Specimen</span>
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm w-fit">
            {productCode}
          </span>
        </div>

        {/* Lightbox Zoom Trigger */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Inspect Full Size Specimen"
          className="absolute bottom-5 right-5 z-20 w-11 h-11 rounded-full bg-surface-lowest/90 backdrop-blur text-primary flex items-center justify-center shadow-lg hover:bg-surface-lowest hover:scale-110 transition-all border border-border/60"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* Micro Origin Watermark */}
        <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground bg-surface/85 backdrop-blur-xs px-2.5 py-1 rounded border border-border/30">
            Handcrafted in Suwasra Atelier
          </span>
        </div>
      </div>

      {/* Multi-angle Thumbnail Switchers */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={img.url + idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden bg-surface-low shadow-xs transition-all border-2 ${
                  isActive
                    ? "border-primary shadow-sm scale-[0.98]"
                    : "border-border/60 hover:border-secondary opacity-80 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                {img.caption && (
                  <span className="absolute bottom-1 inset-x-1 text-center py-0.5 bg-background/85 text-foreground text-[9px] truncate px-1 rounded-xs font-medium">
                    {img.caption}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Artisan Assurance Plaque */}
      <div className="p-4 rounded-xl bg-surface-low border border-border/60 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary-foreground shrink-0 font-bold">
          <ShieldCheck className="w-5 h-5 text-secondary" />
        </div>
        <div className="text-xs">
          <div className="font-bold text-foreground">Single-Use Solid Brass Die</div>
          <div className="text-muted-foreground">
            Cast exclusively for your monogram for sharp, deep indentation.
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images}
        currentIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
        productCode={productCode}
        productName={productName}
      />
    </div>
  );
}
