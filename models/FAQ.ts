import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, default: "عمومی", trim: true },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type FAQDocument = InferSchemaType<typeof faqSchema>;

export const FAQ: Model<FAQDocument> =
  mongoose.models.FAQ ?? mongoose.model("FAQ", faqSchema);
