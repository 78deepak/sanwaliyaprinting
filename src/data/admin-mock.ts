export type ProductStatus = "published" | "draft" | "archived";

export interface AdminProduct {
  id: string;
  productCode: string; // e.g. RM-W-101
  slug: string;
  name: string;
  nameHi?: string;
  category: string; // category slug
  shortDescription: string;
  description: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary?: boolean;
    caption?: string;
  }>;
  availableOptions: {
    sizes?: string[];
    papers?: string[];
    finishes?: string[];
    printTypes?: string[];
    languages?: string[];
    customizations?: string[];
  };
  minimumQuantity: number;
  price: {
    show: boolean;
    startingFrom?: number;
    maxPrice?: number;
    unit?: string;
    note?: string;
  };
  featured: boolean;
  popular?: boolean;
  status: ProductStatus;
  tags: string[];
  searchAliases: string[];
  specs?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  inquiriesCount: number;
}

export interface AdminMetrics {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  featuredProducts: number;
  totalCategories: number;
  inquiriesThisMonth: number;
  catalogueHealth: number;
  atelierStatus: string;
  syncStatus: string;
  branch: string;
}

export interface ShopkeeperNote {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "warning" | "info" | "success";
}

export interface ShopSettings {
  shopName: string;
  tagline: string;
  whatsappNumber: string;
  callingPhone: string;
  address: string;
  operatingHours: string;
  whatsappTemplate: string;
  ownerName: string;
  ownerEmail: string;
  lastSynced: string;
}

export const adminMetrics: AdminMetrics = {
  totalProducts: 48,
  publishedProducts: 42,
  draftProducts: 6,
  featuredProducts: 8,
  totalCategories: 7,
  inquiriesThisMonth: 184,
  catalogueHealth: 88,
  atelierStatus: "Atelier Operational",
  syncStatus: "Live Website Online",
  branch: "Suwasra Mandi Branch",
};

export const shopkeeperNotes: ShopkeeperNote[] = [
  {
    id: "note-1",
    title: "Wedding Season Dispatch Rush",
    content:
      "Update minimum turnaround for Farman scrolls from 5 days to 8 days during the upcoming Devuthani Ekadashi booking wave.",
    date: "Saved on Monday by Counter Desk",
    type: "warning",
  },
  {
    id: "note-2",
    title: "Developer Support Notice",
    content:
      "Categories like 'Wedding Invitations', 'Visiting Cards', and 'Bill Books' are hardcoded in Next.js routes. Need a brand-new main section? Contact developer support directly.",
    date: "System Architect Notice",
    type: "info",
  },
];

export const mockShopSettings: ShopSettings = {
  shopName: "Sanwaliya Printing Press (सांवलिया प्रिंटिंग प्रेस)",
  tagline: "Fine Print Studio & Wedding Invitation Atelier • Estd. 1994",
  whatsappNumber: "919876543210",
  callingPhone: "+91 98765 43210",
  address:
    "Ramsnehi Patidar Complex, Sadar Bazar near Sabha Chok, Suwasra, Teh. Suwasra, Dist. Mandsaur, Madhya Pradesh",
  operatingHours: "Mon - Sat: 10:00 AM - 8:30 PM | Sunday: By Appointment",
  whatsappTemplate:
    "Namaste Sanwaliya Printing Press, I would like to inquire about [Product Name] (Code: [Code]). Estimated quantity: [Qty]. Please provide pricing and gold foil stamping timeline for Suwasra dispatch.",
  ownerName: "Ramesh Patidar (Owner)",
  ownerEmail: "ramesh@sanwaliyapress.in",
  lastSynced: "Today, 04:15 PM IST",
};

