"use client";

import React, { useState, useEffect } from "react";
import {
  Store,
  MessageCircle,
  Phone,
  Clock,
  Key,
  CheckCircle2,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  HelpCircle,
  Smartphone,
  Save,
  Stamp,
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

  // Insert variable into WhatsApp template textarea
  const handleInsertVariable = (variable: string) => {
    const current = settings.whatsappTemplate || "";
    const updated = current + " " + variable;
    setSettings({ ...settings, whatsappTemplate: updated });
  };

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
        setToastMessage("Settings saved successfully! WhatsApp hotline and profile re-synchronized with Atlas.");
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
    <div className="flex flex-col w-full gap-8 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 border border-secondary/30">
          <CheckCircle2 className="w-5 h-5 text-secondary" />
          <div className="flex flex-col">
            <span className="text-label-md font-bold">Settings Saved</span>
            <span className="text-body-sm text-white/90">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

      {/* Main 12-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT 7 COLUMNS: Business Profile, WhatsApp Auto-Response, Security */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* CARD 1: Business Profile & Contact Information */}
          <section className="bg-surface-lowest rounded-xl border border-border p-6 md:p-8 shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Shop Name Bilingual */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold flex items-center justify-between">
                  <span>Shop Name (English)</span>
                  <span className="text-label-sm text-muted-foreground font-normal">
                    Primary Legal Entity
                  </span>
                </label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold">
                  Shop Name (Hindi / दुकान का नाम)
                </label>
                <input
                  type="text"
                  value={settings.businessNameHi}
                  onChange={(e) => setSettings({ ...settings, businessNameHi: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Tagline */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold">
                  Brand Tagline & Atelier Heritage (English)
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold">
                  Brand Tagline (Hindi)
                </label>
                <input
                  type="text"
                  value={settings.taglineHi}
                  onChange={(e) => setSettings({ ...settings, taglineHi: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Owner / Proprietor Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-secondary" />
                    <span>Owner Name (मालिक का नाम)</span>
                  </span>
                  <span className="text-label-sm text-secondary font-medium">
                    Sidebar Badge
                  </span>
                </label>
                <input
                  type="text"
                  value={settings.ownerName || ""}
                  onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                  placeholder="e.g. Ramesh Patidar (Owner)"
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 font-semibold"
                />
                <p className="text-[12px] text-muted-foreground leading-snug">
                  Displayed on the verified owner badge in the Admin Sidebar & Console.
                </p>
              </div>

              {/* Owner Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold">
                  Owner Email (संचालक ईमेल)
                </label>
                <input
                  type="email"
                  value={settings.ownerEmail || ""}
                  onChange={(e) => setSettings({ ...settings, ownerEmail: e.target.value })}
                  placeholder="e.g. ramesh@sanwaliyapress.in"
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-[12px] text-muted-foreground leading-snug">
                  Primary administrator email for store communications.
                </p>
              </div>

              {/* WhatsApp Hotline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span>WhatsApp Consultation Number</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-label-sm text-tertiary font-bold tracking-wider">
                    WA
                  </span>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full pl-12 bg-surface-container border border-border text-foreground text-body-md pr-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 font-mono font-bold"
                  />
                </div>
                <p className="text-[12px] text-muted-foreground leading-snug">
                  Country code without + (e.g. <strong className="text-primary">919876543210</strong>). All catalogue inquiries route here.
                </p>
              </div>

              {/* Primary Calling Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>Primary Calling Phone</span>
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 font-semibold"
                />
                <p className="text-[12px] text-muted-foreground leading-snug">
                  Displayed on top website header banner for local consultations.
                </p>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold flex items-center justify-between">
                  <span>Store Postal Address (पूरा पता)</span>
                  <span className="text-label-sm text-muted-foreground font-medium">Suwasra, Mandsaur</span>
                </label>
                <textarea
                  rows={2}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md p-3.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold">
                  Address in Hindi (हिंदी पता)
                </label>
                <textarea
                  rows={2}
                  value={settings.addressHi}
                  onChange={(e) => setSettings({ ...settings, addressHi: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md p-3.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 leading-relaxed"
                />
              </div>

              {/* Operating Hours */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>Operating Hours (दुकान का समय)</span>
                </label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          {/* CARD 2: WhatsApp Enquiry Message Configuration */}
          <section className="bg-surface-lowest rounded-xl border border-border p-6 md:p-8 shadow-xs flex flex-col gap-5">
            <div className="flex items-start justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-tertiary/15 text-tertiary flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    WhatsApp Enquiry Message Template
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Pre-filled message when a customer clicks &apos;Enquire on WhatsApp&apos;.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Variable Chips */}
              <div className="flex items-center flex-wrap gap-2 p-3 bg-surface-container rounded-lg border border-border/50">
                <span className="text-label-sm text-muted-foreground font-bold uppercase tracking-wider">
                  Insert Variables:
                </span>
                {["[Product Name]", "[Code]", "[Qty]", "[Paper Stock]"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleInsertVariable(v)}
                    className="px-2.5 py-1 rounded bg-surface-lowest hover:bg-surface-container-high border border-border text-primary text-label-sm font-semibold shadow-2xs transition-all active:scale-95"
                  >
                    + {v}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md text-foreground font-semibold">
                  Default Client Greeting Template
                </label>
                <textarea
                  rows={4}
                  value={settings.whatsappTemplate || ""}
                  onChange={(e) => setSettings({ ...settings, whatsappTemplate: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md p-3.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 leading-relaxed font-sans"
                />
              </div>

              {/* Live WhatsApp Bubble Simulator */}
              <div className="p-4 rounded-xl bg-surface-container border border-border/60 flex flex-col gap-2">
                <span className="text-label-sm text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-tertiary" />
                  Client Message Preview on Arrival
                </span>

                <div className="self-start max-w-lg bg-surface-lowest border border-border p-3.5 rounded-xl rounded-tl-none shadow-xs">
                  <p className="text-body-sm text-foreground leading-relaxed">
                    {(settings.whatsappTemplate || "")
                      .replace(/\[Product Name\]/g, "Royal Ivory Farman Suite")
                      .replace(/\[Code\]/g, "SW-904")
                      .replace(/\[Qty\]/g, "350 Cards")
                      .replace(/\[Paper Stock\]/g, "450 GSM Cotton")}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1.5 text-muted-foreground text-[11px]">
                    <span>10:42 AM</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CARD 3: Security & Admin Password Architecture */}
          <section className="bg-surface-lowest rounded-xl border border-border p-6 md:p-8 shadow-xs flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-headline-sm text-lg text-primary font-bold">
                    Security & Admin Password
                  </h2>
                  <p className="text-body-sm text-muted-foreground">
                    Zero-plaintext Bcrypt authentication architecture for single administrator access.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-muted-foreground text-label-sm font-semibold border border-border">
                Bcrypt (Cost 12)
              </span>
            </div>

            {/* Architecture Explainer Alert */}
            <div className="p-4 rounded-xl bg-surface-container border border-border/60 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-primary font-bold text-label-md">
                <Terminal className="w-4 h-4 text-secondary" />
                <span>How Admin Passwords Are Stored Securely</span>
              </div>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                For maximum security, passwords are <strong className="text-foreground">never stored in plaintext</strong> or in the MongoDB database. The master desk password is cryptographic hash-matched against the <code className="text-xs bg-surface-lowest px-1.5 py-0.5 rounded font-mono text-primary font-bold">ADMIN_PASSWORD_HASH</code> environment variable in your server’s <code className="text-xs bg-surface-lowest px-1.5 py-0.5 rounded font-mono">.env.local</code>.
              </p>

              {/* CLI Command Helper */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-2.5 bg-surface-lowest rounded-lg border border-border mt-1">
                <code className="font-mono text-body-sm text-foreground select-all px-2 py-1">
                  npm run hash-password
                </code>
                <button
                  type="button"
                  onClick={() => copyToClipboard("npm run hash-password", true)}
                  className="px-3 py-1.5 rounded-md bg-surface-container hover:bg-surface-container-high text-primary text-label-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCmd ? "Copied!" : "Copy CLI Command"}</span>
                </button>
              </div>
            </div>

            {passFeedback && (
              <div className="p-3.5 rounded-lg bg-tertiary/10 border border-tertiary/30 text-tertiary flex items-start gap-2.5 text-label-sm font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{passFeedback}</span>
              </div>
            )}

            {/* In-Browser Bcrypt Hash Generator */}
            <form onSubmit={handleGenerateHash} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* New Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-foreground font-semibold">
                    New Password (नया पासवर्ड)
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full bg-surface-container border border-border text-foreground text-body-md px-3.5 pr-10 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest"
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
                  <label className="text-label-md text-foreground font-semibold">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full bg-surface-container border border-border text-foreground text-body-md px-3.5 pr-10 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest"
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
              <div className="p-3.5 rounded-lg bg-surface-container border border-border/50 flex flex-col gap-2">
                <div className="flex items-center justify-between text-label-sm">
                  <span className="text-foreground font-semibold">Password Strength:</span>
                  <span className={passStrength.color}>{passStrength.label}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                  <div className={`h-full rounded-full ${passStrength.score >= 1 ? "bg-tertiary" : "bg-border"}`} />
                  <div className={`h-full rounded-full ${passStrength.score >= 2 ? "bg-tertiary" : "bg-border"}`} />
                  <div className={`h-full rounded-full ${passStrength.score >= 3 ? "bg-tertiary" : "bg-border"}`} />
                  <div className={`h-full rounded-full ${passStrength.score >= 4 ? "bg-tertiary" : "bg-border"}`} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <span className="text-body-sm text-muted-foreground">
                  Generates an encrypted 60-character salted hash using bcryptjs.
                </span>
                <button
                  type="submit"
                  disabled={isGeneratingHash || !newPass}
                  className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-label-md font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Key className="w-4 h-4" />
                  <span>{isGeneratingHash ? "Generating..." : "Generate Bcrypt Hash"}</span>
                </button>
              </div>

              {/* Generated Hash Box */}
              {generatedHash && (
                <div className="p-4 rounded-xl bg-surface-container border border-secondary/40 flex flex-col gap-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm font-bold text-secondary uppercase tracking-wider">
                      Generated Bcrypt Hash:
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedHash)}
                      className="text-label-sm text-primary font-bold hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedHash ? "Copied!" : "Copy Hash"}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-body-sm p-3 bg-surface-lowest rounded-lg border border-border select-all break-all overflow-x-auto text-primary font-bold">
                    {generatedHash}
                  </pre>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    Paste this line into your <strong className="text-foreground">.env.local</strong> file:
                    <br />
                    <code className="text-[11px] font-mono text-primary select-all">
                      ADMIN_PASSWORD_HASH=&quot;{generatedHash}&quot;
                    </code>
                  </p>
                </div>
              )}
            </form>
          </section>
        </div>

        {/* RIGHT 5 COLUMNS: Live Authentication Preview Card & Help Tile */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-20">
          <div className="flex items-center justify-between">
            <span className="text-label-md font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-secondary" />
              Live Authentication Preview
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-muted-foreground text-label-sm">
              Desktop Port (1:1)
            </span>
          </div>

          {/* Mockup Card */}
          <div className="relative bg-surface-lowest rounded-2xl p-6 md:p-8 border border-border shadow-xl overflow-hidden text-center">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

            <div className="relative mb-3 flex justify-center">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                <Stamp className="w-7 h-7 text-secondary-fixed" />
              </div>
              <div className="absolute -bottom-1 right-1/2 translate-x-7 w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3" />
              </div>
            </div>

            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Sanwaliya Printing Press
            </span>
            <h3 className="text-base text-foreground font-bold mt-1">
              Admin Login Preview
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {settings.businessNameHi}
            </p>

            <div className="w-full mt-4 flex flex-col gap-3.5 text-left">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-label-sm">
                  <span className="font-semibold text-foreground">Master Desk Password</span>
                  <span className="text-muted-foreground">Owner PIN</span>
                </div>
                <input
                  type="password"
                  disabled
                  value="••••••••••••"
                  className="w-full bg-surface-container border border-border text-foreground px-3.5 py-2.5 rounded-lg text-body-md tracking-widest"
                />
              </div>

              <div className="w-full py-2.5 rounded-lg bg-primary text-white text-label-md font-bold shadow-xs text-center">
                Sign In to Shop
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 text-[11px] text-muted-foreground flex items-center justify-between">
              <span>Gateway Encrypted (TLS 1.3)</span>
              <span className="text-secondary font-semibold">Suwasra Node</span>
            </div>
          </div>

          {/* Quick Guidance Tile */}
          <div className="rounded-xl bg-surface-container p-5 border border-border flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-label-md font-bold text-foreground">
                Need to reset master password?
              </span>
              <p className="text-body-sm text-muted-foreground leading-relaxed">
                If locked out, run <code className="text-xs bg-surface-lowest px-1 rounded font-mono font-bold">npm run hash-password</code> in your project terminal and update the <code className="text-xs bg-surface-lowest px-1 rounded font-mono">ADMIN_PASSWORD_HASH</code> entry in <code className="text-xs bg-surface-lowest px-1 rounded font-mono">.env.local</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Save Action Bar */}
      <div className="sticky bottom-4 z-30 bg-surface-lowest/95 backdrop-blur-md p-4 rounded-xl border border-border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-label-sm text-muted-foreground">
            Changes will update WhatsApp inquiries and site footer parameters immediately.
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => setSettings(initialSettings)}
            className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground text-label-md font-semibold transition-colors"
          >
            Discard Changes
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-label-md font-bold shadow-md transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
