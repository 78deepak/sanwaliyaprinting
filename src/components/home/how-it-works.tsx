import React from "react";
import {
  Compass,
  Heart,
  MessageCircle,
  FileCheck,
  Truck,
  Sparkles,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Compass,
      title: "Browse Designs",
      titleHi: "अन्वेषण करें",
      desc: "Explore bespoke invitation suites, foil finishes, and papers in our online catalogue.",
    },
    {
      step: "02",
      icon: Heart,
      title: "Shortlist Options",
      titleHi: "पसंद चुनें",
      desc: "Heart your favorites to build your dossier with preferred quantities and bespoke notes.",
    },
    {
      step: "03",
      icon: MessageCircle,
      title: "WhatsApp Connect",
      titleHi: "व्हाट्सएप संवाद",
      desc: "Dispatch your wishlist in 1-click directly to our master press artisan for volume pricing.",
    },
    {
      step: "04",
      icon: FileCheck,
      title: "Proof Approval",
      titleHi: "प्रूफ़ स्वीकृति",
      desc: "Review digital proof layouts with verified Devanagari matras and font alignments.",
    },
    {
      step: "05",
      icon: Truck,
      title: "Press & Delivery",
      titleHi: "मुद्रण व प्रेषण",
      desc: "Precision Heidelberg printing, 24k foil debossing, and doorstep courier delivery.",
    },
  ];

  return (
    <section className="w-full bg-surface-low py-16 px-4 sm:px-8 lg:px-12 border-t border-border/60">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-xs font-bold text-secondary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Tactile Workflow
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            How Atelier Printing Works
          </h2>
          <p className="text-sm text-muted-foreground font-devanagari">
            आपकी पसंद से लेकर आपके घर तक — सरल, पारदर्शी और राजसी मुद्रण प्रक्रिया।
          </p>
        </div>

        {/* Mobile View: Vertical Step Stack matching Stitch Screen 1 */}
        <div className="sm:hidden flex flex-col gap-3">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-card rounded-xl p-3.5 flex items-start gap-3.5 shadow-xs border border-border/70"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-label-md flex items-center justify-center shrink-0 font-bold text-xs">
                  {item.step}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-headline-sm text-sm text-primary font-semibold">
                      {item.title}
                    </h4>
                    <span className="font-label-sm text-xs text-secondary font-devanagari font-medium">
                      {item.titleHi}
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-muted-foreground mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View: 5-Column Grid */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col p-6 rounded-2xl bg-card border border-border/70 shadow-xs hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-border/80 group-hover:text-secondary transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <span className="text-xs text-secondary font-devanagari font-medium mb-2">
                  {item.titleHi}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
