import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { seoSchema } from "@/models/seoFields";

const siteSettingsSchema = new Schema(
  {
    key: { type: String, default: "site", unique: true },
    siteTitle: { type: String, required: true },
    siteDescription: { type: String },
    detailedDescription: { type: String },
    logoText: { type: String },
    siteIcon: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    workingHours: { type: String },
    socialLinks: {
      instagram: { type: String },
      linkedin: { type: String },
      telegram: { type: String },
    },
    seoTitle: { type: String },
    seoDescription: { type: String },
    footerDescription: { type: String },
    footerCopyright: { type: String },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true },
);

export type SiteSettingsDocument = InferSchemaType<typeof siteSettingsSchema>;

export const SiteSettings: Model<SiteSettingsDocument> =
  mongoose.models.SiteSettings ??
  mongoose.model("SiteSettings", siteSettingsSchema);
