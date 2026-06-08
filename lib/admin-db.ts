import { connectDb } from "@/lib/db";
import { ClientUser } from "@/models/ClientUser";
import { ClientMessage } from "@/models/ClientMessage";
import { ContractTemplate } from "@/models/ContractTemplate";
import { FAQ } from "@/models/FAQ";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { Message } from "@/models/Message";
import { News } from "@/models/News";
import { Post } from "@/models/Post";
import { Service } from "@/models/Service";
import { ServiceRequest } from "@/models/ServiceRequest";
import { User } from "@/models/User";
import type {
  LawyerLicenseType,
  RequestPriority,
  RequestStatus,
  ServiceRequestData,
} from "@/types";
import { lawyerLicenseLabels } from "@/lib/lawyers";

export type PublishStatus = "draft" | "published" | "archived";

function idOf(value: unknown) {
  return String(value ?? "");
}

export function formatAdminDate(value?: Date | string | null) {
  if (!value) return "ثبت نشده";
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

export function formatAdminDateTime(value?: Date | string | null) {
  if (!value) return "ثبت نشده";
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export async function getAdminServices() {
  await connectDb();
  const docs = await Service.find().sort({ order: 1, createdAt: -1 }).lean();
  return docs.map((doc) => ({
    ...doc,
    id: idOf(doc._id),
    createdAtText: formatAdminDate(doc.createdAt),
    updatedAtText: formatAdminDate(doc.updatedAt),
  }));
}

export async function getAdminContracts() {
  await connectDb();
  const docs = await ContractTemplate.find()
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return docs.map((doc) => ({
    ...doc,
    id: idOf(doc._id),
    createdAtText: formatAdminDate(doc.createdAt),
    updatedAtText: formatAdminDate(doc.updatedAt),
  }));
}

export async function getAdminLegalForms() {
  await connectDb();
  const docs = await LegalFormTemplate.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    ...doc,
    id: idOf(doc._id),
    fieldsText: (doc.fields ?? []).join("\n"),
    createdAtText: formatAdminDate(doc.createdAt),
    updatedAtText: formatAdminDate(doc.updatedAt),
  }));
}

export async function getAdminFaqs(filters?: {
  pageSlug?: string;
  pageType?: string;
}) {
  await connectDb();
  const query: Record<string, string> = {};
  if (filters?.pageType) query.pageType = filters.pageType;
  if (filters?.pageSlug) query.pageSlug = filters.pageSlug;
  const docs = await FAQ.find(query)
    .sort({ pageType: 1, order: 1, createdAt: -1 })
    .lean();
  return docs.map((doc) => ({
    ...doc,
    id: idOf(doc._id),
    createdAtText: formatAdminDate(doc.createdAt),
    updatedAtText: formatAdminDate(doc.updatedAt),
  }));
}

export async function getAdminPostById(id: string) {
  await connectDb();
  const doc = await Post.findById(id).lean();
  return doc
    ? {
        ...doc,
        id: idOf(doc._id),
        createdAtText: formatAdminDate(doc.createdAt),
        updatedAtText: formatAdminDate(doc.updatedAt),
        publishedAtText: formatAdminDate(doc.publishedAt),
      }
    : null;
}

export async function getAdminPosts() {
  await connectDb();
  const docs = await Post.find()
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
  return docs.map((doc) => ({
    ...doc,
    id: idOf(doc._id),
    createdAtText: formatAdminDate(doc.createdAt),
    updatedAtText: formatAdminDate(doc.updatedAt),
    publishedAtText: formatAdminDate(doc.publishedAt),
  }));
}

export async function getAdminNewsById(id: string) {
  await connectDb();
  const doc = await News.findById(id).lean();
  return doc
    ? {
        ...doc,
        id: idOf(doc._id),
        createdAtText: formatAdminDate(doc.createdAt),
        updatedAtText: formatAdminDate(doc.updatedAt),
        publishedAtText: formatAdminDate(doc.publishedAt),
      }
    : null;
}

export async function getAdminNews() {
  await connectDb();
  const docs = await News.find()
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
  return docs.map((doc) => ({
    ...doc,
    id: idOf(doc._id),
    createdAtText: formatAdminDate(doc.createdAt),
    updatedAtText: formatAdminDate(doc.updatedAt),
    publishedAtText: formatAdminDate(doc.publishedAt),
  }));
}

