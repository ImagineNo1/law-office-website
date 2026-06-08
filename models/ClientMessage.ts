import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const clientMessageSchema = new Schema(
  {
    clientId: { type: String, required: true, trim: true },
    senderType: { type: String, enum: ["client", "admin"], required: true },
    sender: {
      type: String,
      enum: ["client", "lawyer", "admin"],
      required: true,
    },
    message: { type: String, required: true, trim: true },
    threadId: { type: String, default: "general", trim: true, index: true },
    threadTitle: { type: String, default: "گفتگوی پشتیبانی", trim: true },
    recipientId: { type: String, default: "", trim: true, index: true },
    recipientType: {
      type: String,
      enum: ["admin", "lawyer", ""],
      default: "",
    },
    recipientName: { type: String, default: "", trim: true },
    readAt: { type: Date },
  },
  { timestamps: true },
);

export type ClientMessageDocument = InferSchemaType<typeof clientMessageSchema>;

export const ClientMessage: Model<ClientMessageDocument> =
  mongoose.models.ClientMessage ??
  mongoose.model("ClientMessage", clientMessageSchema);
