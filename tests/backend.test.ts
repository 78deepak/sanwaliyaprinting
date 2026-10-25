import { test, describe } from "node:test";
import assert from "node:assert/strict";

// Environment setup for testing
process.env.SESSION_SECRET = process.env.SESSION_SECRET || "test-secret-at-least-32-characters-long-key-1234";
process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916264350165";

import { createAdminSessionToken, verifyAdminSessionToken } from "../src/lib/auth";
import { checkLoginRateLimit, recordFailedLogin, resetLoginRateLimit } from "../src/lib/rate-limit";
import { productFormSchema, siteSettingsSchema } from "../src/lib/validation";
import { serializeProduct } from "../src/lib/products";
import { buildProductEnquiryUrl, buildShortlistEnquiryUrl, buildGeneralEnquiryUrl } from "../src/lib/whatsapp";
import { siteConfig } from "../src/lib/site-config";

describe("1. Admin Authentication & Session Management", () => {
  test("creates and verifies a valid signed session token", async () => {
    const token = await createAdminSessionToken();
    assert.ok(typeof token === "string", "Token must be a string");
    assert.ok(token.split(".").length === 3, "Token must be a valid 3-part JWT");

    const verification = await verifyAdminSessionToken(token);
    assert.equal(verification.valid, true, "Valid token must verify successfully");
    assert.equal(verification.payload?.role, "admin", "Payload role must be admin");
  });

  test("rejects tampered or forged tokens", async () => {
    const validToken = await createAdminSessionToken();
    const parts = validToken.split(".");
    // Tamper with the payload
    const tamperedPayload = Buffer.from(JSON.stringify({ role: "admin", exp: 9999999999 })).toString("base64url");
    const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;

    const verification = await verifyAdminSessionToken(tamperedToken);
    assert.equal(verification.valid, false, "Tampered token must be rejected");
  });

  test("rejects empty or random strings", async () => {
    const invalidVerification = await verifyAdminSessionToken("not-a-jwt-token");
    assert.equal(invalidVerification.valid, false, "Malformed string must be rejected");
  });

  test("rate limiter enforces login attempt thresholds and lockout", async () => {
    const testIp = `127.0.0.${Math.floor(Math.random() * 200 + 50)}`;

    // Initial check should be clean and not locked
    const initialStatus = await checkLoginRateLimit(testIp);
    assert.equal(initialStatus.isLocked, false, "New IP should not be locked");
    assert.equal(initialStatus.remainingAttempts, 5, "Initial remaining attempts should be 5");

    // Record 5 failed attempts
    for (let i = 0; i < 5; i++) {
      await recordFailedLogin(testIp);
    }

    // Now it should be locked
    const lockedStatus = await checkLoginRateLimit(testIp);
    assert.equal(lockedStatus.isLocked, true, "IP should be locked after 5 failed attempts");
    assert.equal(lockedStatus.remainingAttempts, 0, "Remaining attempts should be 0");

    // Reset rate limit
    await resetLoginRateLimit(testIp);
    const resetStatus = await checkLoginRateLimit(testIp);
    assert.equal(resetStatus.isLocked, false, "IP should be unlocked after reset");
  });
});

