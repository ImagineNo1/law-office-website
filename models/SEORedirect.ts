import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const seoRedirectSchema = new Schema(
  {
    sourcePath: { type: String, required: true, unique: true, trim: true },
    targetPath: { type: String, required: true, trim: true },
    statusCode: { type: Number, enum: [301, 302, 307, 308], default: 301 },
    enabled: { type: Boolean, default: true },
    hitCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type SEORedirectDocument = InferSchemaType<typeof seoRedirectSchema>;

export const SEORedirect: Model<SEORedirectDocument> =
  mongoose.models.SEORedirect ??
  mongoose.model("SEORedirect", seoRedirectSchema);
