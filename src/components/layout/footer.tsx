import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/data/categories";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <footer className="w-full bg-surface-low border-t border-border mt-20">
      {/* Upper Atelier Assurance Strip */}
      <div className="border-b border-border/60 py-8 px-4 sm:px-8 lg:px-12 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">30+ Years Provenance</div>
              <div className="text-xs text-muted-foreground">Serving Malwa since 1994</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 text-secondary">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Single-Use Brass Dies</div>
              <div className="text-xs text-muted-foreground">Razor-sharp 24k foil debossing</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0 text-tertiary">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Zero-Error Proofing</div>
              <div className="text-xs text-muted-foreground">Devanagari matra & text verification</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">All India Shipping</div>
              <div className="text-xs text-muted-foreground">Doorstep tracked courier dispatch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Studio Heritage (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                  {siteConfig.name}
                </span>
                <span className="block text-xs uppercase tracking-widest text-secondary font-semibold font-devanagari">
                  {siteConfig.nameHindi}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {siteConfig.description}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-secondary">
                <Sparkles className="w-3 h-3" /> Heidelberg Letterpress
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-secondary">
                <Sparkles className="w-3 h-3" /> 800 GSM Cotton Mounts
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-secondary">
                <Sparkles className="w-3 h-3" /> Pure Tussar Silk
              </span>
            </div>
          </div>

          {/* Col 2: Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-secondary">
              Product Categories
            </div>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between"
                  >
                    <span>{c.name}</span>
                    <span className="text-xs text-secondary font-devanagari">
                      {c.nameHi}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Atelier Studio & Visit (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-widest text-secondary">
              Atelier Location & Hours
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Sanwaliya Printing Press</div>
                  <div>{siteConfig.address}</div>
                  <a
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-semibold text-secondary hover:text-primary underline mt-1"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <span>{siteConfig.hours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-primary transition-colors font-medium text-foreground"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={buildGeneralEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-tertiary text-white text-xs font-semibold shadow-xs hover:bg-tertiary-hover transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Direct WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Service Areas */}
        <div className="pt-10 mt-10 border-t border-border/60">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-bold text-foreground">Service Areas:</span>
            {siteConfig.serviceAreas.map((area, i) => (
              <span key={area} className="flex items-center gap-2">
                <span>{area}</span>
                {i < siteConfig.serviceAreas.length - 1 && (
                  <span className="text-border">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 mt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © 1994 – {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>सांवलिया प्रिंटिंग प्रेस • सुवासरा (मंदसौर)</span>
            <span className="text-border">|</span>
            <Link href="/custom-enquiry" className="hover:text-primary underline">
              Custom Orders
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/admin/login"
              className="hover:text-primary transition-colors text-muted-foreground/70 hover:underline"
              title="Shopkeeper Management Portal"
            >
              Admin Desk
            </Link>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Theme:</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