export async function getAdminMessages() {
  await connectDb();
  const docs = await Message.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    ...doc,
    id: idOf(doc._id),
    createdAtText: formatAdminDate(doc.createdAt),
  }));
}

export async function getAdminClientConversations() {
  await connectDb();
  const docs = await ClientMessage.find().sort({ createdAt: 1 }).lean<
    {
      _id: unknown;
      clientId: string;
      senderType?: "client" | "admin";
      sender?: "client" | "lawyer" | "admin";
      message: string;
      threadId?: string;
      threadTitle?: string;
      createdAt?: Date | string;
    }[]
  >();
  const clientIds = Array.from(
    new Set(docs.map((doc) => doc.clientId).filter(Boolean)),
  );
  const clients = await ClientUser.find({ _id: { $in: clientIds } })
    .select("fullName phone email")
    .lean();
  const clientMap = new Map(
    clients.map((client) => [String(client._id), client]),
  );
  const groups = new Map<
    string,
    {
      threadId: string;
      threadTitle: string;
      clientId: string;
      clientName: string;
      clientPhone: string;
      messages: {
        id: string;
        sender: "client" | "admin";
        senderName: string;
        message: string;
        createdAtText: string;
      }[];
    }
  >();
  for (const doc of docs) {
    const threadId = doc.threadId ?? "general";
    const key = `${doc.clientId}:${threadId}`;
    const client = clientMap.get(doc.clientId);
    const sender =
      doc.senderType ?? (doc.sender === "client" ? "client" : "admin");
    if (!groups.has(key)) {
      groups.set(key, {
        threadId,
        threadTitle: doc.threadTitle ?? "گفتگوی پشتیبانی",
        clientId: doc.clientId,
        clientName: client?.fullName ?? "کاربر",
        clientPhone: client?.phone ?? "",
        messages: [],
      });
    }
    groups
      .get(key)
      ?.messages.push({
        id: idOf(doc._id),
        sender,
        senderName:
          sender === "client" ? (client?.fullName ?? "کاربر") : "تیم مدیریت",
        message: doc.message,
        createdAtText: formatAdminDate(doc.createdAt),
      });
  }
  return Array.from(groups.values()).sort((a, b) =>
    (b.messages.at(-1)?.id ?? "").localeCompare(a.messages.at(-1)?.id ?? ""),
  );
}

