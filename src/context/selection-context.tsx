"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ShortlistItem, Product } from "@/types/product";

interface SelectionContextType {
  items: ShortlistItem[];
  count: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (
    product: Product,
    options?: {
      quantity?: number;
      selectedSize?: string;
      selectedPaper?: string;
      selectedFinish?: string;
      selectedLanguage?: string;
      note?: string;
    }
  ) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNote: (productId: string, note: string) => void;
  clearSelection: () => void;
  hasItem: (productId: string) => boolean;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

const STORAGE_KEY = "sanwaliya_shortlist_v1";

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ShortlistItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Save to localStorage on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // LocalStorage error handled
    }
  }, [items]);

  const hasItem = (productId: string) => {
    return items.some((item) => item.productId === productId);
  };

  const addItem = (
    product: Product,
    options?: {
      quantity?: number;
      selectedSize?: string;
      selectedPaper?: string;
      selectedFinish?: string;
      selectedLanguage?: string;
      note?: string;
    }
  ) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.productId === product.id);
      if (exists) {
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: options?.quantity ?? item.quantity,
                selectedSize: options?.selectedSize ?? item.selectedSize,
                selectedPaper: options?.selectedPaper ?? item.selectedPaper,
                selectedFinish: options?.selectedFinish ?? item.selectedFinish,
                selectedLanguage: options?.selectedLanguage ?? item.selectedLanguage,
                note: options?.note ?? item.note,
              }
            : item
        );
      }

      const primaryImg =
        product.images.find((img) => img.isPrimary)?.url ||
        product.images[0]?.url ||
        "";

      const newItem: ShortlistItem = {
        productId: product.id,
        productCode: product.productCode,
        name: product.name,
        nameHi: product.nameHi,
        category: product.category,
        slug: product.slug,
        thumbnailUrl: primaryImg,
        quantity: options?.quantity || product.minimumQuantity || 50,
        selectedSize: options?.selectedSize || product.availableOptions.sizes?.[0],
        selectedPaper: options?.selectedPaper || product.availableOptions.papers?.[0],
        selectedFinish: options?.selectedFinish || product.availableOptions.finishes?.[0],
        selectedLanguage:
          options?.selectedLanguage || product.availableOptions.languages?.[0],
        note: options?.note || "",
        addedAt: Date.now(),
      };

      return [newItem, ...prev];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const toggleItem = (product: Product) => {
    if (hasItem(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateNote = (productId: string, note: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, note } : item
      )
    );
  };

  const clearSelection = () => {
    setItems([]);
  };

  return (
    <SelectionContext.Provider
      value={{
        items,
        count: items.length,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        toggleDrawer: () => setIsDrawerOpen((prev) => !prev),
        addItem,
        removeItem,
        toggleItem,
        updateQuantity,
        updateNote,
        clearSelection,
        hasItem,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
