"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { EmptyState } from "@/components/admin/EmptyState";
import { getMockAdminProductById, AdminProduct } from "@/data/admin-mock";
import { Loader2 } from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // // TODO(backend): Fetch single product from GET /api/admin/products/:id
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const found = await getMockAdminProductById(id);
        setProduct(found);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <span className="text-muted-foreground text-label-md">
          Loading print design specifications...
        </span>
      </div>
    );
  }

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

  return <ProductForm initialProduct={product} isEditMode={true} />;
}
