import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const paymentSchema = new Schema(
  {
    clientId: { type: String, required: true, index: true, trim: true },
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "failed", "refunded"],
      default: "pending",
    },
    paidAt: { type: Date },
  },
  { timestamps: true },
);

export type PaymentDocument = InferSchemaType<typeof paymentSchema>;

export const Payment: Model<PaymentDocument> =
  mongoose.models.Payment ?? mongoose.model("Payment", paymentSchema);
