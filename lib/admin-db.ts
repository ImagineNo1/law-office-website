import { connectDb } from "@/lib/db";
import { ClientUser } from "@/models/ClientUser";
import { ContractTemplate } from "@/models/ContractTemplate";
import { FAQ } from "@/models/FAQ";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { Message } from "@/models/Message";
import { News } from "@/models/News";
import { Post } from "@/models/Post";
import { Service } from "@/models/Service";
import { ServiceRequest } from "@/models/ServiceRequest";
import { User } from "@/models/User";
import type { RequestPriority, RequestStatus, ServiceRequestData } from "@/types";

export type PublishStatus = "draft" | "published" | "archived";

function idOf(value: unknown) {
  return String(value ?? "");
}

export function formatAdminDate(value?: Date | string | null) {
  if (!value) return "ثبت نشده";
  return new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}

export async function getAdminServices() {
  await connectDb();
  const docs = await Service.find().sort({ order: 1, createdAt: -1 }).lean();
  return docs.map((doc) => ({ ...doc, id: idOf(doc._id), createdAtText: formatAdminDate(doc.createdAt), updatedAtText: formatAdminDate(doc.updatedAt) }));
}

export async function getAdminContracts() {
  await connectDb();
  const docs = await ContractTemplate.find().sort({ order: 1, createdAt: -1 }).lean();
  return docs.map((doc) => ({ ...doc, id: idOf(doc._id), createdAtText: formatAdminDate(doc.createdAt), updatedAtText: formatAdminDate(doc.updatedAt) }));
}

export async function getAdminLegalForms() {
  await connectDb();
  const docs = await LegalFormTemplate.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({ ...doc, id: idOf(doc._id), fieldsText: (doc.fields ?? []).join("\n"), createdAtText: formatAdminDate(doc.createdAt), updatedAtText: formatAdminDate(doc.updatedAt) }));
}

export async function getAdminFaqs(filters?: { pageSlug?: string; pageType?: string }) {
  await connectDb();
  const query: Record<string, string> = {};
  if (filters?.pageType) query.pageType = filters.pageType;
  if (filters?.pageSlug) query.pageSlug = filters.pageSlug;
  const docs = await FAQ.find(query).sort({ pageType: 1, order: 1, createdAt: -1 }).lean();
  return docs.map((doc) => ({ ...doc, id: idOf(doc._id), createdAtText: formatAdminDate(doc.createdAt), updatedAtText: formatAdminDate(doc.updatedAt) }));
}

export async function getAdminPosts() {
  await connectDb();
  const docs = await Post.find().sort({ publishedAt: -1, createdAt: -1 }).lean();
  return docs.map((doc) => ({ ...doc, id: idOf(doc._id), createdAtText: formatAdminDate(doc.createdAt), updatedAtText: formatAdminDate(doc.updatedAt), publishedAtText: formatAdminDate(doc.publishedAt) }));
}

export async function getAdminNews() {
  await connectDb();
  const docs = await News.find().sort({ publishedAt: -1, createdAt: -1 }).lean();
  return docs.map((doc) => ({ ...doc, id: idOf(doc._id), createdAtText: formatAdminDate(doc.createdAt), updatedAtText: formatAdminDate(doc.updatedAt), publishedAtText: formatAdminDate(doc.publishedAt) }));
}

export async function getAdminMessages() {
  await connectDb();
  const docs = await Message.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({ ...doc, id: idOf(doc._id), createdAtText: formatAdminDate(doc.createdAt) }));
}

export async function getAdminUsers() {
  await connectDb();
  const [admins, clients] = await Promise.all([
    User.find().select("fullName email role status createdAt updatedAt").sort({ createdAt: -1 }).lean(),
    ClientUser.find().select("fullName email phone role status nationalCode createdAt updatedAt lastLoginAt").sort({ createdAt: -1 }).lean(),
  ]);
  return {
    admins: admins.map((doc) => ({ ...doc, id: idOf(doc._id), userType: "admin" as const, createdAtText: formatAdminDate(doc.createdAt) })),
    clients: clients.map((doc) => ({ ...doc, id: idOf(doc._id), userType: "client" as const, createdAtText: formatAdminDate(doc.createdAt), lastLoginAtText: formatAdminDate(doc.lastLoginAt) })),
  };
}

