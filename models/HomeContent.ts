import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const heroSchema = new Schema(
  {
    eyebrow: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    primaryCtaLabel: { type: String, default: "" },
    primaryCtaHref: { type: String, default: "" },
    secondaryCtaLabel: { type: String, default: "" },
    secondaryCtaHref: { type: String, default: "" },
    consultationTitle: { type: String, default: "" },
    consultationText: { type: String, default: "" },
  },
  { _id: false },
);

const orderedItemSchema = new Schema(
  {
    title: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    icon: { type: String, default: "shield" },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);


const sectionSchema = new Schema(
  {
    eyebrow: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false },
);

const statSchema = new Schema(
  {
    label: { type: String, default: "" },
    value: { type: String, default: "" },
    icon: { type: String, default: "scale" },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const contactCtaSchema = new Schema(
  {
    eyebrow: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    primaryLabel: { type: String, default: "" },
    primaryHref: { type: String, default: "" },
    secondaryLabel: { type: String, default: "" },
    secondaryHref: { type: String, default: "" },
  },
  { _id: false },
);

const homeContentSchema = new Schema(
  {
    key: { type: String, default: "home", unique: true },
    hero: { type: heroSchema, default: {} },
    trustFeatures: { type: [orderedItemSchema], default: [] },
    stats: { type: [statSchema], default: [] },
    processSteps: { type: [orderedItemSchema], default: [] },
    legalSupport: { type: sectionSchema, default: {} },
    legalSupportCards: { type: [orderedItemSchema], default: [] },
    finalCta: { type: sectionSchema, default: {} },
    contactCta: { type: contactCtaSchema, default: {} },
  },
  { timestamps: true },
);

export type HomeContentDocument = InferSchemaType<typeof homeContentSchema>;

export const HomeContent: Model<HomeContentDocument> =
  mongoose.models.HomeContent ??
  mongoose.model("HomeContent", homeContentSchema);
