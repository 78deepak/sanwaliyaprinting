"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  Send,
  Heart,
  Edit3,
} from "lucide-react";
import { useSelection } from "@/context/selection-context";
import { buildShortlistEnquiryUrl } from "@/lib/whatsapp";

export function SelectionDrawer() {
  const {
    items,
    count,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    updateNote,
    clearSelection,
  } = useSelection();

  const [generalNote, setGeneralNote] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isDrawerOpen) return null;

  const whatsappUrl = buildShortlistEnquiryUrl(items, generalNote);

  // Generate the formatted plain text for copying
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={closeDrawer} aria-hidden="true" />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-xl bg-surface-lowest h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-border">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-border/70 bg-surface-high/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 fill-current text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-foreground">
                My Shortlist Dossier
              </h2>
              <span className="text-xs text-muted-foreground font-devanagari">
                मेरी चुनी हुई डिज़ाइन्स ({count})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {count > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs text-destructive hover:underline px-2 py-1 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={closeDrawer}
              className="p-1.5 rounded-lg hover:bg-surface-low text-muted-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Your Shortlist is Empty
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Tap the heart icon on any wedding card, visiting card, or bill book in our catalogue to preserve designs here.
                </p>
              </div>
              <Link
                href="/wedding-cards"
                onClick={closeDrawer}
                className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs"
              >
                Browse Wedding Catalog • कैटलॉग देखें
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="p-4 rounded-xl bg-surface-low border border-border/70 space-y-3"
              >
                <div className="flex gap-4">
                  <div className="w-18 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-border/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnailUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-1.5 py-0.5 rounded bg-primary/10">
                          {item.productCode}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-foreground truncate mt-1">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 mt-2.5">
                      <span className="text-xs text-muted-foreground font-medium">
                        Qty:
                      </span>
                      <div className="flex items-center bg-surface-lowest rounded-lg border border-border p-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.max(10, item.quantity - 25)
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center hover:bg-surface-low rounded text-muted-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-12 text-center text-xs font-bold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 25)
                          }
                          className="w-6 h-6 flex items-center justify-center hover:bg-surface-low rounded text-muted-foreground"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline Per-Item Bespoke Note */}
                <div className="pt-2 border-t border-border/40 flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <input
                    type="text"
                    value={item.note || ""}
                    onChange={(e) => updateNote(item.productId, e.target.value)}
                    placeholder="Custom request (e.g. Needs Haldi insert, gold edge)..."
                    className="w-full bg-surface-lowest px-2.5 py-1.5 rounded-md text-xs text-foreground placeholder:text-muted-foreground border border-border/60 outline-none focus:border-primary"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sticky Summary Drawer & WhatsApp Dispatch Trigger */}
        {items.length > 0 && (
          <div className="p-5 border-t border-border/80 bg-surface-high/30 space-y-4">
            {/* General Note */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Overall Request (विशेष निर्देश)
              </label>
              <input
                type="text"
                value={generalNote}
                onChange={(e) => setGeneralNote(e.target.value)}
                placeholder="Target event date, city, or delivery urgency..."
                className="w-full bg-surface-lowest px-3 py-2 rounded-lg text-xs text-foreground placeholder:text-muted-foreground border border-border outline-none focus:border-primary"
              />
            </div>

            {/* Live WhatsApp Message Preview Strip */}
            <div className="bg-surface-lowest p-3 rounded-xl border border-border/70 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-semibold flex items-center gap-1 text-tertiary">
                  <MessageCircle className="w-3.5 h-3.5" /> Compiled WhatsApp Message
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-secondary hover:text-primary transition-colors font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-tertiary" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Text
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] text-muted-foreground bg-surface-low p-2 rounded-md font-mono max-h-20 overflow-y-auto whitespace-pre-wrap select-all">
                {messagePreview}
              </pre>
            </div>

            {/* Direct WhatsApp Send Action matching Stitch Screen 4 */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-xl bg-[#128C7E] hover:bg-[#0d6e63] text-white flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all px-3"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <div className="flex flex-col items-start leading-tight">
                <span className="font-label-md text-xs font-bold">Send to WhatsApp ({count} Items)</span>
                <span className="text-[10px] text-white/90 font-devanagari">व्हाट्सएप पर तुरंत कोटेशन पाएं</span>
              </div>
            </a>

            <div className="text-center text-[11px] text-muted-foreground">
              ⚡ No checkout queues. Instant quote from our Suwasra master press.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
