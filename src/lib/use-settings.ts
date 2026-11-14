"use client";

import { useState, useEffect } from "react";
import type { SiteSettingsValues } from "@/lib/validation";

export function useSiteSettings(initialOwnerName?: string) {
  const [ownerName, setOwnerName] = useState<string>(initialOwnerName || "");
  const [settings, setSettings] = useState<SiteSettingsValues | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialOwnerName);

  useEffect(() => {
    let mounted = true;

    // If initialOwnerName is provided, update state immediately
    if (initialOwnerName) {
      setOwnerName(initialOwnerName);
    }

    // Always revalidate with the backend API
    fetch("/api/settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load settings");
        return res.json();
      })
      .then((data: SiteSettingsValues) => {
        if (mounted && data) {
          setSettings(data);
          if (data.ownerName) {
            setOwnerName(data.ownerName);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch /api/settings:", err);
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [initialOwnerName]);

  return { ownerName, settings, isLoading };
}
