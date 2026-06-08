import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["super_admin", "admin", "user"],
      default: "user",
    },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
    isLawyer: { type: Boolean, default: false, index: true },
    lawyerLicenseType: {
      type: String,
      enum: [
        "paye_one",
        "paye_two",
        "trainee",
        "article_187",
        "judicial_advisor",
        "taskhiri",
        "moazadati",
        "taeini",
        "ettefaghi",
      ],
      default: "paye_one",
    },
    lawyerSpecialties: { type: [String], default: [] },
    lawyerBio: { type: String, default: "", trim: true },
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

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User: Model<UserDocument> =
  mongoose.models.User ?? mongoose.model("User", userSchema);
