import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const documentCategories = [
  "Contracts",
  "Petitions",
  "Complaints",
  "Notices",
  "Statements",
  "Attorney Documents",
  "Corporate Documents",
  "Financial Documents",
  "Other",
] as const;

export const documentStatuses = [
  "draft",
  "reviewing",
  "waiting_signature",
  "signed",
  "archived",
  "cancelled",
] as const;

const documentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, enum: documentCategories, required: true },
    status: { type: String, enum: documentStatuses, default: "draft" },
    clientId: { type: String, default: "", index: true, trim: true },
    ownerId: { type: String, required: true, trim: true },
    fileUrl: { type: String, default: "", trim: true },
    previewImage: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    requiresSignature: { type: Boolean, default: false },
    signatureStatus: {
      type: String,
      enum: ["none", "draft", "sent", "viewed", "signed", "rejected", "expired"],
      default: "none",
    },
  },
  { timestamps: true },
);

export type LegalDocument = InferSchemaType<typeof documentSchema>;

export const Document: Model<LegalDocument> =
  mongoose.models.Document ?? mongoose.model("Document", documentSchema);
