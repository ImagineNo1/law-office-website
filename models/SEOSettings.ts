import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const seoSettingsSchema = new Schema(
  {
    key: { type: String, default: "seo", unique: true },
    siteName: { type: String, default: "وکیل‌یار", trim: true },
    defaultMetaTitle: {
      type: String,
      default: "وکیل‌یار | خدمات حقوقی، قرارداد و امضا",
      trim: true,
    },
    defaultMetaDescription: {
      type: String,
      default:
        "پلتفرم فارسی خدمات حقوقی، بانک قرارداد، ثبت درخواست و پیگیری پرونده برای موکلان.",
      trim: true,
    },
    defaultOgImage: { type: String, default: "", trim: true },
    canonicalBaseUrl: {
      type: String,
      default: "https://vakilyar.vercel.app",
      trim: true,
    },
    robotsTxt: { type: String, default: "", trim: true },
    googleSearchConsoleVerification: { type: String, default: "", trim: true },
    organizationName: { type: String, default: "وکیل‌یار", trim: true },
    phone: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
    logo: { type: String, default: "", trim: true },
    socialProfiles: { type: [String], default: [] },
    organizationSchema: { type: Schema.Types.Mixed, default: {} },
    localBusinessSchema: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export type SEOSettingsDocument = InferSchemaType<typeof seoSettingsSchema>;

export const SEOSettings: Model<SEOSettingsDocument> =
  mongoose.models.SEOSettings ??
  mongoose.model("SEOSettings", seoSettingsSchema);
