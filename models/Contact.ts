import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const contactSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    organization: { type: String, default: "", trim: true },
    role: { type: String, default: "Client", trim: true },
    tags: { type: [String], default: [] },
    notes: { type: String, default: "", trim: true },
    avatar: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

export type ContactDocument = InferSchemaType<typeof contactSchema>;

export const Contact: Model<ContactDocument> =
  mongoose.models.Contact ?? mongoose.model("Contact", contactSchema);
