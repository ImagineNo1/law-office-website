import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const clientContractSchema = new Schema(
  {
    clientId: { type: String, required: true, index: true, trim: true },
    contractTemplateId: { type: String, default: "", trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "قرارداد", trim: true },
    status: { type: String, enum: ["active", "ready", "expired", "draft"], default: "ready" },
    purchasedAt: { type: Date, default: Date.now },
    fileUrl: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

export type ClientContractDocument = InferSchemaType<typeof clientContractSchema>;

export const ClientContract: Model<ClientContractDocument> =
  mongoose.models.ClientContract ?? mongoose.model("ClientContract", clientContractSchema);
