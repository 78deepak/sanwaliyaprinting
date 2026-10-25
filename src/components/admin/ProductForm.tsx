"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  BookOpen,
  Image as ImageIcon,
  Layers,
  DollarSign,
  Search,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  X,
  Trash2,
  Sparkles,
} from "lucide-react";
import { AdminProduct, ProductStatus } from "@/data/admin-mock";
import {
  createProductAction,
  updateProductAction,
  deleteProductAction,
  checkSlugUniquenessAction,
} from "@/app/admin/actions";
import { categories } from "@/data/categories";
import { FormSection } from "./FormSection";
import { ImageUploader, UploadedImage } from "./ImageUploader";
import { TagInput } from "./TagInput";
import { SeoPreview } from "./SeoPreview";
import { StickySaveBar } from "./StickySaveBar";
import { ConfirmDialog } from "./ConfirmDialog";

// Zod Schema with custom validations
const productFormSchema = z
  .object({
    name: z.string().min(2, "Product name is required (at least 2 characters)"),
    nameHi: z.string().optional(),
    slug: z
      .string()
      .min(2, "URL Slug is required")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Invalid slug format. Use only lowercase letters, numbers, and single hyphens (e.g. rajwada-velvet-box)"
      ),
    productCode: z.string().min(2, "Item code is required (e.g. RM-W-101)"),
    category: z.string().min(1, "Please select a category"),
    shortDescription: z
      .string()
      .min(5, "Short description is required for catalog preview cards")
      .max(160, "Short description should be under 160 characters"),
    description: z
      .string()
      .min(10, "Full description must be at least 10 characters"),
    showPrice: z.boolean(),
    startingFrom: z.number().optional(),
    maxPrice: z.number().optional(),
    minimumQuantity: z.number().min(1, "Minimum quantity must be at least 1"),
    featured: z.boolean(),
    status: z.enum(["published", "draft", "archived"]),
  })
  .refine(
    (data) => {
      // If showPrice is true, startingFrom must be greater than 0
      if (data.showPrice) {
        return typeof data.startingFrom === "number" && data.startingFrom > 0;
      }
      return true;
    },
    {
      message: "Starting price is required when 'Show price' is enabled",
      path: ["startingFrom"],
    }
  );

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialProduct?: AdminProduct;
  isEditMode?: boolean;
}

