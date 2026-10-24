import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { CategoryView } from "@/components/category/category-view";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} (${category.nameHi}) | Catalogue`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Get products for this category (or related fallback for rich demonstration)
  const categoryProducts = products.filter(
    (p) => p.category === category.slug || category.slug === "wedding-cards"
  );

  return (
    <CategoryView
      category={category}
      allCategories={categories}
      initialProducts={categoryProducts}
    />
  );
}
