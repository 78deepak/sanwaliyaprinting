import React from "react";
import { MapPin, Clock, Navigation, Phone, MessageSquare, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";

export function AtelierLocationCard() {
  const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`;
  const urgentWhatsappUrl = `${buildGeneralEnquiryUrl()}?text=${encodeURIComponent(
    "Namaste Sanwaliya Press, I need urgent custom design / same day printing."
  )}`;

  return (
    <section className="w-full bg-background py-10 sm:py-16 px-4 sm:px-8 lg:px-12 border-t border-border/60">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 font-label-sm uppercase tracking-widest text-secondary font-bold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Visit Our Atelier • प्रत्यक्ष अवलोकन</span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-primary font-medium tracking-tight">
              पधारें हमारी दुकान पर
            </h2>
          </div>
          <span className="hidden sm:inline-block font-label-sm text-xs text-muted-foreground">
            Sadar Bazar, Suwasra
          </span>
        </div>

        <div className="rounded-2xl bg-surface-low p-4 sm:p-6 flex flex-col gap-5 border border-border/70 shadow-xs">
          {/* Map Visual Banner */}
          <div
            className="w-full h-44 sm:h-64 bg-cover bg-center rounded-xl overflow-hidden relative shadow-inner border border-border/50"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCLzraG9KxV3OmCLV1hCeEkpV3aBJeob8LcvKXtiopMcuMPEEnkfZAkdgeMtjhbnp1o2Y3ooyhG0yHsCKUjkIOL7-HD-0ea7W85sDeuav4DsP8w9Ayi2f8MxD7qHYxhe74wEfMWsf7MSxtkKrr-RtSzJHIkZwvpGlZlIPjdSZvBEUi7PKSGJrzLR4Xf2GmQfDuSqoLtoSF8ZFP3sMTcb3xI1X2x2CJz_o30Mf5KqzSTtYNoCMYFZEgcQ')",
            }}
          >
            <div className="absolute inset-0 bg-primary/10 backdrop-contrast-[1.05]" />
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-surface-lowest/95 backdrop-blur-md shadow-xs flex items-center gap-2 border border-border/50">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="font-label-sm text-xs text-foreground font-bold">
                Suwasra Main Market • सभा चौक
              </span>
            </div>
          </div>

          {/* Studio Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-sm sm:text-base text-primary font-bold">
                  {siteConfig.name}
                </h4>
                <p className="font-body-sm text-xs sm:text-sm text-muted-foreground leading-relaxed mt-0.5">
                  {siteConfig.address}
                </p>
                <p className="font-label-sm text-xs text-secondary font-devanagari font-medium mt-0.5">
                  रामस्नेही पाटीदार कॉम्प्लेक्स, सभा चौक के पास, सुवासरा (मंदसौर)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-sm sm:text-base text-primary font-bold">
                  Atelier Hours
                </h4>
                <p className="font-body-sm text-xs sm:text-sm text-muted-foreground leading-relaxed mt-0.5">
                  <strong className="text-foreground">Open Daily:</strong> {siteConfig.hours}
                </p>
                <p className="font-label-sm text-xs text-tertiary font-medium mt-0.5">
                  Sunday open for wedding card consultations
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-lg bg-surface-lowest text-primary hover:bg-surface-container font-label-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-border/60 shadow-2xs transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>

            <a
              href={telHref}
              className="h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary-container font-label-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Phone className="w-4 h-4 text-secondary" />
              <span>Call Atelier</span>
            </a>
          </div>

          {/* Quick Consultation Banner matching Stitch */}
          <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between border border-border/40">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <MessageSquare className="w-4 h-4 text-secondary shrink-0" />
              <span className="font-label-sm text-xs text-foreground font-semibold truncate">
                Need custom branding or urgent flex banner?
              </span>
            </div>
            <a
              href={urgentWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label-sm text-xs text-primary font-bold whitespace-nowrap hover:underline shrink-0"
            >
              Chat Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
