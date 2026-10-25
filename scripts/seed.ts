import fs from "fs";
import path from "path";

// Load .env.local if present
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  process.loadEnvFile(envLocalPath);
}
import mongoose from "mongoose";
import { connectToDatabase } from "../src/lib/mongodb";
import { Product } from "../src/models/Product";
import { SiteSettings } from "../src/models/SiteSettings";
import { products as sampleProducts } from "../src/data/products";

async function seed() {
  console.log("🌱 Starting Sanwaliya Printing Press database seed script...");

  try {
    await connectToDatabase();
    console.log(" Connected to MongoDB successfully.");

    // 1. Seed Site Settings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      console.log("⚙️ Creating initial SiteSettings document...");
      await SiteSettings.create({
        businessName: "Sanwaliya Printing Press",
        businessNameHi: "सांवलिया प्रिंटिंग प्रेस",
        phone: "+91 98765 43210",
        whatsapp: "919876543210",
        address: "Station Road, Near Bus Stand, Suwasra, Dist. Mandsaur, MP - 458888",
        addressHi: "स्टेशन रोड, बस स्टैंड के पास, सुवासरा, जिला मंदसौर (म.प्र.)",
        openingHours: "Mon – Sat: 9:00 AM – 8:30 PM (Sunday by Appointment)",
        openingHoursHi: "सोमवार से शनिवार: सुबह 9:00 से रात 8:30 बजे तक",
        tagline: "Fine Print Studio & Bespoke Wedding Stationery",
        taglineHi: "शाही विवाह पत्रिका, विजिटिंग कार्ड्स एवं कमर्शियल प्रिंटिंग",
        establishedYear: 1994,
        socialLinks: {
          instagram: "https://instagram.com/sanwaliyapress",
          facebook: "https://facebook.com/sanwaliyapress",
          googleMaps: "https://maps.google.com/?q=Sanwaliya+Printing+Press+Suwasra",
        },
      });
      console.log("✅ SiteSettings created.");
    } else {
      console.log("ℹ️ SiteSettings already exists, skipping creation.");
    }

    // 2. Seed Sample Products (Idempotent upsert by slug)
    console.log(`📦 Upserting ${sampleProducts.length} sample products...`);
    let inserted = 0;
    let updated = 0;

    for (let i = 0; i < sampleProducts.length; i++) {
      const p = sampleProducts[i];
      const tags = Array.from(new Set([...(p.tags || []), "sample"]));

      const productPayload = {
        name: p.name,
        nameHi: p.nameHi,
        slug: p.slug.toLowerCase().trim(),
        productCode: p.productCode.toUpperCase().trim(),
        category: p.category,
        shortDescription: p.shortDescription,
        description: p.description,
        images: p.images.map((img, idx) => ({
          url: img.url,
          alt: img.alt || p.name,
          isPrimary: idx === 0 || Boolean(img.isPrimary),
          order: idx,
        })),
        availableOptions: {
          sizes: p.availableOptions?.sizes || [],
          papers: p.availableOptions?.papers || [],
          finishes: p.availableOptions?.finishes || [],
          printTypes: p.availableOptions?.printTypes || [],
          languages: p.availableOptions?.languages || [],
          customizations: p.availableOptions?.customizations || [],
        },
        minimumQuantity: p.minimumQuantity || 50,
        price: {
          show: Boolean(p.price?.show),
          startingFrom: p.price?.startingFrom,
          unit: p.price?.unit || "per piece",
        },
        featured: Boolean(p.featured),
        published: p.published !== false,
        tags,
        searchAliases: p.searchAliases || [],
        seoTitle: `${p.name} | Sanwaliya Printing Press Suwasra`,
        seoDescription: p.shortDescription,
      };

      const result = await Product.updateOne(
        { slug: p.slug.toLowerCase() },
        { $set: productPayload },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        inserted++;
      } else {
        updated++;
      }
    }

    console.log(
      `✅ Seed completed successfully! Inserted: ${inserted}, Updated: ${updated}, Total Catalog: ${sampleProducts.length}`
    );
  } catch (error) {
    console.error("❌ Seeding failed with error:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected.");
  }
}

seed();
