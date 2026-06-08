import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { seoSchema } from "@/models/seoFields";

const legalFormTemplateSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    fields: { type: [String], default: [] },
    usageCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true },
);

export type LegalFormTemplateDocument = InferSchemaType<
  typeof legalFormTemplateSchema
>;

export const LegalFormTemplate: Model<LegalFormTemplateDocument> =
  mongoose.models.LegalFormTemplate ??
  mongoose.model("LegalFormTemplate", legalFormTemplateSchema);
