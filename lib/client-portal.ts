import { sampleServiceRequests } from "@/lib/service-requests";
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

export type ClientContract = {
  id: string;
  title: string;
  category: string;
  purchaseDate: string;
  status: "active" | "ready" | "expired" | "draft";
};

export type ClientFile = {
  id: string;
  filename: string;
  type: string;
  uploadDate: string;
  size: string;
};

export type ClientPayment = {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "cancelled";
};

export type ClientMessage = {
  id: string;
  sender: "client" | "legal";
  senderName: string;
  message: string;
  timestamp: string;
};

export type ClientActivity = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "message" | "request" | "contract" | "payment" | "file";
};

export const currentClientProfile: ClientProfileData = {
  id: "client-1",
  avatar: "",
  fullName: "علی محمدی",
  phone: "0912 345 6789",
  email: "ali.mohammadi@gmail.com",
  nationalCode: "۰۰۱۲۳۴۵۶۷۸",
  address: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲",
  completion: 82,
};

export const clientRequests: ServiceRequestData[] = sampleServiceRequests
  .slice(0, 20)
  .map((request, index) => ({
    ...request,
    id: `client-request-${index + 1}`,
    fullName: currentClientProfile.fullName,
    phone: currentClientProfile.phone,
    email: currentClientProfile.email,
    requestNumber: `REQ-1405-${String(12 - index).padStart(6, "0")}`,
  }));

export const clientContracts: ClientContract[] = [
  "قرارداد اجاره ملک",
  "قرارداد استخدام کارمند",
  "قرارداد مشارکت در ساخت",
  "قرارداد خرید و فروش خودرو",
  "قرارداد محرمانگی اطلاعات",
  "قرارداد پیمانکاری ساختمان",
  "قرارداد فروش سهام",
  "قرارداد نمایندگی فروش",
  "قرارداد مشاوره حقوقی",
  "قرارداد صلح و سازش",
].map((title, index) => ({
  id: `contract-${index + 1}`,
  title,
  category: index % 2 ? "حقوقی" : "تجاری",
  purchaseDate: `۱۴۰۵/۰${(index % 6) + 1}/${String(10 + index).padStart(2, "0")}`,
  status: (
    ["ready", "active", "draft", "expired"] as ClientContract["status"][]
  )[index % 4],
}));

export const clientFiles: ClientFile[] = Array.from(
  { length: 14 },
  (_, index) => ({
    id: `file-${index + 1}`,
    filename: [
      "کارت-ملی.pdf",
      "قرارداد-امضا-شده.pdf",
      "رسید-پرداخت.jpg",
      "مدارک-مالکیت.zip",
    ][index % 4],
    type: ["PDF", "PDF", "JPG", "ZIP"][index % 4],
    uploadDate: `۱۴۰۵/۰${(index % 6) + 1}/${String(12 + index).padStart(2, "0")}`,
    size: [
      `${420 + index * 18} کیلوبایت`,
      "۲.۴ مگابایت",
      "۹۸۰ کیلوبایت",
      "۴.۸ مگابایت",
    ][index % 4],
  }),
);

export const clientPayments: ClientPayment[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `payment-${index + 1}`,
    invoiceNumber: `INV-1405-${String(index + 1).padStart(5, "0")}`,
    date: `۱۴۰۵/۰${(index % 6) + 1}/${String(8 + index).padStart(2, "0")}`,
    amount: `${(index + 2) * 750_000} تومان`,
    status: (
      ["paid", "pending", "paid", "cancelled"] as ClientPayment["status"][]
    )[index % 4],
  }),
);

export const clientMessages: ClientMessage[] = Array.from(
  { length: 20 },
  (_, index) => ({
    id: `message-${index + 1}`,
    sender: index % 2 ? "client" : "legal",
    senderName:
      index % 2 ? currentClientProfile.fullName : "تیم حقوقی وکیل‌یار",
    message:
      index % 2
        ? "سلام، مدارک جدید را بارگذاری کردم. لطفا بررسی کنید."
        : "سلام، بروزرسانی جدید پرونده در داشبورد شما ثبت شد.",
    timestamp: `${index + 1} ساعت پیش`,
  }),
);

export const clientActivities: ClientActivity[] = Array.from(
  { length: 20 },
  (_, index) => {
    const titles = [
      "پاسخ جدید دریافت شد",
      "درخواست بروزرسانی شد",
      "قرارداد آماده دانلود شد",
      "پرداخت تایید شد",
      "فایل جدید ثبت شد",
    ];
    const types = [
      "message",
      "request",
      "contract",
      "payment",
      "file",
    ] as ClientActivity["type"][];
    return {
      id: `activity-${index + 1}`,
      title: titles[index % titles.length],
      description: `رویداد شماره ${index + 1} در پنل مشتری شما ثبت شد.`,
      timestamp: index < 3 ? `${index + 1} ساعت پیش` : `${index} روز پیش`,
      type: types[index % types.length],
    };
  },
);

const requestStatusOrder: RequestStatus[] = [
  "reviewing",
  "in_progress",
  "waiting_for_client",
  "completed",
  "cancelled",
];

export function getClientDashboardData() {
  const requests = clientRequests;
  const requestStatus = requestStatusOrder.map((status) => ({
    status,
    value:
      requests.filter((request) => request.status === status).length ||
      (status === "reviewing" ? 3 : status === "completed" ? 3 : 2),
  }));

  return {
    profile: currentClientProfile,
    requests,
    contracts: clientContracts,
    files: clientFiles,
    payments: clientPayments,
    messages: clientMessages,
    activities: clientActivities,
    requestStatus,
    kpis: [
      {
        label: "درخواست‌های من",
        value: requests.length,
        hint: "در کل",
        icon: "briefcase",
      },
      {
        label: "در حال پیگیری",
        value: requests.filter((request) => request.status === "in_progress")
          .length,
        hint: "فعال",
        icon: "clock",
      },
      {
        label: "تکمیل شده",
        value: requests.filter((request) => request.status === "completed")
          .length,
        hint: "موفقیت‌آمیز",
        icon: "check",
      },
      {
        label: "قراردادهای من",
        value: clientContracts.length,
        hint: "در کل",
        icon: "document",
      },
      { label: "پرونده‌های من", value: 4, hint: "فعال", icon: "folder" },
    ],
  };
}

export function getClientRequestById(id: string) {
  return (
    clientRequests.find(
      (request) => request.id === id || request.requestNumber === id,
    ) ?? null
  );
}
