import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const clientFileSchema = new Schema(
  {
    filename: { type: String, required: true, trim: true },
    type: { type: String, default: "document", trim: true },
    size: { type: String, default: "", trim: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const clientContractSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "قرارداد", trim: true },
    purchaseDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "ready", "expired", "draft"],
      default: "ready",
    },
  },
  { _id: true },
);

const clientPaymentSchema = new Schema(
  {
    invoiceNumber: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
    },
    paidAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const clientProfileSchema = new Schema(
  {
    clientId: { type: String, index: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    avatar: { type: String, default: "", trim: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true },
    nationalCode: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
    serviceRequests: [{ type: Schema.Types.ObjectId, ref: "ServiceRequest" }],
    contracts: { type: [clientContractSchema], default: [] },
    files: { type: [clientFileSchema], default: [] },
    payments: { type: [clientPaymentSchema], default: [] },
  },
  { timestamps: true },
);

export type ClientProfileDocument = InferSchemaType<typeof clientProfileSchema>;

export const ClientProfile: Model<ClientProfileDocument> =
  mongoose.models.ClientProfile ??
  mongoose.model("ClientProfile", clientProfileSchema);
