import { connectDb } from "@/lib/db";
import {
  activityFeed as fallbackActivityFeed,
  archivedDocuments as fallbackArchivedDocuments,
  contacts as fallbackContacts,
  legalDocuments as fallbackDocuments,
  reportSeries,
  roles,
  securityEvents,
  signatureProvider,
  signatureRequests as fallbackSignatureRequests,
  storageStats as fallbackStorageStats,
  templates as fallbackTemplates,
  toFaNumber,
  workflows as fallbackWorkflows,
  type ContactRecord,
  type DocumentCategory,
  type LegalDocumentRecord,
  type SignatureRequestRecord,
  type TemplateRecord,
  type WorkflowRecord,
} from "@/lib/legaltech-data";
import { ActivityEvent } from "@/models/ActivityEvent";
import { ClientMessage } from "@/models/ClientMessage";
import { Contact } from "@/models/Contact";
import { Document } from "@/models/Document";
import { DocumentTemplate } from "@/models/DocumentTemplate";
import { Payment } from "@/models/Payment";
import { SignatureRequest } from "@/models/SignatureRequest";
import { Workflow } from "@/models/Workflow";

export type DashboardPaymentRecord = {
  id: string;
  clientId: string;
  invoiceNumber: string;
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  paidAt: string;
};

export type { LegalDocumentRecord, SignatureRequestRecord };

export type DashboardMessageRecord = {
  id: string;
  clientId: string;
  sender: "client" | "lawyer" | "admin";
  message: string;
  createdAt: string;
};

export type DashboardActivityRecord = {
  id: string;
  actorId: string;
  title: string;
  description: string;
  type: "request" | "document" | "signature" | "payment" | "message" | "security";
  createdAt: string;
};

export type DashboardStats = {
  totalDocuments: number;
  pendingSignatures: number;
  signedDocuments: number;
  contacts: number;
  templates: number;
  completionRate: number;
  todaySignatures: number;
  monthSignatures: number;
};

export type DashboardData = {
  documents: LegalDocumentRecord[];
  archivedDocuments: LegalDocumentRecord[];
  signatureRequests: SignatureRequestRecord[];
  templates: TemplateRecord[];
  contacts: ContactRecord[];
  workflows: WorkflowRecord[];
  payments: DashboardPaymentRecord[];
  messages: DashboardMessageRecord[];
  activityEvents: DashboardActivityRecord[];
  activityFeed: string[];
  stats: DashboardStats;
  storageStats: typeof fallbackStorageStats;
  reportSeries: typeof reportSeries;
  roles: typeof roles;
  securityEvents: typeof securityEvents;
  signatureProvider: typeof signatureProvider;
};

export const categoryFa: Record<DocumentCategory, string> = {
  Contracts: "قراردادها",
  Petitions: "دادخواست ها",
  Complaints: "شکواییه ها",
  Notices: "اظهارنامه ها",
  Statements: "لوایح",
  "Attorney Documents": "وکالت نامه ها",
  "Corporate Documents": "اسناد شرکتی",
  "Financial Documents": "اسناد مالی",
  Other: "سایر اسناد",
};

function hasDatabase() {
  return Boolean(process.env.MONGODB_URI);
}

function canUseDemoFallback() {
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_DEMO_DATA === "true";
}

function asIso(value: unknown) {
  if (!value) return "";
  return new Date(value as string | Date).toISOString();
}

function asFaDate(value: unknown) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value as string | Date));
}

function idOf(value: unknown, fallback: string) {
  return value && typeof value === "object" && "toString" in value ? String(value) : fallback;
}

async function fromDbOrFallback<T>(query: () => Promise<T[]>, fallback: T[]) {
  if (!hasDatabase()) return canUseDemoFallback() ? fallback : [];
  const rows = await query();
  return rows.length || !canUseDemoFallback() ? rows : fallback;
}

