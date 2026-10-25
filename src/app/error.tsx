"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, MessageCircle } from "lucide-react";
import { buildGeneralEnquiryUrl } from "@/lib/whatsapp";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Runtime exception captured by App Router Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-8">
      <div className="max-w-xl w-full bg-card p-8 sm:p-12 rounded-3xl border border-border/80 shadow-lg text-center space-y-6">
        {/* Warning Icon */}
        <div className="w-18 h-18 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive shadow-xs">
          <AlertTriangle className="w-9 h-9" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-destructive">
            Technical Interruption • सिस्टम त्रुटि
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Our atelier catalogue encountered an unexpected runtime anomaly while rendering this composition.
          </p>
        </div>

        {error.digest && (
          <div className="bg-surface-low p-2.5 rounded-xl border border-border/50 text-[11px] font-mono text-muted-foreground select-all">
            Incident Digest: {error.digest}
          </div>
        )}

        {/* Action Triggers */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary-container transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again (पुनः प्रयास करें)</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-low hover:bg-surface-container text-foreground font-semibold text-xs border border-border/70 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio</span>
          </Link>
        </div>

        {/* WhatsApp Concierge Assistance */}
        <div className="pt-4 border-t border-border/60">
          <a
            href={buildGeneralEnquiryUrl("Namaste Sanwaliya Press! I experienced a page error while browsing your catalogue.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-tertiary hover:opacity-85 transition-opacity"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Report issue to Pressman on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
