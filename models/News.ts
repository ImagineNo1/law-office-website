import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const newsSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

export type NewsDocument = InferSchemaType<typeof newsSchema>;

export const News: Model<NewsDocument> = mongoose.models.News ?? mongoose.model("News", newsSchema);