export async function getDashboardDocuments(): Promise<LegalDocumentRecord[]> {
  return fromDbOrFallback(async () => {
    await connectDb();
    const docs = await Document.find().sort({ updatedAt: -1 }).lean();
    return docs.map((doc, index) => ({
      id: idOf(doc._id, `doc-${index + 1}`),
      title: String(doc.title),
      slug: String(doc.slug),
      category: doc.category as DocumentCategory,
      status: doc.status,
      ownerId: String(doc.ownerId),
      fileUrl: String(doc.fileUrl || ""),
      previewImage: String(doc.previewImage || ""),
      description: String(doc.description || ""),
      requiresSignature: Boolean(doc.requiresSignature),
      signatureStatus: doc.signatureStatus,
      createdAt: asFaDate(doc.createdAt),
      updatedAt: asFaDate(doc.updatedAt),
      sizeMb: 1.2,
      tags: [categoryFa[doc.category as DocumentCategory] ?? "سند"],
    }));
  }, fallbackDocuments);
}

export async function getDashboardSignatureRequests(): Promise<SignatureRequestRecord[]> {
  return fromDbOrFallback(async () => {
    await connectDb();
    const docs = await SignatureRequest.find().sort({ sentAt: -1 }).lean();
    const documents = await getDashboardDocuments();
    return docs.map((doc, index) => {
      const document = documents.find((item) => item.id === doc.documentId || item.slug === doc.documentId);
      return {
        id: idOf(doc._id, `signature-${index + 1}`),
        documentId: String(doc.documentId),
        documentTitle: document?.title ?? "سند حقوقی",
        signer: String(doc.signerName),
        email: String(doc.signerEmail),
        status: doc.status === "viewed" ? "pending" : doc.status,
        sentAt: asFaDate(doc.sentAt),
        dueAt: asFaDate(doc.dueAt),
      };
    });
  }, fallbackSignatureRequests);
}

export async function getDashboardTemplates(): Promise<TemplateRecord[]> {
  return fromDbOrFallback(async () => {
    await connectDb();
    const docs = await DocumentTemplate.find().sort({ usageCount: -1 }).lean();
    return docs.map((doc, index) => ({
      id: idOf(doc._id, `template-${index + 1}`),
      title: String(doc.title),
      category: String(doc.category),
      description: String(doc.description || ""),
      usageCount: Number(doc.usageCount || 0),
      lastUsed: String(doc.lastUsed || ""),
      status: doc.status,
    }));
  }, fallbackTemplates);
}

export async function getDashboardContacts(): Promise<ContactRecord[]> {
  return fromDbOrFallback(async () => {
    await connectDb();
    const docs = await Contact.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc, index) => ({
      id: idOf(doc._id, `contact-${index + 1}`),
      fullName: String(doc.fullName),
      email: String(doc.email),
      phone: String(doc.phone || ""),
      organization: String(doc.organization || ""),
      role: String(doc.role || "Client"),
      tags: doc.tags ?? [],
      notes: String(doc.notes || ""),
      avatar: String(doc.avatar || ""),
      group: doc.tags?.[0] ?? "عمومی",
    }));
  }, fallbackContacts);
}

export async function getDashboardWorkflows(): Promise<WorkflowRecord[]> {
  return fromDbOrFallback(async () => {
    await connectDb();
    const docs = await Workflow.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc, index) => {
      const completed = (doc.steps ?? []).filter((step) => step.status === "completed").length;
      const progress = doc.steps?.length ? Math.round((completed / doc.steps.length) * 100) : 0;
      return {
        id: idOf(doc._id, `workflow-${index + 1}`),
        name: String(doc.name),
        steps: (doc.steps ?? []).map((step) => ({ title: step.title, status: step.status })),
        assignedRoles: doc.assignedRoles ?? [],
        status: doc.status,
        progress,
      };
    });
  }, fallbackWorkflows);
}

