export interface CategorySeoMeta {
  categorySlug: string;
  categoryName: string;
  categoryNameHi: string;
  defaultKeywords: string[];
  recommendedTags: string[];
  suggestedSerpSnippet: string;
}

export const CATEGORY_SEO_MAP: Record<string, CategorySeoMeta> = {
  "wedding-cards": {
    categorySlug: "wedding-cards",
    categoryName: "Wedding Invitations",
    categoryNameHi: "शाही विवाह निमंत्रण",
    defaultKeywords: [
      "शादी कार्ड",
      "विवाह निमंत्रण",
      "shadi card",
      "wedding invitation",
      "24k Gold Foil",
    ],
    recommendedTags: [
      "शादी कार्ड",
      "विवाह निमंत्रण",
      "shadi card",
      "wedding invitation",
      "royal wedding box",
      "24k Gold Foil",
      "farman scroll",
      "velvet box card",
      "लग्न पत्रिका",
      "सुवासरा प्रिंटिंग",
      "wedding card design",
      "luxury wedding box",
      "hindu wedding card",
      "handcrafted cotton rag",
    ],
    suggestedSerpSnippet:
      "Royal bespoke wedding invitation cards, Dutch velvet boxes, and 24k gold foil printing handcrafted in Suwasra, Mandsaur.",
  },
  "envelopes-stationery": {
    categorySlug: "envelopes-stationery",
    categoryName: "Envelopes & Shagun Lifafas",
    categoryNameHi: "लिफाफे व शगुन",
    defaultKeywords: [
      "शगुन लिफाफा",
      "shagun lifafa",
      "wedding envelope",
      "लिफाफे",
      "money envelope",
    ],
    recommendedTags: [
      "शगुन लिफाफा",
      "shagun lifafa",
      "wedding envelope",
      "लिफाफे",
      "money envelope",
      "wax seal envelope",
      "gold foil envelope",
      "custom stationery",
      "deckle edge envelope",
      "cash gift envelope",
      "शाही लिफाफे",
      "designer lifafa",
    ],
    suggestedSerpSnippet:
      "Handmade shagun lifafas, royal wax-sealed money envelopes, and bespoke stationery printing at Sanwaliya Printing Press Suwasra.",
  },
  "visiting-cards": {
    categorySlug: "visiting-cards",
    categoryName: "Luxury Visiting Cards",
    categoryNameHi: "विजिटिंग कार्ड्स",
    defaultKeywords: [
      "विजिटिंग कार्ड",
      "visiting card",
      "business card",
      "luxury visiting card",
      "gold foil visiting card",
    ],
    recommendedTags: [
      "विजिटिंग कार्ड",
      "visiting card",
      "business card",
      "luxury visiting card",
      "gold foil visiting card",
      "800 GSM card",
      "embossed business card",
      "matte finish card",
      "corporate visiting card",
      "विज़िटिंग कार्ड सुवासरा",
      "digital business card",
      "spot UV card",
    ],
    suggestedSerpSnippet:
      "Premium 800 GSM visiting cards, 24k gilded edges, and blind debossed executive corporate business cards in Suwasra.",
  },
  "bill-books": {
    categorySlug: "bill-books",
    categoryName: "Custom Bill Books & Ledgers",
    categoryNameHi: "बिल बुक व रसीदें",
    defaultKeywords: [
      "बिल बुक",
      "bill book",
      "GST Bill Book",
      "cash memo",
      "duplicate bill book",
    ],
    recommendedTags: [
      "बिल बुक",
      "bill book",
      "GST Bill Book",
      "cash memo",
      "duplicate bill book",
      "triplicate ledger",
      "challan book",
      "receipt book",
      "रसीद बुक",
      "ऑर्डर बुक",
      "carbonless invoice",
      "serial numbered pad",
    ],
    suggestedSerpSnippet:
      "Custom GST invoice bill books, carbonless duplicate & triplicate pads, and commercial account ledgers with serial red numbering.",
  },
  "flex-banners": {
    categorySlug: "flex-banners",
    categoryName: "Banners & Signage",
    categoryNameHi: "फ्लेक्स बैनर व बोर्ड",
    defaultKeywords: [
      "फ्लेक्स बैनर",
      "flex banner",
      "star flex",
      "hoarding banner",
      "standee banner",
    ],
    recommendedTags: [
      "फ्लेक्स बैनर",
      "flex banner",
      "star flex",
      "hoarding banner",
      "standee banner",
      "vinyl print",
      "shop board",
      "wedding welcome board",
      "ग्लोसाइन बोर्ड",
      "बैनर प्रिंटिंग सुवासरा",
      "outdoor signage",
      "eco solvent banner",
    ],
    suggestedSerpSnippet:
      "High resolution star flex banners, architectural outdoor signage, wedding welcome easels, and shop hoardings in Suwasra.",
  },
  "pamphlets-brochures": {
    categorySlug: "pamphlets-brochures",
    categoryName: "Menus, Flyers & Brochures",
    categoryNameHi: "पर्चे और ब्रोशर",
    defaultKeywords: [
      "पर्चे",
      "pamphlet",
      "brochure",
      "flyer printing",
      "menu card",
    ],
    recommendedTags: [
      "पर्चे",
      "pamphlet",
      "brochure",
      "flyer printing",
      "menu card",
      "restaurant menu",
      "tri-fold brochure",
      "handbill",
      "विज्ञप्ति पर्चे",
      "कैटलॉग प्रिंटिंग",
      "corporate brochure",
      "glossy flyer",
    ],
    suggestedSerpSnippet:
      "Full color promotional flyers, glossy restaurant menu cards, and multi-fold marketing brochures printed at bulk trade rates.",
  },
};

export function getSeoTagsForCategory(categorySlug: string): string[] {
  return (
    CATEGORY_SEO_MAP[categorySlug]?.recommendedTags || [
      "printing press",
      "suwasra printing",
      "प्रिंटिंग प्रेस",
      "fine print studio",
    ]
  );
}

export function getCategorySeoMeta(categorySlug: string): CategorySeoMeta | undefined {
  return CATEGORY_SEO_MAP[categorySlug];
}
