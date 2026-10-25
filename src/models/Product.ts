import mongoose, { Schema, Document, Model } from "mongoose";
import { categories } from "@/data/categories";

const validCategorySlugs = categories.map((c) => c.slug);

export interface IProductImage {
  url: string;
  publicId?: string;
  alt: string;
  isPrimary?: boolean;
  width?: number;
  height?: number;
  order?: number;
}

export interface IAvailableOptions {
  sizes?: string[];
  papers?: string[];
  finishes?: string[];
  printTypes?: string[];
  languages?: string[];
  customizations?: string[];
}

export interface IProductPrice {
  show: boolean;
  startingFrom?: number;
  unit?: string;
}

export interface IProduct extends Document {
  name: string;
  nameHi?: string;
  slug: string;
  productCode: string;
  category: string;
  shortDescription: string;
  description: string;
  images: IProductImage[];
  availableOptions: IAvailableOptions;
  minimumQuantity: number;
  price: IProductPrice;
  featured: boolean;
  published: boolean;
  tags: string[];
  searchAliases: string[];
  relatedProducts: mongoose.Types.ObjectId[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductImageSchema = new Schema<IProductImage>(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true },
    alt: { type: String, required: true, trim: true },
    isPrimary: { type: Boolean, default: false },
    width: { type: Number },
    height: { type: Number },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const AvailableOptionsSchema = new Schema<IAvailableOptions>(
  {
    sizes: { type: [String], default: [] },
    papers: { type: [String], default: [] },
    finishes: { type: [String], default: [] },
    printTypes: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    customizations: { type: [String], default: [] },
  },
  { _id: false }
);

const ProductPriceSchema = new Schema<IProductPrice>(
  {
    show: { type: Boolean, default: false },
    startingFrom: { type: Number, min: 0 },
    unit: { type: String, default: "per piece", trim: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 150,
    },
    nameHi: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: [true, "Product URL slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    productCode: {
      type: String,
      required: [true, "Product code identifier is required"],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category slug is required"],
      enum: {
        values: validCategorySlugs,
        message: "{VALUE} is not a valid category slug",
      },
      index: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: 300,
    },
    description: {
      type: String,
      required: [true, "Detailed description is required"],
      trim: true,
    },
    images: {
      type: [ProductImageSchema],
      validate: [
        (val: IProductImage[]) => val && val.length > 0,
        "At least one image is required",
      ],
    },
    availableOptions: {
      type: AvailableOptionsSchema,
      default: () => ({}),
    },
    minimumQuantity: {
      type: Number,
      default: 50,
      min: [1, "Minimum quantity must be at least 1"],
    },
    price: {
      type: ProductPriceSchema,
      default: () => ({ show: false }),
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    searchAliases: {
      type: [String],
      default: [],
    },
    relatedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    seoTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes as requested:
ProductSchema.index({ category: 1, published: 1, createdAt: -1 });
ProductSchema.index({ featured: 1, published: 1 });
ProductSchema.index({ name: "text", nameHi: "text", tags: "text", searchAliases: "text" });

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