// Initial in-memory mock products list
export const initialAdminProducts: AdminProduct[] = [
  {
    id: "prod-1",
    productCode: "RM-W-101",
    slug: "the-rajwada-velvet-box-suite",
    name: "The Rajwada Velvet Box Suite",
    nameHi: "राजवाड़ा वेलवेट बॉक्स निमंत्रण",
    category: "wedding-cards",
    shortDescription:
      "Luxurious Dutch maroon velvet casing featuring an architectural laser-cut brass family crest, accompanied by three hand-pressed gold foil ceremony leaves.",
    description:
      "A timeless royal boxed invitation hand-wrapped in imported Dutch crimson velvet with antique gold hot-foil embossing. Features a personalized laser-cut brass monogram, 3 multi-layered cotton inserts for Mehendi, Sangeet & Reception ceremonies, and a matching handcrafted shagun envelope.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbUsan9CG8wHwT5wVef4v60R4x6RUxU9vG2XL-XjrhBif1VfUNhLKhSwrI12zMMgNfvlKFKtio-0WRG6KbguZIVtFeRJycaZquvW2Ee9obOb-dAv7rWRQMtrSEjxCLtcXNkcO-HYMehyeZcz5hNN4sqFtwZzhAHh2DL-qP5_GCnXDyYyhDfNenw9JYQIufrDEPgiRyvgEvFlVLoELXPHtDhrLCV8hMIqc_E2enTDhJtoFjiDnEGSrL0g",
        alt: "The Rajwada Velvet Box Suite in deep royal crimson velvet with hand-cast gold brass crest",
        isPrimary: true,
        caption: "Front Angle Showcase",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBnRGNmJzibG-UutAIKXXPm6DaGPyfYk7K_XykR6BOGDdAlD81DR0ulM0DSy31iKn5cMT8hajm9ziTyqYrYoz7uJs0OrVMCWvEcPnJqcp0yPvGm4_9PZ0cehchA0OTuKgSnecBdq7sRAryv8_Rkn4p0GYzCW_RaXolAhSbOXy94WSbPPuSQ2Mfp40ZrO_nS-wKFXusBIXhPQuIF7IHTr48eHIoqE2pDwxdhUPyyZmgfVTDo-qecHx_XQ",
        alt: "Open Box Revealing 3 Gilded Multi-layered Cotton Inserts",
        caption: "Inside 3-Tier Inserts",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEZeBCXy75R5mqqDnBVrBg1y31H5l_C7jqqah7XrC4dQoWVJLPOpSQgg1cLj3Hzea8RmYFOtnbNjmLorx4govZywo35KfwmUAic5GeD2C3gvsj9edsWgvQZI3lIhUu9jloa282UBwhEJ6mBlKhC2GWGIwbsTgMXDXnIaAu1-FvKt1lxItvpcq5LSjmtsl-pQ2CNV63GPysmJwV-0JUHyy8LFq0vZtyMc38Mm4Y2ZEDLG6fU7ndZK99Yg",
        alt: "Extreme macro of tactile 600 GSM deckled edge cotton rag paper and antique gold hot-foil shimmer",
        caption: "Foil Leafing Macro Detail",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuByoO3NLFiWljXZsbNINf66PohGLqaQzn2gKKp0uBYA4_ZSlAV3oK7vQOY2bU8VLj6T2EEDNFZ2wttA6fcPESNurmRURDbsTZdwim5ynsaRLSfY_EbA0uAwt1epQ9Vzid4CPKUoV3sgIsDBHEPQcXYALd_TPAAPRsVssu1__Yedq8Vs96dkRxtXwt153pi9AhGtoW13d7heG8xrTGLXvAq5LtDfCYJ49kCIoRBSqDJgUfF8xpI0LB_f2A",
        alt: "Matching handmade velvet shagun money envelope with personalized vermilion wax seal stamp",
        caption: "Accessory Shagun Lifafa",
      },
    ],
    availableOptions: {
      sizes: ['8.5" × 6.5" Flagship Box', '7.0" × 7.0" Square', '9.0" × 4.0" Farman Slim'],
      papers: ["900 GSM Kappa Board", "320 GSM Textured Linen", "Handmade Deckle Rag"],
      finishes: ["24k Antique Gold Foil", "Blind Deboss", "Rose Gold Foil"],
      printTypes: ["Letterpress Deboss + Hot Foil", "Screen Metallic Print"],
      languages: ["Hindi (Devanagari)", "English", "Sanskrit Shlokas"],
      customizations: ["Laser-Cut Brass Family Monogram", "Custom Wax Seal Stamp"],
    },
    minimumQuantity: 50,
    price: {
      show: true,
      startingFrom: 750,
      maxPrice: 1150,
      unit: "complete suite",
      note: "Estimated ₹750 - ₹1,150 / suite. Exact quote on WhatsApp.",
    },
    featured: true,
    popular: true,
    status: "published",
    tags: ["24k Gold Foil", "600 GSM Mount", "Custom Brass Die", "Dutch Velvet"],
    searchAliases: ["rajwada", "velvet box", "shadi card", "wedding box", "शादी कार्ड", "शाही शादी कार्ड"],
    specs: {
      "Box Substrate": "Imported Dutch Velvet over 2.5mm Hardboard",
      "Insert Quantity": "3 Multi-layered Leaves (Sangeet, Haldi, Vivah)",
      "Card Paper": "350 GSM Natural Cotton Rag",
      "Foiling Technique": "Single-use Solid Brass Die Casting",
      "Standard Turnaround": "10 - 14 Business Days",
    },
    createdAt: "2024-10-14T11:20:00Z",
    updatedAt: "Today, 11:20 AM",
    inquiriesCount: 42,
  },
  {
    id: "prod-2",
    productCode: "RM-W-102",
    slug: "the-awadh-royal-farman-scroll",
    name: "The Awadh Royal Farman Scroll",
    nameHi: "अवध शाही फ़रमान निमंत्रण",
    category: "wedding-cards",
    shortDescription:
      "Hand-rolled imperial scroll with metallic brass finials, packed in an engraved cylindrical velvet case with silk tassel pulls.",
    description:
      "An aristocratic Farman invitation reminiscent of princely Indian courts. The invitation scroll is printed on 220 GSM textured vellum paper, wrapped around carved brass finials, and enclosed in a rigid Dutch velvet cylinder case stamped with gold leaf floral jaali.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqdzuuU7N_lD02I3f92NUBiuCKxCcp8C5NSgHPiPM6mxYw7wIMmxriDeHrpTsKln7IWPc7S4zEQO55W5OGaUxFHWzF5uHs2X3i2mkw5AAwxeBleRWKD3ljdJS0LAgj9Sr_q5x35lL9vl6PipZVVl_UQYGsn9Af5bF7b-bnVN-DfYtzWi5muRVd84tUdrIuRzypJqUZvrQpGxRE-o1ur1idiw0IKbTR7livFFd947ZKpVagrlvernOZsw",
        alt: "The Awadh Royal Farman Scroll in antique metallic casing with silk tassels",
        isPrimary: true,
        caption: "Scroll & Cylinder Case",
      },
    ],
    availableOptions: {
      sizes: ['Scroll: 14" × 8.5"', 'Cylinder Case: 10" × 2.5"'],
      papers: ["220 GSM European Parchment", "180 GSM Raw Silk Cotton"],
      finishes: ["Antique Brass Cast Finials", "Crimson Silk Tassels", "Gold Border Foil"],
      printTypes: ["Letterpress Hot Foil", "Screen Metallic Print"],
      languages: ["Hindi (Devanagari)", "English"],
    },
    minimumQuantity: 50,
    price: {
      show: true,
      startingFrom: 450,
      maxPrice: 700,
      unit: "complete set",
      note: "Price includes brass finials and velvet tube case.",
    },
    featured: true,
    popular: true,
    status: "published",
    tags: ["Farman Scroll", "Brass Finials", "Velvet Cylinder", "Silk Tassels"],
    searchAliases: ["farman", "scroll", "awadh", "shadi scroll", "शाही फरमान"],
    specs: {
      "Scroll Material": "220 GSM European Natural Parchment",
      "Outer Case": "Rigid Kappa Board wrapped in Velvet",
      "Metal Accents": "Turned Solid Brass Finials with Antique Patina",
    },
    createdAt: "2024-10-18T10:15:00Z",
    updatedAt: "Yesterday",
    inquiriesCount: 29,
  },
  {
    id: "prod-3",
    productCode: "RM-W-103",
    slug: "vedic-shloka-gold-foil-deckle",
    name: "Vedic Shloka Gold Foil Deckle",
    nameHi: "वैदिक श्लोक गोल्ड फॉयल",
    category: "wedding-cards",
    shortDescription:
      "Thick handmade deckle-edge cotton rag paper card featuring shimmering gold foil Devanagari Sanskrit wedding shlokas.",
    description:
      "Pure organic cotton rag stationery made on traditional deckle frames. Hand-stamped with auspicious Sanskrit shlokas and floral mandalas.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwoj2SHeHgXxi1FG8KLa6XrzcXwTkZhwC52rrkwAM0pHqzuErs1zWtqE5vEN-WVOZlrHkljqb5uUo_-wEtza01c3Q2auaF9oVJORQMK30wvgjUkh6H74wgmSq5I1VjP69imojWd1axdV-Bo7boa6x8qvP5_f24K23Hn-3OEi7R-fkma2oSLikIVQL4I-IVMMkyJZfFTBcdrSrA4HE83oB1pDqj5MvbTC_jl8ZHCHw4oDVEErBYi3ewaQ",
        alt: "Handmade deckle edge cotton paper with shimmering gold foil Sanskrit shlokas",
        isPrimary: true,
        caption: "Deckle Cotton Specimen",
      },
    ],
    availableOptions: {
      sizes: ['Single Card (7.5" × 5.5")', 'Bi-fold (7.5" × 11.0")'],
      papers: ["450 GSM Organic Cotton Rag", "300 GSM Deckle Paper"],
      finishes: ["24k Gold Foil", "Blind Letterpress Deboss"],
      languages: ["Sanskrit Vedic Shlokas", "Hindi", "English"],
    },
    minimumQuantity: 100,
    price: {
      show: false,
      startingFrom: 320,
      maxPrice: 500,
      unit: "per card set",
      note: "Custom quotation based on foil stamp area.",
    },
    featured: false,
    popular: false,
    status: "draft",
    tags: ["Deckle Edge", "Cotton Rag", "Vedic Shlokas", "Raw Paper"],
    searchAliases: ["deckle", "cotton paper", "shloka", "वैदिक श्लोक"],
    specs: {
      "Paper Stock": "450 GSM 100% Cotton Rag",
      "Edge Type": "Four-sided Natural Deckle",
    },
    createdAt: "2024-10-20T09:30:00Z",
    updatedAt: "Oct 20, 2024",
    inquiriesCount: 14,
  },
  {
    id: "prod-4",
    productCode: "RM-BUS-042",
    slug: "embossed-gold-foil-luxury-visiting-cards",
    name: "Embossed Gold Foil Luxury Visiting Cards",
    nameHi: "विज़िटिंग कार्ड्स - एम्बॉस्ड गोल्ड फॉयल",
    category: "visiting-cards",
    shortDescription:
      "Stack of ultra premium black matte visiting cards with deep debossed 24k gold foil letterpress typography and gilded edges.",
    description:
      "Exquisite corporate identity cards crafted on 600 GSM triple-layer cotton stock with gilded metallic edges and deep letterpress foil debossing.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY9vgHgRO8cs2YdQuuTa0KrEORWcmKV1CNNa1IwXtvoXgRpO3E64K8tGeczEkMbC0SsoSolxT4UldHOj6mpX0zr-OMwcy7QPBa_rtDNrt2iBv6IjN5EAo-yjAS5iWE9jI8sODfB-b_jf9BmUPxjFvi3sUZ8iaa0yKPYSxTEt0wYeAqA5cX4hDvce7QyZ0ATrcF0AzGQ3hrtZ1G4CdhrJfk9Yjselj2HIKEvo1NcBUgYSIM4OI8bAKM9g",
        alt: "Stack of black matte luxury business cards with gold deboss typography",
        isPrimary: true,
        caption: "Black Matte Stack",
      },
    ],
    availableOptions: {
      sizes: ['Standard (3.5" × 2.0")', 'European (3.3" × 2.1")'],
      papers: ["600 GSM Triplex Cotton", "400 GSM Matte Velvet"],
      finishes: ["24k Gold Foil", "Gilded Edges", "Blind Deboss"],
    },
    minimumQuantity: 100,
    price: {
      show: true,
      startingFrom: 450,
      maxPrice: 950,
      unit: "100 pcs",
      note: "From ₹450 / 100 pcs depending on single/both side foiling.",
    },
    featured: true,
    popular: true,
    status: "published",
    tags: ["Visiting Card", "Gilded Edges", "Letterpress", "600 GSM"],
    searchAliases: ["visiting card", "business card", "विज़िटिंग कार्ड"],
    createdAt: "2024-10-19T14:20:00Z",
    updatedAt: "Yesterday",
    inquiriesCount: 56,
  },
  {
    id: "prod-5",
    productCode: "RM-BIL-019",
    slug: "triplicate-carbonless-custom-bill-book",
    name: "Triplicate Carbonless Custom Bill Book",
    nameHi: "हार्डबाउंड जीएसटी बिल बुक",
    category: "bill-books",
    shortDescription:
      "Traditional commercial GST tax invoice bill book mockup with triplicate colored pages (pink, yellow, white) and hardbound spine.",
    description:
      "High reliability accounting books with automatic carbonless NCR paper transfer, sequential red numbering, and durable cloth binding.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuChoRZth4h52bi_JXVoZCoW_iEIlqiKvba_oSIT-SYyxONnD9DpbnWfuyq88ecDVpj0ECVS96pO3ufyuQAlImLFhL_QjC52CKWxlAupP-DS5gneMMzGg0v7BPRUycyRANdKj2oW5m-4ogdQD2iIXLxyXbaQjdXekLL4bybUx8vb9ZTkDgu-N-AQra0jmLWp53D0UKULDQJoUB76xGQpUyFmyhnk-bnoC2mLlsAVQ9uGt9RHQHBchvUSSQ",
        alt: "Triplicate carbonless GST invoice bill book with hardbound spine",
        isPrimary: true,
        caption: "Commercial Bill Book Mockup",
      },
    ],
    availableOptions: {
      sizes: ['1/4 Size (A5)', '1/8 Size (A6)', 'Full A4 Size'],
      papers: ["55 GSM Carbonless NCR (1+2 Triplicate)", "Hardbound Cloth Spine"],
      finishes: ["Sequential Red Numbering", "Perforated Tear Line"],
    },
    minimumQuantity: 5,
    price: {
      show: true,
      startingFrom: 180,
      maxPrice: 350,
      unit: "per book (100 sets)",
      note: "From ₹180 / book. Bulk discount on 10+ books.",
    },
    featured: false,
    popular: true,
    status: "published",
    tags: ["Bill Book", "GST Invoice", "NCR Triplicate", "Hardbound"],
    searchAliases: ["bill book", "invoice", "receipt book", "बिल बुक", "रसीद"],
    createdAt: "2024-10-15T08:00:00Z",
    updatedAt: "Oct 15, 2024",
    inquiriesCount: 31,
  },
  {
    id: "prod-6",
    productCode: "RM-W-106",
    slug: "shubh-vivah-laser-cut-arch",
    name: "Shubh Vivah Laser Cut Arch",
    nameHi: "शुभ विवाह झरोखा लेज़र कट",
    category: "wedding-cards",
    shortDescription:
      "Intricate golden laser cut arch Indian wedding invitation card with Rajasthani jharokha motif and inner ivory parchment insert.",
    description:
      "Architectural laser-cut lace featuring traditional royal jharokha arches and auspicious peacocks in metallic ivory shimmer cardstock.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6dwjdPSz87KoGELXKAYkMn2VfGC-meFYCiHVO5AotnIhR4dcsXMNWIEKC9J2ITuS90lUj-ArElTupDTlo3NQNHunOITGpriy0RnjvpjB9dMeBBoQEU7i-WGFQm33DVJ3u65aakAPi-hf4WfP-eW7V5ZK4UMoi9OD1mSOTyUffDU6nKw5ZwGKnzMSSp7N1NiXlLe07zhO8gFg843pUJhivxhkiFbzcPlfwS5Apv-JDS9HlOuCGC53iCw",
        alt: "Golden laser cut arch wedding card with Rajasthani jharokha motif",
        isPrimary: true,
        caption: "Jharokha Lace Gatefold",
      },
    ],
    availableOptions: {
      sizes: ['8.0" × 6.0" Gatefold Arch'],
      papers: ["350 GSM Metallic Shimmer", "Ivory Vellum Insert"],
      finishes: ["Precision Laser Cut", "Red Foil Hot Stamp"],
    },
    minimumQuantity: 100,
    price: {
      show: false,
      startingFrom: 160,
      maxPrice: 280,
      unit: "per set",
      note: "Custom quotation based on quantity and foil layers.",
    },
    featured: false,
    popular: false,
    status: "draft",
    tags: ["Laser Cut", "Jharokha", "Shimmer Paper", "Gatefold"],
    searchAliases: ["laser cut", "jharokha", "arch card", "झरोखा कार्ड"],
    createdAt: "2024-10-12T16:45:00Z",
    updatedAt: "3 days ago",
    inquiriesCount: 19,
  },
  {
    id: "prod-7",
    productCode: "RM-BAN-008",
    slug: "starflex-frontlit-event-banner",
    name: "Starflex Frontlit Event Banner",
    nameHi: "स्टारफ्लेक्स फ्रंटलिट इवेंट बैनर",
    category: "flex-banners",
    shortDescription:
      "High resolution large format vinyl flex printing roll for political, wedding, and temple inauguration event banners.",
    description:
      "Durable weather-resistant 340 GSM heavy vinyl flex printed on high-speed Konica solvent machines with brass corner eyelets.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqQPRKaso7k7J7OTBVorAT572QQ-HkLgJeMb9jMvaw-qqtE_M0A0TPjp98AstNPMHk2uBAFJR3xzA3s_PiFm-P9NxinkDSd7hoiWuVjUn7zyZynsNbaqUQnneiFwwt8jErwte2kCQ4QUh7puRoM7sJRSfJN5VPj9octYaCCn-gs1-CyX31LUuWRZLc9DJ2dTRRoIlMMSmkUbCX7Enjv3laobJIZ8hOIOD1Cjks2XzIssTUHLyPMGfecw",
        alt: "Large format vibrant roll banner printing with brass grommets",
        isPrimary: true,
        caption: "Flex Roll Sample",
      },
    ],
    availableOptions: {
      sizes: ["Any Custom Size (Width up to 10 feet)", '6ft × 3ft', '8ft × 4ft', '10ft × 6ft'],
      papers: ["340 GSM Starflex Frontlit", "440 GSM Blackout Flex"],
      finishes: ["Corner Brass Grommets", "Side Heat Hemming"],
    },
    minimumQuantity: 1,
    price: {
      show: true,
      startingFrom: 18,
      maxPrice: 35,
      unit: "sq. ft.",
      note: "Standard rate ₹18 / sq.ft. Same day delivery in Suwasra.",
    },
    featured: false,
    popular: true,
    status: "published",
    tags: ["Flex Banner", "Starflex", "Event Board", "Hoarding"],
    searchAliases: ["flex", "banner", "hoarding", "फ्लेक्स बैनर"],
    createdAt: "2024-10-10T12:00:00Z",
    updatedAt: "5 days ago",
    inquiriesCount: 48,
  },
  {
    id: "prod-8",
    productCode: "RM-ENV-012",
    slug: "traditional-shagun-lifafa-pouch",
    name: "Traditional Shagun Lifafa Pouch",
    nameHi: "शाही शगुन लिफाफा",
    category: "envelopes-stationery",
    shortDescription:
      "Matching velvet and handmade cotton paper shagun lifafa money envelope with 24k gold foil royal medallion.",
    description:
      "Aristocratic monetary gift envelope crafted to match royal wedding stationery themes. Features dry floral lining and foil embossed border.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqL2TJUxlTl7l0sGCi5U9pLNgz3U-En9tS8B2yIz8PSHLx02oP_hjkjE0aA7nmlYIO0ga0ibWxos5B1Hu7fLiUXOCt8Yi_cMTvVxmr2a3l9UUqyBZ8htQx5tlVggO-HXfyMOpRB5N9WXsTZ-95HC_12UDYsrcaSGp0K7QeoGxOZamUFfbk7jeeTxD_fTjx-79TDpOheyztfjd74QTmlcqtnbbQLX81lKOrEZg3gYX1pqBQb3FLrMF6Rg",
        alt: "Shagun lifafa in velvet with gold seal medallion",
        isPrimary: true,
        caption: "Shagun Lifafa",
      },
    ],
    availableOptions: {
      sizes: ['7.5" × 3.5" Standard Currency Pouch'],
      papers: ["300 GSM Cotton Rag", "Velvet Flocked Mount"],
      finishes: ["24k Gold Foil Stamp", "Self Adhesive Flap"],
    },
    minimumQuantity: 50,
    price: {
      show: true,
      startingFrom: 45,
      maxPrice: 90,
      unit: "per lifafa",
      note: "From ₹45 / piece.",
    },
    featured: true,
    popular: true,
    status: "published",
    tags: ["Shagun Lifafa", "Money Envelope", "Velvet Trim", "Gold Seal"],
    searchAliases: ["lifafa", "shagun envelope", "लिफाफा"],
    createdAt: "2024-10-08T11:00:00Z",
    updatedAt: "Oct 8, 2024",
    inquiriesCount: 38,
  },
];

