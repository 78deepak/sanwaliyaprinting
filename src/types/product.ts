export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
  caption?: string;
  width?: number;
  height?: number;
}

export interface AvailableOptions {
  sizes?: string[];
  papers?: string[];
  finishes?: string[];
  printTypes?: string[];
  languages?: string[];
  customizations?: string[];
}

export interface ProductPrice {
  show: boolean;
  startingFrom?: number;
  unit?: string;
  note?: string;
}

export interface Product {
  id: string;
  productCode: string; // e.g. RM-W-101
  slug: string;
  name: string;
  nameHi?: string;
  category: string; // category slug
  shortDescription: string;
  description: string;
  images: ProductImage[];
  availableOptions: AvailableOptions;
  minimumQuantity: number;
  price: ProductPrice;
  featured?: boolean;
  popular?: boolean;
  published: boolean;
  tags: string[];
  searchAliases: string[];
  specs?: Record<string, string>;
  createdAt?: string;
}

export interface Category {
  slug: string;
  name: string;
  nameHi: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  iconName?: string;
  sortOrder: number;
  itemCount: string;
  featuredImage: string;
  filterConfig?: {
    supportedPaperWeights?: string[];
    supportedFinishes?: string[];
    supportedStyles?: string[];
    supportedColors?: { name: string; hex: string }[];
  };
}

export interface ShortlistItem {
  productId: string;
  productCode: string;
  name: string;
  nameHi?: string;
  category: string;
  slug: string;
  thumbnailUrl: string;
  quantity: number;
  selectedSize?: string;
  selectedPaper?: string;
  selectedFinish?: string;
  selectedLanguage?: string;
  note?: string;
  addedAt: number;
}