export async function getAdminUsers() {
  await connectDb();
  const [admins, clients] = await Promise.all([
    User.find()
      .select("fullName email role status createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean(),
    ClientUser.find()
      .select(
        "fullName email phone role status nationalCode isLawyer lawyerLicenseType lawyerSpecialties lawyerBio createdAt updatedAt lastLoginAt",
      )
      .sort({ createdAt: -1 })
      .lean(),
  ]);
  return {
    admins: admins.map((doc) => ({
      ...doc,
      id: idOf(doc._id),
      userType: "admin" as const,
      createdAtText: formatAdminDate(doc.createdAt),
    })),
    clients: clients.map((doc) => ({
      ...doc,
      id: idOf(doc._id),
      userType: "client" as const,
      createdAtText: formatAdminDate(doc.createdAt),
      lastLoginAtText: formatAdminDate(doc.lastLoginAt),
    })),
  };
}

type LawyerSource = {
  _id?: unknown;
  fullName: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
  isLawyer?: boolean;
  lawyerLicenseType?: LawyerLicenseType;
  lawyerSpecialties?: string[];
  lawyerBio?: string;
  createdAt?: Date | string;
};

function toLawyer(doc: LawyerSource, source: "admin" | "client") {
  const license = doc.lawyerLicenseType ?? "paye_one";
  return {
    id: idOf(doc._id),
    source,
    fullName: doc.fullName,
    email: doc.email ?? "",
    phone: doc.phone ?? "",
    role: doc.role ?? "",
    status: doc.status ?? "",
    isLawyer: Boolean(doc.isLawyer),
    lawyerLicenseType: license,
    lawyerLicenseLabel: lawyerLicenseLabels[license],
    lawyerSpecialties: doc.lawyerSpecialties ?? [],
    lawyerBio: doc.lawyerBio ?? "",
    createdAtText: formatAdminDate(doc.createdAt),
  };
}

export async function getAdminLawyers() {
  await connectDb();
  const [admins, clients] = await Promise.all([
    User.find()
      .select(
        "fullName email role status isLawyer lawyerLicenseType lawyerSpecialties lawyerBio createdAt",
      )
      .sort({ isLawyer: -1, createdAt: -1 })
      .lean<LawyerSource[]>(),
    ClientUser.find()
      .select(
        "fullName email phone role status isLawyer lawyerLicenseType lawyerSpecialties lawyerBio createdAt",
      )
      .sort({ isLawyer: -1, createdAt: -1 })
      .lean<LawyerSource[]>(),
  ]);
  return [
    ...admins.map((doc) => toLawyer(doc, "admin" as const)),
    ...clients.map((doc) => toLawyer(doc, "client" as const)),
  ];
}

export async function getAssignableLawyers() {
  return (await getAdminLawyers()).filter((lawyer) => lawyer.isLawyer);
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
  assignedLawyerId?: string;
  assignedTo?: string;
  adminNotes?: {
    _id?: unknown;
    author: string;
    message: string;
    createdAt?: Date | string;
  }[];
  attachments?: {
    _id?: unknown;
    filename: string;
    size?: string;
    url?: string;
    uploadedBy?: "client" | "admin";
    uploadedAt?: Date | string;
  }[];
  messages?: {
    _id?: unknown;
    sender: "client" | "admin";
    senderName: string;
    message: string;
    avatar?: string;
    createdAt?: Date | string;
  }[];
  timeline?: {
    _id?: unknown;
    title: string;
    description?: string;
    actor?: string;
    type?:
      | "created"
      | "status"
      | "assignment"
      | "message"
      | "note"
      | "attachment";
    at?: Date | string;
  }[];
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
    assignedLawyerId: doc.assignedLawyerId ?? "",
    assignedTo: doc.assignedTo ?? "در انتظار تخصیص",
    adminNotes: (doc.adminNotes ?? []).map((note) => ({
      id: idOf(note._id),
      author: note.author,
      message: note.message,
      createdAt: iso(note.createdAt),
    })),
    attachments: (doc.attachments ?? []).map((file) => ({
      id: idOf(file._id),
      filename: file.filename,
      size: file.size ?? "",
      url: file.url ?? "",
      uploadedBy: file.uploadedBy ?? "client",
      uploadedAt: iso(file.uploadedAt),
    })),
    messages: (doc.messages ?? []).map((message) => ({
      id: idOf(message._id),
      sender: message.sender,
      senderName: message.senderName,
      message: message.message,
      avatar: message.avatar ?? "",
      createdAt: iso(message.createdAt),
    })),
    timeline: (doc.timeline ?? []).map((event) => ({
      id: idOf(event._id),
      title: event.title,
      description: event.description ?? "",
      actor: event.actor ?? "",
      type: event.type ?? "created",
      at: iso(event.at),
    })),
    createdAt: iso(doc.createdAt),
    updatedAt: iso(doc.updatedAt),
  };
}

export async function getAdminRequests(filters?: {
  priority?: string;
  q?: string;
  status?: string;
}) {
  await connectDb();
  const query: Record<string, unknown> = {};
  if (filters?.status) query.status = filters.status;
  if (filters?.priority) query.priority = filters.priority;
  if (filters?.q) {
    const regex = new RegExp(
      filters.q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i",
    );
    query.$or = [
      { requestNumber: regex },
      { fullName: regex },
      { phone: regex },
      { serviceTitle: regex },
      { subject: regex },
    ];
  }
  const docs = await ServiceRequest.find(query)
    .sort({ createdAt: -1 })
    .lean<LeanRequest[]>();
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
  const [
    requests,
    services,
    contracts,
    forms,
    faqs,
    posts,
    news,
    messages,
    admins,
    clients,
  ] = await Promise.all([
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
  return {
    requests,
    services,
    contracts,
    forms,
    faqs,
    posts,
    news,
    messages,
    users: admins + clients,
  };
}
