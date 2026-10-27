"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ChevronRight,
  Home,
  Briefcase,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useSelection } from "@/context/selection-context";
import { SearchDialog } from "@/components/search/search-dialog";
import { siteConfig } from "@/lib/site-config";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";

export function Header() {
  const pathname = usePathname();
  const { count, openDrawer } = useSelection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");

  // Mobile accordion states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    wedding: false,
    business: false,
  });

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Scroll detection to hide top notice bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  // Active link helper
  const isBusinessActive =
    pathname === "/visiting-cards" ||
    pathname === "/bill-books" ||
    pathname === "/pamphlets-brochures" ||
    pathname.includes("service=letterheads");

  const isWeddingActive = pathname.startsWith("/wedding-cards");
  const isFlexActive = pathname.startsWith("/flex-banners");
  const isEnvelopesActive = pathname.startsWith("/envelopes-stationery");
  const isCustomActive = pathname === "/custom-enquiry" && !pathname.includes("service=letterheads");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md shadow-xs border-b border-border/40">
        {/* Top Atelier Bar: location, hours, phone only. Hidden on scroll */}
        <div
          className={`bg-surface-high/90 text-muted-foreground text-xs leading-tight transition-all duration-300 ease-in-out border-b ${
            isScrolled
              ? "max-h-0 opacity-0 py-0 border-transparent overflow-hidden pointer-events-none"
              : "max-h-12 opacity-100 py-2 border-border/50 px-3 sm:px-5 lg:px-6 xl:px-8"
          }`}
        >
          <div className="max-w-[1536px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{siteConfig.addressShort}</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{siteConfig.hours}</span>
              </span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-20 max-w-[1536px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 flex items-center justify-between gap-2 xl:gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 xl:gap-3 shrink-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-4 h-4 xl:w-5 xl:h-5 text-secondary" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg xl:text-xl font-bold tracking-tight text-primary leading-tight whitespace-nowrap">
                {siteConfig.name}
              </span>
              <span className="text-[10px] xl:text-[11px] uppercase tracking-wider text-secondary font-semibold font-devanagari whitespace-nowrap">
                {siteConfig.nameHindi} • Estd. {siteConfig.establishedYear}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Single line, compact luxury pills, perfectly balanced) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
            {/* 1. Wedding Cards (Mega Menu) */}
            <div className="relative group py-6 shrink-0">
              <Link
                href="/wedding-cards"
                className={`whitespace-nowrap shrink-0 flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] 2xl:text-sm transition-all duration-200 ${
                  isWeddingActive
                    ? "bg-primary/10 text-primary font-bold shadow-2xs border border-primary/20"
                    : "text-foreground/80 hover:text-primary hover:bg-surface-container/60 font-medium"
                }`}
              >
                <span>{lang === "hi" ? "शाही विवाह" : "Wedding Cards"}</span>
                <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-muted-foreground group-hover:text-primary group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-0 w-96 bg-surface-lowest p-5 rounded-2xl shadow-2xl border border-border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Royal Nuptials • शाही विवाह
                  </span>
                  <Link
                    href="/wedding-cards"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    View All (140+) →
                  </Link>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/wedding-cards"
                    className="p-3 rounded-xl hover:bg-surface-low transition-colors"
                  >
                    <div className="text-sm font-semibold text-foreground">Royal Farman & Scrolls</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Velvet, tussar silk and hand-cast gold brass finials
                    </div>
                  </Link>
                  <Link
                    href="/wedding-cards"
                    className="p-3 rounded-xl hover:bg-surface-low transition-colors"
                  >
                    <div className="text-sm font-semibold text-foreground">Laser-Cut & Velvet Hardbound</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Intricate royal jali latticework with 24k gold foil inlays
                    </div>
                  </Link>
                  <Link
                    href="/wedding-cards"
                    className="p-3 rounded-xl hover:bg-surface-low transition-colors"
                  >
                    <div className="text-sm font-semibold text-foreground">Minimalist Cotton Rag</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      600 GSM deckled edge letterpress typography
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Business Printing (Dropdown) */}
            <div className="relative group py-6 shrink-0">
              <button
                type="button"
                className={`whitespace-nowrap shrink-0 flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] 2xl:text-sm transition-all duration-200 ${
                  isBusinessActive
                    ? "bg-primary/10 text-primary font-bold shadow-2xs border border-primary/20"
                    : "text-foreground/80 hover:text-primary hover:bg-surface-container/60 font-medium"
                }`}
              >
                <span className="hidden xl:inline">{lang === "hi" ? "व्यापारिक मुद्रण" : "Business Printing"}</span>
                <span className="xl:hidden">{lang === "hi" ? "व्यापार" : "Business"}</span>
                <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-muted-foreground group-hover:text-primary group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-80 bg-surface-lowest p-4 rounded-2xl shadow-2xl border border-border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-2.5 pb-1 border-b border-border/60">
                  Commercial Printing Desk
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/visiting-cards"
                    className={`p-2.5 rounded-lg hover:bg-surface-low transition-colors ${
                      pathname === "/visiting-cards" ? "bg-surface-container font-semibold" : ""
                    }`}
                  >
                    <div className="text-sm font-semibold text-foreground">Visiting Cards</div>
                    <div className="text-xs text-muted-foreground">800 GSM cotton stock & gilded edges</div>
                  </Link>
                  <Link
                    href="/bill-books"
                    className={`p-2.5 rounded-lg hover:bg-surface-low transition-colors ${
                      pathname === "/bill-books" ? "bg-surface-container font-semibold" : ""
                    }`}
                  >
                    <div className="text-sm font-semibold text-foreground">Bill Books & Ledgers</div>
                    <div className="text-xs text-muted-foreground">Carbonless duplicate/triplicate numbering</div>
                  </Link>
                  <Link
                    href="/custom-enquiry?service=letterheads"
                    className="p-2.5 rounded-lg hover:bg-surface-low transition-colors"
                  >
                    <div className="text-sm font-semibold text-foreground">Letterheads & Pads</div>
                    <div className="text-xs text-muted-foreground">Executive watermarked & bond stationery</div>
                  </Link>
                  <Link
                    href="/pamphlets-brochures"
                    className={`p-2.5 rounded-lg hover:bg-surface-low transition-colors ${
                      pathname === "/pamphlets-brochures" ? "bg-surface-container font-semibold" : ""
                    }`}
                  >
                    <div className="text-sm font-semibold text-foreground">Pamphlets & Brochures</div>
                    <div className="text-xs text-muted-foreground">High-definition glossy flyers & leaflets</div>
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Banners & Flex */}
            <Link
              href="/flex-banners"
              className={`whitespace-nowrap shrink-0 px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] 2xl:text-sm transition-all duration-200 ${
                isFlexActive
                  ? "bg-primary/10 text-primary font-bold shadow-2xs border border-primary/20"
                  : "text-foreground/80 hover:text-primary hover:bg-surface-container/60 font-medium"
              }`}
            >
              <span>{lang === "hi" ? "फ्लेक्स" : "Banners & Flex"}</span>
            </Link>

            {/* 4. Envelopes & Stationery */}
            <Link
              href="/envelopes-stationery"
              className={`whitespace-nowrap shrink-0 px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] 2xl:text-sm transition-all duration-200 ${
                isEnvelopesActive
                  ? "bg-primary/10 text-primary font-bold shadow-2xs border border-primary/20"
                  : "text-foreground/80 hover:text-primary hover:bg-surface-container/60 font-medium"
              }`}
            >
              <span className="hidden xl:inline">{lang === "hi" ? "शगुन लिफाफे" : "Envelopes & Stationery"}</span>
              <span className="xl:hidden">{lang === "hi" ? "लिफाफे" : "Stationery"}</span>
            </Link>

            {/* 5. Custom Order */}
            <Link
              href="/custom-enquiry"
              className={`whitespace-nowrap shrink-0 px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] 2xl:text-sm transition-all duration-200 ${
                isCustomActive
                  ? "bg-secondary/15 text-secondary font-bold shadow-2xs border border-secondary/30"
                  : "text-secondary hover:text-primary hover:bg-secondary/10 font-semibold"
              }`}
            >
              <span>{lang === "hi" ? "कस्टम ऑर्डर" : "Custom Order"}</span>
            </Link>
          </nav>

          {/* Right Action Area (Optimized width, guaranteed visibility at 100% zoom) */}
          <div className="flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Search: Compact field at 2xl, sleek round icon button below that */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-low hover:bg-surface-container text-muted-foreground transition-all border border-border/60 text-xs w-36 text-left shrink-0"
              aria-label="Search designs"
            >
              <Search className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="truncate">{lang === "hi" ? "खोजें..." : "Search..."}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="2xl:hidden w-8 h-8 xl:w-8.5 xl:h-8.5 flex items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-surface-low transition-colors border border-border/40 shrink-0"
              aria-label="Search designs"
            >
              <Search className="w-3.5 h-3.5 text-secondary" />
            </button>

            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-surface-low p-0.5 rounded-full border border-border/60 shrink-0">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-1.5 xl:px-2 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold transition-all ${
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
                className={`px-1.5 xl:px-2 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold transition-all ${
                  lang === "hi"
                    ? "bg-surface-lowest text-primary shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                हिं
              </button>
            </div>

            {/* Selection Heart Button */}
            <button
              type="button"
              onClick={openDrawer}
              aria-label="View shortlisted stationery"
              className="relative flex items-center justify-center w-8 h-8 xl:w-auto xl:px-2.5 xl:py-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-surface-low transition-colors text-xs font-semibold border border-border/40 shrink-0"
            >
              <div className="relative flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold animate-in zoom-in">
                    {count}
                  </span>
                )}
              </div>
              <span className="hidden 2xl:inline text-xs ml-1.5">
                {lang === "hi" ? "मेरी पसंद" : "My Selection"}
              </span>
            </button>

            {/* WhatsApp Header CTA: Sleek icon-only circular action button */}
            <a
              href={buildGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              title="Chat with Master Artisan on WhatsApp"
              className="hidden sm:flex items-center justify-center w-8 h-8 xl:w-8.5 xl:h-8.5 rounded-full bg-[#128C7E] hover:bg-[#0e7064] text-white shadow-xs transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-white" />
            </a>

            {/* Mobile Hamburger Toggle (below lg) */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer (outside <header> to prevent backdrop-filter stacking trap) */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Full Screen Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Full Height Drawer Panel */}
          <div className="relative w-[85%] max-w-sm bg-surface-lowest h-[100dvh] shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 border-l border-border overflow-y-auto overscroll-contain">
            <div className="flex flex-col">
              {/* Drawer Header */}
              <div className="p-4 flex items-center justify-between border-b border-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                    <Sparkles className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold text-primary leading-tight">
                      {siteConfig.name}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-secondary font-semibold font-devanagari">
                      {siteConfig.nameHindi}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-surface-low rounded-xl transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Accordion Navigation */}
              <nav className="p-3 flex flex-col gap-1.5 text-sm">
                {/* Accordion 1: Wedding Cards */}
                <div className="rounded-xl border border-border/50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("wedding")}
                    className="w-full flex items-center justify-between px-3.5 py-3 font-semibold text-foreground bg-surface-container/40 hover:bg-surface-container transition-colors"
                  >
                    <span>{lang === "hi" ? "शाही विवाह निमंत्रण" : "Wedding Cards"}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        openAccordions.wedding ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordions.wedding && (
                    <div className="p-2 flex flex-col gap-1 bg-surface-lowest text-xs">
                      <Link
                        href="/wedding-cards"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="px-3 py-2 rounded-lg text-foreground hover:bg-surface-low font-medium"
                      >
                        Royal Farman & Scrolls (शाही फरमान)
                      </Link>
                      <Link
                        href="/wedding-cards"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="px-3 py-2 rounded-lg text-foreground hover:bg-surface-low font-medium"
                      >
                        Laser-Cut & Velvet Hardbound (वेलवेट व लेजर कट)
                      </Link>
                      <Link
                        href="/wedding-cards"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="px-3 py-2 rounded-lg text-foreground hover:bg-surface-low font-medium"
                      >
                        Minimalist Cotton Rag (हैंडमेड पेपर)
                      </Link>
                      <Link
                        href="/wedding-cards"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="px-3 py-2 rounded-lg text-primary font-bold hover:bg-surface-low border-t border-border/40 mt-1"
                      >
                        View All 140+ Suites (सभी देखें) →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Business Printing */}
                <div className="rounded-xl border border-border/50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("business")}
                    className="w-full flex items-center justify-between px-3.5 py-3 font-semibold text-foreground bg-surface-container/40 hover:bg-surface-container transition-colors"
                  >
                    <span>{lang === "hi" ? "व्यापारिक मुद्रण" : "Business Printing"}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        openAccordions.business ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordions.business && (
                    <div className="p-2 flex flex-col gap-1 bg-surface-lowest text-xs">
                      <Link
                        href="/visiting-cards"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="px-3 py-2 rounded-lg text-foreground hover:bg-surface-low font-medium"
                      >
                        Luxury Visiting Cards (विजिटिंग कार्ड्स)
                      </Link>
                      <Link
                        href="/bill-books"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="px-3 py-2 rounded-lg text-foreground hover:bg-surface-low font-medium"
                      >
                        Custom Bill Books & Ledgers (बिल बुक व रसीदें)
                      </Link>
                      <Link
                        href="/custom-enquiry?service=letterheads"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="px-3 py-2 rounded-lg text-foreground hover:bg-surface-low font-medium"
                      >
                        Letterheads & Pads (लेटरहेड)
                      </Link>
                      <Link
                        href="/pamphlets-brochures"
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="px-3 py-2 rounded-lg text-foreground hover:bg-surface-low font-medium"
                      >
                        Pamphlets & Brochures (पर्चे व ब्रोशर)
                      </Link>
                    </div>
                  )}
                </div>

                {/* 3. Banners & Flex */}
                <Link
                  href="/flex-banners"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-border/40 font-semibold text-foreground hover:bg-surface-low"
                >
                  <span>{lang === "hi" ? "फ्लेक्स व होर्डिंग्स" : "Banners & Flex"}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>

                {/* 4. Envelopes & Stationery */}
                <Link
                  href="/envelopes-stationery"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-border/40 font-semibold text-foreground hover:bg-surface-low"
                >
                  <span>{lang === "hi" ? "शगुन लिफाफे" : "Envelopes & Stationery"}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>

                {/* 5. Custom Order */}
                <Link
                  href="/custom-enquiry"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-secondary/30 bg-secondary/5 font-bold text-secondary hover:bg-secondary/10"
                >
                  <span>{lang === "hi" ? "कस्टम प्रिंटिंग ऑर्डर" : "Custom Printing Order"}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                {/* My Selection in Drawer */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    openDrawer();
                  }}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-primary/30 bg-primary/5 font-semibold text-primary hover:bg-primary/10 mt-1"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    <span>{lang === "hi" ? "मेरी पसंद" : "My Selection"}</span>
                  </div>
                  {count > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {count}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* Drawer Footer: Preferences & Contact Info */}
            <div className="p-4 border-t border-border/50 bg-surface-container/20 flex flex-col gap-4 pb-8">
              {/* Language & Theme Controls */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Language:</span>
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
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Theme:</span>
                  <ThemeToggle />
                </div>
              </div>

              {/* Atelier Contact Details */}
              <div className="text-xs text-muted-foreground space-y-2 pt-2 border-t border-border/40">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                  <span>{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>{siteConfig.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp pill on Mobile (positioned above bottom tab bar, exactly per Stitch design) */}
      <a
        href={buildGeneralEnquiryUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Enquiry"
        className="lg:hidden fixed bottom-20 right-4 z-40 h-11 px-3.5 rounded-full bg-[#128C7E] hover:bg-[#0e7064] text-white flex items-center gap-2 shadow-[0_6px_20px_rgba(18,140,126,0.35)] active:scale-95 transition-all text-xs font-bold"
      >
        <MessageCircle className="w-4 h-4 text-white" />
        <span>{lang === "hi" ? "व्हाट्सएप" : "WhatsApp"}</span>
      </a>

      {/* Stitch 4-Tab Mobile App Navigation Bar (below lg) */}
      <nav
        aria-label="Mobile Application Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface/95 backdrop-blur-xl border-t border-border/80 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
      >
        <div className="flex justify-around items-center h-16 px-1">
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex-1 flex flex-col items-center justify-center h-12 transition-colors ${
              pathname === "/"
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] mt-0.5 font-medium">
              {lang === "hi" ? "होम" : "Home"}
            </span>
          </Link>

          {/* 2. Wedding Cards */}
          <Link
            href="/wedding-cards"
            className={`flex-1 flex flex-col items-center justify-center h-12 transition-colors ${
              isWeddingActive
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-[10px] sm:text-[11px] mt-0.5 font-medium">
              {lang === "hi" ? "शादी कार्ड" : "Weddings"}
            </span>
          </Link>

          {/* 3. Business Printing */}
          <Link
            href="/visiting-cards"
            className={`flex-1 flex flex-col items-center justify-center h-12 transition-colors ${
              isBusinessActive
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] mt-0.5 font-medium">
              {lang === "hi" ? "व्यापार" : "Business"}
            </span>
          </Link>

          {/* 4. My Selection */}
          <button
            type="button"
            onClick={openDrawer}
            className="flex-1 flex flex-col items-center justify-center h-12 text-muted-foreground hover:text-primary transition-colors relative"
            aria-label="Open My Selection"
          >
            <div className="relative">
              <Heart className="w-5 h-5 text-primary" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] mt-0.5 font-medium">
              {lang === "hi" ? "मेरी पसंद" : "Selection"}
            </span>
          </button>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
