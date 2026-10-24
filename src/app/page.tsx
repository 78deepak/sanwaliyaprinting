import { HeroSection } from "@/components/home/hero-section";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FeaturedSection } from "@/components/home/featured-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { SwatchKitBanner } from "@/components/home/swatch-kit-banner";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col pt-24 sm:pt-28">
      <HeroSection />
      <CategoriesGrid />
      <FeaturedSection />
      <HowItWorks />
      <SwatchKitBanner />
    </div>
  );
}
