import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const contractTemplateSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    heroImage: { type: String, default: "", trim: true },
    priceLabel: { type: String, default: "", trim: true },
    sampleFileUrl: { type: String, default: "", trim: true },
    useCases: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    requiredDocuments: { type: [String], default: [] },
    faqItems: {
      type: [
        {
          question: { type: String, required: true, trim: true },
          answer: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },
    relatedContracts: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    order: { type: Number, default: 0 },
    seoTitle: { type: String, default: "", trim: true },
    seoDescription: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

export type ContractTemplateDocument = InferSchemaType<typeof contractTemplateSchema>;

export const ContractTemplate: Model<ContractTemplateDocument> =
  mongoose.models.ContractTemplate ??
  mongoose.model("ContractTemplate", contractTemplateSchema);
