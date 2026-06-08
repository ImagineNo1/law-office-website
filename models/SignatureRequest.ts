import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const signatureRequestSchema = new Schema(
  {
    documentId: { type: String, required: true, trim: true },
    signerName: { type: String, required: true, trim: true },
    signerEmail: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "viewed", "signed", "rejected", "expired"],
      default: "pending",
    },
    sentAt: { type: Date, default: Date.now },
    dueAt: { type: Date },
  },
  { timestamps: true },
);

export type SignatureRequestDocument = InferSchemaType<
  typeof signatureRequestSchema
>;

export const SignatureRequest: Model<SignatureRequestDocument> =
  mongoose.models.SignatureRequest ??
  mongoose.model("SignatureRequest", signatureRequestSchema);
