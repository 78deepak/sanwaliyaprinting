"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Search,
  Heart,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useSelection } from "@/context/selection-context";
import { SearchDialog } from "@/components/search/search-dialog";
import { siteConfig } from "@/lib/site-config";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";

export function Header() {
  const { count, openDrawer } = useSelection();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md shadow-xs border-b border-border/40">
        {/* Top Atelier Archival Notice Bar */}
        <div className="bg-surface-high/90 text-muted-foreground text-xs leading-tight py-2 px-4 sm:px-8 lg:px-12 border-b border-border/50">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                {siteConfig.addressShort}
              </span>
              <span className="hidden md:flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                {siteConfig.hours}
              </span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-secondary" />
                {siteConfig.phone}
              </a>
              <span className="text-border">|</span>
              <a
                href={buildGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-tertiary font-semibold hover:opacity-85 transition-opacity"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Studio
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-primary leading-tight">
                {siteConfig.name}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary font-semibold font-devanagari">
                {siteConfig.nameHindi} • Estd. {siteConfig.establishedYear}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Wedding Suites Dropdown */}
            <div className="relative group py-6">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors"
              >
                Wedding Suites
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-muted-foreground group-hover:text-primary" />
              </button>
              <div className="absolute top-full left-0 w-80 bg-surface-lowest p-4 rounded-2xl shadow-2xl border border-border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-2.5 pb-1 border-b border-border/60">
                  Royal Nuptials • शाही विवाह
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/wedding-cards"
                    className="block px-3 py-2 rounded-lg hover:bg-surface-low transition-colors"
                  >
                    <div className="text-sm font-semibold text-foreground">Royal Farman & Scroll</div>
                    <div className="text-xs text-muted-foreground">Velvet, tussar silk, and hand-cast gold brass finials</div>
                  </Link>
                  <Link
                    href="/wedding-cards"
                    className="block px-3 py-2 rounded-lg hover:bg-surface-low transition-colors"
                  >
                    <div className="text-sm font-semibold text-foreground">Laser-Cut & Velvet Hardbound</div>
                    <div className="text-xs text-muted-foreground">Intricate royal jali latticework with foil inlays</div>
                  </Link>
                  <Link
                    href="/wedding-cards"
                    className="block px-3 py-2 rounded-lg hover:bg-surface-low transition-colors"
                  >
                    <div className="text-sm font-semibold text-foreground">Minimalist Cotton Rag</div>
                    <div className="text-xs text-muted-foreground">600 GSM deckled edge letterpress typography</div>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/visiting-cards"
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Visiting Cards
            </Link>

            <Link
              href="/bill-books"
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Bill Books
            </Link>

            <Link
              href="/flex-banners"
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Banners & Signage
            </Link>

            <Link
              href="/envelopes-stationery"
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Shagun Lifafas
            </Link>

            <Link
              href="/custom-enquiry"
              className="text-sm font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Bespoke Order
            </Link>
          </nav>

          {/* Right Action Icons & Switches */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-low hover:bg-surface-container text-muted-foreground transition-colors border border-border/60 text-xs"
            >
              <Search className="w-4 h-4 text-secondary" />
              <span>Search designs...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-surface-lowest text-muted-foreground rounded border border-border shadow-2xs">
                Ctrl+K
              </kbd>
            </button>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-surface-low p-0.5 rounded-lg border border-border/60">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  lang === "en"
                    ? "bg-surface-lowest text-primary shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  lang === "hi"
                    ? "bg-surface-lowest text-primary shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                हिं
              </button>
            </div>

            {/* Dark/Light Mode Switch */}
            <ThemeToggle />

            {/* Shortlist Heart Button */}
            <button
              type="button"
              onClick={openDrawer}
              aria-label="View shortlisted stationery"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-surface-low transition-colors"
            >
              <Heart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold animate-in zoom-in">
                  {count}
                </span>
              )}
            </button>

            {/* WhatsApp Header CTA */}
            <a
              href={buildGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 bg-tertiary hover:bg-tertiary-hover text-tertiary-foreground px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-surface border-t border-border px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              <Link
                href="/wedding-cards"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-foreground font-semibold hover:bg-surface-low"
              >
                Wedding Invitations (शाही विवाह निमंत्रण)
              </Link>
              <Link
                href="/visiting-cards"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-foreground font-semibold hover:bg-surface-low"
              >
                Luxury Visiting Cards (विजिटिंग कार्ड्स)
              </Link>
              <Link
                href="/bill-books"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-foreground font-semibold hover:bg-surface-low"
              >
                Bill Books & Ledgers (बिल बुक व रसीदें)
              </Link>
              <Link
                href="/flex-banners"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-foreground font-semibold hover:bg-surface-low"
              >
                Banners & Signage (फ्लेक्स बैनर)
              </Link>
              <Link
                href="/envelopes-stationery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-foreground font-semibold hover:bg-surface-low"
              >
                Shagun Lifafas (शगुन लिफाफे)
              </Link>
              <Link
                href="/custom-enquiry"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-secondary font-bold hover:bg-surface-low flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> Custom Printing Enquiry
              </Link>
            </div>
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <a
                href={buildGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-tertiary text-white py-3 rounded-lg font-semibold text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp (+91 98765 43210)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
