import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelated, getPublishedProducts } from "@/lib/products";
import { ProductDetailView } from "@/components/products/product-detail-view";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/data/categories";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const { items } = await getPublishedProducts({ limit: 100 });
  return items.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.published) {
    return {
      title: "Design Not Found | Sanwaliya Printing Press",
    };
  }

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const url = `${siteConfig.url}/${product.category}/${product.slug}`;

  return {
    title: `${product.name} (${product.productCode}) | Sanwaliya Printing Press`,
    description: product.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | Sanwaliya Printing Press`,
      description: product.shortDescription,
      url,
      type: "website",
      images: primaryImage ? [{ url: primaryImage.url, alt: primaryImage.alt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} (${product.productCode})`,
      description: product.shortDescription,
      images: primaryImage ? [primaryImage.url] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.published) {
    notFound();
  }

  const related = await getRelated(product.id, product.category, 4);
  const matchedCategory = categories.find((c) => c.slug === product.category);

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
        name: matchedCategory ? matchedCategory.name : product.category,
        item: `${siteConfig.url}/${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteConfig.url}/${product.category}/${product.slug}`,
      },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.description || product.shortDescription,
    sku: product.productCode,
    brand: {
      "@type": "Brand",
      name: "Sanwaliya Printing Press",
    },
    offers:
      product.price?.show && product.price?.startingFrom
        ? {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.price.startingFrom,
            availability: "https://schema.org/InStock",
          }
        : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView product={product} relatedProducts={related} />
    </>
  );
}
