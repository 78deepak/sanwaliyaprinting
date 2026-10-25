import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/products";
import { SearchClient } from "./search-client";

export const metadata: Metadata = {
  title: "Search Printing Catalogue | Sanwaliya Printing Press",
  description:
    "Search papers, velvet invitation boxes, bill books, visiting cards, and banners across our Suwasra printing atelier catalogue.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  // Fetch real published products from MongoDB
  const { items: products } = await getPublishedProducts({
    limit: 500,
    sort: "newest",
  });

  return (
    <Suspense fallback={<div className="pt-32 text-center text-sm text-muted-foreground">Loading search catalogue...</div>}>
      <SearchClient initialProducts={products} initialQuery={q || ""} />
    </Suspense>
  );
}
