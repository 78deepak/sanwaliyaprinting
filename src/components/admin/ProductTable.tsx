"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Edit3,
  Trash2,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle,
} from "lucide-react";
import { AdminProduct, ProductStatus } from "@/data/admin-mock";
import { StatusBadge } from "./StatusBadge";

interface ProductTableProps {
  products: AdminProduct[];
  selectedIds: string[];
  isLoading?: boolean;
  onToggleSelect: (id: string) => void;
  onSelectAll: (all: boolean) => void;
  onToggleFeatured: (id: string) => void;
  onDeleteClick: (product: AdminProduct) => void;
  onBulkStatusChange: (status: ProductStatus) => void;
  onBulkDelete: () => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function ProductTable({
  products,
  selectedIds,
  isLoading = false,
  onToggleSelect,
  onSelectAll,
  onToggleFeatured,
  onDeleteClick,
  onBulkStatusChange,
  onBulkDelete,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ProductTableProps) {
  const allCurrentSelected =
    products.length > 0 && products.every((p) => selectedIds.includes(p.id));

  const someSelected =
    products.some((p) => selectedIds.includes(p.id)) && !allCurrentSelected;

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-4">
      {/* Dynamic Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="w-full bg-primary text-white p-3.5 md:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-label-sm">
              {selectedIds.length}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="text-label-lg font-bold">
                {selectedIds.length} {selectedIds.length === 1 ? "item" : "items"} selected
              </span>
              <span className="hidden sm:inline opacity-60">•</span>
              <span className="text-body-sm opacity-90 text-[13px]">
                Ready for batch status change or catalog deletion
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onBulkStatusChange("published")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-label-sm font-semibold transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Publish Selected</span>
            </button>

            <button
              type="button"
              onClick={() => onBulkStatusChange("draft")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-label-sm font-semibold transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Move to Draft</span>
            </button>

            <button
              type="button"
              onClick={onBulkDelete}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-destructive hover:bg-destructive/90 text-white text-label-sm font-bold shadow-xs transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectAll(false)}
              className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white text-label-sm ml-1 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div className="w-full bg-surface-lowest rounded-xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[960px] border-collapse">
            <thead>
              <tr className="bg-surface-container text-muted-foreground text-label-sm uppercase tracking-wider border-b border-border">
                <th className="w-12 px-4 py-3.5 text-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allCurrentSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = someSelected;
                      }}
                      onChange={(e) => onSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                    />
                  </label>
                </th>
                <th className="px-4 py-3.5 font-semibold text-foreground">Design & Nomenclature</th>
                <th className="px-4 py-3.5 font-semibold text-foreground">SKU / Code</th>
                <th className="px-4 py-3.5 font-semibold text-foreground">Category</th>
                <th className="px-4 py-3.5 font-semibold text-foreground">Catalog State</th>
                <th className="px-4 py-3.5 text-center font-semibold text-foreground">Showcase</th>
                <th className="px-4 py-3.5 font-semibold text-foreground">Modified</th>
                <th className="px-4 py-3.5 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60 text-foreground text-body-md">
              {isLoading ? (
                // Skeletons
                Array.from({ length: pageSize > 6 ? 6 : pageSize }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="animate-pulse">
                    <td className="px-4 py-4 text-center">
                      <div className="w-4 h-4 rounded bg-surface-container-high mx-auto" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg bg-surface-container-high shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="w-3/4 h-4 rounded bg-surface-container-high" />
                          <div className="w-1/2 h-3 rounded bg-surface-container" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-20 h-5 rounded bg-surface-container" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-24 h-5 rounded bg-surface-container" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-20 h-5 rounded-full bg-surface-container" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="w-6 h-6 rounded-full bg-surface-container mx-auto" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-20 h-4 rounded bg-surface-container" />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="w-16 h-8 rounded bg-surface-container ml-auto" />
                    </td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    No products found matching your current filters.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const heroImage =
                    product.images.find((img) => img.isPrimary) ||
                    product.images[0] || {
                      url: "/placeholder-print.jpg",
                      alt: product.name,
                    };

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-surface-container/60 transition-colors ${
                        isSelected ? "bg-primary/5" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelect(product.id)}
                          className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                        />
                      </td>

                      {/* Design & Nomenclature */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-border shadow-xs group">
                            <Image
                              src={heroImage.url}
                              alt={heroImage.alt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>

                          <div className="flex flex-col min-w-0 max-w-sm">
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="font-headline-sm text-base text-primary font-bold hover:underline truncate leading-snug"
                            >
                              {product.name}
                            </Link>

                            <span className="text-body-sm text-muted-foreground truncate">
                              {product.nameHi || product.shortDescription}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU / Code */}
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-label-sm font-bold bg-surface-container px-2 py-1 rounded text-foreground border border-border/50">
                          {product.productCode}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5">
                        <span className="text-label-md font-semibold text-foreground capitalize truncate inline-block max-w-[160px]">
                          {product.category.replace(/-/g, " ")}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={product.status} />
                      </td>

                      {/* Featured Showcase */}
                      <td className="px-4 py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleFeatured(product.id)}
                          className={`w-8 h-8 rounded-lg hover:bg-surface-container inline-flex items-center justify-center transition-colors ${
                            product.featured
                              ? "text-secondary hover:text-secondary/80"
                              : "text-muted-foreground/30 hover:text-secondary"
                          }`}
                          title={product.featured ? "Featured on Home" : "Pin to Featured"}
                        >
                          <Star className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`} />
                        </button>
                      </td>

                      {/* Modified */}
                      <td className="px-4 py-3.5">
                        <span className="text-label-sm text-muted-foreground whitespace-nowrap">
                          {product.updatedAt}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/category/${product.category}/${product.slug}`}
                            target="_blank"
                            className="w-8 h-8 rounded-lg hover:bg-surface-container text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                            title="Preview Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold text-label-sm flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => onDeleteClick(product)}
                            className="w-8 h-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Utilitarian Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-surface-container/40 border-t border-border gap-3 text-label-sm">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-foreground">
                {totalItems > 0 ? startIndex : 0}
              </span>{" "}
              to{" "}
              <span className="font-bold text-foreground">{endIndex}</span> of{" "}
              <span className="font-bold text-foreground">{totalItems}</span> print designs
            </span>

            <span className="text-border hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5">
              <label htmlFor="per-page-select" className="text-muted-foreground">
                Per page:
              </label>
              <select
                id="per-page-select"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="bg-surface-lowest border border-border py-1 px-2 rounded text-foreground focus:outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => onPageChange(currentPage - 1)}
              className="min-h-[36px] px-3 py-1.5 rounded-lg border border-border bg-surface-lowest hover:bg-surface-container text-foreground disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                // Only show first, last, and around current
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg text-label-sm font-bold transition-all ${
                        pageNum === currentPage
                          ? "bg-primary text-white shadow-xs"
                          : "hover:bg-surface-container text-foreground"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span key={pageNum} className="px-1 text-muted-foreground">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              type="button"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => onPageChange(currentPage + 1)}
              className="min-h-[36px] px-3 py-1.5 rounded-lg border border-border bg-surface-lowest hover:bg-surface-container text-foreground disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
