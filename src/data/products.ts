import { Product } from "@/types/product";

export const products: Product[] = [
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
        caption: "Hero Presentation View",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrT5R3u9oInjyqb3zDm1DnEu9nFF-DD2rjZHEUnzMQmPoJX8EbtA4AH12bVN0SmLgcJG3ry3Ex5bK91Y06SBPGzUTP6BkH-h6aHD2I7_ENvnoEdGQKlFC7QV6oAYMF6zltOX6sWcxlMJ74HKtQ5hG-j47r7AH4c6kgHq2ckc0uip4Xu4hRaecSqLu5i86h_w7J-XzGk_sis5G8taXHF4F8li6AbTqwn2EgXQzrj6oWxMANl5gLA0s4sw",
        alt: "Closed Royal Maroon Farman Velvet Box with Hand-Cast Monogram",
        caption: "Closed Hardbound Box",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBnRGNmJzibG-UutAIKXXPm6DaGPyfYk7K_XykR6BOGDdAlD81DR0ulM0DSy31iKn5cMT8hajm9ziTyqYrYoz7uJs0OrVMCWvEcPnJqcp0yPvGm4_9PZ0cehchA0OTuKgSnecBdq7sRAryv8_Rkn4p0GYzCW_RaXolAhSbOXy94WSbPPuSQ2Mfp40ZrO_nS-wKFXusBIXhPQuIF7IHTr48eHIoqE2pDwxdhUPyyZmgfVTDo-qecHx_XQ",
        alt: "Open Box Revealing 3 Gilded Multi-layered Cotton Inserts",
        caption: "3 Ceremony Inserts",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEZeBCXy75R5mqqDnBVrBg1y31H5l_C7jqqah7XrC4dQoWVJLPOpSQgg1cLj3Hzea8RmYFOtnbNjmLorx4govZywo35KfwmUAic5GeD2C3gvsj9edsWgvQZI3lIhUu9jloa282UBwhEJ6mBlKhC2GWGIwbsTgMXDXnIaAu1-FvKt1lxItvpcq5LSjmtsl-pQ2CNV63GPysmJwV-0JUHyy8LFq0vZtyMc38Mm4Y2ZEDLG6fU7ndZK99Yg",
        alt: "Extreme macro of tactile 600 GSM deckled edge cotton rag paper and antique gold hot-foil shimmer",
        caption: "24k Gold Foil Shimmer",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuByoO3NLFiWljXZsbNINf66PohGLqaQzn2gKKp0uBYA4_ZSlAV3oK7vQOY2bU8VLj6T2EEDNFZ2wttA6fcPESNurmRURDbsTZdwim5ynsaRLSfY_EbA0uAwt1epQ9Vzid4CPKUoV3sgIsDBHEPQcXYALd_TPAAPRsVssu1__Yedq8Vs96dkRxtXwt153pi9AhGtoW13d7heG8xrTGLXvAq5LtDfCYJ49kCIoRBSqDJgUfF8xpI0LB_f2A",
        alt: "Matching handmade velvet shagun money envelope with personalized vermilion wax seal stamp",
        caption: "Matching Shagun Lifafa",
      },
    ],
    availableOptions: {
      sizes: ["Royal Grand (8.5\" × 6.5\")", "Classic Square (7.0\" × 7.0\")", "Farman Slim (9.0\" × 4.0\")"],
      papers: ["600 GSM Dutch Velvet Mount", "300 GSM Cotton Rag", "European Parchment"],
      finishes: ["Antique Matte Gold", "Bright 24k Yellow Gold", "Rose Gold Foil", "Aged Copper"],
      printTypes: ["Letterpress Deboss + Hot Foil", "Screen Metallic Print", "Multi-layered Die Cut"],
      languages: ["Bilingual (Hindi + English)", "Hindi Only (हिन्दी)", "English Only", "Sanskrit Vedic Shlokas"],
      customizations: ["Laser-Cut Brass Family Monogram", "Custom Wax Seal Stamp", "Gilded Foil Edge Painting"],
    },
    minimumQuantity: 50,
    price: {
      show: true,
      startingFrom: 750,
      unit: "complete suite",
      note: "Price depends on quantity and customization (Min. 50 pcs).",
    },
    featured: true,
    popular: true,
    published: true,
    tags: ["24k Gold Foil", "600 GSM Mount", "Custom Brass Die", "Dutch Velvet"],
    searchAliases: ["rajwada", "velvet box", "shadi card", "wedding box", "vivah patrika", "royal card", "शाही शादी कार्ड"],
    specs: {
      "Box Substrate": "Imported Dutch Velvet over 2.5mm Hardboard",
      "Insert Quantity": "3 Multi-layered Leaves (Sangeet, Haldi, Vivah)",
      "Card Paper": "350 GSM Natural Cotton Rag",
      "Foiling Technique": "Single-use Solid Brass Die Casting",
      "Standard Turnaround": "10 - 14 Business Days",
    },
  },
  {
    id: "prod-2",
    productCode: "RM-W-102",
    slug: "awadh-royal-farman-scroll",
    name: "Awadh Royal Farman Scroll",
    nameHi: "अवध शाही फरमान स्क्रोल",
    category: "wedding-cards",
    shortDescription:
      "Traditional Awadhi scroll farman printed on natural tussar silk with hand-turned brass finials and braided golden dori tassels.",
    description:
      "Evoking the imperial courts of Mewar and Awadh, this farman invitation unrolls gracefully to reveal antique gold calligraphy and Vedic shlokas. Housed inside a cylindrical velvet casing debossed with floral vine borders.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7xmMr9SleZ6bDf7rpGfHAW3s_yLVNoSTU3DTydj1x6TKaJp8f1DLll0d4-j4OMFZoNX2zU9JZD11droCKgU7gmID92FkWAtfrJFKCBejywZH0AcsE2Z71UNNEF1tJu6-TAaTGLhg-MXlgjhIk5K2cjmljTYCqDP3bGX1Ru7CObl5dibBeOf5VyzQS4QR4_2Ut4uOOSc1sgROfMfVMD4OXzVYZQ0vh7bNqpxE0O85tcej4gG3tJQVW0w",
        alt: "Awadh Royal Farman Scroll with golden tassels and velvet cylinder box",
        isPrimary: true,
        caption: "Unrolled Scroll Specimen",
      },
    ],
    availableOptions: {
      sizes: ["Standard Scroll (14\" × 8\")", "Grand Imperial (18\" × 10\")"],
      papers: ["Pure Tussar Raw Silk", "Deckled Edge Cotton Scroll"],
      finishes: ["Antique Brass Finials", "Silver Chased Rods"],
      languages: ["Bilingual (Hindi + English)", "Pure Sanskrit & Hindi"],
    },
    minimumQuantity: 75,
    price: {
      show: true,
      startingFrom: 480,
      unit: "set",
      note: "Includes scroll, brass finials, dori tassel, and velvet tube box.",
    },
    featured: true,
    popular: true,
    published: true,
    tags: ["Farman Scroll", "Silk Fabric", "Brass Finials", "Imperial Awadh"],
    searchAliases: ["farman", "scroll card", "shadi scroll", "rajwada farman", "फरमान"],
  },
  {
    id: "prod-3",
    productCode: "RM-W-103",
    slug: "minimalist-ivory-cotton-letterpress",
    name: "Minimalist Ivory Cotton Letterpress",
    nameHi: "मिनिमलिस्ट कॉटन लेटरप्रेस",
    category: "wedding-cards",
    shortDescription:
      "600 GSM double-thick cotton rag paper with hand-torn deckled edges and tactile blind debossed Devanagari typography.",
    description:
      "For modern couples seeking understated architectural luxury. Heavy 100% unbleached European cotton paper with deep tactile bite from our 1960 Heidelberg cylinder press, accented by subtle gold foil edges.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpU9xq5yzzrBYc3BN9hjqbYK_3MSeIay9Ft2km5VFDI99pOIoiPP4wWaMKYqNWCKP0C7edRtO1sTJhXLUTCIPMwBasqPXz7J0MdA18y7iE5iBPtFl-kLQjfm6O2OU9hlAZPb0-NuRfX6uzaue4lX3-c1gQdUXhceLuGHjs80T79RHIBVunLJsU4qHD9T25I2PraCEwmveVHfnsbhZlvcer0K2yiiJg2a_Tlf3G5DITBHcPjbJevxzFNg",
        alt: "Macro close-up photograph of 600 GSM double-thick cotton rag paper with hand-torn deckled edges",
        isPrimary: true,
        caption: "Deckled Edge Tactile Specimen",
      },
    ],
    availableOptions: {
      sizes: ["5\" × 7\" Classic", "6\" × 8\" Executive"],
      papers: ["600 GSM 100% Cotton Rag", "300 GSM Deckle Paper"],
      finishes: ["Deep Blind Deboss", "Subtle Matte Gold Foil", "Gilded Edges"],
      languages: ["English Only", "Bilingual", "Hindi"],
    },
    minimumQuantity: 50,
    price: {
      show: true,
      startingFrom: 320,
      unit: "set",
      note: "Includes main card, RSVP insert, and matching wax seal envelope.",
    },
    featured: true,
    popular: false,
    published: true,
    tags: ["600 GSM Cotton", "Deckled Edge", "Letterpress", "Minimalist"],
    searchAliases: ["cotton rag", "letterpress card", "deckle edge", "minimalist wedding card"],
  },
  {
    id: "prod-4",
    productCode: "RM-W-104",
    slug: "burgundy-wax-seal-suite",
    name: "Burgundy & Antique Gold Wax Seal Suite",
    nameHi: "बरगंडी वैक्स सील निमंत्रण",
    category: "wedding-cards",
    shortDescription:
      "Heirloom vermilion lac wax seal stamp on dark wine cardstock with antique gold calligraphy script.",
    description:
      "A dramatic and celebratory nuptial suite featuring a tri-fold wine burgundy cover bound with raw silk ribbon and an authentic hand-stamped monogram wax seal.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4Rjn-0wOa2cwHUEJ6jXZ9-Zja1mk1BcMb7K89tEcGNgLGDROTZMKfZZ528FMyRdvc5vAn_NF851TgHs1WWfwJQ1FUHC5bzNVU5613Kd3V0kEZ6AV5xnpQKakQWYhoiGgWkAaNexLRKaYmUcieK7mj_iORb-BtXS-OFl4S_Jmci5MWjiGbcKfhXpuEDx53PbFFlpC8GTBI9g2oH3TgGhK3vaLGxhFeVMRDu_uARyb4hBroK4s0mhD-nA",
        alt: "Bespoke royal burgundy wedding card envelope sealed with antique gold wax seal",
        isPrimary: true,
        caption: "Wax Seal Monogram Specimen",
      },
    ],
    availableOptions: {
      sizes: ["7.5\" × 5.5\" Tri-fold", "8\" × 6\" Hardbound"],
      papers: ["Wine Burgundy Cardstock 400 GSM", "Matte Ivory Cotton"],
      finishes: ["24k Gold Foil Calligraphy", "Custom Monogram Lac Seal"],
    },
    minimumQuantity: 100,
    price: {
      show: false,
      note: "Price depends on quantity and seal die customisation.",
    },
    featured: false,
    popular: true,
    published: true,
    tags: ["Wax Seal", "Burgundy", "Gold Calligraphy", "Ribbon Bound"],
    searchAliases: ["wax seal card", "burgundy wedding card", "lac seal", "मुहर शादी कार्ड"],
  },
  {
    id: "prod-5",
    productCode: "RM-BUS-042",
    slug: "luxury-visiting-cards",
    name: "Embossed Gold Foil Luxury Visiting Cards",
    nameHi: "प्रीमियम विजिटिंग कार्ड",
    category: "visiting-cards",
    shortDescription:
      "Triplex 800 GSM heavyweight archival cotton business cards with painted gold foil edges and deep blind deboss.",
    description:
      "Command instant authority with triplex 800 GSM sandwich cardstock. Finished with painted 24k gold edges, hot-stamped metallic foil logos, and crisp letterpress typography.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS8ML3tApd8FoFGJe6T2QYAd3vY1sxtBTe6E5VFazYi2k0e50uQYiBuGA8coHKITNyK0GB9oZ26b_KXVKtYfUdcXfq6U5s6jKq35JjXhHMEStI3HllIW-JqioyXK8wQa9B7SQao1r6CL0wPvCUBToMxtkv982AZjSlwT4JSfxW_0j4PI_Pf2RomfjBepG81anYEdJ7QzC93_j7eRRwjMdM6l2XAomf5m_mTqK3JnB2JlLyjGPO-AAT5A",
        alt: "Stacked triplex 800 GSM luxury business visiting cards with painted gold foil edges",
        isPrimary: true,
        caption: "Triplex 800 GSM Gold Edge",
      },
    ],
    availableOptions: {
      sizes: ["Standard 3.5\" × 2.0\"", "Square 2.5\" × 2.5\""],
      papers: ["Triplex 800 GSM Cotton", "Soft-Touch Matte 400 GSM", "Matte PVC Waterproof"],
      finishes: ["Painted Gold Edges", "Blind Deboss", "Spot UV Glaze", "Hot Foil Stamped"],
    },
    minimumQuantity: 100,
    price: {
      show: true,
      startingFrom: 950,
      unit: "per 100 cards",
      note: "Includes 2-sided color printing, matte lamination, and gold foil logo.",
    },
    featured: true,
    popular: true,
    published: true,
    tags: ["800 GSM", "Gilded Edges", "Gold Foil", "Blind Deboss"],
    searchAliases: ["visiting card", "business card", "doctor visiting card", "lawyer card", "विजिटिंग कार्ड"],
  },
  {
    id: "prod-6",
    productCode: "RM-BIL-019",
    slug: "triplicate-custom-bill-book",
    name: "Triplicate Carbonless Custom Bill Book",
    nameHi: "कस्टम बिल बुक व रसीदें",
    category: "bill-books",
    shortDescription:
      "Traditional hardbound corporate bill book ledger with hot gold foil letterpress cover, sequential numbering, and crisp perforations.",
    description:
      "Precision ruled accounting bill books and cash memos tailored to your GSTIN, banking QR code, and business terms. Duplicate or triplicate carbonless NCR paper eliminates messy carbon sheets.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCQVOcrxgY4HoFRnbxwLmobzFFeNi0ABBMwF6JvUx5yBKL8AFptp_G2v6rVz74lNDqXQZxc3LUZGsohtKOADwX1gqCTdBbB9s3vNiy5K7fVLGMe5Nf715HKC3hlieB7P1kREPNB8DM74DppN_jGOS44zE95wPhVcXvYQz5-1bzM6Res4jelFdDBPpIUTrYYSNWZ7pyR0ZGIyGrcq74EXsNqMj81ck7xdvjB8SqXrtkRnx6qkcM-vJTzQ",
        alt: "Hardbound corporate bill book ledger with hot gold foil letterpress stamped title",
        isPrimary: true,
        caption: "Hardbound Gold Foil Ledger",
      },
    ],
    availableOptions: {
      sizes: ["A5 (8.5\" × 5.5\")", "A4 (11.0\" × 8.5\")", "Pocket Memo (5\" × 4\")"],
      papers: ["Duplicate (White + Pink)", "Triplicate (White + Pink + Yellow)"],
      finishes: ["Hardbound Spine with Gold Foil", "Soft Cover Perforated Book"],
    },
    minimumQuantity: 5,
    price: {
      show: true,
      startingFrom: 180,
      unit: "book (50 sets)",
      note: "Includes consecutive red letterpress numbering and GST layout setup.",
    },
    featured: true,
    popular: true,
    published: true,
    tags: ["Carbonless NCR", "Red Numbering", "Hardbound", "GST Ready"],
    searchAliases: ["bill book", "invoice book", "receipt book", "cash memo", "बिल बुक"],
  },
  {
    id: "prod-7",
    productCode: "RM-BAN-005",
    slug: "wedding-welcome-banner-standee",
    name: "Palatial Welcome Standee & Star Flex Banner",
    nameHi: "शाही प्रवेश स्टैंडी व फ्लेक्स बैनर",
    category: "flex-banners",
    shortDescription:
      "High-definition architectural roll-up standees and non-tearable matte backdrop banners with gold cursive lettering.",
    description:
      "Welcome your guests with grandeur. Custom wedding entrance easels, stage backdrops, and promotional exhibition banners printed in ultra-dense color saturation on heavy gauge star flex.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwLYuPzA4eQxcr7Gdtbn0vH_TH_X4PoK6KMipJQgWDS3a5J8j8HTPk6vQMWFrXdEJMoYIZITTuuJqngt-gK8tx2jXpU814EvbV1gapm9O7nYnBpSQZdr-FjfnLU2fvnX03D_-H8to9FrX68XX5zw76Qe4-_LdclhBrYpK7rhS2PIVY17c9E3iWM2W6Tv2RgPbz33ZNuW3FgoPXiNE6lYeJ1MSoxErZfNS_4Nrde3RCx7ro5Rn50WB0og",
        alt: "High resolution event backdrop banner with floral wedding welcome sign in gold cursive typography",
        isPrimary: true,
        caption: "Banquet Hall Welcome Standee",
      },
    ],
    availableOptions: {
      sizes: ["Roll-up Standee (6ft × 3ft)", "Backdrop Flex (10ft × 8ft)", "Custom Dimensions"],
      papers: ["Heavy Star Flex", "Non-Tearable Backlit Matte", "Cotton Fabric Canvas"],
    },
    minimumQuantity: 1,
    price: {
      show: true,
      startingFrom: 650,
      unit: "standee / banner",
      note: "Same-day printing available for urgent events.",
    },
    featured: false,
    popular: true,
    published: true,
    tags: ["Star Flex", "Roll-up Standee", "Wedding Welcome", "High Definition"],
    searchAliases: ["flex banner", "standee", "wedding banner", "welcome board", "फ्लेक्स"],
  },
  {
    id: "prod-8",
    productCode: "RM-ENV-008",
    slug: "shagun-envelope-set",
    name: "Handmade Gold Foil Shagun Lifafa Set",
    nameHi: "हस्तनिर्मित शगुन लिफाफे",
    category: "envelopes-stationery",
    shortDescription:
      "Handcrafted luxury wedding gift shagun envelopes with metallic gold foil stamping and embossed lotus motifs.",
    description:
      "Made from 100% recycled cotton rag paper with embossed traditional auspicious emblems (Ganesh, Lotus, Kalash). Perfect for cash blessings, gift vouchers, and festive shagun.",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqTD9xy6WO_6eb_THUCEE1MdRc0c0nknU5Ez8VAOUvSDurT4GJCs5ctQXEoVhT9PFsOAeQp5KNq0LjhIfeKreAMPNIajXp47j6RQV7ZX1TedPh1JvxI21kxXOtlBgbkR1MzRmxDdFbsid526eJdwnw96QRe7EnkuCrlWVxUpvgUnGnGWp2SikR67rRXL9S-sPyds78kgyrZAEMfujD1q6X5NvtczzpsxqP6cIHC6xF33hwVwYmos2xYg",
        alt: "Handcrafted luxury wedding gift shagun envelopes with metallic gold foil stamping",
        isPrimary: true,
        caption: "Auspicious Shagun Lifafas",
      },
    ],
    availableOptions: {
      sizes: ["Standard Cash Lifafa (7.5\" × 3.5\")"],
      papers: ["Handmade Cotton Deckle 300 GSM", "Metallic Gold Pearl 280 GSM"],
      finishes: ["Embossed Lotus", "Ganeshji Foil Seal", "Wax Monogram Medallion"],
    },
    minimumQuantity: 25,
    price: {
      show: true,
      startingFrom: 35,
      unit: "lifafa (Min. 25)",
      note: "Available in sets of 25, 50, and 100 pcs.",
    },
    featured: false,
    popular: true,
    published: true,
    tags: ["Shagun Lifafa", "Ganesh Motif", "Handmade Cotton", "Foil Stamped"],
    searchAliases: ["lifafa", "shagun envelope", "money envelope", "gift envelope", "शगुन लिफाफा"],
  },
];
