"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  Send,
  Home,
  ChevronRight,
  ShieldCheck,
  Edit3,
  X,
  Share2,
  Sparkles,
  MapPin,
  Truck,
  RotateCcw,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useSelection } from "@/context/selection-context";
import { buildShortlistEnquiryUrl } from "@/lib/whatsapp";

export function SelectionClient() {
  const { items, count, removeItem, updateQuantity, updateNote, clearSelection } =
    useSelection();
  const [generalNote, setGeneralNote] = useState("");
  const [copied, setCopied] = useState(false);

  const whatsappUrl = buildShortlistEnquiryUrl(items, generalNote);

  const messagePreview = [
    "Namaste Sanwaliya Printing Press team, I would like a quote for my shortlisted designs:",
    "",
    ...items.map(
      (item, idx) =>
        `${idx + 1}. ${item.productCode} (${item.name}) - Qty: ${item.quantity}${
          item.selectedPaper ? ` | Paper: ${item.selectedPaper}` : ""
        }${item.note ? `\n   Note: ${item.note}` : ""}`
    ),
    "",
    generalNote ? `Overall Request: ${generalNote}\n` : "",
    "Delivery: Suwasra / Mandsaur\nPlease share quotation & proof timeline.",
  ].join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(messagePreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({
          title: "My Shortlist - Sanwaliya Printing Press",
          text: messagePreview,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(messagePreview);
        alert("Quotation copied to clipboard! (कोटेशन कॉपी हो गया)");
      }
    }
  };

  return (
    <div className="w-full flex flex-col pt-16 sm:pt-28 pb-24 lg:pb-12">
      {/* Top Mobile Header Section matching Stitch Screen 4 */}
      <section className="px-4 pt-3 pb-2 sm:hidden border-b border-border/50 bg-surface-low">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">
                Bespoke Atelier
              </span>
            </div>
            <h1 className="font-headline-sm text-base text-primary font-bold tracking-tight">
              My Shortlist <span className="text-secondary font-normal">({count} Items)</span>
            </h1>
            <p className="text-[11px] text-muted-foreground font-devanagari">
              मेरी चुनी हुई डिज़ाइन्स व कोटेशन
            </p>
          </div>
          {count > 0 && (
            <button
              type="button"
              onClick={clearSelection}
              className="h-8 px-2.5 rounded-lg bg-surface-container flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive active:bg-surface-high transition-colors border border-border/50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </section>

      {/* Top Archival Ribbon (Desktop) */}
      <section className="hidden sm:block relative w-full bg-surface-low px-4 sm:px-8 lg:px-12 py-10 border-b border-border/60">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-primary font-bold">My Shortlist ({count})</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                राजकीय मुद्रणालय • विशेषाधिकार सूची
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-primary tracking-tight">
                My Curated Print Selection
              </h1>
              <p className="font-serif text-base text-secondary font-devanagari italic">
                मेरी चुनी हुई डिज़ाइन्स &amp; त्वरित कोटेशन
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl pt-1">
                Review your favorite bespoke designs, customize estimated volume tiers, and dispatch your consolidated wishlist directly to our Master Pressman on WhatsApp in one tactile click. No checkout queues.
              </p>
            </div>

            <div className="lg:col-span-4 bg-surface-lowest p-5 rounded-2xl border border-border/70 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>Atelier Guarantee</span>
                </div>
                <span className="text-xs font-bold text-tertiary">100% Bespoke</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-surface-low p-2.5 rounded-xl border border-border/40">
                  <div className="font-serif text-xl font-bold text-primary">₹0</div>
                  <div className="text-[10px] text-muted-foreground">Digital Proofing</div>
                </div>
                <div className="bg-surface-low p-2.5 rounded-xl border border-border/40">
                  <div className="font-serif text-xl font-bold text-secondary">5-8 d</div>
                  <div className="text-[10px] text-muted-foreground">Avg. Dispatch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dossier Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-12 w-full">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 sm:p-16 bg-card rounded-2xl sm:rounded-3xl border border-border/80 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="font-headline-sm text-lg sm:text-2xl font-bold text-foreground">
                Your Shortlist is Empty
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                Browse our royal wedding or corporate stationery catalogue to shortlist items.
              </p>
            </div>
            <Link
              href="/wedding-cards"
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary-container transition-colors shadow-sm"
            >
              Browse Wedding Catalog • कैटलॉग देखें
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Left 7 cols: Items List */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-5">
              <div className="hidden sm:flex items-center justify-between pb-2 border-b border-border/50">
                <h3 className="font-serif text-base font-bold text-foreground">
                  Shortlist Dossier ({count} Active Compositions)
                </h3>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs text-destructive hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Portfolio
                </button>
              </div>

              {items.map((item) => (
                <article
                  key={item.productId}
                  className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-card border border-border/80 shadow-xs space-y-3 sm:space-y-4"
                >
                  {/* Mobile Compact Layout matching Stitch Screen 4 */}
                  <div className="flex gap-3 sm:gap-5 items-start">
                    <div className="relative shrink-0 w-20 h-20 sm:w-36 sm:h-36 rounded-lg sm:rounded-xl overflow-hidden bg-surface-container border border-border/50 shadow-2xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.thumbnailUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 sm:top-2 sm:left-2 px-1.5 sm:px-2 py-0.5 rounded bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold">
                        {item.productCode}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-label-sm text-[11px] sm:text-xs text-secondary font-bold tracking-wider">
                            {item.productCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                            title="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className="font-headline-sm text-sm sm:text-base font-bold text-primary truncate leading-tight mt-0.5">
                          {item.name}
                        </h4>
                        {item.selectedPaper ? (
                          <p className="text-[11px] sm:text-xs text-muted-foreground truncate mt-0.5">
                            {item.selectedPaper}
                          </p>
                        ) : item.nameHi ? (
                          <p className="text-[11px] text-secondary font-devanagari truncate mt-0.5">
                            {item.nameHi}
                          </p>
                        ) : null}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between sm:justify-start gap-3 mt-2 pt-1 border-t sm:border-t-0 border-border/40">
                        <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground">
                          Quantity:
                        </span>
                        <div className="flex items-center bg-surface-low rounded-lg border border-border p-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                Math.max(10, item.quantity - 25)
                              )
                            }
                            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-surface-lowest rounded text-foreground font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-12 sm:w-14 text-center text-xs font-bold text-primary">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 25)
                            }
                            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-surface-lowest rounded text-foreground font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inline Bespoke Note matching Stitch */}
                  <div className="pt-2 sm:pt-3 border-t border-border/40 flex items-center gap-2 bg-surface-low p-2 rounded-lg">
                    <Edit3 className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <input
                      type="text"
                      value={item.note || ""}
                      onChange={(e) => updateNote(item.productId, e.target.value)}
                      placeholder="Custom requirement / विशेष निर्देश..."
                      className="w-full bg-transparent border-0 text-xs text-foreground placeholder:text-muted-foreground outline-none"
                    />
                  </div>
                </article>
              ))}

              {/* Guarantees & Workshop Trust Pills matching Stitch Screen 4 */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="bg-surface-low p-3 rounded-xl flex items-center gap-2 border border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-secondary-foreground shrink-0">
                    <Sparkles className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-primary leading-tight">Zero Advance</span>
                    <span className="text-[10px] text-muted-foreground">डिजिटल ड्राफ्ट प्रूफिंग फ्री</span>
                  </div>
                </div>

                <div className="bg-surface-low p-3 rounded-xl flex items-center gap-2 border border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Truck className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-primary leading-tight">Doorstep Delivery</span>
                    <span className="text-[10px] text-muted-foreground">सुवासरा, मंदसौर व पार्सल</span>
                  </div>
                </div>
              </div>

              {/* Workshop Address & Printing Assurance Badge matching Stitch */}
              <div className="bg-surface-container p-3 sm:p-4 rounded-xl flex items-center justify-between border border-border/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-primary">सांवलिया प्रिंटिंग प्रेस - सुवासरा</span>
                    <span className="text-[11px] text-muted-foreground">सदर बाज़ार, सुवासरा (मंदसौर, म.प्र.)</span>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-surface-lowest flex items-center gap-1 shadow-2xs text-secondary text-[11px] font-bold border border-border/40">
                  <span>4.9★</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Consolidated Desk & WhatsApp Dispatch */}
            <div className="lg:col-span-5 sticky top-32 space-y-5">
              <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border/80 shadow-lg space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                      Consolidated Desk
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-primary">
                      WhatsApp Dispatch Drawer
                    </h3>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                    <Send className="w-4 h-4" />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-low p-3 rounded-xl border border-border/50">
                    <span className="block text-[11px] text-muted-foreground">Designs Selected</span>
                    <span className="font-serif text-base sm:text-lg font-bold text-primary">{count} Items</span>
                  </div>
                  <div className="bg-surface-low p-3 rounded-xl border border-border/50">
                    <span className="block text-[11px] text-muted-foreground">Turnaround</span>
                    <span className="font-serif text-base sm:text-lg font-bold text-secondary">5-8 Days</span>
                  </div>
                </div>

                {/* Overall Request Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Event Date &amp; Delivery Details
                  </label>
                  <input
                    type="text"
                    value={generalNote}
                    onChange={(e) => setGeneralNote(e.target.value)}
                    placeholder="e.g. Wedding Date: Dec 2026, Destination: Indore..."
                    className="w-full bg-surface-low px-3.5 py-2.5 rounded-xl text-xs text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary"
                  />
                </div>

                {/* WhatsApp Message Preview Bubble matching Stitch */}
                <div className="bg-surface-low p-3.5 rounded-xl border border-border/70 space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-bold flex items-center gap-1.5 text-tertiary">
                      <MessageCircle className="w-4 h-4" /> WhatsApp Text Preview
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-secondary hover:text-primary font-semibold flex items-center gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-tertiary" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Text
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-muted-foreground bg-surface-lowest p-2.5 rounded-lg font-mono max-h-36 overflow-y-auto whitespace-pre-wrap select-all">
                    {messagePreview}
                  </pre>
                </div>

                {/* Dispatch Trigger (Desktop) */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex w-full py-4 px-6 rounded-xl bg-tertiary hover:bg-tertiary-hover text-white font-semibold text-sm shadow-md transition-all items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Shortlist on WhatsApp ({count} Items)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sticky Mobile Bottom Bar matching Stitch Screen 4 */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md px-4 py-2.5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-2.5 sm:hidden border-t border-border/60">
          {/* WhatsApp Primary Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 rounded-xl bg-[#128C7E] text-white flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform px-3"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <div className="flex flex-col items-start leading-tight">
              <span className="font-label-md text-xs font-bold">Send to WhatsApp</span>
              <span className="text-[10px] text-white/90 font-devanagari">व्हाट्सएप पर तुरंत कोटेशन पाएं</span>
            </div>
          </a>

          {/* Secondary Share Action */}
          <button
            type="button"
            onClick={handleShare}
            className="h-12 px-3 rounded-xl bg-surface-container text-primary flex items-center justify-center gap-1 active:bg-surface-high transition-colors border border-border/60"
            title="Share Shortlist"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
