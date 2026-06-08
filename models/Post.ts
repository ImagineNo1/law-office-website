import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { seoSchema } from "@/models/seoFields";

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    category: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true },
);

export type PostDocument = InferSchemaType<typeof postSchema>;

export const Post: Model<PostDocument> = mongoose.models.Post ?? mongoose.model("Post", postSchema);
