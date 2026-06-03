import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    icon: { type: String, default: "scale" },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true },
);

export type ServiceDocument = InferSchemaType<typeof serviceSchema>;

export const Service: Model<ServiceDocument> =
  mongoose.models.Service ?? mongoose.model("Service", serviceSchema);
