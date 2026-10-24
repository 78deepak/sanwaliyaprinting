"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { ProductImage } from "@/types/product";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProductImage[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  productCode?: string;
  productName?: string;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
  productCode,
  productName,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        onSelectIndex((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const whatsappUrl = buildGeneralEnquiryUrl(
    `Namaste Sanwaliya Press! I am inspecting image ${currentIndex + 1} of design ${productCode || ""} (${productName || ""}) in the gallery lightbox and would like quotation details.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Header / Actions */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-3">
          {productCode && (
            <span className="px-3 py-1 rounded-full bg-primary text-xs font-bold uppercase tracking-wider">
              {productCode}
            </span>
          )}
          <span className="text-sm font-medium text-white/80">
            {currentIndex + 1} / {images.length}
          </span>
          {currentImage?.caption && (
            <span className="hidden sm:inline-block text-xs text-white/60">
              • {currentImage.caption}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary text-white text-xs font-semibold hover:bg-tertiary-hover transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Inquiry
          </a>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Prev Navigation Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={() =>
            onSelectIndex((currentIndex - 1 + images.length) % images.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-10"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Specimen Image */}
      <div className="max-w-5xl max-h-[80vh] p-4 flex flex-col items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImage?.url}
          alt={currentImage?.alt || "Specimen Photo"}
          className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
        />
        {currentImage?.alt && (
          <p className="text-xs text-white/70 text-center mt-3 max-w-xl">
            {currentImage.alt}
          </p>
        )}
      </div>

      {/* Next Navigation Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={() =>
            onSelectIndex((currentIndex + 1) % images.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-10"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 px-4 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={img.url + idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                idx === currentIndex
                  ? "border-secondary scale-105 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