// Helper mock storage (module state for interactive UI operations in the session)
let mockProductsState: AdminProduct[] = [...initialAdminProducts];
let mockSettingsState: ShopSettings = { ...mockShopSettings };

// --------------------------------------------------------------------------
// MOCK API / DATA HELPERS
// --------------------------------------------------------------------------

/**
 * Fetch all products with search, category, status, and sort filters.
 * // TODO(backend): Replace with GET /api/admin/products?q=...&category=...&status=...&sort=...
 */
export async function getMockAdminProducts(params?: {
  query?: string;
  category?: string;
  status?: string;
  sortBy?: string;
}): Promise<AdminProduct[]> {
  // Simulate network micro-latency for realistic UI testing
  await new Promise((r) => setTimeout(r, 60));

  let result = [...mockProductsState];

  if (params?.category && params.category !== "all") {
    result = result.filter((p) => p.category === params.category);
  }

  if (params?.status && params.status !== "all") {
    result = result.filter((p) => p.status === params.status);
  }

  if (params?.query && params.query.trim()) {
    const q = params.query.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.nameHi && p.nameHi.includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.searchAliases.some((a) => a.toLowerCase().includes(q))
    );
  }

  if (params?.sortBy) {
    if (params.sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (params.sortBy === "code_asc") {
      result.sort((a, b) => a.productCode.localeCompare(b.productCode));
    } else if (params.sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (params.sortBy === "inquiries") {
      result.sort((a, b) => b.inquiriesCount - a.inquiriesCount);
    }
  }

  return result;
}

/**
 * Fetch single product by ID or Slug.
 * // TODO(backend): Replace with GET /api/admin/products/:id
 */
export async function getMockAdminProductById(idOrSlug: string): Promise<AdminProduct | null> {
  await new Promise((r) => setTimeout(r, 40));
  const product = mockProductsState.find((p) => p.id === idOrSlug || p.slug === idOrSlug || p.productCode === idOrSlug);
  return product ? { ...product } : null;
}

/**
 * Create or update product.
 * // TODO(backend): Replace with POST /api/admin/products (create) or PUT /api/admin/products/:id (update)
 */
export async function saveMockAdminProduct(productData: Partial<AdminProduct>): Promise<AdminProduct> {
  await new Promise((r) => setTimeout(r, 120));

  if (productData.id && mockProductsState.some((p) => p.id === productData.id)) {
    // Update existing
    mockProductsState = mockProductsState.map((p) =>
      p.id === productData.id
        ? ({
            ...p,
            ...productData,
            updatedAt: "Just now",
          } as AdminProduct)
        : p
    );
    const updated = mockProductsState.find((p) => p.id === productData.id)!;
    return updated;
  } else {
    // Create new
    const newProduct: AdminProduct = {
      id: `prod-${Date.now()}`,
      productCode: productData.productCode || `RM-${Math.floor(100 + Math.random() * 900)}`,
      slug: productData.slug || `product-${Date.now()}`,
      name: productData.name || "Untitled Product",
      nameHi: productData.nameHi || "",
      category: productData.category || "wedding-cards",
      shortDescription: productData.shortDescription || "",
      description: productData.description || "",
      images: productData.images || [],
      availableOptions: productData.availableOptions || {
        sizes: [],
        papers: [],
        finishes: [],
        languages: ["Hindi (Devanagari)", "English"],
      },
      minimumQuantity: productData.minimumQuantity || 50,
      price: productData.price || { show: false, startingFrom: 0 },
      featured: productData.featured || false,
      popular: false,
      status: productData.status || "draft",
      tags: productData.tags || [],
      searchAliases: productData.searchAliases || [],
      specs: productData.specs || {},
      createdAt: new Date().toISOString(),
      updatedAt: "Just now",
      inquiriesCount: 0,
    };
    mockProductsState.unshift(newProduct);
    return newProduct;
  }
}

/**
 * Delete a product.
 * // TODO(backend): Replace with DELETE /api/admin/products/:id
 */
export async function deleteMockAdminProduct(id: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 100));
  const initialLength = mockProductsState.length;
  mockProductsState = mockProductsState.filter((p) => p.id !== id);
  return mockProductsState.length < initialLength;
}

