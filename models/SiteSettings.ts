import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const siteSettingsSchema = new Schema(
  {
    siteTitle: { type: String, required: true },
    siteDescription: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    workingHours: { type: String },
    socialLinks: {
      instagram: { type: String },
      linkedin: { type: String },
      telegram: { type: String },
    },
    seo: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true },
);

export type SiteSettingsDocument = InferSchemaType<typeof siteSettingsSchema>;

export const SiteSettings: Model<SiteSettingsDocument> =
  mongoose.models.SiteSettings ?? mongoose.model("SiteSettings", siteSettingsSchema);
