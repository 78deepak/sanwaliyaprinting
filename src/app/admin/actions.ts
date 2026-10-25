"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  setPublished,
  bulkOperations,
  getProductById,
  getAdminProducts,
  GetAdminProductsOptions,
} from "@/lib/products";
import { Product, IProduct } from "@/models/Product";
import { SiteSettings } from "@/models/SiteSettings";
import { connectToDatabase } from "@/lib/mongodb";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import {
  productFormSchema,
  siteSettingsSchema,
  SiteSettingsValues,
} from "@/lib/validation";
import { Product as UIProduct } from "@/types/product";
import { AdminProduct } from "@/data/admin-mock";

export interface ActionResult<T = unknown> {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  data?: T;
}

/**
 * Revalidate all public and admin paths impacted by catalogue changes.
 */
function revalidateCataloguePaths(category?: string, slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/search");
  revalidatePath("/sitemap.xml");

  if (category) {
    revalidatePath(`/${category}`);
    if (slug) {
      revalidatePath(`/${category}/${slug}`);
    }
  }
}

/**
 * 1. Create Product Action
 */
export async function createProductAction(input: unknown): Promise<ActionResult<UIProduct>> {
  await requireAdmin();

  const parseResult = productFormSchema.safeParse(input);
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please correct the highlighted form errors.",
      fieldErrors,
    };
  }

  const res = await createProduct(parseResult.data as unknown as Partial<IProduct>);
  if (!res.success) {
    return {
      ok: false,
      message: res.message || "Failed to create product document.",
      fieldErrors: res.field ? { [res.field]: [res.message || "Invalid value"] } : undefined,
    };
  }

  revalidateCataloguePaths(parseResult.data.category, parseResult.data.slug);

  return {
    ok: true,
    message: `"${parseResult.data.name}" has been saved successfully!`,
    data: res.product,
  };
}

/**
 * 2. Update Product Action
 */
export async function updateProductAction(
  id: string,
  input: unknown
): Promise<ActionResult<UIProduct>> {
  await requireAdmin();

  const parseResult = productFormSchema.safeParse(input);
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please correct the highlighted form errors.",
      fieldErrors,
    };
  }

  const res = await updateProduct(id, parseResult.data as unknown as Partial<IProduct>);
  if (!res.success) {
    return {
      ok: false,
      message: res.message || "Failed to update product document.",
      fieldErrors: res.field ? { [res.field]: [res.message || "Invalid value"] } : undefined,
    };
  }

  revalidateCataloguePaths(parseResult.data.category, parseResult.data.slug);

  return {
    ok: true,
    message: `"${parseResult.data.name}" updated successfully!`,
    data: res.product,
  };
}

/**
 * 3. Delete Product Action
 */
export async function deleteProductAction(id: string): Promise<ActionResult> {
  await requireAdmin();

  const existing = await getProductById(id);
  const res = await deleteProduct(id);

  if (!res.success) {
    return {
      ok: false,
      message: res.message || "Failed to delete product.",
    };
  }

  // Clean up associated Cloudinary images
  if (existing?.images) {
    for (const img of existing.images) {
      if (img.publicId) {
        try {
          await deleteFromCloudinary(img.publicId);
        } catch (e) {
          console.warn("Could not delete image from Cloudinary:", img.publicId, e);
        }
      }
    }
  }

  revalidateCataloguePaths(existing?.category, existing?.slug);

  return {
    ok: true,
    message: "Product and associated images removed.",
  };
}

/**
 * 4. Toggle Product Published Status
 */
export async function togglePublishAction(
  id: string,
  published: boolean
): Promise<ActionResult<UIProduct>> {
  await requireAdmin();

  const res = await setPublished(id, published);
  if (!res.success) {
    return {
      ok: false,
      message: res.message || "Failed to update publication status.",
    };
  }

  revalidateCataloguePaths(res.product?.category, res.product?.slug);

  return {
    ok: true,
    message: published ? "Product published to live site." : "Product moved to drafts.",
    data: res.product,
  };
}

/**
 * 5. Toggle Featured Status
 */
