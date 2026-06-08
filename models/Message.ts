import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const messageSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["unread", "read", "archived"],
      default: "unread",
    },
  },
  { timestamps: true },
);

export type MessageDocument = InferSchemaType<typeof messageSchema>;

export const Message: Model<MessageDocument> =
  mongoose.models.Message ?? mongoose.model("Message", messageSchema);
