import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  businessName: string;
  businessNameHi: string;
  phone: string;
  whatsapp: string;
  address: string;
  addressHi: string;
  openingHours: string;
  openingHoursHi?: string;
  whatsappTemplate?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    googleMaps?: string;
  };
  tagline: string;
  taglineHi: string;
  establishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: {
      type: String,
      required: true,
      default: "Sanwaliya Printing Press",
      trim: true,
    },
    businessNameHi: {
      type: String,
      required: true,
      default: "सांवलिया प्रिंटिंग प्रेस",
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      default: "+91 98765 43210",
      trim: true,
    },
    whatsapp: {
      type: String,
      required: true,
      default: "919876543210",
      trim: true,
    },
    address: {
      type: String,
      required: true,
      default: "Station Road, Near Bus Stand, Suwasra, Dist. Mandsaur, MP - 458888",
      trim: true,
    },
    addressHi: {
      type: String,
      required: true,
      default: "स्टेशन रोड, बस स्टैंड के पास, सुवासरा, जिला मंदसौर (म.प्र.)",
      trim: true,
    },
    openingHours: {
      type: String,
      default: "Mon – Sat: 9:00 AM – 8:30 PM (Sunday by Appointment)",
      trim: true,
    },
    openingHoursHi: {
      type: String,
      default: "सोमवार से शनिवार: सुबह 9:00 से रात 8:30 बजे तक",
      trim: true,
    },
    whatsappTemplate: {
      type: String,
      default:
        "Namaste Sanwaliya Press! I would like to inquire about [Product Name] (Code: [Code]). Could you please share card samples and printing quote for [Qty] pieces on [Paper Stock]?",
      trim: true,
    },
    socialLinks: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      googleMaps: { type: String, default: "" },
    },
    tagline: {
      type: String,
      default: "Fine Print Studio & Bespoke Wedding Stationery",
      trim: true,
    },
    taglineHi: {
      type: String,
      default: "शाही विवाह पत्रिका, विजिटिंग कार्ड्स एवं कमर्शियल प्रिंटिंग",
      trim: true,
    },
    establishedYear: {
      type: Number,
      default: 1994,
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
