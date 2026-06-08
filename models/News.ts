import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { seoSchema } from "@/models/seoFields";

const newsSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true },
);

export type NewsDocument = InferSchemaType<typeof newsSchema>;

export const News: Model<NewsDocument> = mongoose.models.News ?? mongoose.model("News", newsSchema);
