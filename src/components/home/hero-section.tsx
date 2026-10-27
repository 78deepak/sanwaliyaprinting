"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Package,
  Layers,
  Printer,
  Languages,
  CheckCircle2,
  Heart,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";
import { useSelection } from "@/context/selection-context";
import { Product } from "@/types/product";

interface HeroSectionProps {
  featuredProduct?: Product | null;
}

export function HeroSection({ featuredProduct }: HeroSectionProps) {
  const { toggleItem, hasItem } = useSelection();
  const rajwadaProduct = featuredProduct || null;
  const isSelected = rajwadaProduct ? hasItem(rajwadaProduct.id) : false;

  return (
    <section className="relative w-full overflow-hidden bg-background pt-4 sm:pt-8 pb-12 lg:py-20">
      {/* Mobile Announcement Top Ticker matching Stitch Screen 1 */}
      <aside className="sm:hidden -mx-4 -mt-4 mb-4 bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 min-w-0 pr-2">
          <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
          <p className="font-label-sm text-[11px] truncate tracking-wide text-primary-foreground/90">
            Ramsnehi Patidar Complex, Suwasra
          </p>
        </div>
        <a
          href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
          className="shrink-0 flex items-center gap-1 bg-primary-container text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs active:scale-95 transition-transform"
        >
          <Phone className="w-3 h-3 text-secondary" />
          <span>CALL NOW</span>
        </a>
      </aside>

      {/* Ambient gold and burgundy glow orbs */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Typographic Majesty (7 cols) */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Top Atelier Overline Badge */}
            <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 sm:px-3.5 py-1 font-label-sm text-xs text-primary uppercase tracking-wider shadow-xs border border-border/50">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                Sanwaliya Printing Press • सुवासरा (मंदसौर)
              </span>
              <a
                href="#swatch-kit"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3.5 py-1 font-label-sm font-bold text-secondary-foreground shadow-xs hover:opacity-90 transition-opacity"
              >
                <Package className="w-3.5 h-3.5" />
                Free 12-Paper Swatch Kit
              </a>
            </div>

            {/* Bilingual Main Headline matching Stitch Screen 1 */}
            <h1 className="font-display-lg text-2xl sm:text-4xl lg:text-5xl text-foreground tracking-tight leading-[1.15] mb-3 sm:mb-4">
              Beautiful Designs.
              <br />
              Quality Printing.
              <br />
              <span className="text-primary italic font-serif">
                Made Just for You.
              </span>
            </h1>

            {/* Hindi Subtitle Ribbon */}
            <div className="mb-4 sm:mb-6 flex items-center gap-3 rounded-lg bg-surface-container px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-xs border border-border/60">
              <span className="h-5 sm:h-6 w-1 rounded-full bg-secondary shrink-0" />
              <p className="font-headline-sm text-xs sm:text-sm text-secondary font-medium tracking-normal font-devanagari">
                उत्कृष्ट डिज़ाइन और राजसी मुद्रण — आपकी खास यादों के लिए।
              </p>
            </div>

            {/* Editorial Narrative */}
            <p className="font-body-lg text-xs sm:text-base text-muted-foreground max-w-2xl mb-6 sm:mb-8 leading-relaxed">
              Handcrafted bespoke wedding invitations, luxury gold foil visiting cards, hardbound bill books, and event banners. Browse our curated catalogue at Sanwaliya Printing Press, Suwasra, and consult directly with our master press artisans on WhatsApp.
            </p>

            {/* CTAs Bar: 2-column on mobile, flex on sm */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row items-stretch sm:items-center w-full sm:w-auto mb-6 sm:mb-8">
              <Link
                href="/wedding-cards"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-lg bg-primary px-4 sm:px-7 py-3 sm:py-3.5 font-label-md sm:font-label-lg text-xs sm:text-sm text-primary-foreground shadow-md hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Designs</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>

              <div className="flex flex-col gap-1">
                <a
                  href={buildGeneralEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-lg bg-[#128C7E] px-4 sm:px-6 py-3 sm:py-3.5 font-label-md sm:font-label-lg text-xs sm:text-sm text-white shadow-md hover:bg-[#0e7064] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>WhatsApp Quote</span>
                </a>
                <span className="hidden sm:flex text-center sm:text-left font-label-sm text-muted-foreground items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  Typically replies in 15 mins
                </span>
              </div>
            </div>

            {/* Mobile Featured Craft Finishes Swipe Strip matching Stitch Screen 1 */}
            <div className="sm:hidden w-full pb-4 pt-1">
              <div className="flex items-center justify-between pb-2 text-[11px] font-bold uppercase tracking-wider text-secondary">
                <span>Featured Craft Finishes</span>
                <span className="text-muted-foreground font-normal flex items-center gap-0.5">Swipe →</span>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none scroll-smooth">
                {/* 1. Rajwada Velvet */}
                <div className="min-w-[190px] w-[190px] rounded-xl bg-surface-container p-2.5 flex flex-col gap-2 shrink-0 border border-border/50 shadow-xs">
                  <div className="relative w-full h-24 rounded-lg overflow-hidden bg-surface-container-high">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJkNwF6A5Z5H925ql-_DGwvCXk8pLRQ23pNrKCfOdb0w6Ggor5wadr5Ya3ruBft3DPfvqXkNiYLJdP0BXtInkE5U0djHoAFBQ4pO0Yjh1350Kbu5P89Nu7bIt_ju65Y_wJh6ret9hwqLF1sZug4PlmvIdc3Yd5T6tOLO5RoZoKnV6I9KL-0fGxqOQUIB1sHecx-1RVZt3s6V7xiJx-Q3-RMEKvSkFrf6sjH08iaj3AF9mkDSo_-9qyqA"
                      alt="Rajwada Velvet Suite"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-primary/90 text-white font-label-sm text-[9px] font-bold">
                      Royal Velvet
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm text-primary font-bold leading-tight">Rajwada Velvet Suite</h4>
                    <p className="text-[11px] text-muted-foreground font-devanagari">शाही मखमल बक्सा • 24k Foil</p>
                  </div>
                </div>

                {/* 2. Handmade Rag */}
                <div className="min-w-[190px] w-[190px] rounded-xl bg-surface-container p-2.5 flex flex-col gap-2 shrink-0 border border-border/50 shadow-xs">
                  <div className="relative w-full h-24 rounded-lg overflow-hidden bg-surface-container-high">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqtL0S-8jNf-x7KUq6mUxbj7uGsQxgIo1UYZFh3vaIfAUpfvkfTjGzehvvSC2y8bbAC9090Kj73FRGdYvypovWTJuxAmEiQ6Co0TibNY_18oh45Z7rSs0m-YaKKR8uWyXSandTcN9Rp3bJHYmVsA3uI9t86ZJJyxAE4mOTph9PaftnNp5Bd4ibWwODphEIKdFFejui7Kg532bhSr6vVFOml9C0QksBa0IJpGB-U5QqRCHNo21T_YEs1w"
                      alt="Minimal Ivory Letterpress"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-secondary-foreground font-label-sm text-[9px] font-bold">
                      Handmade Rag
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm text-primary font-bold leading-tight">Minimal Ivory Press</h4>
                    <p className="text-[11px] text-muted-foreground font-devanagari">हाथ से बना कागज़ • 600 GSM</p>
                  </div>
                </div>

                {/* 3. Luxe Metallic */}
                <div className="min-w-[190px] w-[190px] rounded-xl bg-surface-container p-2.5 flex flex-col gap-2 shrink-0 border border-border/50 shadow-xs">
                  <div className="relative w-full h-24 rounded-lg overflow-hidden bg-surface-container-high">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqhIlKVHD9Y26TcVDm7u_7CkODnX1ceQD1EpIT5U806MwhgjttlONbT6_r4_oXIB5EAvaqSWy0tO6DaZLKDu8wcSIld3nAV9YwRp8B_t6n8EOBXxAsoptD5Ox5Q_MziBTRBjvA7RToUA7pKL2mc1YQC85fQRHTNUgxkeCB88RPuPacCL7y9-MYcukE2Af59T7X_sQZT5E6-B4BBN3XjU5paoVpiwP7SXLzIu1HZYuOgE6W-52161E49g"
                      alt="Luxe Metallic Cards"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-foreground text-background font-label-sm text-[9px] font-bold">
                      Gilded Edges
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm text-primary font-bold leading-tight">Luxe Metallic Cards</h4>
                    <p className="text-[11px] text-muted-foreground font-devanagari">बिजनेस कार्ड • Velvet Touch</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Atelier Quality Tickers (Desktop) */}
            <div className="hidden sm:flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1 font-label-sm text-foreground border border-border/50 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-secondary" /> Bespoke Foil Stamping
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1 font-label-sm text-foreground border border-border/50 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-secondary" /> 600+ GSM Cotton Rag
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1 font-label-sm text-foreground border border-border/50 shadow-2xs">
                <Printer className="w-3.5 h-3.5 text-secondary" /> Screen &amp; Letterpress
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1 font-label-sm text-foreground border border-border/50 shadow-2xs">
                <Languages className="w-3.5 h-3.5 text-secondary" /> English • हिन्दी • संस्कृत
              </span>
            </div>
          </div>

          {/* Right Column: Multi-Card Layered Collage (5 cols) */}
          <div className="relative lg:col-span-5 flex flex-col items-center">
            {/* Card 1: Jodhpur Royal Kundan Box */}
            <div className="relative z-30 w-full max-w-md rounded-xl bg-card p-5 shadow-xl border border-border transition-transform hover:-translate-y-1">
              <div className="relative mb-3.5 h-52 w-full overflow-hidden rounded-lg bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7xmMr9SleZ6bDf7rpGfHAW3s_yLVNoSTU3DTydj1x6TKaJp8f1DLll0d4-j4OMFZoNX2zU9JZD11droCKgU7gmID92FkWAtfrJFKCBejywZH0AcsE2Z71UNNEF1tJu6-TAaTGLhg-MXlgjhIk5K2cjmljTYCqDP3bGX1Ru7CObl5dibBeOf5VyzQS4QR4_2Ut4uOOSc1sgROfMfVMD4OXzVYZQ0vh7bNqpxE0O85tcej4gG3tJQVW0w"
                  alt="Royal wedding invitation box in deep crimson velvet"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 font-label-sm text-[10px] text-white uppercase tracking-wider">
                  RM-ROYAL-BOX • 900 GSM
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-surface-lowest/95 backdrop-blur-md px-2.5 py-0.5 font-label-sm text-secondary font-bold shadow-xs">
                  Kundan Velvet
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-sm text-primary font-bold">
                    The Jodhpur Kundan Box
                  </h2>
                  <p className="font-body-sm text-muted-foreground">
                    Velvet paper, embossed gold foil monogram &amp; floral jacket
                  </p>
                </div>
                {rajwadaProduct && (
                  <button
                    type="button"
                    onClick={() => toggleItem(rajwadaProduct)}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Shortlist design"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isSelected ? "fill-current text-primary" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Card 2: Minimalist Ivory Cotton Letterpress (Offset Stacked) */}
            <div className="relative z-20 -mt-8 -ml-8 sm:-ml-12 w-full max-w-md rounded-xl bg-surface-container p-4 shadow-lg border border-border transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3.5">
                <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpU9xq5yzzrBYc3BN9hjqbYK_3MSeIay9Ft2km5VFDI99pOIoiPP4wWaMKYqNWCKP0C7edRtO1sTJhXLUTCIPMwBasqPXz7J0MdA18y7iE5iBPtFl-kLQjfm6O2OU9hlAZPb0-NuRfX6uzaue4lX3-c1gQdUXhceLuGHjs80T79RHIBVunLJsU4qHD9T25I2PraCEwmveVHfnsbhZlvcer0K2yiiJg2a_Tlf3G5DITBHcPjbJevxzFNg"
                    alt="600 GSM double thick cotton rag paper"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full bg-surface-container-highest px-2 py-0.5 font-label-sm text-secondary mb-1">
                    Pure Cotton Rag
                  </span>
                  <h3 className="font-headline-sm text-foreground truncate">
                    Minimalist Ivory Cotton
                  </h3>
                  <p className="font-body-sm text-muted-foreground truncate">
                    600 GSM deckled edge letterpress typography
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
              </div>
            </div>

            {/* Card 3: Burgundy Wax Seal Suite */}
            <div className="relative z-10 -mt-6 ml-6 sm:ml-12 w-full max-w-sm rounded-xl bg-surface-high p-3.5 shadow-md border border-border/50 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Rjn-0wOa2cwHUEJ6jXZ9-Zja1mk1BcMb7K89tEcGNgLGDROTZMKfZZ528FMyRdvc5vAn_NF851TgHs1WWfwJQ1FUHC5bzNVU5613Kd3V0kEZ6AV5xnpQKakQWYhoiGgWkAaNexLRKaYmUcieK7mj_iORb-BtXS-OFl4S_Jmci5MWjiGbcKfhXpuEDx53PbFFlpC8GTBI9g2oH3TgGhK3vaLGxhFeVMRDu_uARyb4hBroK4s0mhD-nA"
                    alt="Burgundy wedding card envelope with antique gold wax seal"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-label-lg text-primary font-bold truncate">
                    Burgundy Wax Seal Suite
                  </h4>
                  <p className="font-body-sm text-muted-foreground truncate">
                    Heirloom lac seals &amp; calligraphy
                  </p>
                </div>
                <span className="font-label-sm text-secondary font-bold">
                  Estd. 1994
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
