import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductDetailView } from "@/components/products/product-detail-view";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} (${product.productCode}) | Sanwaliya Printing Press`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Sanwaliya Printing Press`,
      description: product.shortDescription,
      images: [{ url: product.images[0]?.url || "" }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );

  return (
    <ProductDetailView product={product} relatedProducts={related} />
  );
}
