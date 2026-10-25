import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/data/categories";
import { getPublishedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/custom-enquiry`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/selection`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // 2. Category Pages
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Dynamic Published Product Pages from MongoDB
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const { items: products } = await getPublishedProducts({ limit: 1000 });
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/${product.category}/${product.slug}`,
      lastModified: product.createdAt ? new Date(product.createdAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (error) {
    console.warn("⚠️ Failed to generate product routes for sitemap:", error);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
