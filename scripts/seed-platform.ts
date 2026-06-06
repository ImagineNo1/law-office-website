import mongoose from "mongoose";
import { connectDb } from "@/lib/db";
import { recoveryServices, recoveryContracts, legalForms, recoveryFaqs, dashboardEvents } from "@/lib/platform-recovery-data";
import { sampleServiceRequests } from "@/lib/service-requests";
import { contacts, legalDocuments, signatureRequests, templates, workflows } from "@/lib/legaltech-data";
import { ActivityEvent } from "@/models/ActivityEvent";
import { ClientMessage } from "@/models/ClientMessage";
import { Contact } from "@/models/Contact";
import { ContractTemplate } from "@/models/ContractTemplate";
import { Document } from "@/models/Document";
import { DocumentTemplate } from "@/models/DocumentTemplate";
import { FAQ } from "@/models/FAQ";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { Payment } from "@/models/Payment";
import { Service } from "@/models/Service";
import { ServiceRequest } from "@/models/ServiceRequest";
import { SignatureRequest } from "@/models/SignatureRequest";
import { Workflow } from "@/models/Workflow";

const now = new Date("2026-06-06T09:00:00.000Z");

type UpsertModel = {
  updateOne(
    filter: Record<string, unknown>,
    update: Record<string, unknown>,
    options: { upsert: boolean },
  ): Promise<unknown>;
};

async function upsertMany<T extends object>(
  model: UpsertModel,
  items: T[],
  key: keyof T,
) {
  for (const item of items) {
    await model.updateOne({ [key]: item[key] }, { $set: item }, { upsert: true });
  }
}

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required for platform seeding.");
  }

  await connectDb();

  await upsertMany(
    Service,
    recoveryServices.map(([title, slug, excerpt, category, priceLabel], index) => ({
      title,
      slug,
      excerpt,
      category,
      content: excerpt,
      priceLabel,
      heroDescription: excerpt,
      heroFeatures: ["CRM حقوقی", "امضای دیجیتال", "آرشیو امن"],
      benefits: ["بررسی تخصصی", "تحویل قابل پیگیری", "آماده امضا"],
      processSteps: ["ثبت درخواست", "بررسی مدارک", "تهیه پیش نویس", "بازبینی موکل", "تحویل و بایگانی"],
      requiredDocuments: ["کارت ملی", "شرح موضوع", "مستندات مرتبط", "اطلاعات طرف مقابل"],
      faqItems: recoveryFaqs.map(([question, answer]) => ({ question, answer })),
      status: "published",
      order: index + 1,
    })),
    "slug",
  );

  await upsertMany(
    ContractTemplate,
    recoveryContracts.slice(0, 24).map((contract, index) => ({
      title: contract.title,
      slug: `${contract.slug}-${index + 1}`,
      category: contract.category,
      excerpt: contract.description,
      content: contract.description,
      priceLabel: contract.price,
      useCases: ["تنظیم قرارداد", "ارسال برای امضا", "آرشیو حقوقی"],
      benefits: ["قابل ویرایش", "بررسی حقوقی", "آماده امضا"],
      requiredDocuments: ["مشخصات طرفین", "مدارک هویتی", "شرایط معامله"],
      faqItems: recoveryFaqs.map(([question, answer]) => ({ question, answer })),
      relatedContracts: [],
      status: "published",
      order: index + 1,
    })),
    "slug",
  );

  await upsertMany(
    LegalFormTemplate,
    legalForms.slice(0, 8).map((form) => ({
      title: form.title,
      slug: form.slug,
      category: form.category,
      description: form.description,
      fields: Array.from({ length: form.fields }, (_, index) => `field-${index + 1}`),
      usageCount: form.usage,
      status: "published",
    })),
    "slug",
  );

  const faqItems = Array.from({ length: 30 }, (_, index) => {
    const [question, answer] = recoveryFaqs[index % recoveryFaqs.length];
    const service = recoveryServices[index % recoveryServices.length];
    return {
      question: `${question} ${index + 1}`,
      answer,
      category: index % 3 === 0 ? "قرارداد" : index % 3 === 1 ? "خدمت" : "عمومی",
      pageType: index % 3 === 0 ? "contract" : index % 3 === 1 ? "service" : "general",
      pageSlug: index % 3 === 1 ? service[1] : "",
      status: "published",
      order: index + 1,
    };
  });
  await upsertMany(FAQ, faqItems, "question");

  await upsertMany(
    ServiceRequest,
    sampleServiceRequests.slice(0, 50).map((request) => ({
      requestNumber: request.requestNumber,
      fullName: request.fullName,
      phone: request.phone,
      email: request.email,
      serviceSlug: request.serviceSlug,
      serviceTitle: request.serviceTitle,
      subject: request.subject,
      description: request.description,
      priority: request.priority,
      status: request.status,
      assignedTo: request.assignedTo,
      adminNotes: request.adminNotes,
      attachments: request.attachments,
      messages: request.messages,
    })),
    "requestNumber",
  );

  await upsertMany(
    Document,
    legalDocuments.slice(0, 40).map((doc) => ({
      title: doc.title,
      slug: doc.slug,
      category: doc.category,
      status: doc.status,
      ownerId: doc.ownerId,
      fileUrl: doc.fileUrl,
      previewImage: doc.previewImage,
      description: doc.description,
      requiresSignature: doc.requiresSignature,
      signatureStatus: doc.signatureStatus,
    })),
    "slug",
  );

  await upsertMany(Contact, contacts.slice(0, 20), "email");
  await upsertMany(DocumentTemplate, templates.slice(0, 12), "title");

  await upsertMany(
    SignatureRequest,
    signatureRequests.slice(0, 20).map((request) => ({
      documentId: request.documentId,
      signerName: request.signer,
      signerEmail: request.email,
      status: request.status,
      sentAt: now,
      dueAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    })),
    "signerEmail",
  );

  await upsertMany(Workflow, workflows.slice(0, 10), "name");

  await upsertMany(
    Payment,
    Array.from({ length: 10 }, (_, index) => ({
      clientId: contacts[index % contacts.length].id,
      invoiceNumber: `INV-1405-${String(index + 1).padStart(4, "0")}`,
      amount: 1800000 + index * 250000,
      status: index % 4 === 0 ? "pending" : "paid",
      paidAt: index % 4 === 0 ? undefined : now,
    })),
    "invoiceNumber",
  );

  await upsertMany(
    ClientMessage,
    Array.from({ length: 20 }, (_, index) => ({
      clientId: contacts[index % contacts.length].id,
      sender: index % 3 === 0 ? "client" : "admin",
      message: `پیام عملیاتی شماره ${index + 1} برای پیگیری پرونده و سند.`,
    })),
    "message",
  );

  await upsertMany(
    ActivityEvent,
    dashboardEvents.slice(0, 30).map((event, index) => ({
      actorId: contacts[index % contacts.length].id,
      title: event.title,
      description: event.time,
      type: (["request", "document", "signature", "payment", "message", "security"] as const)[index % 6],
    })),
    "title",
  );

  console.log("Seeded platform data: 8 services, 24 contracts, 8 legal forms, 30 FAQs, 50 requests, 40 documents, 20 contacts, 12 templates, 20 signatures, 10 workflows, 10 payments, 20 messages, 30 activity events.");
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
