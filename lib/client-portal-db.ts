import { notFound } from "next/navigation";
import { connectDb } from "@/lib/db";
import { requireClient, type CurrentClient } from "@/lib/client-auth";
import { formatRequestDate, requestStatuses } from "@/lib/service-requests";
import { ClientContract } from "@/models/ClientContract";
import { ClientFile } from "@/models/ClientFile";
import { ClientMessage } from "@/models/ClientMessage";
import { ClientProfile } from "@/models/ClientProfile";
import { ClientUser } from "@/models/ClientUser";
import { Payment } from "@/models/Payment";
import { ServiceRequest } from "@/models/ServiceRequest";
import type { RequestStatus, ServiceRequestData } from "@/types";

export type ClientProfileData = {
  id: string;
  avatar: string;
  fullName: string;
  phone: string;
  email: string;
  nationalCode: string;
  address: string;
  completion: number;
};

export type ClientContractRecord = {
  id: string;
  title: string;
  category: string;
  purchaseDate: string;
  status: "active" | "ready" | "expired" | "draft";
  fileUrl: string;
};

export type ClientFileRecord = {
  id: string;
  filename: string;
  type: string;
  uploadDate: string;
  size: string;
  fileUrl: string;
  previewUrl: string;
};

export type ClientPaymentRecord = {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed" | "refunded" | "cancelled";
};

export type ClientMessageRecord = {
  id: string;
  sender: "client" | "admin";
  senderName: string;
  message: string;
  timestamp: string;
  createdAt: string;
  threadId: string;
  threadTitle: string;
};

export type ClientActivity = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "message" | "request" | "contract" | "payment" | "file";
};

