"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Home,
  ChevronRight,
  Send,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/data/categories";

export function CustomEnquiryClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Wedding Cards & Farman");
  const [quantity, setQuantity] = useState("200");
  const [size, setSize] = useState("");
  const [paperSpecs, setPaperSpecs] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      "Namaste Sanwaliya Printing Press team, I would like to submit a Custom Bespoke Printing Enquiry:",
      "",
      `👤 Client Name: ${name || "Client"}`,
      `📞 Mobile: ${phone || "Provided on WhatsApp"}`,
      `📂 Category: ${category}`,
      `📦 Estimated Quantity: ${quantity}`,
      size ? `📐 Required Dimensions: ${size}` : "",
      paperSpecs ? `📄 Material/Finish Preferred: ${paperSpecs}` : "",
      description ? `📝 Detailed Requirements: ${description}` : "",
      "",
      "Please review and share a tailored quote and paper recommendation.",
    ].filter(Boolean);

    const message = lines.join("\n");
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full flex flex-col pt-24 sm:pt-28">
      {/* Top Banner */}
      <section className="w-full bg-surface-low border-b border-border/60 py-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-primary font-bold">Custom Order Request</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Atelier Service • कस्टम ऑर्डर</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Custom Printing &amp; Bulk Order Request
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Need a unique invitation box, customized paper dimensions, non-standard foil stampings, or high-volume corporate printing? Send your specifications directly to our master press team.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-card p-6 sm:p-10 rounded-3xl border border-border/80 shadow-md space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Your Full Name (आपका नाम) *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Patidar"
                className="w-full bg-surface-low px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Mobile Number (मोबाइल नंबर) *
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-surface-low px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Product Category (श्रेणी)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-low px-4 py-3 rounded-xl text-xs text-foreground border border-border/70 outline-none focus:border-primary cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name} ({c.nameHi})
                  </option>
                ))}
                <option value="Other Bespoke Work">Other Custom Requirement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Estimated Quantity (अनुमानित मात्रा)
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 250 sets, 1000 cards, 5 books"
                className="w-full bg-surface-low px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Required Dimensions / Size
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. 9&quot; × 6&quot;, A4, or Standee 6ft × 3ft"
                className="w-full bg-surface-low px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Preferred Material or Foiling
              </label>
              <input
                type="text"
                value={paperSpecs}
                onChange={(e) => setPaperSpecs(e.target.value)}
                placeholder="e.g. 600 GSM Cotton, 24k Gold Foil, Velvet"
                className="w-full bg-surface-low px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
              Detailed Project Description &amp; Custom Notes
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about the event date, Hindi/English wording preference, custom family crest, delivery timeline, or any reference design..."
              className="w-full bg-surface-low px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground border border-border/70 outline-none focus:border-primary leading-relaxed"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <span>Direct dispatch to master pressman on WhatsApp • No spam</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-tertiary hover:bg-tertiary-hover text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Submit &amp; Chat on WhatsApp</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
