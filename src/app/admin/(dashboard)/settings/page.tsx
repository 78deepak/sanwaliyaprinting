"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import {
  mockShopSettings,
  saveMockShopSettings,
  ShopSettings,
} from "@/data/admin-mock";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<ShopSettings>(mockShopSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Password fields state
  const [currPass, setCurrPass] = useState("RoyalPress@1994");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCurrPass, setShowCurrPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passFeedback, setPassFeedback] = useState<string | null>(null);

  // Insert variable into WhatsApp template textarea
  const handleInsertVariable = (variable: string) => {
    const updated = settings.whatsappTemplate + " " + variable;
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

  // Save Settings Handler
  const handleSaveSettings = async () => {
    setIsSaving(true);
    // // TODO(backend): Submit shop settings to PUT /api/admin/settings
    try {
      const updated = await saveMockShopSettings(settings);
      setSettings(updated);
      setToastMessage("Settings saved successfully! WhatsApp hotline and profile re-synchronized.");
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Update Password Handler
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass.length < 6) {
      setPassFeedback("New password must be at least 6 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      setPassFeedback("New passwords do not match.");
      return;
    }
    // // TODO(backend): Update admin credentials via POST /api/admin/auth/change-password
    setPassFeedback("Master password updated successfully!");
    setNewPass("");
    setConfirmPass("");
    setTimeout(() => setPassFeedback(null), 4000);
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

      {/* Top Editorial Header & Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-high border border-border p-6 md:p-8 shadow-sm">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-4 opacity-5 pointer-events-none select-none hidden lg:block">
          <span className="font-display-lg text-[130px] font-bold text-primary leading-none">
            सांवलिया
          </span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-lowest text-secondary text-label-sm uppercase tracking-widest font-bold border border-border w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span>Atelier Registry • सुवासरा मुख्यालय</span>
            </div>

            <h1 className="font-headline-lg text-2xl md:text-3xl text-primary tracking-tight font-bold flex items-baseline gap-3 flex-wrap">
              <span>Shop Settings</span>
              <span className="font-headline-md text-xl md:text-2xl text-muted-foreground font-normal">
                (दुकान की सेटिंग्स)
              </span>
            </h1>

            <p className="text-body-md text-muted-foreground mt-1 leading-relaxed">
              Manage your business address, WhatsApp hotline, working hours, catalog quote templates, and admin desk credentials.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-surface-lowest p-3 rounded-xl border border-border shadow-xs">
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-label-sm text-muted-foreground uppercase">
                Last Synced to Live Site
              </span>
              <span className="text-label-md text-primary font-bold">
                {settings.lastSynced}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
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
                  <h2 className="font-headline-sm text-lg text-primary font-bold">
                    Business Profile & Contact Information
                  </h2>
                  <p className="text-body-sm text-muted-foreground">
                    Core details shown on royal wedding stationery invoices & web footers.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary text-label-sm font-semibold">
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Shop Name Bilingual */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold flex items-center justify-between">
                  <span>Shop Name (दुकान का नाम)</span>
                  <span className="text-label-sm text-muted-foreground font-normal">
                    Primary Legal Entity
                  </span>
                </label>
                <input
                  type="text"
                  value={settings.shopName}
                  onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Tagline */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold">
                  Brand Tagline & Atelier Heritage
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20"
                />
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
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full pl-12 bg-surface-container border border-border text-foreground text-body-md pr-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 font-mono font-bold"
                  />
                </div>
                <p className="text-[12px] text-muted-foreground leading-snug">
                  Format: Country code without + sign (e.g. <strong className="text-primary">919876543210</strong>). All catalog inquiries route here.
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
                  value={settings.callingPhone}
                  onChange={(e) => setSettings({ ...settings, callingPhone: e.target.value })}
                  className="w-full bg-surface-container border border-border text-foreground text-body-md px-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest focus:ring-2 focus:ring-primary/20 font-semibold"
                />
                <p className="text-[12px] text-muted-foreground leading-snug">
                  Displayed on top website header banner for local consultations.
                </p>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-label-md text-foreground font-semibold flex items-center justify-between">
                  <span>Full Atelier Postal Address (पूरा पता)</span>
                  <span className="text-label-sm text-secondary font-medium">Mandsaur District</span>
                </label>
                <textarea
                  rows={3}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
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
                  value={settings.operatingHours}
                  onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
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
                  <h2 className="font-headline-sm text-lg text-primary font-bold">
                    WhatsApp Enquiry Message Configuration
                  </h2>
                  <p className="text-body-sm text-muted-foreground">
                    Dynamic merge fields populated when a client clicks &apos;Enquire on WhatsApp&apos;.
                  </p>
                </div>
              </div>
              <span className="text-secondary font-label-sm font-bold px-2.5 py-1 rounded-md bg-secondary/15">
                v2.4 Engine
              </span>
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
                  value={settings.whatsappTemplate}
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
                    {settings.whatsappTemplate
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

          {/* CARD 3: Security & Admin Password */}
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
                    Single shopkeeper master access configuration for Ramesh Patidar.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-muted-foreground text-label-sm font-semibold border border-border">
                Single-Admin Mode
              </span>
            </div>

            {passFeedback && (
              <div className="p-3 rounded-lg bg-tertiary/10 border border-tertiary/30 text-tertiary flex items-center gap-2 text-label-sm font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passFeedback}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Current Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-foreground font-semibold">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrPass ? "text" : "password"}
                      value={currPass}
                      onChange={(e) => setCurrPass(e.target.value)}
                      className="w-full bg-surface-container border border-border text-foreground text-body-md px-3.5 pr-10 py-2.5 rounded-lg focus:outline-none focus:bg-surface-lowest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrPass(!showCurrPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-foreground font-semibold">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new key"
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
                      placeholder="Repeat new key"
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

              <div className="flex items-center justify-between pt-2">
                <span className="text-body-sm text-muted-foreground">
                  Updating credentials invalidates other browser session keys.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-label-md font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Key className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </div>
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

            <span className="text-[11px] font-label-sm tracking-widest text-secondary font-bold uppercase">
              Heritage Print Atelier
            </span>
            <h3 className="font-headline-md text-xl text-primary font-bold mt-1">
              Admin Control Desk Sign In
            </h3>
            <p className="text-body-sm text-muted-foreground mt-0.5">
              सांवलिया प्रिंटिंग प्रेस • सुवासरा (मंदसौर)
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
                If locked out, contact the local system engineer in Mandsaur or verify identity via your registered Suwasra physical SIM card.
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
            onClick={() => setSettings(mockShopSettings)}
            className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-foreground text-label-md font-semibold transition-colors"
          >
            Discard Changes
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-label-md font-bold shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