type LeanRequest = {
  _id?: unknown;
  requestNumber: string;
  fullName: string;
  phone: string;
  email?: string | null;
  serviceSlug: string;
  serviceTitle: string;
  subject: string;
  description: string;
  priority: ServiceRequestData["priority"];
  status: RequestStatus;
  assignedTo?: string | null;
  adminNotes?: {
    _id?: unknown;
    author: string;
    message: string;
    createdAt?: Date | string;
  }[];
  attachments?: {
    _id?: unknown;
    filename: string;
    size?: string | null;
    uploadedBy?: "client" | "admin";
    uploadedAt?: Date | string;
  }[];
  messages?: {
    _id?: unknown;
    sender: "client" | "admin";
    senderName: string;
    message: string;
    avatar?: string | null;
    createdAt?: Date | string;
  }[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

function asIso(value: Date | string | undefined) {
  if (!value) return new Date().toISOString();
  return new Date(value).toISOString();
}

function idOf(value: unknown, fallback: string) {
  return value && typeof value === "object" && "toString" in value
    ? String(value)
    : fallback;
}

function completion(profile: ClientProfileData) {
  const fields = [
    profile.fullName,
    profile.phone,
    profile.email,
    profile.nationalCode,
    profile.address,
  ];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

function money(amount: number) {
  return `${new Intl.NumberFormat("fa-IR").format(amount)} تومان`;
}

function toRequest(doc: LeanRequest): ServiceRequestData {
  return {
    id: idOf(doc._id, doc.requestNumber),
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
    adminNotes: (doc.adminNotes ?? []).map((note) => ({
      id: idOf(note._id, asIso(note.createdAt)),
      author: note.author,
      message: note.message,
      createdAt: asIso(note.createdAt),
    })),
    attachments: (doc.attachments ?? []).map((attachment) => ({
      id: idOf(attachment._id, attachment.filename),
      filename: attachment.filename,
      size: attachment.size ?? "",
      uploadedBy: attachment.uploadedBy ?? "client",
      uploadedAt: asIso(attachment.uploadedAt),
    })),
    messages: (doc.messages ?? []).map((message) => ({
      id: idOf(message._id, asIso(message.createdAt)),
      sender: message.sender,
      senderName: message.senderName,
      message: message.message,
      avatar: message.avatar ?? "",
      createdAt: asIso(message.createdAt),
    })),
    createdAt: asIso(doc.createdAt),
    updatedAt: asIso(doc.updatedAt ?? doc.createdAt),
  };
}

function clientRequestQuery(client: CurrentClient) {
  return {
    $or: [
      { clientId: client.id },
      { clientId: { $in: [null, ""] }, phone: client.phone },
      ...(client.email
        ? [{ clientId: { $in: [null, ""] }, email: client.email }]
        : []),
    ],
  };
}

export async function getClientProfileData(
  client?: CurrentClient,
): Promise<ClientProfileData> {
  client ??= await requireClient();
  await connectDb();
  const profile = await ClientProfile.findOne({ clientId: client.id }).lean<{
    avatar?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    nationalCode?: string;
    address?: string;
  }>();

  const data: ClientProfileData = {
    id: client.id,
    avatar: profile?.avatar ?? client.avatar,
    fullName: profile?.fullName ?? client.fullName,
    phone: profile?.phone ?? client.phone,
    email: profile?.email ?? client.email,
    nationalCode: profile?.nationalCode ?? client.nationalCode,
    address: profile?.address ?? "",
    completion: 0,
  };
  data.completion = completion(data);
  return data;
}

export async function getClientRequests(
  client?: CurrentClient,
  filters?: { q?: string; status?: string },
) {
  client ??= await requireClient();
  await connectDb();
  const query: Record<string, unknown> = clientRequestQuery(client);
  if (
    filters?.status &&
    requestStatuses.includes(filters.status as RequestStatus)
  ) {
    query.status = filters.status;
  }
  if (filters?.q) {
    const regex = new RegExp(
      filters.q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i",
    );
    query.$and = [
      {
        $or: [
          { requestNumber: regex },
          { serviceTitle: regex },
          { subject: regex },
        ],
      },
    ];
  }
  const docs = await ServiceRequest.find(query)
    .sort({ createdAt: -1 })
    .lean<LeanRequest[]>();
  return docs.map(toRequest);
}

export async function getClientRequestById(id: string, client?: CurrentClient) {
  client ??= await requireClient();
  await connectDb();
  const ownQuery = clientRequestQuery(client);
  const identity = id.startsWith("REQ-") ? { requestNumber: id } : { _id: id };
  const doc = await ServiceRequest.findOne({
    $and: [ownQuery, identity],
  }).lean<LeanRequest>();
  return doc ? toRequest(doc) : null;
}

export async function requireClientRequest(id: string) {
  const request = await getClientRequestById(id);
  if (!request) notFound();
  return request;
}

export async function getClientContracts(client?: CurrentClient) {
  client ??= await requireClient();
  await connectDb();
  const docs = await ClientContract.find({ clientId: client.id })
    .sort({ purchasedAt: -1, createdAt: -1 })
    .lean<
      {
        _id: unknown;
        title: string;
        category?: string;
        purchasedAt?: Date | string;
        status: ClientContractRecord["status"];
        fileUrl?: string;
      }[]
    >();
  return docs.map((doc) => ({
    id: idOf(doc._id, doc.title),
    title: doc.title,
    category: doc.category ?? "قرارداد",
    purchaseDate: formatRequestDate(asIso(doc.purchasedAt)),
    status: doc.status,
    fileUrl: doc.fileUrl ?? "",
  }));
}

export async function getClientFiles(client?: CurrentClient) {
  client ??= await requireClient();
  await connectDb();
  const docs = await ClientFile.find({ clientId: client.id })
    .sort({ createdAt: -1 })
    .lean<
      {
        _id: unknown;
        fileName: string;
        fileType?: string;
        fileSize?: string;
        fileUrl?: string;
        previewUrl?: string;
        createdAt?: Date | string;
      }[]
    >();
  return docs.map((doc) => ({
    id: idOf(doc._id, doc.fileName),
    filename: doc.fileName,
    type: doc.fileType ?? "PDF",
    uploadDate: formatRequestDate(asIso(doc.createdAt)),
    size: doc.fileSize ?? "",
    fileUrl: doc.fileUrl ?? "",
    previewUrl: doc.previewUrl ?? "",
  }));
}

export async function getClientPayments(client?: CurrentClient) {
  client ??= await requireClient();
  await connectDb();
  const docs = await Payment.find({ clientId: client.id })
    .sort({ createdAt: -1 })
    .lean<
      {
        _id: unknown;
        invoiceNumber: string;
        amount: number;
        status: ClientPaymentRecord["status"];
        paidAt?: Date | string;
        createdAt?: Date | string;
      }[]
    >();
  return docs.map((doc) => ({
    id: idOf(doc._id, doc.invoiceNumber),
    invoiceNumber: doc.invoiceNumber,
    date: formatRequestDate(asIso(doc.paidAt ?? doc.createdAt)),
    amount: money(doc.amount),
    status: doc.status,
  }));
}

export async function getClientMessages(client?: CurrentClient) {
  client ??= await requireClient();
  await connectDb();
  const docs = await ClientMessage.find({ clientId: client.id })
    .sort({ createdAt: 1 })
    .lean<
      {
        _id: unknown;
        senderType?: "client" | "admin";
        sender?: "client" | "lawyer" | "admin";
        message: string;
        threadId?: string;
        threadTitle?: string;
        createdAt?: Date | string;
      }[]
    >();
  return docs.map((doc) => {
    const sender =
      doc.senderType ?? (doc.sender === "client" ? "client" : "admin");
    return {
      id: idOf(doc._id, asIso(doc.createdAt)),
      sender,
      senderName: sender === "client" ? client.fullName : "تیم حقوقی وکیل‌یار",
      message: doc.message,
      timestamp: formatRequestDate(asIso(doc.createdAt)),
      createdAt: asIso(doc.createdAt),
      threadId: doc.threadId ?? "general",
      threadTitle: doc.threadTitle ?? "گفتگوی پشتیبانی",
    };
  });
}

export async function getClientDashboardSummary() {
  const client = await requireClient();
  const [profile, requests, contracts, files, payments, messages] =
    await Promise.all([
      getClientProfileData(client),
      getClientRequests(client),
      getClientContracts(client),
      getClientFiles(client),
      getClientPayments(client),
      getClientMessages(client),
    ]);

  const requestStatus = requestStatuses.map((status) => ({
    status,
    value: requests.filter((request) => request.status === status).length,
  }));

  return {
    profile,
    requests,
    contracts,
    files,
    payments,
    messages,
    requestStatus,
  };
}

export async function updateClientProfile(input: {
  fullName: string;
  phone: string;
  email: string;
  nationalCode: string;
  address: string;
}) {
  const client = await requireClient();
  await connectDb();
  await ClientUser.findByIdAndUpdate(client.id, {
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    nationalCode: input.nationalCode,
  });
  await ClientProfile.findOneAndUpdate(
    { clientId: client.id },
    { ...input, clientId: client.id, avatar: client.avatar },
    { upsert: true, runValidators: true },
  );
}

export async function createClientMessage(
  message: string,
  threadTitle = "گفتگوی پشتیبانی",
  threadId?: string,
) {
  const client = await requireClient();
  await connectDb();
  const normalizedThreadId = threadId || `thread-${Date.now()}`;
  await ClientMessage.create({
    clientId: client.id,
    senderType: "client",
    sender: "client",
    message,
    threadId: normalizedThreadId,
    threadTitle,
  });
}

export async function appendClientRequestMessage(
  requestId: string,
  message: string,
) {
  const client = await requireClient();
  await connectDb();
  const request = await getClientRequestById(requestId, client);
  if (!request) notFound();
  await ServiceRequest.updateOne(
    { _id: request.id },
    {
      $push: {
        messages: {
          sender: "client",
          senderName: client.fullName,
          message,
        },
      },
    },
  );
}