export function ProductForm({
  initialProduct,
  isEditMode = false,
}: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [slugStatus, setSlugStatus] = useState<{
    checking: boolean;
    available?: boolean;
    suggestedSlug?: string;
  }>({ checking: false });

  // Additional state not handled by basic inputs
  const [images, setImages] = useState<UploadedImage[]>(
    initialProduct?.images || []
  );
  const [tags, setTags] = useState<string[]>(
    initialProduct?.tags || [
      "24k Gold Foil",
      "Dutch Velvet",
      "Handmade Rag",
      "शादी कार्ड",
    ]
  );
  const [sizes, setSizes] = useState<string[]>(
    initialProduct?.availableOptions.sizes || [
      '8.5" × 6.5" Flagship Box',
      '7.0" × 7.0" Square',
    ]
  );
  const [newSizeInput, setNewSizeInput] = useState("");
  const [papers, setPapers] = useState<string[]>(
    initialProduct?.availableOptions.papers || [
      "900 GSM Kappa Board",
      "320 GSM Textured Linen",
    ]
  );
  const [newPaperInput, setNewPaperInput] = useState("");
  const [finishes, setFinishes] = useState<string[]>(
    initialProduct?.availableOptions.finishes || [
      "24k Antique Gold Foil",
      "Blind Deboss",
    ]
  );
  const [newFinishInput, setNewFinishInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialProduct?.name || "",
      nameHi: initialProduct?.nameHi || "",
      slug: initialProduct?.slug || "",
      productCode: initialProduct?.productCode || "",
      category: initialProduct?.category || categories[0]?.slug || "wedding-cards",
      shortDescription: initialProduct?.shortDescription || "",
      description: initialProduct?.description || "",
      showPrice: initialProduct?.price?.show ?? true,
      startingFrom: initialProduct?.price?.startingFrom ?? 750,
      maxPrice: initialProduct?.price?.maxPrice ?? 1150,
      minimumQuantity: initialProduct?.minimumQuantity || 50,
      featured: initialProduct?.featured || false,
      status: initialProduct?.status || "published",
    },
  });

  const watchedName = watch("name");
  const watchedSlug = watch("slug");
  const watchedShowPrice = watch("showPrice");
  const watchedShortDesc = watch("shortDescription");
  const watchedCategory = watch("category");

  // Auto generate slug if user hasn't explicitly typed one yet
  const handleAutoSlug = () => {
    if (watchedName) {
      const generated = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generated, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleAddSize = () => {
    if (newSizeInput.trim() && !sizes.includes(newSizeInput.trim())) {
      setSizes([...sizes, newSizeInput.trim()]);
      setNewSizeInput("");
    }
  };

  const handleAddPaper = () => {
    if (newPaperInput.trim() && !papers.includes(newPaperInput.trim())) {
      setPapers([...papers, newPaperInput.trim()]);
      setNewPaperInput("");
    }
  };

  const handleAddFinish = () => {
    if (newFinishInput.trim() && !finishes.includes(newFinishInput.trim())) {
      setFinishes([...finishes, newFinishInput.trim()]);
      setNewFinishInput("");
    }
  };

  // Live Slug Uniqueness Checker
  const handleCheckSlug = async (slugVal: string) => {
    if (!slugVal || slugVal.trim().length < 2) return;
    setSlugStatus({ checking: true });
    try {
      const res = await checkSlugUniquenessAction(slugVal, initialProduct?.id);
      setSlugStatus({
        checking: false,
        available: res.available,
        suggestedSlug: res.suggestedSlug,
      });
    } catch {
      setSlugStatus({ checking: false });
    }
  };

  // Submit Handler: Saves product into database via Server Action
  const onSubmit = async (data: ProductFormValues, submitStatus?: ProductStatus) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const isPublished = (submitStatus || data.status) === "published";
      const payload = {
        name: data.name,
        nameHi: data.nameHi || "",
        slug: data.slug.toLowerCase().trim(),
        productCode: data.productCode.toUpperCase().trim(),
        category: data.category,
        shortDescription: data.shortDescription,
        description: data.description,
        images: images.map((img, idx) => ({
          url: img.url,
          alt: img.alt || data.name,
          isPrimary: idx === 0 || Boolean(img.isPrimary),
          publicId: img.publicId || (img.url.includes("cloudinary") ? img.id : undefined),
          width: img.width,
          height: img.height,
          order: idx,
        })),
        availableOptions: {
          sizes,
          papers,
          finishes,
          languages: ["Hindi (Devanagari)", "English"],
          customizations: tags,
        },
        minimumQuantity: data.minimumQuantity,
        price: {
          show: data.showPrice,
          startingFrom: data.showPrice ? data.startingFrom : undefined,
          unit: "per piece",
        },
        featured: data.featured,
        published: isPublished,
        tags,
        searchAliases: [data.productCode, data.nameHi || "", ...tags].filter(Boolean),
        seoTitle: `${data.name} | Sanwaliya Printing Press`,
        seoDescription: data.shortDescription,
      };

      const result =
        isEditMode && initialProduct?.id
          ? await updateProductAction(initialProduct.id, payload)
          : await createProductAction(payload);

      if (result.ok) {
        setToastMessage(result.message || "Product saved successfully!");
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 800);
      } else {
        setServerError(result.message || "Failed to save product.");
      }
    } catch {
      setServerError("An unexpected error occurred while saving the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler
  const handleDeleteConfirm = async () => {
    if (!initialProduct?.id) return;
    setIsDeleting(true);
    try {
      const res = await deleteProductAction(initialProduct.id);
      if (res.ok) {
        setDeleteDialogOpen(false);
        router.push("/admin/products");
        router.refresh();
      } else {
        alert(res.message || "Failed to delete product.");
      }
    } catch {
      alert("Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-secondary" />
          <span className="text-label-md font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Server Error Banner */}
      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="text-body-md font-semibold">{serverError}</span>
          </div>
          <button
            type="button"
            onClick={() => setServerError(null)}
            className="text-destructive/70 hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title={`Delete "${initialProduct?.name}"?`}
        subtitle={`Product Code: ${initialProduct?.productCode}`}
        message="This will permanently remove this design from your active atelier catalog and customer WhatsApp quote showcases. This action cannot be undone."
        confirmLabel="Delete Product"
        cancelLabel="Cancel"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialogOpen(false)}
      />

      {/* Breadcrumb & Title Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border mb-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-label-sm text-muted-foreground">
            <span>Admin</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="text-primary font-semibold">
              {isEditMode ? `Edit ${initialProduct?.productCode}` : "New Product"}
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold tracking-tight">
            {isEditMode ? `Edit Product: ${initialProduct?.name}` : "Add New Print Design"}
          </h1>
        </div>

        {isEditMode && initialProduct && (
          <div className="flex items-center gap-2">
            <a
              href={`/category/${initialProduct.category}/${initialProduct.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground text-label-md font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-secondary" />
              <span>View on Public Website</span>
            </a>
          </div>
        )}
      </div>

      {/* Main 12-Column Form Layout */}
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column (8 cols): Core Information & Media */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* SECTION 1: Basic Information */}
          <FormSection
            title="Basic Information"
            titleHi="उत्पाद की मुख्य जानकारी एवं विवरण"
            icon={BookOpen}
            badge={
              <span className="text-label-sm text-secondary bg-secondary/10 px-2.5 py-1 rounded-md border border-secondary/20">
                Required Fields *
              </span>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Product Name */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold">
                  Product Name (English) *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Rajwada Velvet Box Suite"
                  className={`w-full px-4 py-2.5 rounded-lg bg-surface-container border text-foreground text-body-md focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all ${
                    errors.name ? "border-destructive ring-1 ring-destructive" : "border-border"
                  }`}
                />
                {errors.name && (
                  <span className="text-destructive text-label-sm flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Hindi Name */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold flex items-center justify-between">
                  <span>Devanagari Name (हिंदी नाम)</span>
                  <span className="text-label-sm text-secondary font-normal">
                    Helps local buyers search in Hindi
                  </span>
                </label>
                <input
                  type="text"
                  {...register("nameHi")}
                  placeholder="e.g. राजवाड़ा वेलवेट बॉक्स निमंत्रण"
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-container border border-border text-foreground text-body-md focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                />
              </div>

              {/* URL Slug */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-label-md text-foreground font-semibold">
                    Product URL Slug *
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoSlug}
                    className="text-label-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-generate</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    {...register("slug")}
                    onBlur={() => handleCheckSlug(watchedSlug)}
                    placeholder="rajwada-velvet-box-suite"
                    className={`w-full px-4 py-2.5 rounded-lg bg-surface-container border text-foreground text-body-md focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all ${
                      errors.slug || slugStatus.available === false
                        ? "border-destructive ring-1 ring-destructive"
                        : "border-border"
                    }`}
                  />
                  {watchedSlug && !errors.slug && slugStatus.available !== false && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary text-label-sm flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                </div>

                {slugStatus.available === false && slugStatus.suggestedSlug && (
                  <div className="flex items-center gap-2 text-label-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1.5 rounded-md border border-amber-500/30">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Slug already taken!</span>
                    <button
                      type="button"
                      onClick={() => {
                        setValue("slug", slugStatus.suggestedSlug!, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        setSlugStatus({ checking: false, available: true });
                      }}
                      className="font-bold underline hover:text-amber-700 dark:hover:text-amber-300"
                    >
                      Use &quot;{slugStatus.suggestedSlug}&quot;
                    </button>
                  </div>
                )}

                {errors.slug ? (
                  <span className="text-destructive text-label-sm flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.slug.message}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-label-sm truncate">
                    sanwaliyapress.in/product/{watchedSlug || "..."}
                  </span>
                )}
              </div>

              {/* Atelier Item Code (SKU) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold">
                  Atelier SKU / Item Code *
                </label>
                <input
                  type="text"
                  {...register("productCode")}
                  placeholder="e.g. RM-W-101"
                  className={`w-full px-4 py-2.5 rounded-lg bg-surface-container border font-mono uppercase font-bold text-foreground text-body-md focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all ${
                    errors.productCode ? "border-destructive ring-1 ring-destructive" : "border-border"
                  }`}
                />
                {errors.productCode ? (
                  <span className="text-destructive text-label-sm flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.productCode.message}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-label-sm">
                    Master serial code for printing plates
                  </span>
                )}
              </div>

              {/* Category Hierarchy */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold">
                  Category Section *
                </label>
                <select
                  {...register("category")}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-container border border-border text-foreground text-body-md focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name} ({cat.nameHi})
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-destructive text-label-sm">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-label-md text-foreground font-semibold">
                    Short Description (For Catalog Cards) *
                  </label>
                  <span className="text-label-sm text-muted-foreground">
                    {watchedShortDesc?.length || 0} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  {...register("shortDescription")}
                  placeholder="e.g. Luxurious Dutch maroon velvet casing with 24k gold foil leafing and 3 ceremony inserts."
                  className={`w-full p-3.5 rounded-lg bg-surface-container border text-foreground text-body-md focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all ${
                    errors.shortDescription ? "border-destructive ring-1 ring-destructive" : "border-border"
                  }`}
                />
                {errors.shortDescription && (
                  <span className="text-destructive text-label-sm">
                    {errors.shortDescription.message}
                  </span>
                )}
              </div>

              {/* Full Description */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold">
                  Full Artisanal Description & Specifications *
                </label>
                <textarea
                  rows={5}
                  {...register("description")}
                  placeholder="Describe board thickness (GSM), velvet texture, foil stamp die casting details, inserts, and accessories..."
                  className={`w-full p-3.5 rounded-lg bg-surface-container border text-foreground text-body-md focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all ${
                    errors.description ? "border-destructive ring-1 ring-destructive" : "border-border"
                  }`}
                />
                {errors.description && (
                  <span className="text-destructive text-label-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </FormSection>

          {/* SECTION 2: Product Images & Gallery */}
          <FormSection
            title="Product Images & Gallery"
            titleHi="क्लाउडिनरी अनुकूलित तस्वीरें (Cloudinary CDN f_auto, q_auto)"
            icon={ImageIcon}
            badge={
              <span className="text-label-sm text-muted-foreground">
                {images.length} of 8 Uploaded
              </span>
            }
          >
            <ImageUploader images={images} onChange={setImages} maxImages={8} />
          </FormSection>

          {/* SECTION 3: Options, Paper & Finishes */}
          <FormSection
            title="Product Options & Finishes"
            titleHi="विकल्प, कागज़ व फिनिश विन्यास"
            icon={Layers}
          >
            <div className="flex flex-col gap-5">
              {/* Available Sizes */}
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-foreground font-semibold">
                  Available Dimensions & Silhouette Sizes
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {sizes.map((size, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-border text-foreground text-label-md"
                    >
                      <span>{size}</span>
                      <button
                        type="button"
                        onClick={() => setSizes(sizes.filter((_, i) => i !== idx))}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newSizeInput}
                      onChange={(e) => setNewSizeInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSize())}
                      placeholder="Add size (e.g. 8x6 in)"
                      className="px-3 py-1.5 rounded-lg bg-surface-container border border-border text-foreground text-label-md focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddSize}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-label-md font-bold transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Paper Stocks */}
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-foreground font-semibold">
                  Stock & Paper Weights (GSM)
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {papers.map((paper, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/15 text-secondary border border-secondary/30 text-label-md font-medium"
                    >
                      <span>{paper}</span>
                      <button
                        type="button"
                        onClick={() => setPapers(papers.filter((_, i) => i !== idx))}
                        className="text-secondary hover:text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newPaperInput}
                      onChange={(e) => setNewPaperInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddPaper())}
                      placeholder="Add paper stock (e.g. 450 GSM Cotton)"
                      className="px-3 py-1.5 rounded-lg bg-surface-container border border-border text-foreground text-label-md focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddPaper}
                      className="px-3 py-1.5 rounded-lg bg-secondary/15 text-secondary hover:bg-secondary/25 text-label-md font-bold transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Foil Finishes */}
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-foreground font-semibold">
                  Foil & Print Finishes
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {finishes.map((finish, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-border text-foreground text-label-md"
                    >
                      <span>{finish}</span>
                      <button
                        type="button"
                        onClick={() => setFinishes(finishes.filter((_, i) => i !== idx))}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newFinishInput}
                      onChange={(e) => setNewFinishInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFinish())}
                      placeholder="Add finish (e.g. Copper Foil)"
                      className="px-3 py-1.5 rounded-lg bg-surface-container border border-border text-foreground text-label-md focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddFinish}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-label-md font-bold transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FormSection>

          {/* SECTION 4: Search Keywords & SEO */}
          <FormSection
            title="Search, Hindi Keywords & SEO"
            titleHi="सर्च डिस्कवरी व गूगल प्रीव्यू"
            icon={Search}
          >
            <div className="flex flex-col gap-6">
              <TagInput
                tags={tags}
                onChange={setTags}
                label="English & Devanagari Search Keywords"
              />

              <SeoPreview
                title={watchedName}
                slug={watchedSlug}
                description={watchedShortDesc}
                category={watchedCategory}
              />
            </div>
          </FormSection>

          {/* SECTION 5: Danger Zone (Edit Mode only) */}
          {isEditMode && initialProduct && (
            <FormSection
              title="Danger Zone"
              titleHi="हटाने का विकल्प एवं अपरिवर्तनीय कार्य"
              icon={AlertTriangle}
              className="border-destructive/40 bg-destructive/5"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1 max-w-md">
                  <span className="text-label-md text-destructive font-bold">
                    Permanently delete this product
                  </span>
                  <p className="text-body-sm text-muted-foreground">
                    This will delete product code {initialProduct.productCode} and remove it from all customer catalogs immediately.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDeleteDialogOpen(true)}
                  className="px-4 py-2 rounded-lg bg-destructive hover:bg-destructive/90 text-white text-label-md font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Product</span>
                </button>
              </div>
            </FormSection>
          )}
        </div>

        {/* Right Sidebar Column (4 cols): Pricing, Status & Publish Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-20">
          {/* PRICING & ORDER SPECIFICATIONS */}
          <div className="bg-surface-lowest p-6 rounded-xl border border-border shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
              <DollarSign className="w-5 h-5 text-secondary" />
              <h3 className="font-headline-sm text-lg text-foreground font-bold">
                Pricing & Minimum Quantity
              </h3>
            </div>

            {/* Switch: Show Price on Public Site */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container border border-border/50">
              <div className="flex flex-col">
                <span className="text-label-md text-foreground font-semibold">
                  Show price on public site
                </span>
                <span className="text-label-sm text-muted-foreground">
                  Visible to catalog visitors
                </span>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("showPrice")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {/* Price Range inputs (Shown ONLY when Show Price is ON) */}
            {watchedShowPrice ? (
              <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-foreground font-semibold">
                      Starting Price (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        {...register("startingFrom", { valueAsNumber: true })}
                        placeholder="750"
                        className={`w-full pl-7 pr-3 py-2 rounded-lg bg-surface-container border text-foreground font-headline-sm text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.startingFrom ? "border-destructive" : "border-border"
                        }`}
                      />
                    </div>
                    {errors.startingFrom && (
                      <span className="text-destructive text-label-sm">
                        {errors.startingFrom.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-foreground font-semibold">
                      Max Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        {...register("maxPrice", { valueAsNumber: true })}
                        placeholder="1150"
                        className="w-full pl-7 pr-3 py-2 rounded-lg bg-surface-container border border-border text-foreground font-headline-sm text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-body-sm text-secondary leading-snug">
                  Visitors see: <span className="font-bold">Estimated quote range</span>. Exact pricing customized via WhatsApp.
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-surface-container border border-border text-body-sm text-muted-foreground">
                Pricing is hidden. Card displays <strong className="text-secondary font-semibold">&quot;Custom Quote on WhatsApp&quot;</strong>.
              </div>
            )}

            {/* Minimum Order Quantity (MOQ) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md text-foreground font-semibold">
                Minimum Order Quantity (MOQ)
              </label>
              <input
                type="number"
                {...register("minimumQuantity", { valueAsNumber: true })}
                placeholder="50"
                className="w-full px-4 py-2.5 rounded-lg bg-surface-container border border-border text-foreground text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-label-sm text-muted-foreground">
                Minimum batch sets required for offset/die casting
              </span>
            </div>
          </div>

          {/* STATUS & SHOWCASE CONTROLS */}
          <div className="bg-surface-lowest p-6 rounded-xl border border-border shadow-sm flex flex-col gap-4">
            <h3 className="font-headline-sm text-lg text-foreground font-bold pb-2 border-b border-border/40">
              Publishing State
            </h3>

            {/* Status Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md text-foreground font-semibold">
                Catalog State
              </label>
              <select
                {...register("status")}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-border text-foreground text-label-md font-semibold cursor-pointer focus:outline-none"
              >
                <option value="published">Published (Live on Website)</option>
                <option value="draft">Draft (Work in Progress)</option>
                <option value="archived">Archived (Hidden from Catalog)</option>
              </select>
            </div>

            {/* Feature on Home Carousel */}
            <label className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-border/40 cursor-pointer">
              <input
                type="checkbox"
                {...register("featured")}
                className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-label-md text-foreground font-semibold">
                  Feature on Homepage
                </span>
                <span className="text-label-sm text-muted-foreground">
                  Pins product to top showcase carousel
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Sticky Save Bar */}
        <div className="lg:col-span-12">
          <StickySaveBar
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            onDiscard={() => router.push("/admin/products")}
            onSaveDraft={handleSubmit((data) => onSubmit(data, "draft"))}
            onPublish={handleSubmit((data) => onSubmit(data, "published"))}
            saveButtonText={isEditMode ? "Save & Publish" : "Create & Publish"}
          />
        </div>
      </form>
    </div>
  );
}
