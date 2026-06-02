import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const pageContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    content: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export type PageContentDocument = InferSchemaType<typeof pageContentSchema>;

export const PageContent: Model<PageContentDocument> =
  mongoose.models.PageContent ?? mongoose.model("PageContent", pageContentSchema);
