import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const noteSchema = new Schema(
  {
    author: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const attachmentSchema = new Schema(
  {
    filename: { type: String, required: true, trim: true },
    size: { type: String, default: "", trim: true },
    uploadedBy: { type: String, enum: ["client", "admin"], default: "client" },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const messageSchema = new Schema(
  {
    sender: { type: String, enum: ["client", "admin"], required: true },
    senderName: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    avatar: { type: String, default: "", trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const serviceRequestSchema = new Schema(
  {
    clientId: { type: String, index: true, default: "", trim: true },
    requestNumber: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true },
    serviceSlug: { type: String, required: true, trim: true },
    serviceTitle: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    status: {
      type: String,
      enum: [
        "new",
        "reviewing",
        "waiting_for_client",
        "quoted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "new",
    },
    assignedTo: { type: String, default: "", trim: true },
    adminNotes: { type: [noteSchema], default: [] },
    attachments: { type: [attachmentSchema], default: [] },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true },
);

export type ServiceRequestDocument = InferSchemaType<
  typeof serviceRequestSchema
>;

export const ServiceRequest: Model<ServiceRequestDocument> =
  mongoose.models.ServiceRequest ??
  mongoose.model("ServiceRequest", serviceRequestSchema);