export async function toggleFeaturedAction(
  id: string,
  featured: boolean
): Promise<ActionResult<UIProduct>> {
  await requireAdmin();

  const res = await updateProduct(id, { featured });
  if (!res.success) {
    return {
      ok: false,
      message: res.message || "Failed to toggle featured spotlight.",
    };
  }

  revalidateCataloguePaths(res.product?.category, res.product?.slug);

  return {
    ok: true,
    message: featured ? "Product spotlighted on homepage!" : "Product removed from homepage spotlight.",
    data: res.product,
  };
}

/**
 * 6. Bulk Operations (Publish, Draft, Delete)
 */
export async function bulkProductsAction(
  action: "publish" | "draft" | "delete",
  ids: string[]
): Promise<ActionResult<{ modifiedCount: number }>> {
  await requireAdmin();

  if (action === "delete") {
    // Clean up Cloudinary images for all deleted products
    for (const id of ids) {
      try {
        const prod = await getProductById(id);
        if (prod?.images) {
          for (const img of prod.images) {
            if (img.publicId) {
              await deleteFromCloudinary(img.publicId);
            }
          }
        }
      } catch (e) {
        console.warn("Failed to clean up Cloudinary asset during bulk delete:", e);
      }
    }
  }

  const res = await bulkOperations(action, ids);
  if (!res.success) {
    return {
      ok: false,
      message: res.message || "Bulk operation failed.",
    };
  }

  revalidateCataloguePaths();

  const actionText =
    action === "delete"
      ? "deleted"
      : action === "publish"
      ? "published"
      : "moved to drafts";

  return {
    ok: true,
    message: `${res.modifiedCount} product(s) successfully ${actionText}.`,
    data: { modifiedCount: res.modifiedCount },
  };
}

/**
 * 7. Live Slug Uniqueness Check & Auto-Suggest
 */
export async function checkSlugUniquenessAction(
  slug: string,
  currentProductId?: string
): Promise<{ available: boolean; suggestedSlug?: string }> {
  await requireAdmin();

  const clean = slug?.toLowerCase().trim();
  if (!clean) return { available: false };

  await connectToDatabase();

  const query: Record<string, unknown> = { slug: clean };
  if (currentProductId) {
    query._id = { $ne: currentProductId };
  }

  const existing = await Product.findOne(query).select("_id").lean();

  if (!existing) {
    return { available: true };
  }

  // Suggest alternative with random suffix
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const suggestedSlug = `${clean}-${randomSuffix}`;

  return {
    available: false,
    suggestedSlug,
  };
}

/**
 * 8. Save Site Settings Action
 */
export async function saveSiteSettingsAction(input: unknown): Promise<ActionResult<SiteSettingsValues>> {
  await requireAdmin();

  const parseResult = siteSettingsSchema.safeParse(input);
  if (!parseResult.success) {
    return {
      ok: false,
      message: "Please correct the settings fields.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
    };
  }

  await connectToDatabase();

  const updated = await SiteSettings.findOneAndUpdate(
    {},
    { $set: parseResult.data },
    { upsert: true, new: true, runValidators: true }
  );

  revalidatePath("/");
  revalidatePath("/admin/settings");
  revalidatePath("/admin", "layout");
  revalidatePath("/admin");

  return {
    ok: true,
    message: "Store profile & WhatsApp parameters updated!",
    data: updated ? (updated.toObject() as unknown as SiteSettingsValues) : undefined,
  };
}

/**
 * 9. Get Site Settings Action
 */
