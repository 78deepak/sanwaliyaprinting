import React from "react";
import { Package, Sparkles, MessageCircle, Check } from "lucide-react";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";

export function SwatchKitBanner() {
  const whatsappUrl = buildGeneralEnquiryUrl(
    "Namaste Sanwaliya Press! I would like to request the Free 12-Paper Swatch Kit delivered to my address. Please let me know how to proceed."
  );

  return (
    <section className="w-full bg-background py-16 px-4 sm:px-8 lg:px-12" id="swatch-kit">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-3xl bg-surface-low border border-border/80 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-container text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                <Package className="w-3.5 h-3.5" />
                <span>Complimentary Swatch Book • निःशुल्क नमूना किट</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                Touch the Craft Before You Decide
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Experience tactile luxury firsthand. Our curated sample box includes 12 physical specimens: 600 GSM double-thick cotton rag, imported Dutch velvet swatches, genuine metallic 24k foil stampings, triplex business cards, and handmade shagun lifafas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-foreground font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary shrink-0" />
                  <span>12 Physical Paper & Material Swatches</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary shrink-0" />
                  <span>Foil Stamp & Blind Deboss Impressions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary shrink-0" />
                  <span>Delivered to Your Doorstep Across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary shrink-0" />
                  <span>Includes Sample Monogram Wax Seal</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-primary-foreground text-sm font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Order Free Swatch Kit</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-tertiary hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Or ask our press team on WhatsApp →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
