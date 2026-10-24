"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Layers,
  Star,
  FileDown,
} from "lucide-react";
import {
  AdminProduct,
  ProductStatus,
  getMockAdminProducts,
  deleteMockAdminProduct,
  bulkDeleteMockAdminProducts,
  bulkUpdateMockProductStatus,
  toggleMockProductFeatured,
} from "@/data/admin-mock";
import { categories } from "@/data/categories";
import { ProductTable } from "@/components/admin/ProductTable";
import { ProductCardList } from "@/components/admin/ProductCardList";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Bulk Selection & Dialogs
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    let isMounted = true;
    const fetchFiltered = async () => {
      try {
        const list = await getMockAdminProducts({
          query: searchQuery,
          category: selectedCategory,
          status: selectedStatus,
          sortBy: selectedSort,
        });
        if (isMounted) {
          setProducts(list);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchFiltered();
    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedCategory, selectedStatus, selectedSort]);

  // Client-filtered list for featured toggle
  const filteredProducts = useMemo(() => {
    if (featuredOnly) {
      return products.filter((p) => p.featured);
    }
    return products;
  }, [products, featuredOnly]);

  // Paginated slice
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      const currentIds = paginatedProducts.map((p) => p.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentIds])));
    } else {
      const currentIds = paginatedProducts.map((p) => p.id);
      setSelectedIds((prev) => prev.filter((id) => !currentIds.includes(id)));
    }
  };

  const refreshProducts = async () => {
    try {
      const list = await getMockAdminProducts({
        query: searchQuery,
        category: selectedCategory,
        status: selectedStatus,
        sortBy: selectedSort,
      });
      setProducts(list);
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (id: string) => {
    // // TODO(backend): PATCH /api/admin/products/:id/featured
    await toggleMockProductFeatured(id);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  // Single delete
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    // // TODO(backend): DELETE /api/admin/products/:id
    await deleteMockAdminProduct(productToDelete.id);
    setSelectedIds((prev) => prev.filter((id) => id !== productToDelete.id));
    setProductToDelete(null);
    refreshProducts();
  };

  // Bulk status update
  const handleBulkStatusChange = async (status: ProductStatus) => {
    // // TODO(backend): PATCH /api/admin/products/bulk-status
    await bulkUpdateMockProductStatus(selectedIds, status);
    refreshProducts();
  };

  // Bulk delete confirm
  const handleBulkDeleteConfirm = async () => {
    // // TODO(backend): POST /api/admin/products/bulk-delete
    setIsBulkDeleting(true);
    await bulkDeleteMockAdminProducts(selectedIds);
    setSelectedIds([]);
    setBulkDeleteDialogOpen(false);
    setIsBulkDeleting(false);
    refreshProducts();
  };

  // Export CSV mock handler
  const handleExportCSV = () => {
    // // TODO(backend): Trigger GET /api/admin/products/export.csv
    const headers = "ID,Code,Name,Category,Status,StartingPrice,Inquiries\n";
    const rows = products
      .map(
        (p) =>
          `"${p.id}","${p.productCode}","${p.name}","${p.category}","${p.status}","${p.price.startingFrom || 0}","${p.inquiriesCount}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sanwaliya-products-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Delete Confirmation Dialog (Single) */}
      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title={`Delete "${productToDelete?.name}"?`}
        subtitle={`Product Code: ${productToDelete?.productCode}`}
        message="This will permanently delete this product from the master index and client catalog. Orders referencing this SKU will keep vector records."
        confirmLabel="Delete Product"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProductToDelete(null)}
      />

      {/* Delete Confirmation Dialog (Bulk) */}
      <ConfirmDialog
        isOpen={bulkDeleteDialogOpen}
        title={`Delete ${selectedIds.length} Products?`}
        subtitle="Batch Delete Confirmation"
        message={`Are you sure you want to permanently delete ${selectedIds.length} selected print products from the catalog? This action cannot be reversed.`}
        confirmLabel="Delete Selected"
        cancelLabel="Cancel"
        isLoading={isBulkDeleting}
        onConfirm={handleBulkDeleteConfirm}
        onCancel={() => setBulkDeleteDialogOpen(false)}
      />

      {/* Top Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-secondary" />
            <span className="text-label-sm uppercase tracking-widest text-secondary font-bold">
              Atelier Master Index
            </span>
          </div>

          <h1 className="font-headline-lg text-2xl md:text-3xl text-primary tracking-tight font-bold flex items-baseline gap-3 flex-wrap">
            <span>Products Catalogue</span>
            <span className="font-headline-md text-xl md:text-2xl text-muted-foreground font-normal">
              (उत्पाद सूची)
            </span>
          </h1>

          <p className="text-body-md text-muted-foreground max-w-2xl">
            Manage, search, filter, and curate your bespoke print designs, wedding suites, and commercial stationery inventory.
          </p>
        </div>

        {/* Quick Stats + Add Product CTA */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="px-4 py-2 rounded-xl bg-surface-container border border-border flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface-lowest flex items-center justify-center text-primary shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-label-sm uppercase tracking-wider text-muted-foreground">
                Total Active
              </span>
              <span className="text-label-md text-foreground font-bold leading-tight">
                {products.length} <span className="text-secondary font-medium">SKUs</span>
              </span>
            </div>
          </div>

          <Link
            href="/admin/products/new"
            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-label-md font-bold shadow-md transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Primary Control Toolbar (Search, Dropdowns & Tabs) */}
      <div className="flex flex-col gap-4 bg-surface-lowest p-4 md:p-6 rounded-xl border border-border shadow-xs">
        {/* Row 1: Search, Category, Sort */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, code (RM-W-101), or keyword (शादी कार्ड)..."
              className="w-full min-h-[44px] pl-10 pr-12 py-2.5 rounded-lg bg-surface-container border border-border text-foreground text-body-md placeholder:text-muted-foreground focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-label-sm font-semibold"
              >
                Clear
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container-high text-muted-foreground uppercase">
                ⌘K
              </span>
            )}
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-4 relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg bg-surface-container border border-border text-foreground text-label-md font-medium focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="all">All Categories ({categories.length} Sections)</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name} ({cat.nameHi})
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="lg:col-span-3 relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg bg-surface-container border border-border text-foreground text-label-md font-medium focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="code_asc">Sort: Product Code (A-Z)</option>
              <option value="name_asc">Sort: Title (A-Z)</option>
              <option value="inquiries">Sort: Most Inquired (WhatsApp)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Status Segmented Tabs & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
          {/* Status Segmented Tabs */}
          <div className="flex items-center p-1 rounded-lg bg-surface-container border border-border/50">
            <button
              type="button"
              onClick={() => setSelectedStatus("all")}
              className={`min-h-[34px] px-3.5 py-1 rounded-md text-label-md transition-all ${
                selectedStatus === "all"
                  ? "bg-surface-lowest text-primary font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground font-semibold"
              }`}
            >
              All Products
            </button>

            <button
              type="button"
              onClick={() => setSelectedStatus("published")}
              className={`min-h-[34px] px-3.5 py-1 rounded-md text-label-md transition-all ${
                selectedStatus === "published"
                  ? "bg-surface-lowest text-primary font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground font-semibold"
              }`}
            >
              Published
            </button>

            <button
              type="button"
              onClick={() => setSelectedStatus("draft")}
              className={`min-h-[34px] px-3.5 py-1 rounded-md text-label-md transition-all ${
                selectedStatus === "draft"
                  ? "bg-surface-lowest text-primary font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground font-semibold"
              }`}
            >
              Drafts
            </button>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-label-sm font-semibold transition-colors ${
                featuredOnly
                  ? "bg-secondary/15 text-secondary border-secondary/40 font-bold"
                  : "bg-surface-container hover:bg-surface-container-high border-border text-foreground"
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${featuredOnly ? "fill-current" : ""}`} />
              <span>Featured Only</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-border text-muted-foreground hover:text-foreground text-label-sm font-semibold transition-colors"
              title="Export Products as CSV"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Responsive Desktop Table / Mobile Cards */}
      {filteredProducts.length === 0 && !isLoading ? (
        <EmptyState
          title="No Matching Designs Found"
          description="No print designs match your active search keyword, category, or status filter. Try clearing filters or create a new product."
          actionText="Clear Filters"
          onActionClick={() => {
            setSearchQuery("");
            setSelectedCategory("all");
            setSelectedStatus("all");
            setFeaturedOnly(false);
          }}
        />
      ) : (
        <>
          {/* Mobile Card List (Screens < 768px) */}
          <ProductCardList
            products={paginatedProducts}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleFeatured={handleToggleFeatured}
            onDeleteClick={(p) => setProductToDelete(p)}
          />

          {/* Desktop Data Table (Screens >= 768px) */}
          <div className="hidden md:block">
            <ProductTable
              products={paginatedProducts}
              selectedIds={selectedIds}
              isLoading={isLoading}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
              onToggleFeatured={handleToggleFeatured}
              onDeleteClick={(p) => setProductToDelete(p)}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkDelete={() => setBulkDeleteDialogOpen(true)}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProducts.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
