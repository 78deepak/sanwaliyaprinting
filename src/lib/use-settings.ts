"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { SiteSettingsValues } from "@/lib/validation";
import { siteConfig } from "@/lib/site-config";

interface SettingsContextType {
  settings: SiteSettingsValues | null;
  phone: string;
  whatsapp: string;
  ownerName: string;
  establishedYear: number;
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
  const [isLoading, setIsLoading] = useState<boolean>(!initialSettings);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to load settings");
      const data: SiteSettingsValues = await res.json();
      if (data) {
        setSettings(data);
        if (data.ownerName) setOwnerName(data.ownerName);
        if (data.establishedYear) setEstablishedYear(data.establishedYear);
        if (data.phone) setPhone(data.phone);
        if (data.whatsapp) setWhatsapp(data.whatsapp);
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
    isLoading: standaloneLoading,
    refreshSettings: async () => {},
  };
}
