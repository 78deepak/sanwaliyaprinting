import { siteConfig } from "./site-config";
import { Product, ShortlistItem } from "@/types/product";

export interface SingleProductEnquiryParams {
  product: Product;
  quantity?: number;
  selectedSize?: string;
  selectedPaper?: string;
  selectedFinish?: string;
  selectedLanguage?: string;
  customizationNotes?: string;
  eventDate?: string;
  currentUrl?: string;
  lang?: "en" | "hi";
}

/**
 * Builds a safe WhatsApp enquiry URL for a single product.
 */
export function buildProductEnquiryUrl({
  product,
  quantity,
  selectedSize,
  selectedPaper,
  selectedFinish,
  selectedLanguage,
  customizationNotes,
  eventDate,
  currentUrl,
  lang = "en",
}: SingleProductEnquiryParams): string {
  const number = siteConfig.whatsappNumber;
  const isHindi = lang === "hi";

  const greeting = isHindi
    ? "नमस्ते सांवलिया प्रिंटिंग प्रेस, मैं इस डिज़ाइन के बारे में कोटेशन चाहता हूँ:"
    : "Namaste Sanwaliya Printing Press, I am interested in a quotation for this design:";

  const lines: string[] = [
    greeting,
    "",
    `📋 ${isHindi ? "उत्पाद (Product)" : "Product"}: ${product.name}`,
    `🏷️ ${isHindi ? "डिज़ाइन कोड (Code)" : "Design Code"}: ${product.productCode}`,
    `📦 ${isHindi ? "अनुमानित मात्रा (Qty)" : "Estimated Quantity"}: ${quantity ?? product.minimumQuantity}`,
  ];

  if (selectedSize) {
    lines.push(`📐 ${isHindi ? "साइज़ (Size)" : "Size"}: ${selectedSize}`);
  }
  if (selectedPaper) {
    lines.push(`📄 ${isHindi ? "कागज़ (Paper)" : "Paper/Material"}: ${selectedPaper}`);
  }
  if (selectedFinish) {
    lines.push(`✨ ${isHindi ? "फ़िनिश (Finish)" : "Finish"}: ${selectedFinish}`);
  }
  if (selectedLanguage) {
    lines.push(`🌐 ${isHindi ? "भाषा (Language)" : "Language"}: ${selectedLanguage}`);
  }
  if (eventDate) {
    lines.push(`📅 ${isHindi ? "कार्यक्रम तिथि (Date)" : "Event Date"}: ${eventDate}`);
  }
  if (customizationNotes && customizationNotes.trim()) {
    lines.push(`✏️ ${isHindi ? "विशेष निर्देश (Notes)" : "Notes"}: ${customizationNotes.trim()}`);
  }

  lines.push("");
  lines.push(
    isHindi
      ? "कृपया इसका मूल्य (Price), उपलब्ध विकल्प और डिलीवरी का समय साझा करें।"
      : "Please share pricing details, available finishes, and expected turnaround time."
  );

  if (currentUrl) {
    lines.push("");
    lines.push(`🔗 Product Page: ${currentUrl}`);
  }

  const message = lines.join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a consolidated WhatsApp enquiry URL for multiple shortlisted items.
 */
export function buildShortlistEnquiryUrl(
  items: ShortlistItem[],
  generalNote?: string,
  lang: "en" | "hi" = "en"
): string {
  const number = siteConfig.whatsappNumber;
  const isHindi = lang === "hi";

  const greeting = isHindi
    ? "नमस्ते सांवलिया प्रिंटिंग प्रेस, मैंने आपके कैटलॉग से निम्नलिखित डिज़ाइन्स शॉर्टलिस्ट की हैं:"
    : "Namaste Sanwaliya Printing Press, I have shortlisted the following designs from your catalogue for a consolidated quote:";

  const lines: string[] = [greeting, ""];

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.productCode} - ${item.name} (Qty: ${item.quantity})`
    );
    const specs: string[] = [];
    if (item.selectedSize) specs.push(`Size: ${item.selectedSize}`);
    if (item.selectedPaper) specs.push(`Paper: ${item.selectedPaper}`);
    if (item.selectedFinish) specs.push(`Finish: ${item.selectedFinish}`);
    if (specs.length > 0) {
      lines.push(`   Options: ${specs.join(" | ")}`);
    }
    if (item.note && item.note.trim()) {
      lines.push(`   Note: ${item.note.trim()}`);
    }
  });

  if (generalNote && generalNote.trim()) {
    lines.push("");
    lines.push(
      `📌 ${isHindi ? "विशेष निर्देश (Overall Request)" : "Special Request"}: ${generalNote.trim()}`
    );
  }

  lines.push("");
  lines.push(
    isHindi
      ? "कृपया इन डिज़ाइन्स के लिए कॉम्बो कोटेशन और सैंपल किट की जानकारी साझा करें।"
      : "Please share consolidated pricing, sample availability, and delivery timeline."
  );

  const message = lines.join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a quick general WhatsApp consultation URL.
 */
export function buildGeneralEnquiryUrl(customPrompt?: string): string {
  const number = siteConfig.whatsappNumber;
  const defaultMessage =
    "Namaste Sanwaliya Printing Press team! I am browsing your studio catalogue and would like to discuss a custom printing project.";
  const message = customPrompt || defaultMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
