import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true },
);

export type RoleDocument = InferSchemaType<typeof roleSchema>;

export const Role: Model<RoleDocument> =
  mongoose.models.Role ?? mongoose.model("Role", roleSchema);
