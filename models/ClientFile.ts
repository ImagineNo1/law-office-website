import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const clientFileSchema = new Schema(
  {
    clientId: { type: String, required: true, index: true, trim: true },
    fileName: { type: String, required: true, trim: true },
    fileType: { type: String, default: "PDF", trim: true },
    fileSize: { type: String, default: "", trim: true },
    fileUrl: { type: String, default: "", trim: true },
    previewUrl: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

export type ClientFileDocument = InferSchemaType<typeof clientFileSchema>;

export const ClientFile: Model<ClientFileDocument> =
  mongoose.models.ClientFile ?? mongoose.model("ClientFile", clientFileSchema);
