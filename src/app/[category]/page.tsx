import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { getPublishedProducts } from "@/lib/products";
import { CategoryView } from "@/components/category/category-view";

import { siteConfig } from "@/lib/site-config";

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

  const url = `${siteConfig.url}/${category.slug}`;

  return {
    title: `${category.name} (${category.nameHi}) | Catalogue`,
    description: category.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.name} (${category.nameHi}) | Sanwaliya Printing Press`,
      description: category.description,
      url,
      type: "website",
      images: category.featuredImage ? [{ url: category.featuredImage, alt: category.name }] : [],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Get real published products from MongoDB for this category
  const res = await getPublishedProducts({
    category: category.slug,
    limit: 100,
    sort: "newest",
  });

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${siteConfig.url}/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <CategoryView
        category={category}
        allCategories={categories}
        initialProducts={res.items}
      />
    </>
  );
}