export async function getSiteSettingsAction(): Promise<SiteSettingsValues & { updatedAt?: string }> {
  try {
    await connectToDatabase();
    const doc = await SiteSettings.findOne().lean();
    if (doc) {
      return {
        businessName: doc.businessName,
        businessNameHi: doc.businessNameHi,
        phone: doc.phone,
        whatsapp: doc.whatsapp,
        address: doc.address,
        addressHi: doc.addressHi,
        openingHours: doc.openingHours,
        openingHoursHi: doc.openingHoursHi || "",
        whatsappTemplate:
          doc.whatsappTemplate ||
          "Namaste Sanwaliya Press! I would like to inquire about [Product Name] (Code: [Code]). Could you please share card samples and printing quote for [Qty] pieces on [Paper Stock]?",
        tagline: doc.tagline,
        taglineHi: doc.taglineHi,
        establishedYear: doc.establishedYear || 1994,
        ownerName: doc.ownerName || "Ramesh Patidar (Owner)",
        ownerEmail: doc.ownerEmail || "ramesh@sanwaliyapress.in",
        socialLinks: {
          instagram: doc.socialLinks?.instagram || "",
          facebook: doc.socialLinks?.facebook || "",
          googleMaps: doc.socialLinks?.googleMaps || "",
        },
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : undefined,
      };
    }
  } catch (e) {
    console.warn("⚠️ Failed to load site settings from DB, returning defaults:", e);
  }

  return {
    businessName: "Sanwaliya Printing Press",
    businessNameHi: "सांवलिया प्रिंटिंग प्रेस",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    address: "Station Road, Near Bus Stand, Suwasra, Dist. Mandsaur, MP - 458888",
    addressHi: "स्टेशन रोड, बस स्टैंड के पास, सुवासरा, जिला मंदसौर (म.प्र.)",
    openingHours: "Mon – Sat: 9:00 AM – 8:30 PM (Sunday by Appointment)",
    openingHoursHi: "सोमवार से शनिवार: सुबह 9:00 से रात 8:30 बजे तक",
    whatsappTemplate:
      "Namaste Sanwaliya Press! I would like to inquire about [Product Name] (Code: [Code]). Could you please share card samples and printing quote for [Qty] pieces on [Paper Stock]?",
    tagline: "Fine Print Studio & Bespoke Wedding Stationery",
    taglineHi: "शाही विवाह पत्रिका, विजिटिंग कार्ड्स एवं कमर्शियल प्रिंटिंग",
    establishedYear: 1994,
    ownerName: "Ramesh Patidar (Owner)",
    ownerEmail: "ramesh@sanwaliyapress.in",
    socialLinks: {
      instagram: "https://instagram.com/sanwaliyapress",
      facebook: "https://facebook.com/sanwaliyapress",
      googleMaps: "https://maps.google.com/?q=Sanwaliya+Printing+Press+Suwasra",
    },
    updatedAt: "Today, 10:45 AM",
  };
}

/**
 * 10. Get Admin Products List Action (with filters, pagination, and real MongoDB Atlas query)
 */
export async function getAdminProductsListAction(
  options: GetAdminProductsOptions = {}
): Promise<{
  items: AdminProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  await requireAdmin();

  const res = await getAdminProducts(options);

  const items: AdminProduct[] = res.items.map((p) => {
    const raw = p as unknown as Record<string, unknown>;
    return {
      ...p,
      featured: Boolean(p.featured),
      status: p.published ? "published" : "draft",
      createdAt: p.createdAt || new Date().toISOString(),
      updatedAt: String(raw.updatedAt || p.createdAt || new Date().toISOString()),
      inquiriesCount: Number(raw.inquiriesCount) || 0,
    };
  });

  return {
    items,
    total: res.total,
    page: res.page,
    limit: res.limit,
    totalPages: res.totalPages,
  };
}

/**
 * 11. Generate Bcrypt Password Hash Action
 */
export async function generatePasswordHashAction(
  password: string
): Promise<ActionResult<{ hash: string }>> {
  await requireAdmin();

  if (!password || password.length < 8) {
    return {
      ok: false,
      message: "Master desk password must be at least 8 characters.",
    };
  }

  const bcrypt = await import("bcryptjs");
  const hash = await bcrypt.default.hash(password, 12);

  return {
    ok: true,
    message: "Bcrypt hash generated successfully (Cost: 12 rounds).",
    data: { hash },
  };
}

/**
 * 12. Delete Image from Cloudinary Action
 */
export async function deleteImageAction(publicId: string): Promise<ActionResult> {
  await requireAdmin();

  if (!publicId) {
    return { ok: false, message: "No Cloudinary public ID provided." };
  }

  const res = await deleteFromCloudinary(publicId);
  return {
    ok: res.success,
    message: res.success ? "Image removed from Cloudinary storage." : (res.result || "Failed to remove image."),
  };
}


