import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const documentTemplateSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    usageCount: { type: Number, default: 0 },
    lastUsed: { type: String, default: "", trim: true },
    status: { type: String, enum: ["active", "draft", "archived"], default: "active" },
  },
  { timestamps: true },
);

export type DocumentTemplateRecord = InferSchemaType<typeof documentTemplateSchema>;

export const DocumentTemplate: Model<DocumentTemplateRecord> =
  mongoose.models.DocumentTemplate ??
  mongoose.model("DocumentTemplate", documentTemplateSchema);