/**
 * Bulk delete products.
 * // TODO(backend): Replace with POST /api/admin/products/bulk-delete
 */
export async function bulkDeleteMockAdminProducts(ids: string[]): Promise<number> {
  await new Promise((r) => setTimeout(r, 150));
  const beforeCount = mockProductsState.length;
  mockProductsState = mockProductsState.filter((p) => !ids.includes(p.id));
  return beforeCount - mockProductsState.length;
}

/**
 * Bulk status update.
 * // TODO(backend): Replace with PATCH /api/admin/products/bulk-status
 */
export async function bulkUpdateMockProductStatus(ids: string[], newStatus: ProductStatus): Promise<number> {
  await new Promise((r) => setTimeout(r, 100));
  let count = 0;
  mockProductsState = mockProductsState.map((p) => {
    if (ids.includes(p.id)) {
      count++;
      return { ...p, status: newStatus, updatedAt: "Just now" };
    }
    return p;
  });
  return count;
}

/**
 * Toggle featured state.
 * // TODO(backend): Replace with PATCH /api/admin/products/:id/featured
 */
export async function toggleMockProductFeatured(id: string): Promise<boolean> {
  const p = mockProductsState.find((item) => item.id === id);
  if (p) {
    p.featured = !p.featured;
    p.updatedAt = "Just now";
    return p.featured;
  }
  return false;
}

/**
 * Get current shop settings.
 * // TODO(backend): Replace with GET /api/admin/settings
 */
export async function getMockShopSettings(): Promise<ShopSettings> {
  await new Promise((r) => setTimeout(r, 40));
  return { ...mockSettingsState };
}

/**
 * Save shop settings.
 * // TODO(backend): Replace with PUT /api/admin/settings
 */
export async function saveMockShopSettings(newSettings: Partial<ShopSettings>): Promise<ShopSettings> {
  await new Promise((r) => setTimeout(r, 120));
  mockSettingsState = {
    ...mockSettingsState,
    ...newSettings,
    lastSynced: "Just now",
  };
  return { ...mockSettingsState };
}
