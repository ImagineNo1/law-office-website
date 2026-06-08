import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { seoSchema } from "@/models/seoFields";

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, default: "عمومی", trim: true },
    pageType: {
      type: String,
      enum: ["general", "service", "contract", "legal-form"],
      default: "general",
      index: true,
    },
    pageSlug: { type: String, default: "", trim: true, index: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    order: { type: Number, default: 0 },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true },
);

export type FAQDocument = InferSchemaType<typeof faqSchema>;

export const FAQ: Model<FAQDocument> =
  mongoose.models.FAQ ?? mongoose.model("FAQ", faqSchema);
