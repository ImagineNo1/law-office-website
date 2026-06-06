import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const activityEventSchema = new Schema(
  {
    actorId: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    type: {
      type: String,
      enum: ["request", "document", "signature", "payment", "message", "security"],
      default: "request",
    },
  },
  { timestamps: true },
);

export type ActivityEventDocument = InferSchemaType<typeof activityEventSchema>;

export const ActivityEvent: Model<ActivityEventDocument> =
  mongoose.models.ActivityEvent ??
  mongoose.model("ActivityEvent", activityEventSchema);
