import { HeroSection } from "@/components/home/hero-section";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FeaturedSection } from "@/components/home/featured-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { AtelierLocationCard } from "@/components/home/atelier-location-card";
import { SwatchKitBanner } from "@/components/home/swatch-kit-banner";
import { getFeatured, getDashboardStats } from "@/lib/products";

export default async function HomePage() {
  const [featuredProducts, stats] = await Promise.all([
    getFeatured(8),
    getDashboardStats(),
  ]);

  return (
    <div className="w-full flex flex-col pt-20 sm:pt-28">
      <HeroSection featuredProduct={featuredProducts[0] || null} />
      <CategoriesGrid categoryCounts={stats.categoryCounts} />
      <FeaturedSection products={featuredProducts} />
      <HowItWorks />
      <AtelierLocationCard />
      <SwatchKitBanner />
    </div>
  );
}
