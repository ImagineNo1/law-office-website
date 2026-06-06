import { connectDb } from "@/lib/db";
import { serviceSamples } from "@/lib/service-data";
import { ServiceRequest } from "@/models/ServiceRequest";
import type {
  RequestPriority,
  RequestStatus,
  ServiceRequestData,
} from "@/types";

const statusLabels: Record<RequestStatus, string> = {
  new: "جدید",
  reviewing: "در انتظار بررسی",
  waiting_for_client: "منتظر مشتری",
  quoted: "اعلام قیمت شده",
  in_progress: "در حال انجام",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
};

const priorityLabels: Record<RequestPriority, string> = {
  low: "پایین",
  medium: "متوسط",
  high: "بالا",
  urgent: "فوری",
};

export const requestStatusLabels = statusLabels;
export const requestPriorityLabels = priorityLabels;

export const requestStatuses = Object.keys(statusLabels) as RequestStatus[];
export const requestPriorities = Object.keys(priorityLabels) as RequestPriority[];

const experts = ["دکتر محمد حسینی", "فاطمه رضایی", "علی محمدی", "سارا مرادی", "مریم جعفری"];
const customers = [
  ["علی محمدی", "ali@example.com"],
  ["فاطمه رضایی", "fateme@example.com"],
  ["حسین احمدی", "hossein@example.com"],
  ["زینب کریمی", "zeinab@example.com"],
  ["محمد حسینی", "mohammad@example.com"],
  ["سارا مرادی", "sara@example.com"],
  ["رضا صادقی", "reza@example.com"],
  ["مریم جعفری", "maryam@example.com"],
  ["نرگس کاظمی", "narges@example.com"],
  ["امیر نادری", "amir@example.com"],
];

function pad(value: number) {
  return String(value).padStart(6, "0");
}

export function generateRequestNumber(index = Date.now() % 999999) {
  return `REQ-1405-${pad(Math.max(1, index))}`;
}

