"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const directUrl = buildGeneralEnquiryUrl();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Tooltip Card / Quick Popup */}
      {isOpen && (
        <div className="bg-surface-lowest p-4 rounded-2xl shadow-2xl border border-border w-72 mb-2 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#128C7E] animate-ping" />
              <span className="text-xs font-bold text-foreground">
                Sanwaliya Atelier Concierge
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-surface-low rounded text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Namaste! Have questions about wedding cards, visiting card papers, or need an urgent quote? Chat with our master pressman directly.
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>⏱️ Replies in ~15 mins</span>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-tertiary hover:underline"
            >
              Start Chat →
            </a>
          </div>
        </div>
      )}

      {/* Main Pulse Trigger */}
      <div className="relative group">
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Enquiry"
          className="w-14 h-14 rounded-full bg-[#128C7E] hover:bg-[#0e7064] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 gold-pulse"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* Desktop Hover Label */}
        <span className="hidden sm:group-hover:block absolute right-16 top-1/2 -translate-y-1/2 bg-surface-lowest text-foreground text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-border whitespace-nowrap animate-in fade-in">
          Enquire on WhatsApp
        </span>
      </div>
    </div>
  );
}
