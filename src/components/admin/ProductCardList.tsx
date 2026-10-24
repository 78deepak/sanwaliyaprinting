"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Edit3,
  Trash2,
  Eye,
  Star,
  Clock,
} from "lucide-react";
import { AdminProduct } from "@/data/admin-mock";
import { StatusBadge } from "./StatusBadge";

interface ProductCardListProps {
  products: AdminProduct[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onDeleteClick: (product: AdminProduct) => void;
}

export function ProductCardList({
  products,
  selectedIds,
  onToggleSelect,
  onToggleFeatured,
  onDeleteClick,
}: ProductCardListProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 md:hidden">
      {products.map((product) => {
        const isSelected = selectedIds.includes(product.id);
        const heroImage =
          product.images.find((img) => img.isPrimary) ||
          product.images[0] || {
            url: "/placeholder-print.jpg",
            alt: product.name,
          };

        return (
          <div
            key={product.id}
            className={`p-4 rounded-xl border transition-all bg-surface-lowest flex flex-col gap-3.5 shadow-xs ${
              isSelected
                ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                : "border-border"
            }`}
          >
            {/* Top Bar with Checkbox, SKU, and Status */}
            <div className="flex items-center justify-between gap-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect(product.id)}
                  className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                />
                <span className="font-mono text-label-sm font-bold bg-surface-container px-2 py-0.5 rounded text-foreground">
                  {product.productCode}
                </span>
              </label>

              <div className="flex items-center gap-2">
                <StatusBadge status={product.status} />
                <button
                  type="button"
                  onClick={() => onToggleFeatured(product.id)}
                  className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                    product.featured
                      ? "text-secondary hover:bg-secondary/10"
                      : "text-muted-foreground/40 hover:text-secondary"
                  }`}
                  title="Toggle featured status"
                >
                  <Star
                    className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Thumbnail + Title Row */}
            <div className="flex items-start gap-3">
              <div className="relative w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-border">
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="font-headline-sm text-base text-foreground hover:text-primary font-bold truncate leading-snug"
                >
                  {product.name}
                </Link>

                {product.nameHi && (
                  <span className="text-body-sm text-muted-foreground truncate">
                    {product.nameHi}
                  </span>
                )}

                <div className="flex items-center gap-2 mt-1 text-label-sm">
                  {product.price.show && product.price.startingFrom ? (
                    <span className="font-bold text-primary">
                      ₹{product.price.startingFrom.toLocaleString("en-IN")}
                      {product.price.maxPrice
                        ? ` - ₹${product.price.maxPrice.toLocaleString("en-IN")}`
                        : ""}
                    </span>
                  ) : (
                    <span className="text-secondary font-semibold">
                      Custom Quote
                    </span>
                  )}
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground capitalize truncate">
                    {product.category.replace(/-/g, " ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Meta & Actions Row */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50 text-label-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground text-[12px]">
                <Clock className="w-3.5 h-3.5" />
                <span>{product.updatedAt}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  href={`/category/${product.category}/${product.slug}`}
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                  title="View on live website"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold flex items-center gap-1 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>

                <button
                  type="button"
                  onClick={() => onDeleteClick(product)}
                  className="w-8 h-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
