import { z } from "zod";
import { categories } from "@/data/categories";

const validCategorySlugs = categories.map((c) => c.slug) as [string, ...string[]];

/**
 * Image Schema for Product Uploads
 */
export const productImageSchema = z.object({
  url: z.string().min(1, "Image URL is required"),
  alt: z.string().min(1, "Alt text is required for accessibility"),
  isPrimary: z.boolean().optional().default(false),
  publicId: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  order: z.number().optional().default(0),
});

/**
 * Product Form Schema (shared between client React Hook Form and server validation)
 */
export const productFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Product name must be at least 2 characters")
      .max(150, "Product name cannot exceed 150 characters"),
    nameHi: z.string().max(150, "Hindi name cannot exceed 150 characters").optional().default(""),
    slug: z
      .string()
      .min(2, "Slug must be at least 2 characters")
      .max(120, "Slug cannot exceed 120 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must consist of lowercase alphanumeric words separated by hyphens (e.g. royal-farman-scroll)"
      ),
    productCode: z
      .string()
      .min(2, "Product code must be at least 2 characters")
      .max(50, "Product code cannot exceed 50 characters")
      .regex(
        /^[A-Z0-9_-]+$/i,
        "Product code should contain uppercase letters, numbers, or dashes (e.g. RM-W-101)"
      ),
    category: z.enum(validCategorySlugs, {
      error: "Please select a valid catalogue category",
    }),
    shortDescription: z
      .string()
      .min(10, "Short description must be at least 10 characters")
      .max(300, "Short description cannot exceed 300 characters"),
    description: z.string().min(10, "Detailed description must be at least 10 characters"),
    images: z.array(productImageSchema).min(1, "At least one product image is required"),
    availableOptions: z
      .object({
        sizes: z.array(z.string()).optional().default([]),
        papers: z.array(z.string()).optional().default([]),
        finishes: z.array(z.string()).optional().default([]),
        printTypes: z.array(z.string()).optional().default([]),
        languages: z.array(z.string()).optional().default([]),
        customizations: z.array(z.string()).optional().default([]),
      })
      .optional()
      .default({
        sizes: [],
        papers: [],
        finishes: [],
        printTypes: [],
        languages: [],
        customizations: [],
      }),
    minimumQuantity: z
      .number({ error: "Please enter a valid number" })
      .min(1, "Minimum order quantity must be at least 1 piece")
      .default(50),
    price: z
      .object({
        show: z.boolean().default(false),
        startingFrom: z.number().min(0, "Price must be a positive number").optional(),
        unit: z.string().default("per piece"),
      })
      .default({ show: false, unit: "per piece" }),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(true),
    tags: z.array(z.string()).optional().default([]),
    searchAliases: z.array(z.string()).optional().default([]),
    seoTitle: z.string().max(70, "SEO title cannot exceed 70 characters").optional().default(""),
    seoDescription: z
      .string()
      .max(160, "SEO description cannot exceed 160 characters")
      .optional()
      .default(""),
  })
  .refine(
    (data) => {
      if (data.price?.show) {
        return typeof data.price.startingFrom === "number" && data.price.startingFrom > 0;
      }
      return true;
    },
    {
      message: "Please specify a starting price when 'Show price' is enabled",
      path: ["price", "startingFrom"],
    }
  );

export type ProductFormValues = z.infer<typeof productFormSchema>;

/**
 * Site Settings Schema
 */
export const siteSettingsSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessNameHi: z.string().min(2, "Hindi business name is required"),
  phone: z.string().min(5, "Contact phone number is required"),
  whatsapp: z.string().min(10, "WhatsApp phone number is required"),
  address: z.string().min(5, "Shop address is required"),
  addressHi: z.string().min(5, "Hindi shop address is required"),
  openingHours: z.string().min(3, "Opening hours are required"),
  openingHoursHi: z.string().optional().default(""),
  whatsappTemplate: z
    .string()
    .optional()
    .default(
      "Namaste Sanwaliya Press! I would like to inquire about [Product Name] (Code: [Code]). Could you please share card samples and printing quote for [Qty] pieces on [Paper Stock]?"
    ),
  tagline: z.string().min(3, "Tagline is required"),
  taglineHi: z.string().min(3, "Hindi tagline is required"),
  establishedYear: z.number().default(1994),
  socialLinks: z
    .object({
      instagram: z.string().optional().default(""),
      facebook: z.string().optional().default(""),
      googleMaps: z.string().optional().default(""),
    })
    .optional()
    .default({
      instagram: "",
      facebook: "",
      googleMaps: "",
    }),
});

export type SiteSettingsValues = z.infer<typeof siteSettingsSchema>;
