import type { Metadata } from "next";
import { SelectionClient } from "./selection-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "My Shortlist Dossier | Sanwaliya Printing Press",
  description:
    "Review your curated wedding invitation designs, customize quantities, and send for a consolidated quote on WhatsApp directly to our Suwasra master press.",
  alternates: {
    canonical: `${siteConfig.url}/selection`,
  },
  openGraph: {
    title: "My Curated Print Selection | Sanwaliya Printing Press",
    description: "Review shortlisted designs and get an instant quote on WhatsApp.",
    url: `${siteConfig.url}/selection`,
  },
};

export default function SelectionPage() {
  return <SelectionClient />;
}