type LeanRequest = {
  _id?: unknown;
  requestNumber: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceSlug: string;
  serviceTitle: string;
  subject: string;
  description: string;
  priority: RequestPriority;
  status: RequestStatus;
  assignedTo?: string;
  adminNotes?: { _id?: unknown; author: string; message: string; createdAt?: Date | string }[];
  attachments?: { _id?: unknown; filename: string; size?: string; uploadedBy?: "client" | "admin"; uploadedAt?: Date | string }[];
  messages?: { _id?: unknown; sender: "client" | "admin"; senderName: string; message: string; avatar?: string; createdAt?: Date | string }[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

function iso(value?: Date | string) {
  return value ? new Date(value).toISOString() : new Date().toISOString();
}

function toRequest(doc: LeanRequest): ServiceRequestData {
  return {
    id: idOf(doc._id),
    requestNumber: doc.requestNumber,
    fullName: doc.fullName,
    phone: doc.phone,
    email: doc.email ?? "",
    serviceSlug: doc.serviceSlug,
    serviceTitle: doc.serviceTitle,
    subject: doc.subject,
    description: doc.description,
    priority: doc.priority,
    status: doc.status,
    assignedTo: doc.assignedTo ?? "در انتظار تخصیص",
    adminNotes: (doc.adminNotes ?? []).map((note) => ({ id: idOf(note._id), author: note.author, message: note.message, createdAt: iso(note.createdAt) })),
    attachments: (doc.attachments ?? []).map((file) => ({ id: idOf(file._id), filename: file.filename, size: file.size ?? "", uploadedBy: file.uploadedBy ?? "client", uploadedAt: iso(file.uploadedAt) })),
    messages: (doc.messages ?? []).map((message) => ({ id: idOf(message._id), sender: message.sender, senderName: message.senderName, message: message.message, avatar: message.avatar ?? "", createdAt: iso(message.createdAt) })),
    createdAt: iso(doc.createdAt),
    updatedAt: iso(doc.updatedAt),
  };
}

export async function getAdminRequests(filters?: { priority?: string; q?: string; status?: string }) {
  await connectDb();
  const query: Record<string, unknown> = {};
  if (filters?.status) query.status = filters.status;
  if (filters?.priority) query.priority = filters.priority;
  if (filters?.q) {
    const regex = new RegExp(filters.q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    query.$or = [{ requestNumber: regex }, { fullName: regex }, { phone: regex }, { serviceTitle: regex }, { subject: regex }];
  }
  const docs = await ServiceRequest.find(query).sort({ createdAt: -1 }).lean<LeanRequest[]>();
  return docs.map(toRequest);
}

export async function getAdminRequestById(id: string) {
  await connectDb();
  const query = id.startsWith("REQ-") ? { requestNumber: id } : { _id: id };
  const doc = await ServiceRequest.findOne(query).lean<LeanRequest>();
  return doc ? toRequest(doc) : null;
}

export async function getAdminDashboardData() {
  await connectDb();
  const [requests, services, contracts, forms, faqs, posts, news, messages, admins, clients] = await Promise.all([
    ServiceRequest.countDocuments(),
    Service.countDocuments(),
    ContractTemplate.countDocuments(),
    LegalFormTemplate.countDocuments(),
    FAQ.countDocuments(),
    Post.countDocuments(),
    News.countDocuments(),
    Message.countDocuments({ status: "unread" }),
    User.countDocuments(),
    ClientUser.countDocuments(),
  ]);
  return { requests, services, contracts, forms, faqs, posts, news, messages, users: admins + clients };
}
