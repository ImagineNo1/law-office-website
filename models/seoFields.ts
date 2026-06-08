import { Schema } from "mongoose";

export const changeFrequencies = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"] as const;

export const seoSchema = new Schema(
  {
    metaTitle: { type: String, default: "", trim: true },
    metaDescription: { type: String, default: "", trim: true },
    keywords: { type: [String], default: [] },
    focusKeyword: { type: String, default: "", trim: true },
    canonicalUrl: { type: String, default: "", trim: true },
    robotsIndex: { type: Boolean, default: true },
    robotsFollow: { type: Boolean, default: true },
    ogTitle: { type: String, default: "", trim: true },
    ogDescription: { type: String, default: "", trim: true },
    ogImage: { type: String, default: "", trim: true },
    twitterTitle: { type: String, default: "", trim: true },
    twitterDescription: { type: String, default: "", trim: true },
    twitterImage: { type: String, default: "", trim: true },
    imageAlt: { type: String, default: "", trim: true },
    schemaType: { type: String, default: "", trim: true },
    schemaJson: { type: Schema.Types.Mixed, default: {} },
    sitemapInclude: { type: Boolean, default: true },
    sitemapPriority: { type: Number, default: 0.7, min: 0, max: 1 },
    sitemapChangeFrequency: { type: String, enum: changeFrequencies, default: "weekly" },
    seoScore: { type: Number, default: 0, min: 0, max: 100 },
    seoNotes: { type: [String], default: [] },
  },
  { _id: false },
);