export async function getDashboardPayments(): Promise<DashboardPaymentRecord[]> {
  return fromDbOrFallback(async () => {
    await connectDb();
    const docs = await Payment.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc, index) => ({
      id: idOf(doc._id, `payment-${index + 1}`),
      clientId: String(doc.clientId),
      invoiceNumber: String(doc.invoiceNumber),
      amount: Number(doc.amount || 0),
      status: doc.status,
      paidAt: asIso(doc.paidAt),
    }));
  }, []);
}

export async function getDashboardMessages(): Promise<DashboardMessageRecord[]> {
  return fromDbOrFallback(async () => {
    await connectDb();
    const docs = await ClientMessage.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc, index) => ({
      id: idOf(doc._id, `message-${index + 1}`),
      clientId: String(doc.clientId),
      sender: doc.sender,
      message: String(doc.message),
      createdAt: asIso(doc.createdAt),
    }));
  }, []);
}

export async function getDashboardActivityEvents(): Promise<DashboardActivityRecord[]> {
  return fromDbOrFallback(async () => {
    await connectDb();
    const docs = await ActivityEvent.find().sort({ createdAt: -1 }).limit(30).lean();
    return docs.map((doc, index) => ({
      id: idOf(doc._id, `activity-${index + 1}`),
      actorId: String(doc.actorId),
      title: String(doc.title),
      description: String(doc.description || ""),
      type: doc.type,
      createdAt: asIso(doc.createdAt),
    }));
  }, fallbackActivityFeed.map((title, index) => ({
    id: `activity-${index + 1}`,
    actorId: "demo",
    title,
    description: "",
    type: "document" as const,
    createdAt: "",
  })));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [documents, signatures, contacts, templates] = await Promise.all([
    getDashboardDocuments(),
    getDashboardSignatureRequests(),
    getDashboardContacts(),
    getDashboardTemplates(),
  ]);
  const signed = signatures.filter((item) => item.status === "signed").length;
  return {
    totalDocuments: documents.length,
    pendingSignatures: signatures.filter((item) => item.status === "pending").length,
    signedDocuments: documents.filter((item) => item.status === "signed").length,
    contacts: contacts.length,
    templates: templates.length,
    completionRate: signatures.length ? Math.round((signed / signatures.length) * 100) : 0,
    todaySignatures: signed,
    monthSignatures: signatures.length,
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const [documents, signatureRequests, templates, contacts, workflows, payments, messages, activityEvents, stats] =
    await Promise.all([
      getDashboardDocuments(),
      getDashboardSignatureRequests(),
      getDashboardTemplates(),
      getDashboardContacts(),
      getDashboardWorkflows(),
      getDashboardPayments(),
      getDashboardMessages(),
      getDashboardActivityEvents(),
      getDashboardStats(),
    ]);
  const archivedDocuments = documents.filter((document) => document.status === "archived");
  const storageStats = {
    ...fallbackStorageStats,
    documents: documents.length,
    files: documents.length,
    breakdown: Object.entries(
      documents.reduce<Record<string, number>>((acc, doc) => {
        const label = categoryFa[doc.category] ?? doc.category;
        acc[label] = (acc[label] ?? 0) + 1;
        return acc;
      }, {}),
    ).map(([label, count], index) => ({
      label,
      count,
      color: ["#C9973F", "#2563EB", "#16A34A", "#EF4444", "#7C3AED", "#F59E0B"][index % 6],
    })),
  };
  return {
    documents,
    archivedDocuments: archivedDocuments.length ? archivedDocuments : (canUseDemoFallback() ? fallbackArchivedDocuments : []),
    signatureRequests,
    templates,
    contacts,
    workflows,
    payments,
    messages,
    activityEvents,
    activityFeed: activityEvents.map((item) => item.title),
    stats,
    storageStats,
    reportSeries,
    roles,
    securityEvents,
    signatureProvider,
  };
}

export { toFaNumber };
