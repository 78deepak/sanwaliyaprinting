"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
} from "@/data/admin-mock";
import { categories } from "@/data/categories";
import {
  getAdminProductsListAction,
  toggleFeaturedAction,
  deleteProductAction,
  bulkProductsAction,
} from "@/app/admin/actions";
import { ProductTable } from "@/components/admin/ProductTable";
import { ProductCardList } from "@/components/admin/ProductCardList";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

function AdminProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);
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

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        const res = await getAdminProductsListAction({
          search: searchQuery,
          category: selectedCategory,
          status: selectedStatus as "all" | "published" | "draft",
          featured: featuredOnly ? true : undefined,
          sort: selectedSort,
          page: currentPage,
          limit: pageSize,
        });
        if (!ignore) {
          setProducts(res.items);
          setTotalItems(res.total);
          setTotalPages(res.totalPages);
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load admin products:", err);
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [searchQuery, selectedCategory, selectedStatus, selectedSort, featuredOnly, currentPage, pageSize, refreshKey]);

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      const currentIds = products.map((p) => p.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentIds])));
    } else {
      const currentIds = products.map((p) => p.id);
      setSelectedIds((prev) => prev.filter((id) => !currentIds.includes(id)));
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (id: string) => {
    const current = products.find((p) => p.id === id);
    if (!current) return;
    const newFeatured = !current.featured;

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: newFeatured } : p))
    );

    const res = await toggleFeaturedAction(id, newFeatured);
    if (!res.ok) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !newFeatured } : p))
      );
    }
  };

  // Single delete
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    const res = await deleteProductAction(productToDelete.id);
    if (res.ok) {
      setSelectedIds((prev) => prev.filter((id) => id !== productToDelete.id));
      setProductToDelete(null);
      setRefreshKey((k) => k + 1);
    }
  };

  // Bulk status update
  const handleBulkStatusChange = async (status: ProductStatus) => {
    if (selectedIds.length === 0) return;
    const action = status === "published" ? "publish" : "draft";
    const res = await bulkProductsAction(action, selectedIds);
    if (res.ok) {
      setSelectedIds([]);
      setRefreshKey((k) => k + 1);
    }
  };

  // Bulk delete confirm
  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.length === 0) return;
    setIsBulkDeleting(true);
    try {
      const res = await bulkProductsAction("delete", selectedIds);
      if (res.ok) {
        setSelectedIds([]);
        setBulkDeleteDialogOpen(false);
        setRefreshKey((k) => k + 1);
      }
    } finally {
      setIsBulkDeleting(false);
    }
  };

  // Export CSV handler with real catalogue data
  const handleExportCSV = async () => {
    try {
      const res = await getAdminProductsListAction({
        search: searchQuery,
        category: selectedCategory,
        status: selectedStatus as "all" | "published" | "draft",
        featured: featuredOnly ? true : undefined,
        sort: selectedSort,
        page: 1,
        limit: 1000,
      });

      const headers = "ID,Code,Name,Category,Status,StartingPrice,Unit\n";
      const rows = res.items
        .map(
          (p) =>
            `"${p.id}","${p.productCode}","${p.name.replace(/"/g, '""')}","${p.category}","${p.status}","${p.price.startingFrom || 0}","${p.price.unit || "piece"}"`
        )
        .join("\n");

      const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sanwaliya-products-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export CSV error:", e);
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Delete Confirmation Dialog (Single) */}
      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title={`Delete "${productToDelete?.name}"?`}
        subtitle={`Product Code: ${productToDelete?.productCode}`}
        message="This will permanently delete this product from the master index and client catalog. This action cannot be undone."
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

      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Products
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
            Manage your catalog items, pricing, and live website visibility ({totalItems} {totalItems === 1 ? "product" : "products"}).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-9 px-3 rounded-lg border border-border bg-surface-lowest hover:bg-surface-container text-xs font-semibold text-foreground inline-flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Export products to CSV"
          >
            <FileDown className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </button>

          <Link
            href="/admin/products/new"
            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Product</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-3 bg-surface-lowest rounded-xl border border-border shadow-2xs flex flex-col gap-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2">
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title or SKU code..."
              className="w-full h-9 pl-9 pr-8 rounded-lg bg-surface-container/40 border border-border text-foreground text-xs md:text-sm placeholder:text-muted-foreground focus:outline-none focus:bg-surface-lowest focus:border-primary/50 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-9 px-3 rounded-lg bg-surface-container/40 border border-border text-foreground text-xs md:text-sm font-medium focus:outline-none focus:bg-surface-lowest focus:border-primary/50 transition-colors cursor-pointer"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="sm:col-span-2 lg:col-span-3">
            <select
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-9 px-3 rounded-lg bg-surface-container/40 border border-border text-foreground text-xs md:text-sm font-medium focus:outline-none focus:bg-surface-lowest focus:border-primary/50 transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="code_asc">Code (A-Z)</option>
              <option value="name_asc">Title (A-Z)</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Status Pills & Featured Filter */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50">
          <div className="flex items-center gap-1 bg-surface-container/60 p-0.5 rounded-lg border border-border/60">
            <button
              type="button"
              onClick={() => {
                setSelectedStatus("all");
                setCurrentPage(1);
              }}
              className={`h-7 px-3 rounded-md text-xs font-medium transition-all ${
                selectedStatus === "all"
                  ? "bg-surface-lowest text-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({totalItems})
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedStatus("published");
                setCurrentPage(1);
              }}
              className={`h-7 px-3 rounded-md text-xs font-medium transition-all ${
                selectedStatus === "published"
                  ? "bg-surface-lowest text-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Published
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedStatus("draft");
                setCurrentPage(1);
              }}
              className={`h-7 px-3 rounded-md text-xs font-medium transition-all ${
                selectedStatus === "draft"
                  ? "bg-surface-lowest text-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Drafts
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setFeaturedOnly(!featuredOnly);
              setCurrentPage(1);
            }}
            className={`h-7 inline-flex items-center gap-1.5 px-2.5 rounded-lg border text-xs font-medium transition-colors ${
              featuredOnly
                ? "bg-secondary/15 text-secondary border-secondary/40 font-semibold"
                : "bg-surface-container/40 hover:bg-surface-container border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Star className={`w-3 h-3 ${featuredOnly ? "fill-current" : ""}`} />
            <span>Featured</span>
          </button>
        </div>
      </div>

      {/* Main View: Responsive Desktop Table / Mobile Cards */}
      {products.length === 0 && !isLoading ? (
        <EmptyState
          title="No Matching Designs Found"
          description="No print designs match your active search keyword, category, or status filter. Try clearing filters or create a new product."
          actionText="Clear Filters"
          onActionClick={() => {
            setSearchQuery("");
            setSelectedCategory("all");
            setSelectedStatus("all");
            setFeaturedOnly(false);
            setCurrentPage(1);
          }}
        />
      ) : (
        <>
          {/* Mobile Card List (Screens < 768px) */}
          <ProductCardList
            products={products}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleFeatured={handleToggleFeatured}
            onDeleteClick={(p) => setProductToDelete(p)}
          />

          {/* Desktop Data Table (Screens >= 768px) */}
          <div className="hidden md:block">
            <ProductTable
              products={products}
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
              totalItems={totalItems}
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

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-4 p-8 items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs text-muted-foreground">Loading products catalogue...</span>
        </div>
      }
    >
      <AdminProductsContent />
    </Suspense>
  );
}