describe("2. Zod Validation Schemas", () => {
  test("valid product form payload passes schema validation", () => {
    const validProduct = {
      productCode: "RM-TEST-01",
      slug: "royal-test-invitation",
      name: "Royal Test Invitation",
      nameHi: "शाही निमंत्रण",
      category: "wedding-cards",
      shortDescription: "Handcrafted foil debossed card on 600 GSM paper.",
      description: "Complete full set with inserts.",
      minimumQuantity: 100,
      price: {
        show: true,
        startingFrom: 180,
        unit: "per set",
      },
      featured: true,
      published: true,
      tags: ["Royal", "Velvet"],
      searchAliases: ["shadi card"],
      images: [
        {
          url: "https://res.cloudinary.com/aokdwbfg/image/upload/v1/test.jpg",
          alt: "Royal Test",
          isPrimary: true,
        },
      ],
      availableOptions: {},
    };

    const result = productFormSchema.safeParse(validProduct);
    assert.equal(result.success, true, "Valid product schema parsing must succeed");
    if (result.success) {
      assert.equal(result.data.slug, "royal-test-invitation");
      assert.equal(result.data.minimumQuantity, 100);
    }
  });

  test("rejects invalid slugs with uppercase or special characters", () => {
    const invalidProduct = {
      productCode: "RM-TEST-02",
      slug: "Invalid Slug With Spaces!",
      name: "Test Name",
      category: "wedding-cards",
      shortDescription: "A short description.",
      minimumQuantity: 50,
      images: [{ url: "https://example.com/img.jpg", alt: "Test", isPrimary: true }],
    };

    const result = productFormSchema.safeParse(invalidProduct);
    assert.equal(result.success, false, "Invalid slug must fail validation");
  });

  test("rejects missing primary image or empty image array", () => {
    const noImagesProduct = {
      productCode: "RM-TEST-03",
      slug: "valid-slug",
      name: "Test Name",
      category: "wedding-cards",
      shortDescription: "A short description.",
      minimumQuantity: 50,
      images: [],
    };

    const result = productFormSchema.safeParse(noImagesProduct);
    assert.equal(result.success, false, "Empty images must fail validation");
  });

  test("site settings schema validates phone and WhatsApp formats", () => {
    const validSettings = {
      businessName: "Sanwaliya Printing Press",
      businessNameHi: "सांवलिया प्रिंटिंग प्रेस",
      tagline: "Fine Print Studio",
      taglineHi: "राजसी मुद्रण",
      phone: "+91 98765 43210",
      whatsapp: "916264350165",
      address: "Sadar Bazar, Suwasra",
      addressHi: "सदर बाजार, सुवासरा",
      openingHours: "Mon - Sat: 10:00 AM - 8:30 PM",
      establishedYear: 1994,
    };

    const result = siteSettingsSchema.safeParse(validSettings);
    assert.equal(result.success, true, "Valid settings must pass schema validation");
    if (result.success) {
      assert.equal(result.data.ownerName, "Ramesh Patidar (Owner)", "Defaults ownerName when omitted");
    }

    // Custom owner name test
    const customOwnerResult = siteSettingsSchema.safeParse({
      ...validSettings,
      ownerName: "Deepak Patidar (Director)",
    });
    assert.equal(customOwnerResult.success, true, "Custom ownerName must pass schema validation");
    if (customOwnerResult.success) {
      assert.equal(customOwnerResult.data.ownerName, "Deepak Patidar (Director)");
    }

    const invalidSettings = {
      ...validSettings,
      whatsapp: "123", // too short (must be at least 10 chars)
    };
    const invalidResult = siteSettingsSchema.safeParse(invalidSettings);
    assert.equal(invalidResult.success, false, "Too short WhatsApp number must fail validation");

    const invalidOwnerResult = siteSettingsSchema.safeParse({
      ...validSettings,
      ownerName: "X", // too short (must be at least 2 chars)
    });
    assert.equal(invalidOwnerResult.success, false, "Too short owner name must fail validation");
  });
});

describe("3. Product Serialization & Data Formatting", () => {
  test("serializeProduct formats raw document into clean UIProduct", () => {
    const rawMongoDoc = {
      _id: "661234567890abcdef123456",
      productCode: "RM-W-101",
      slug: "rajwada-kundan-box",
      name: "Rajwada Kundan Box",
      nameHi: "रजवाड़ा कुंदन बॉक्स",
      category: "wedding-cards",
      shortDescription: "Silk invitation box.",
      description: "Full details.",
      images: [
        {
          url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
          alt: "Rajwada Box",
          isPrimary: true,
          publicId: "sample",
        },
      ],
      minimumQuantity: 50,
      price: {
        show: true,
        startingFrom: 250,
        unit: "per set",
      },
      featured: true,
      published: true,
      tags: ["Kundan", "Box"],
      searchAliases: ["rajwada"],
      createdAt: new Date("2026-01-01"),
    };

    const serialized = serializeProduct(rawMongoDoc);
    assert.equal(serialized.id, "661234567890abcdef123456");
    assert.equal(serialized.productCode, "RM-W-101");
    assert.equal(serialized.featured, true);
    assert.equal(serialized.published, true);
    assert.equal(serialized.images[0].isPrimary, true);
    assert.equal(typeof serialized.createdAt, "string");
  });
});