function formatFaDate(date: Date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function dateDaysAgo(days: number) {
  const date = new Date("2026-06-06T09:00:00.000Z");
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

const services = serviceSamples.slice(0, 8);

export const sampleServiceRequests: ServiceRequestData[] = Array.from({ length: 50 }, (_, index) => {
  const id = String(index + 1);
  const service = services[index % services.length];
  const customer = customers[index % customers.length];
  const status = requestStatuses[index % requestStatuses.length];
  const priority = requestPriorities[(index + 1) % requestPriorities.length];
  const createdAt = dateDaysAgo(index % 31);
  const updatedAt = dateDaysAgo(Math.max(0, (index % 31) - 1));
  const expert = experts[index % experts.length];
  const requestNumber = generateRequestNumber(index + 1);

  return {
    id,
    requestNumber,
    fullName: customer[0],
    phone: `0912${String(3450000 + index * 73).slice(0, 7)}`,
    email: customer[1],
    serviceSlug: service.slug ?? `service-${index % services.length}`,
    serviceTitle: service.title,
    subject: `${service.title} برای پرونده ${customer[0]}`,
    description:
      "شرح درخواست شامل بررسی مدارک، پیشنهاد مسیر اقدام و اعلام زمان‌بندی اجرای خدمت است.",
    priority,
    status,
    assignedTo: status === "new" ? "در انتظار تخصیص" : expert,
    adminNotes: [
      {
        id: `${id}-n1`,
        author: expert,
        message: "مدارک اولیه بررسی شد و ریسک‌های اصلی پرونده در کارتابل ثبت گردید.",
        createdAt: updatedAt,
      },
      {
        id: `${id}-n2`,
        author: "مدیر CRM",
        message: "پیگیری تماس بعدی با مشتری برای تکمیل اطلاعات انجام شود.",
        createdAt,
      },
    ],
    attachments: [
      {
        id: `${id}-a1`,
        filename: index % 2 ? "مدارک-شناسایی.pdf" : "قرارداد-نمونه.pdf",
        size: index % 2 ? "۴۸۰ کیلوبایت" : "۲.۱ مگابایت",
        uploadedBy: "client",
        uploadedAt: createdAt,
      },
      {
        id: `${id}-a2`,
        filename: "گزارش-بررسی.docx",
        size: "۲۲۰ کیلوبایت",
        uploadedBy: "admin",
        uploadedAt: updatedAt,
      },
    ],
    messages: [
      {
        id: `${id}-m1`,
        sender: "client",
        senderName: customer[0],
        message: "سلام، درخواست را ثبت کردم. لطفا مدارک لازم را اعلام کنید.",
        createdAt,
      },
      {
        id: `${id}-m2`,
        sender: "admin",
        senderName: expert,
        message: "سلام، مدارک هویتی و مستندات مرتبط را ارسال کنید تا بررسی حقوقی آغاز شود.",
        createdAt: updatedAt,
      },
    ],
    createdAt,
    updatedAt,
  };
});

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
  priority: RequestPriority;
  status: RequestStatus;
  assignedTo?: string | null;
  adminNotes?: { _id?: unknown; author: string; message: string; createdAt?: Date | string }[];
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

function toRequest(doc: LeanRequest): ServiceRequestData {
  return {
    id: String(doc._id ?? doc.requestNumber),
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
      id: String(note._id ?? note.createdAt),
      author: note.author,
      message: note.message,
      createdAt: asIso(note.createdAt),
    })),
    attachments: (doc.attachments ?? []).map((attachment) => ({
      id: String(attachment._id ?? attachment.filename),
      filename: attachment.filename,
      size: attachment.size ?? "",
      uploadedBy: attachment.uploadedBy ?? "client",
      uploadedAt: asIso(attachment.uploadedAt),
    })),
    messages: (doc.messages ?? []).map((message) => ({
      id: String(message._id ?? message.createdAt),
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

function hasDatabase() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getServiceRequests() {
  if (!hasDatabase()) return sampleServiceRequests;

  await connectDb();
  const docs = await ServiceRequest.find().sort({ createdAt: -1 }).lean<LeanRequest[]>();
  return docs.map(toRequest);
}

export async function getServiceRequestById(id: string) {
  if (!hasDatabase()) {
    const request = sampleServiceRequests.find((item) => item.id === id || item.requestNumber === id);
    if (request) return request;
    return id.startsWith("REQ-") ? { ...sampleServiceRequests[0], id, requestNumber: id } : null;
  }

  await connectDb();
  const query = id.startsWith("REQ-") ? { requestNumber: id } : { _id: id };
  const doc = await ServiceRequest.findOne(query).lean<LeanRequest>();
  return doc ? toRequest(doc) : null;
}

export async function createServiceRequest(input: {
  fullName: string;
  phone: string;
  email?: string;
  serviceSlug: string;
  serviceTitle: string;
  subject: string;
  description: string;
  attachmentName?: string;
}) {
  const requestNumber = generateRequestNumber(Math.floor(Date.now() % 1000000));

  if (!hasDatabase()) {
    return { requestNumber };
  }

  await connectDb();
  await ServiceRequest.create({
    ...input,
    requestNumber,
    priority: "medium",
    status: "new",
    assignedTo: "در انتظار تخصیص",
    attachments: input.attachmentName
      ? [{ filename: input.attachmentName, size: "در انتظار بررسی", uploadedBy: "client" }]
      : [],
    messages: [
      {
        sender: "client",
        senderName: input.fullName,
        message: input.description,
      },
    ],
  });

  return { requestNumber };
}

export function formatRequestDate(value: string) {
  return formatFaDate(new Date(value));
}

export function getRequestAnalytics(requests: ServiceRequestData[]) {
  const byStatus = requestStatuses.map((status) => ({
    key: status,
    label: statusLabels[status],
    value: requests.filter((request) => request.status === status).length,
  }));

  const byService = services.slice(0, 6).map((service) => ({
    label: service.title,
    value: requests.filter((request) => request.serviceSlug === service.slug).length,
  }));

  const overTime = Array.from({ length: 7 }, (_, index) => ({
    label: `روز ${index + 1}`,
    value: requests.filter((request) => new Date(request.createdAt).getDate() % 7 === index).length + 4,
  }));

  const monthlyTrends = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"].map((label, index) => ({
    label,
    reviewing: 8 + index * 2,
    progress: 5 + index * 3,
    completed: 4 + index * 4,
  }));

  return { byStatus, byService, overTime, monthlyTrends };
}
