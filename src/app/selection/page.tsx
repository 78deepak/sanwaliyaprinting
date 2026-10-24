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
} from "lucide-react";
import { useSelection } from "@/context/selection-context";
import { buildShortlistEnquiryUrl } from "@/lib/whatsapp";

export default function SelectionPage() {
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
    "Please share consolidated pricing and delivery timeline.",
  ].join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(messagePreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col pt-24 sm:pt-28">
      {/* Top Archival Ribbon */}
      <section className="relative w-full bg-surface-low px-4 sm:px-8 lg:px-12 py-10 border-b border-border/60">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 w-full">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-16 bg-card rounded-3xl border border-border/80 shadow-xs space-y-4">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-secondary">
              <Heart className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Your Shortlist is Quiet
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                You haven&apos;t preserved any print suites in your current session yet. Explore our Royal Wedding or Corporate Atelier catalogues to begin.
              </p>
            </div>
            <Link
              href="/wedding-cards"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary-container transition-colors shadow-sm"
            >
              Browse Wedding Catalog • कैटलॉग देखें
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 cols: Items List */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
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
                  className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="relative shrink-0 w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-surface-container border border-border/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.thumbnailUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-bold">
                        {item.productCode}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-serif text-base font-bold text-primary">
                              {item.name}
                            </h4>
                            {item.nameHi && (
                              <p className="text-xs text-secondary font-devanagari font-medium">
                                {item.nameHi}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-surface-low rounded-lg transition-colors"
                            title="Remove design"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Specs Strip */}
                        <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                          {item.selectedSize && (
                            <div className="bg-surface-low p-2 rounded-lg border border-border/40">
                              <span className="block text-[10px] text-muted-foreground uppercase font-bold">
                                Size
                              </span>
                              <span className="font-semibold text-foreground truncate block">
                                {item.selectedSize}
                              </span>
                            </div>
                          )}
                          {item.selectedPaper && (
                            <div className="bg-surface-low p-2 rounded-lg border border-border/40">
                              <span className="block text-[10px] text-muted-foreground uppercase font-bold">
                                Material
                              </span>
                              <span className="font-semibold text-secondary truncate block">
                                {item.selectedPaper}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Estimated Qty:
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
                            className="w-7 h-7 flex items-center justify-center hover:bg-surface-lowest rounded text-foreground font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-14 text-center text-xs font-bold text-primary">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 25)
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-surface-lowest rounded text-foreground font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inline Bespoke Note */}
                  <div className="pt-3 border-t border-border/40 flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-secondary shrink-0" />
                    <input
                      type="text"
                      value={item.note || ""}
                      onChange={(e) => updateNote(item.productId, e.target.value)}
                      placeholder="Atelier Bespoke Note (विशेष निर्देश)..."
                      className="w-full bg-surface-low px-3 py-2 rounded-lg text-xs text-foreground placeholder:text-muted-foreground border border-border/60 outline-none focus:border-primary"
                    />
                  </div>
                </article>
              ))}
            </div>

            {/* Right 5 cols: Consolidated Desk & WhatsApp Dispatch */}
            <div className="lg:col-span-5 sticky top-32 space-y-5">
              <div className="bg-card p-6 rounded-2xl border border-border/80 shadow-lg space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                      Consolidated Desk
                    </span>
                    <h3 className="font-serif text-lg font-bold text-primary">
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
                    <span className="font-serif text-lg font-bold text-primary">{count} Items</span>
                  </div>
                  <div className="bg-surface-low p-3 rounded-xl border border-border/50">
                    <span className="block text-[11px] text-muted-foreground">Turnaround</span>
                    <span className="font-serif text-lg font-bold text-secondary">5-8 Days</span>
                  </div>
                </div>

                {/* Overall Request Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Event Date & Delivery Details
                  </label>
                  <input
                    type="text"
                    value={generalNote}
                    onChange={(e) => setGeneralNote(e.target.value)}
                    placeholder="e.g. Wedding Date: Dec 2026, Destination: Indore..."
                    className="w-full bg-surface-low px-3.5 py-2.5 rounded-xl text-xs text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary"
                  />
                </div>

                {/* WhatsApp Message Preview */}
                <div className="bg-surface-low p-3.5 rounded-xl border border-border/70 space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-bold flex items-center gap-1 text-tertiary">
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

                {/* Dispatch Trigger */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-tertiary hover:bg-tertiary-hover text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Shortlist on WhatsApp ({count} Items)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
