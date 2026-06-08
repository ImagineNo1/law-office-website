import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const clientUserSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "super_admin", "client"], default: "user" },
    status: { type: String, enum: ["active", "blocked"], default: "active" },
    nationalCode: { type: String, default: "", trim: true },
    avatar: { type: String, default: "", trim: true },
    lastLoginAt: { type: Date },
    onboarding: {
      adminTourCompleted: { type: Boolean, default: false },
      adminTourCompletedAt: { type: Date },
      adminTourSkippedAt: { type: Date },
      dashboardTourCompleted: { type: Boolean, default: false },
      dashboardTourCompletedAt: { type: Date },
      dashboardTourSkippedAt: { type: Date },
      lastSeenTourVersion: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

clientUserSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $type: "string", $gt: "" } } },
);

export type ClientUserDocument = InferSchemaType<typeof clientUserSchema>;

export const ClientUser: Model<ClientUserDocument> =
  mongoose.models.ClientUser ?? mongoose.model("ClientUser", clientUserSchema);
