import React from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { EmptyState } from "@/components/admin/EmptyState";
import { getProductById } from "@/lib/products";
import { requireAdmin } from "@/lib/auth";
import { AdminProduct } from "@/data/admin-mock";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return (
      <EmptyState
        title="Product Not Found"
        description={`No print design was found with identifier "${id}". It may have been removed or deleted.`}
        actionText="Back to Products"
        actionHref="/admin/products"
      />
    );
  }

  const raw = product as unknown as Record<string, unknown>;
  const adminProduct: AdminProduct = {
    ...product,
    featured: Boolean(product.featured),
    status: product.published ? "published" : "draft",
    createdAt: product.createdAt || new Date().toISOString(),
    updatedAt: String(raw.updatedAt || product.createdAt || new Date().toISOString()),
    inquiriesCount: Number(raw.inquiriesCount) || 0,
  };

  return <ProductForm initialProduct={adminProduct} isEditMode={true} />;
}
