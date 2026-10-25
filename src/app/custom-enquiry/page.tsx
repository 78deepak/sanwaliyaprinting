import type { Metadata } from "next";
import { CustomEnquiryClient } from "./custom-enquiry-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Custom Printing & Bespoke Order Request | Sanwaliya Printing Press",
  description:
    "Request custom invitation boxes, specialized paper dimensions, 24k gold foil debossing, visiting cards, and bulk corporate printing from our Suwasra master press.",
  alternates: {
    canonical: `${siteConfig.url}/custom-enquiry`,
  },
  openGraph: {
    title: "Bespoke Custom Printing Enquiry | Sanwaliya Printing Press",
    description: "Submit custom printing specifications directly to our master press team on WhatsApp.",
    url: `${siteConfig.url}/custom-enquiry`,
  },
};

export default function CustomEnquiryPage() {
  return <CustomEnquiryClient />;
}
