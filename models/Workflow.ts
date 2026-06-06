import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const workflowStepSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["queued", "active", "completed", "blocked"],
      default: "queued",
    },
  },
  { _id: true },
);

const workflowSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    steps: { type: [workflowStepSchema], default: [] },
    assignedRoles: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["draft", "active", "paused", "completed"],
      default: "active",
    },
  },
  { timestamps: true },
);

export type WorkflowDocument = InferSchemaType<typeof workflowSchema>;

export const Workflow: Model<WorkflowDocument> =
  mongoose.models.Workflow ?? mongoose.model("Workflow", workflowSchema);
