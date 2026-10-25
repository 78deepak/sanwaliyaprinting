import React from "react";
import Link from "next/link";
import { Sparkles, Home, Search, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-8">
      <div className="max-w-xl w-full bg-card p-8 sm:p-12 rounded-3xl border border-border/80 shadow-lg text-center space-y-6">
        {/* Atelier Crest Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xs">
          <Sparkles className="w-10 h-10 text-secondary" />
        </div>

        {/* Bilingual Heading */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Error 404 • पृष्ठ उपलब्ध नहीं है
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Design Specimen Not Found
          </h1>
          <p className="font-serif text-sm text-secondary font-devanagari italic">
            क्षमा करें, यह डिज़ाइन या पृष्ठ कैटलॉग में उपलब्ध नहीं है।
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          The stationery collection, custom invitation suite, or page URL you are seeking may have been archived or repositioned in our studio register.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary-container transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>

          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-low hover:bg-surface-container text-foreground font-semibold text-xs border border-border/70 transition-colors"
          >
            <Search className="w-4 h-4 text-secondary" />
            <span>Search Catalogue</span>
          </Link>
        </div>

        {/* Atelier WhatsApp Direct Support */}
        <div className="pt-4 border-t border-border/60">
          <a
            href={buildGeneralEnquiryUrl("Namaste Sanwaliya Press! I landed on a missing page and need help locating a design.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-tertiary hover:opacity-85 transition-opacity"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask our Master Pressman on WhatsApp ({siteConfig.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
