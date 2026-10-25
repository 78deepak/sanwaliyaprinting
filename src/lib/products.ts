import mongoose from "mongoose";
import { connectToDatabase } from "./mongodb";
import { Product, IProduct, IProductImage } from "@/models/Product";
import { Product as UIProduct } from "@/types/product";
import { products as sampleProducts } from "@/data/products";

export interface GetPublishedProductsOptions {
  category?: string;
  sort?: "newest" | "name_asc" | "name_desc" | "price_asc" | "price_desc" | "featured";
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetAdminProductsOptions {
  search?: string;
  category?: string;
  status?: "all" | "published" | "draft" | "action_needed";
  featured?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RepositoryMutationResult {
  success: boolean;
  product?: UIProduct;
  field?: string;
  message?: string;
}

export interface DashboardStats {
  totalProducts: number;
  publishedCount: number;
  draftCount: number;
  featuredCount: number;
  categoryCounts: Record<string, number>;
}

export interface SearchIndexItem {
  id: string;
  name: string;
  nameHi?: string;
  slug: string;
  productCode: string;
  category: string;
  shortDescription?: string;
  image?: string;
  tags: string[];
  searchAliases: string[];
}

interface MongoDuplicateError extends Error {
  code?: number;
  keyPattern?: Record<string, number>;
  errors?: Record<string, { message?: string }>;
}

interface CategoryAggregateItem {
  _id: string;
  count: number;
}

/**
 * Helper to convert Mongoose document to clean, plain JSON matching UIProduct
 */
export function serializeProduct(doc: IProduct | Record<string, unknown>): UIProduct {
  const plain = (typeof (doc as IProduct).toObject === "function"
    ? (doc as IProduct).toObject()
    : doc) as Record<string, unknown>;

  const idVal = plain._id || plain.id;
  const rawImages = (plain.images as IProductImage[]) || [];

  return {
    id: idVal ? String(idVal) : "",
    productCode: String(plain.productCode || ""),
    slug: String(plain.slug || ""),
    name: String(plain.name || ""),
    nameHi: plain.nameHi ? String(plain.nameHi) : "",
    category: String(plain.category || ""),
    shortDescription: String(plain.shortDescription || ""),
    description: String(plain.description || ""),
    images: rawImages.map((img) => ({
      url: img.url,
      alt: img.alt || String(plain.name || ""),
      isPrimary: Boolean(img.isPrimary),
      publicId: img.publicId,
      width: img.width,
      height: img.height,
    })),
    availableOptions: (plain.availableOptions as UIProduct["availableOptions"]) || {},
    minimumQuantity: Number(plain.minimumQuantity) || 50,
    price: {
      show: Boolean((plain.price as UIProduct["price"])?.show),
      startingFrom: (plain.price as UIProduct["price"])?.startingFrom,
      unit: (plain.price as UIProduct["price"])?.unit || "per piece",
    },
    featured: Boolean(plain.featured),
    published: Boolean(plain.published),
    tags: (plain.tags as string[]) || [],
    searchAliases: (plain.searchAliases as string[]) || [],
    createdAt: plain.createdAt ? new Date(plain.createdAt as string | Date).toISOString() : new Date().toISOString(),
  };
}

/**
 * Extract friendly field-level message on MongoDB E11000 duplicate key error
 */
function handleMongoError(error: unknown): RepositoryMutationResult {
  const err = error as MongoDuplicateError;
  if (err?.code === 11000) {
    const key = Object.keys(err.keyPattern || {})[0] || "";
    if (key === "slug") {
      return {
        success: false,
        field: "slug",
        message: "This URL slug is already taken. Please customize a unique slug.",
      };
    }
    if (key === "productCode") {
      return {
        success: false,
        field: "productCode",
        message: "This product code already exists. Please assign a distinct code.",
      };
    }
    return {
      success: false,
      field: key,
      message: `Duplicate value detected for field: ${key}.`,
    };
  }

  if (err?.name === "ValidationError") {
    const firstField = Object.keys(err.errors || {})[0];
    const message = err.errors?.[firstField]?.message || "Validation failed";
    return { success: false, field: firstField, message };
  }

  return {
    success: false,
    message: err?.message || "An unexpected database error occurred.",
  };
}

/**
 * 1. Get published products for public store catalog (always published: true)
 */
export async function getPublishedProducts(
  options: GetPublishedProductsOptions = {}
): Promise<PaginatedResult<UIProduct>> {
  const { category, sort = "newest", search, page = 1, limit = 12 } = options;

  try {
    await connectToDatabase();

    const query: Record<string, unknown> = { published: true };

    if (category && category !== "all") {
      query.category = category;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: regex },
        { nameHi: regex },
        { productCode: regex },
        { tags: regex },
        { searchAliases: regex },
      ];
    }

    let sortOption: Record<string, 1 | -1 | "asc" | "desc"> = { createdAt: -1 };
    if (sort === "name_asc") sortOption = { name: 1 };
    else if (sort === "name_desc") sortOption = { name: -1 };
    else if (sort === "price_asc") sortOption = { "price.startingFrom": 1, createdAt: -1 };
    else if (sort === "price_desc") sortOption = { "price.startingFrom": -1, createdAt: -1 };
    else if (sort === "featured") sortOption = { featured: -1, createdAt: -1 };

    const skip = Math.max(0, (page - 1) * limit);

    const [docs, total] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    return {
      items: docs.map((d) => serializeProduct(d as unknown as IProduct)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.warn("⚠️ MongoDB unavailable, falling back to sample products:", msg);
    let filtered = sampleProducts.filter((p) => p.published !== false);

    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.productCode.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    const skip = (page - 1) * limit;
    const items = filtered.slice(skip, skip + limit);
    return {
      items,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit) || 1,
    };
  }
}

/**
 * 2. Get single published product by slug (public only)
 */
export async function getProductBySlug(slug: string): Promise<UIProduct | null> {
  if (!slug || typeof slug !== "string") return null;

  try {
    await connectToDatabase();
    const doc = await Product.findOne({ slug: slug.toLowerCase(), published: true });
    if (!doc) return null;
    return serializeProduct(doc);
  } catch {
    console.warn("⚠️ MongoDB read fallback to sample product for slug:", slug);
    const found = sampleProducts.find(
      (p) => p.slug === slug.toLowerCase() && p.published !== false
    );
    return found || null;
  }
}

/**
 * 3. Get featured products for homepage / hero spotlights
 */
export async function getFeatured(limit = 6): Promise<UIProduct[]> {
  try {
    await connectToDatabase();
    const docs = await Product.find({ published: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return docs.map((d) => serializeProduct(d as unknown as IProduct));
  } catch {
    console.warn("⚠️ MongoDB read fallback for featured products");
    return sampleProducts.filter((p) => p.featured && p.published !== false).slice(0, limit);
  }
}

/**
 * 4. Get recent additions
 */
export async function getRecent(limit = 6): Promise<UIProduct[]> {
  try {
    await connectToDatabase();
    const docs = await Product.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return docs.map((d) => serializeProduct(d as unknown as IProduct));
  } catch {
    console.warn("⚠️ MongoDB read fallback for recent products");
    return sampleProducts.filter((p) => p.published !== false).slice(0, limit);
  }
}

/**
 * 5. Get related products within the same category
 */
export async function getRelated(
  productId: string,
  category: string,
  limit = 4
): Promise<UIProduct[]> {
  try {
    await connectToDatabase();
    const query: Record<string, unknown> = {
      published: true,
      category,
    };

    if (mongoose.isValidObjectId(productId)) {
      query._id = { $ne: new mongoose.Types.ObjectId(productId) };
    }

    const docs = await Product.find(query).limit(limit).lean();
    return docs.map((d) => serializeProduct(d as unknown as IProduct));
  } catch {
    console.warn("⚠️ MongoDB read fallback for related products");
    return sampleProducts
      .filter((p) => p.category === category && p.id !== productId && p.published !== false)
      .slice(0, limit);
  }
}

/**
 * 6. Get admin products with status filtering, search, and pagination
 */
export async function getAdminProducts(
  options: GetAdminProductsOptions = {}
): Promise<PaginatedResult<UIProduct>> {
  const { search, category, status = "all", featured, sort = "newest", page = 1, limit = 10 } = options;

  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (typeof featured === "boolean") {
    query.featured = featured;
  }

  if (status === "published") {
    query.published = true;
  } else if (status === "draft") {
    query.published = false;
  }

  if (category && category !== "all") {
    query.category = category;
  }

  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.$or = [
      { name: regex },
      { nameHi: regex },
      { productCode: regex },
      { tags: regex },
      { slug: regex },
    ];
  }

  let sortOption: Record<string, 1 | -1 | "asc" | "desc"> = { createdAt: -1 };
  if (sort === "name_asc") sortOption = { name: 1 };
  else if (sort === "name_desc") sortOption = { name: -1 };
  else if (sort === "code_asc") sortOption = { productCode: 1 };
  else if (sort === "oldest") sortOption = { createdAt: 1 };

  const skip = Math.max(0, (page - 1) * limit);

  const [docs, total] = await Promise.all([
    Product.find(query).sort(sortOption).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  return {
    items: docs.map((d) => serializeProduct(d)),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

/**
 * 7. Get single product by ID (admin usage, published or draft)
 */
export async function getProductById(id: string): Promise<UIProduct | null> {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  await connectToDatabase();
  const doc = await Product.findById(id);
  if (!doc) return null;
  return serializeProduct(doc);
}

/**
 * 8. Create a new product document with duplicate-key error handling
 */
export async function createProduct(data: Partial<IProduct>): Promise<RepositoryMutationResult> {
  try {
    await connectToDatabase();

    const newProduct = new Product({
      ...data,
      slug: data.slug?.toLowerCase().trim(),
      productCode: data.productCode?.toUpperCase().trim(),
    });

    const saved = await newProduct.save();
    return { success: true, product: serializeProduct(saved) };
  } catch (error) {
    return handleMongoError(error);
  }
}

/**
 * 9. Update existing product by ID
 */
export async function updateProduct(
  id: string,
  data: Partial<IProduct>
): Promise<RepositoryMutationResult> {
  if (!mongoose.isValidObjectId(id)) {
    return { success: false, field: "id", message: "Invalid product identifier" };
  }

  try {
    await connectToDatabase();

    const updatePayload: Record<string, unknown> = { ...data };
    if (typeof updatePayload.slug === "string") {
      updatePayload.slug = updatePayload.slug.toLowerCase().trim();
    }
    if (typeof updatePayload.productCode === "string") {
      updatePayload.productCode = updatePayload.productCode.toUpperCase().trim();
    }

    const updated = await Product.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, product: serializeProduct(updated) };
  } catch (error) {
    return handleMongoError(error);
  }
}

/**
 * 10. Delete product by ID
 */
export async function deleteProduct(id: string): Promise<RepositoryMutationResult> {
  if (!mongoose.isValidObjectId(id)) {
    return { success: false, message: "Invalid product identifier" };
  }

  try {
    await connectToDatabase();
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return { success: false, message: "Product does not exist or has already been removed" };
    }
    return { success: true };
  } catch (error) {
    return handleMongoError(error);
  }
}

/**
 * 11. Toggle or set published status
 */
export async function setPublished(id: string, published: boolean): Promise<RepositoryMutationResult> {
  if (!mongoose.isValidObjectId(id)) {
    return { success: false, message: "Invalid product identifier" };
  }

  try {
    await connectToDatabase();
    const updated = await Product.findByIdAndUpdate(id, { published }, { new: true });
    if (!updated) return { success: false, message: "Product not found" };
    return { success: true, product: serializeProduct(updated) };
  } catch (error) {
    return handleMongoError(error);
  }
}

/**
 * 12. Bulk operations (publish, draft, delete)
 */
export async function bulkOperations(
  action: "publish" | "draft" | "delete",
  ids: string[]
): Promise<{ success: boolean; modifiedCount: number; message?: string }> {
  const validIds = ids.filter((id) => mongoose.isValidObjectId(id));
  if (validIds.length === 0) {
    return { success: false, modifiedCount: 0, message: "No valid product IDs provided" };
  }

  try {
    await connectToDatabase();

    if (action === "delete") {
      const res = await Product.deleteMany({ _id: { $in: validIds } });
      return { success: true, modifiedCount: res.deletedCount || 0 };
    }

    const published = action === "publish";
    const res = await Product.updateMany({ _id: { $in: validIds } }, { published });
    return { success: true, modifiedCount: res.modifiedCount || 0 };
  } catch (error: unknown) {
    const err = error as Error;
    return { success: false, modifiedCount: 0, message: err?.message || "Bulk operation failed" };
  }
}

/**
 * 13. Get dashboard stats
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    await connectToDatabase();

    const [totalProducts, publishedCount, draftCount, featuredCount, categoryAgg] =
      await Promise.all([
        Product.countDocuments({}),
        Product.countDocuments({ published: true }),
        Product.countDocuments({ published: false }),
        Product.countDocuments({ featured: true }),
        Product.aggregate<CategoryAggregateItem>([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
      ]);

    const categoryCounts: Record<string, number> = {};
    categoryAgg.forEach((item) => {
      if (item._id) categoryCounts[item._id] = item.count;
    });

    return {
      totalProducts,
      publishedCount,
      draftCount,
      featuredCount,
      categoryCounts,
    };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.warn("⚠️ MongoDB fallback for dashboard stats:", msg);
    const categoryCounts: Record<string, number> = {};
    sampleProducts.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    return {
      totalProducts: sampleProducts.length,
      publishedCount: sampleProducts.filter((p) => p.published !== false).length,
      draftCount: sampleProducts.filter((p) => p.published === false).length,
      featuredCount: sampleProducts.filter((p) => p.featured).length,
      categoryCounts,
    };
  }
}

/**
 * 14. Get lightweight search index for fast client-side fuzzy search
 */
export async function getSearchIndex(): Promise<SearchIndexItem[]> {
  try {
    await connectToDatabase();
    const docs = await Product.find(
      { published: true },
      { name: 1, nameHi: 1, slug: 1, productCode: 1, category: 1, tags: 1, searchAliases: 1, shortDescription: 1, images: 1 }
    ).lean();

    return docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      nameHi: d.nameHi || "",
      slug: d.slug,
      productCode: d.productCode,
      category: d.category,
      shortDescription: d.shortDescription || "",
      image: (d.images as IProductImage[])?.[0]?.url || "",
      tags: d.tags || [],
      searchAliases: d.searchAliases || [],
    }));
  } catch {
    console.warn("⚠️ MongoDB fallback for search index");
    return sampleProducts.map((p) => ({
      id: p.id,
      name: p.name,
      nameHi: p.nameHi,
      slug: p.slug,
      productCode: p.productCode,
      category: p.category,
      shortDescription: p.shortDescription || "",
      image: p.images[0]?.url || "",
      tags: p.tags,
      searchAliases: p.searchAliases,
    }));
  }
}