describe("4. WhatsApp Concierge URL Builders", () => {
  const dummyProduct = {
    id: "prod-1",
    productCode: "RM-W-101",
    slug: "test-card",
    name: "Royal Velvet Card",
    category: "wedding-cards",
    shortDescription: "Luxury card",
    description: "Detailed card",
    images: [{ url: "https://example.com/1.jpg", alt: "1", isPrimary: true }],
    availableOptions: {},
    minimumQuantity: 100,
    price: { show: true, startingFrom: 150, unit: "per piece" },
    featured: true,
    published: true,
    tags: ["Velvet"],
    searchAliases: ["card"],
    createdAt: new Date().toISOString(),
  };

  test("builds single product enquiry URL with encoded parameters", () => {
    const url = buildProductEnquiryUrl({
      product: dummyProduct,
      quantity: 250,
      selectedPaper: "600 GSM Cotton",
      selectedFinish: "24k Gold Foil",
    });

    assert.ok(url.startsWith(`https://wa.me/${siteConfig.whatsappNumber}?text=`), "URL must point to wa.me with configured number");
    const decoded = decodeURIComponent(url);
    assert.ok(decoded.includes("RM-W-101"), "URL must contain product code");
    assert.ok(decoded.includes("Royal Velvet Card"), "URL must contain product name");
    assert.ok(decoded.includes("250"), "URL must contain quantity");
    assert.ok(decoded.includes("600 GSM Cotton"), "URL must contain paper material");
    assert.ok(decoded.includes("24k Gold Foil"), "URL must contain finish");
  });

  test("builds consolidated shortlist enquiry URL for multiple items", () => {
    const items = [
      {
        productId: "prod-1",
        productCode: "RM-W-101",
        name: "Royal Velvet Card",
        category: "wedding-cards",
        slug: "royal-velvet-card",
        thumbnailUrl: "https://example.com/1.jpg",
        quantity: 200,
        selectedPaper: "Velvet",
        note: "Gold foil deboss",
        addedAt: Date.now(),
      },
      {
        productId: "prod-2",
        productCode: "VC-LUX-01",
        name: "Letterpress Visiting Card",
        category: "visiting-cards",
        slug: "letterpress-visiting-card",
        thumbnailUrl: "https://example.com/2.jpg",
        quantity: 500,
        selectedPaper: "800 GSM Cotton",
        addedAt: Date.now(),
      },
    ];

    const url = buildShortlistEnquiryUrl(items, "Wedding in Indore, Dec 2026");
    assert.ok(url.startsWith(`https://wa.me/${siteConfig.whatsappNumber}?text=`));
    const decoded = decodeURIComponent(url);
    assert.ok(decoded.includes("1. RM-W-101"), "Includes first item");
    assert.ok(decoded.includes("2. VC-LUX-01"), "Includes second item");
    assert.ok(decoded.includes("Wedding in Indore, Dec 2026"), "Includes general request note");
  });

  test("builds general consultation URL with fallback text", () => {
    const url = buildGeneralEnquiryUrl();
    assert.ok(url.startsWith(`https://wa.me/${siteConfig.whatsappNumber}?text=`));
    const decoded = decodeURIComponent(url);
    assert.ok(decoded.includes("Sanwaliya Printing Press"));
  });
});
