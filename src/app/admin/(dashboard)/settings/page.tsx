"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Store,
  Phone,
  Clock,
  Key,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  Save,
  Copy,
  Terminal,
  User,
} from "lucide-react";
import {
  getSiteSettingsAction,
  saveSiteSettingsAction,
  generatePasswordHashAction,
} from "@/app/admin/actions";
import { SiteSettingsValues } from "@/lib/validation";

const initialDefaults: SiteSettingsValues = {
  businessName: "Sanwaliya Printing Press",
  businessNameHi: "सांवलिया प्रिंटिंग प्रेस",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  address: "Station Road, Near Bus Stand, Suwasra, Dist. Mandsaur, MP - 458888",
  addressHi: "स्टेशन रोड, बस स्टैंड के पास, सुवासरा, जिला मंदसौर (म.प्र.)",
  openingHours: "Mon – Sat: 9:00 AM – 8:30 PM (Sunday by Appointment)",
  openingHoursHi: "सोमवार से शनिवार: सुबह 9:00 से रात 8:30 बजे तक",
  whatsappTemplate: "",
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
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsValues>(initialDefaults);
  const [initialSettings, setInitialSettings] = useState<SiteSettingsValues>(initialDefaults);
  const [lastSynced, setLastSynced] = useState<string>("Synced with Atlas");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Password & Security generator state
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [generatedHash, setGeneratedHash] = useState<string | null>(null);
  const [isGeneratingHash, setIsGeneratingHash] = useState(false);
  const [passFeedback, setPassFeedback] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettingsAction();
        if (data) {
          setSettings(data);
          setInitialSettings(data);
          if (data.updatedAt) setLastSynced(data.updatedAt);
        }
      } catch (err) {
        console.error("Failed to load shop settings:", err);
      }
    };
    fetchSettings();
  }, []);

  // Compute dirty state
  const isDirty = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Enter secure key", color: "text-muted-foreground" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[!@#$%^&*]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: "Weak: Min 8 chars", color: "text-destructive" };
    if (score === 2) return { score: 2, label: "Fair: Add numbers/symbols", color: "text-secondary" };
    if (score === 3) return { score: 3, label: "Good: Strong password", color: "text-secondary font-bold" };
    return { score: 4, label: "Strong: Robust cryptographic passphrase", color: "text-tertiary font-bold" };
  };

  const passStrength = getPasswordStrength(newPass);

  // Save Settings Handler (MongoDB Atlas)
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const res = await saveSiteSettingsAction(settings);
      if (res.ok) {
        setInitialSettings(settings);
        setToastMessage("Settings saved successfully! Store details synchronized with Atlas.");
        const now = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        setLastSynced(now);
      } else {
        setToastMessage(res.message || "Failed to update settings.");
      }
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      console.error("Error saving settings:", err);
      setToastMessage("An unexpected error occurred while saving.");
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  // Generate Bcrypt Hash Handler
  const handleGenerateHash = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass.length < 8) {
      setPassFeedback("New password must be at least 8 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      setPassFeedback("Passwords do not match.");
      return;
    }

    setIsGeneratingHash(true);
    try {
      const res = await generatePasswordHashAction(newPass);
      if (res.ok && res.data?.hash) {
        setGeneratedHash(res.data.hash);
        setPassFeedback("Bcrypt hash generated successfully! Update ADMIN_PASSWORD_HASH in your .env.local file.");
      } else {
        setPassFeedback(res.message || "Failed to generate hash.");
      }
    } finally {
      setIsGeneratingHash(false);
    }
  };

  const copyToClipboard = (text: string, isCommand = false) => {
    navigator.clipboard.writeText(text);
    if (isCommand) {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2500);
    } else {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2500);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl gap-6 pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 border border-secondary/30">
          <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
          <div className="flex flex-col">
            <span className="text-label-md font-bold">Notification</span>
            <span className="text-body-sm text-white/90">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/40">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Shop Settings
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
            Manage your store details, WhatsApp hotline, working hours, and admin credentials.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-surface-lowest px-3 py-1.5 rounded-lg border border-border shadow-2xs">
          <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Status: <span className="font-semibold text-foreground">{lastSynced}</span>
          </span>
        </div>
      </div>

      {/* SECTION 1: Business Profile & Contact Information */}
      <section className="bg-surface-lowest rounded-xl border border-border p-5 md:p-7 shadow-xs flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Business Profile & Contact Information
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Store details displayed on your public website and customer inquiries.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Shop Name English */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs sm:text-sm font-semibold text-foreground">
              Shop Name (English)
            </label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Shop Name Hindi */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs sm:text-sm font-semibold text-foreground">
              Shop Name (Hindi / दुकान का नाम)
            </label>
            <input
              type="text"
              value={settings.businessNameHi}
              onChange={(e) => setSettings({ ...settings, businessNameHi: e.target.value })}
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Tagline English */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs sm:text-sm font-semibold text-foreground">
              Brand Tagline (English)
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Tagline Hindi */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs sm:text-sm font-semibold text-foreground">
              Brand Tagline (Hindi)
            </label>
            <input
              type="text"
              value={settings.taglineHi}
              onChange={(e) => setSettings({ ...settings, taglineHi: e.target.value })}
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Owner Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>Owner Name (मालिक का नाम)</span>
            </label>
            <input
              type="text"
              value={settings.ownerName || ""}
              onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
              placeholder="e.g. Ramesh Patidar (Owner)"
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 font-semibold"
            />
          </div>

          {/* Owner Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-foreground">
              Owner Email (संचालक ईमेल)
            </label>
            <input
              type="email"
              value={settings.ownerEmail || ""}
              onChange={(e) => setSettings({ ...settings, ownerEmail: e.target.value })}
              placeholder="e.g. ramesh@sanwaliyapress.in"
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* WhatsApp Hotline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>WhatsApp Consultation Number</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">
                WA
              </span>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full pl-11 bg-surface-container border border-border text-foreground text-xs sm:text-sm pr-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 font-mono font-bold"
              />
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Country code without + (e.g. <strong className="text-primary font-mono">919876543210</strong>). All website enquiries route here.
            </p>
          </div>

          {/* Primary Calling Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>Primary Calling Phone</span>
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 font-semibold"
            />
            <p className="text-[11px] text-muted-foreground leading-snug">
              Displayed on the top header bar for local voice calls.
            </p>
          </div>

          {/* Address English */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs sm:text-sm font-semibold text-foreground">
              Store Postal Address (पूरा पता)
            </label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm p-3 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 leading-relaxed"
            />
          </div>

          {/* Address Hindi */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs sm:text-sm font-semibold text-foreground">
              Address in Hindi (हिंदी पता)
            </label>
            <textarea
              rows={2}
              value={settings.addressHi}
              onChange={(e) => setSettings({ ...settings, addressHi: e.target.value })}
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm p-3 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 leading-relaxed"
            />
          </div>

          {/* Operating Hours */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>Operating Hours (दुकान का समय)</span>
            </label>
            <input
              type="text"
              value={settings.openingHours}
              onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
              className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Security & Admin Password */}
      <section className="bg-surface-lowest rounded-xl border border-border p-5 md:p-7 shadow-xs flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Security & Admin Password
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Generate secure Bcrypt password hashes for your server environment.
              </p>
            </div>
          </div>
        </div>

        {/* Security Architecture Explainer */}
        <div className="p-3.5 rounded-lg bg-surface-container border border-border/60 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
            <Terminal className="w-4 h-4 text-secondary shrink-0" />
            <span>How Admin Passwords Work</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Admin passwords are encrypted using Bcrypt and matched against the <code className="text-[11px] bg-surface-lowest px-1.5 py-0.5 rounded font-mono text-primary font-bold">ADMIN_PASSWORD_HASH</code> environment variable in your <code className="text-[11px] bg-surface-lowest px-1.5 py-0.5 rounded font-mono">.env.local</code> file.
          </p>
        </div>

        {passFeedback && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-start gap-2.5 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{passFeedback}</span>
          </div>
        )}

        {/* In-Browser Bcrypt Hash Generator */}
        <form onSubmit={handleGenerateHash} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-foreground">
                New Password (नया पासवर्ड)
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 pr-10 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-foreground">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-surface-container border border-border text-foreground text-xs sm:text-sm px-3.5 pr-10 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Password Strength Meter */}
          <div className="p-3 rounded-lg bg-surface-container border border-border/50 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground font-semibold">Password Strength:</span>
              <span className={passStrength.color}>{passStrength.label}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
              <div className={`h-full rounded-full ${passStrength.score >= 1 ? "bg-emerald-500" : "bg-border"}`} />
              <div className={`h-full rounded-full ${passStrength.score >= 2 ? "bg-emerald-500" : "bg-border"}`} />
              <div className={`h-full rounded-full ${passStrength.score >= 3 ? "bg-emerald-500" : "bg-border"}`} />
              <div className={`h-full rounded-full ${passStrength.score >= 4 ? "bg-emerald-500" : "bg-border"}`} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <span className="text-xs text-muted-foreground">
              Generates an encrypted salted hash for your admin authentication.
            </span>
            <button
              type="submit"
              disabled={isGeneratingHash || !newPass}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{isGeneratingHash ? "Generating..." : "Generate Bcrypt Hash"}</span>
            </button>
          </div>

          {/* Generated Hash Box */}
          {generatedHash && (
            <div className="p-4 rounded-xl bg-surface-container border border-secondary/40 flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Generated Bcrypt Hash:
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedHash)}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedHash ? "Copied!" : "Copy Hash"}</span>
                </button>
              </div>
              <pre className="font-mono text-xs p-3 bg-surface-lowest rounded-lg border border-border select-all break-all overflow-x-auto text-primary font-bold">
                {generatedHash}
              </pre>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Paste this into your <strong className="text-foreground">.env.local</strong> file:
                <br />
                <code className="text-[11px] font-mono text-primary select-all">
                  ADMIN_PASSWORD_HASH=&quot;{generatedHash}&quot;
                </code>
              </p>
            </div>
          )}
        </form>
      </section>

      {/* STICKY BOTTOM SAVE ACTION BAR */}
      <div
        className={`sticky bottom-4 z-30 p-3 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg ${
          isDirty
            ? "bg-surface-lowest border-amber-500/40 ring-1 ring-amber-500/20"
            : "bg-surface-lowest/90 border-border"
        }`}
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
          {isDirty ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                You have unsaved changes
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-muted-foreground">All settings saved</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            disabled={!isDirty || isSaving}
            onClick={() => setSettings(initialSettings)}
            className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground text-xs sm:text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Discard Changes
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={!isDirty || isSaving}
            className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-[0.98] flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
