"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { SiteSettingsValues } from "@/lib/validation";
import { siteConfig } from "@/lib/site-config";

export type ThemePalette = "classic-cream" | "royal-blue" | "maroon-elegant" | "lavender-soft";

interface SettingsContextType {
  settings: SiteSettingsValues | null;
  phone: string;
  whatsapp: string;
  ownerName: string;
  establishedYear: number;
  themePalette: ThemePalette;
  setThemePalette: (palette: ThemePalette) => void;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: (SiteSettingsValues & { updatedAt?: string }) | null;
}) {
  const [settings, setSettings] = useState<SiteSettingsValues | null>(
    initialSettings || null
  );
  const [ownerName, setOwnerName] = useState<string>(
    initialSettings?.ownerName || ""
  );
  const [establishedYear, setEstablishedYear] = useState<number>(
    initialSettings?.establishedYear || 1994
  );
  const [phone, setPhone] = useState<string>(
    initialSettings?.phone || siteConfig.phone
  );
  const [whatsapp, setWhatsapp] = useState<string>(
    initialSettings?.whatsapp || siteConfig.whatsappNumber
  );
  const [themePalette, setThemePaletteState] = useState<ThemePalette>(
    (initialSettings?.themePalette as ThemePalette) || "classic-cream"
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialSettings);

  const setThemePalette = useCallback((palette: ThemePalette) => {
    setThemePaletteState(palette);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-palette", palette);
      try {
        localStorage.setItem("sanwaliya_theme_palette", palette);
      } catch {
        // LocalStorage access handled
      }
    }
  }, []);

  // Sync data-palette to <html> attribute on mount / palette change
  useEffect(() => {
    if (typeof document !== "undefined") {
      try {
        const stored = localStorage.getItem("sanwaliya_theme_palette");
        if (stored && (stored === "classic-cream" || stored === "royal-blue" || stored === "maroon-elegant" || stored === "lavender-soft")) {
          setThemePaletteState(stored as ThemePalette);
          document.documentElement.setAttribute("data-palette", stored);
          return;
        }
      } catch {
        // LocalStorage handled
      }
      document.documentElement.setAttribute("data-palette", themePalette);
    }
  }, [themePalette]);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load settings");
      const data: SiteSettingsValues = await res.json();
      if (data) {
        setSettings(data);
        if (data.ownerName) setOwnerName(data.ownerName);
        if (data.establishedYear) setEstablishedYear(data.establishedYear);
        if (data.phone) setPhone(data.phone);
        if (data.whatsapp) setWhatsapp(data.whatsapp);
        if (data.themePalette) {
          setThemePaletteState(data.themePalette as ThemePalette);
          if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-palette", data.themePalette);
            try {
              localStorage.setItem("sanwaliya_theme_palette", data.themePalette);
            } catch {
              // LocalStorage handled
            }
          }
        }
      }
    } catch (err) {
      console.warn("Could not fetch /api/settings:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return React.createElement(
    SettingsContext.Provider,
    {
      value: {
        settings,
        phone,
        whatsapp,
        ownerName,
        establishedYear,
        themePalette,
        setThemePalette,
        isLoading,
        refreshSettings: fetchSettings,
      },
    },
    children
  );
}

export function useSiteSettings(
  initialOwnerName?: string,
  initialEstablishedYear?: number,
  initialPhone?: string
) {
  const context = useContext(SettingsContext);

  const [standaloneOwner, setStandaloneOwner] = useState<string>(
    initialOwnerName || ""
  );
  const [standaloneYear, setStandaloneYear] = useState<number>(
    initialEstablishedYear || 1994
  );
  const [standalonePhone, setStandalonePhone] = useState<string>(
    initialPhone || siteConfig.phone
  );
  const [standalonePalette, setStandalonePalette] = useState<ThemePalette>(
    "classic-cream"
  );
  const [standaloneSettings, setStandaloneSettings] =
    useState<SiteSettingsValues | null>(null);
  const [standaloneLoading, setStandaloneLoading] = useState<boolean>(
    !initialOwnerName
  );

  useEffect(() => {
    if (context) return;
    let mounted = true;
    if (initialOwnerName) setStandaloneOwner(initialOwnerName);
    if (initialEstablishedYear) setStandaloneYear(initialEstablishedYear);
    if (initialPhone) setStandalonePhone(initialPhone);

    fetch("/api/settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load settings");
        return res.json();
      })
      .then((data: SiteSettingsValues) => {
        if (mounted && data) {
          setStandaloneSettings(data);
          if (data.ownerName) setStandaloneOwner(data.ownerName);
          if (data.establishedYear) setStandaloneYear(data.establishedYear);
          if (data.phone) setStandalonePhone(data.phone);
          if (data.themePalette) {
            setStandalonePalette(data.themePalette as ThemePalette);
            if (typeof document !== "undefined") {
              document.documentElement.setAttribute("data-palette", data.themePalette);
            }
          }
          setStandaloneLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch /api/settings:", err);
        if (mounted) setStandaloneLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [context, initialOwnerName, initialEstablishedYear, initialPhone]);

  if (context) {
    return {
      settings: context.settings,
      ownerName: initialOwnerName || context.ownerName,
      establishedYear: initialEstablishedYear || context.establishedYear,
      phone: initialPhone || context.phone,
      whatsapp: context.whatsapp,
      themePalette: context.themePalette,
      setThemePalette: context.setThemePalette,
      isLoading: context.isLoading,
      refreshSettings: context.refreshSettings,
    };
  }

  return {
    settings: standaloneSettings,
    ownerName: standaloneOwner,
    establishedYear: standaloneYear,
    phone: standalonePhone,
    whatsapp: standaloneSettings?.whatsapp || siteConfig.whatsappNumber,
    themePalette: standalonePalette,
    setThemePalette: (p: ThemePalette) => {
      setStandalonePalette(p);
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-palette", p);
      }
    },
    isLoading: standaloneLoading,
    refreshSettings: async () => {},
  };
}
