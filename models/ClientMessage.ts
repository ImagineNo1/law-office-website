import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const clientMessageSchema = new Schema(
  {
    clientId: { type: String, required: true, trim: true },
    sender: { type: String, enum: ["client", "lawyer", "admin"], required: true },
    message: { type: String, required: true, trim: true },
    readAt: { type: Date },
  },
  { timestamps: true },
);

export type ClientMessageDocument = InferSchemaType<typeof clientMessageSchema>;

export const ClientMessage: Model<ClientMessageDocument> =
  mongoose.models.ClientMessage ??
  mongoose.model("ClientMessage", clientMessageSchema);
