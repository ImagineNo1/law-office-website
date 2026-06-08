export type DocumentCategory =
  | "Contracts"
  | "Petitions"
  | "Complaints"
  | "Notices"
  | "Statements"
  | "Attorney Documents"
  | "Corporate Documents"
  | "Financial Documents"
  | "Other";

export type DocumentStatus =
  | "draft"
  | "reviewing"
  | "waiting_signature"
  | "signed"
  | "archived"
  | "cancelled";

export type SignatureStatus =
  | "none"
  | "draft"
  | "sent"
  | "viewed"
  | "signed"
  | "rejected"
  | "expired";

export type LegalDocumentRecord = {
  id: string;
  title: string;
  slug: string;
  category: DocumentCategory;
  status: DocumentStatus;
  ownerId: string;
  fileUrl: string;
  previewImage: string;
  description: string;
  requiresSignature: boolean;
  signatureStatus: SignatureStatus;
  createdAt: string;
  updatedAt: string;
  sizeMb: number;
  tags: string[];
};

export type ContactRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  tags: string[];
  notes: string;
  avatar: string;
  group: string;
};

export type TemplateRecord = {
  id: string;
  title: string;
  category: string;
  description: string;
  usageCount: number;
  lastUsed: string;
  status: "active" | "draft" | "archived";
};

export type WorkflowStep = {
  title: string;
  status: "queued" | "active" | "completed" | "blocked";
};

export type WorkflowRecord = {
  id: string;
  name: string;
  steps: WorkflowStep[];
  assignedRoles: string[];
  status: "draft" | "active" | "paused" | "completed";
  progress: number;
};

export type SignatureRequestRecord = {
  id: string;
  documentId: string;
  documentTitle: string;
  signer: string;
  email: string;
  status: "pending" | "signed" | "rejected" | "expired";
  sentAt: string;
  dueAt: string;
};

export type RoleRecord = {
  id: string;
  name: string;
  permissions: string[];
  members: number;
  lastAudit: string;
};

export type SignatureProvider = {
  name: string;
  capabilities: string[];
  createEnvelope: string;
  verifyCallback: string;
  archiveCertificate: string;
};

const categories: DocumentCategory[] = [
  "Contracts",
  "Petitions",
  "Complaints",
  "Notices",
  "Statements",
  "Attorney Documents",
  "Corporate Documents",
  "Financial Documents",
  "Other",
];

const categoryFa: Record<DocumentCategory, string> = {
  Contracts: "قراردادها",
  Petitions: "دادخواست‌ها",
  Complaints: "شکواییه‌ها",
  Notices: "اظهارنامه‌ها",
  Statements: "لوایح",
  "Attorney Documents": "وکالت‌نامه‌ها",
  "Corporate Documents": "اسناد شرکتی",
  "Financial Documents": "اسناد مالی",
  Other: "سایر اسناد",
};

const statuses: DocumentStatus[] = [
  "draft",
  "reviewing",
  "waiting_signature",
  "signed",
  "archived",
  "cancelled",
];

const docTitles = [
  "قرارداد اجاره ملک تجاری",
  "قرارداد استخدام کارمند",
  "قرارداد مشارکت در ساخت",
  "اظهارنامه رسمی مالیاتی",
  "وکالت‌نامه کاری",
  "صورتجلسه هیئت مدیره",
  "دادخواست مطالبه وجه",
  "شکواییه کلاهبرداری",
  "قرارداد محرمانگی اطلاعات",
  "الحاقیه قرارداد پیمانکاری",
];

const people = [
  "دکتر محمد حسینی",
  "سارا رضایی",
  "علی اکبری",
  "شرکت توسعه پارس",
  "موسسه حقوقی داوران",
  "نیلوفر احمدی",
  "امیر کیانی",
  "مهسا شریفی",
  "رضا طاهری",
  "شرکت آتیه سازان",
];

const toFaNumber = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const dateFor = (index: number) =>
  `۱۴۰۳/${toFaNumber(String((index % 9) + 1).padStart(2, "0"))}/${toFaNumber(
    String((index % 27) + 1).padStart(2, "0"),
  )}`;

export const legalDocuments: LegalDocumentRecord[] = Array.from(
  { length: 100 },
  (_, index) => {
    const category = categories[index % categories.length];
    const status = statuses[index % statuses.length];
    const requiresSignature = index % 3 !== 1;
    const signatureStatus: SignatureStatus = requiresSignature
      ? (
          ["sent", "viewed", "signed", "rejected", "draft"] as SignatureStatus[]
        )[index % 5]
      : "none";

    return {
      id: `doc-${index + 1}`,
      title: `${docTitles[index % docTitles.length]} ${toFaNumber(index + 1)}`,
      slug: `document-${index + 1}`,
      category,
      status,
      ownerId: `contact-${(index % 50) + 1}`,
      fileUrl: `/documents/document-${index + 1}.pdf`,
      previewImage: "",
      description: `نسخه عملیاتی ${categoryFa[category]} برای چرخه بررسی، امضا و بایگانی.`,
      requiresSignature,
      signatureStatus,
      createdAt: dateFor(index + 2),
      updatedAt: dateFor(index + 7),
      sizeMb: Number((0.8 + (index % 12) * 0.42).toFixed(1)),
      tags: [
        categoryFa[category],
        requiresSignature ? "نیازمند امضا" : "آرشیوی",
      ],
    };
  },
);

export const contacts: ContactRecord[] = Array.from(
  { length: 50 },
  (_, index) => ({
    id: `contact-${index + 1}`,
    fullName: people[index % people.length],
    email: `client${index + 1}@example.com`,
    phone: `۰۹۱۲${toFaNumber(String(3000000 + index * 731).padStart(7, "0"))}`,
    organization:
      index % 4 === 0
        ? "شرکت توسعه پارس"
        : index % 3 === 0
          ? "وکیل پایه یک"
          : "موکل حقیقی",
    role: ["موکل", "وکیل", "مدیر شرکت", "کارشناس مالی", "نماینده حقوقی"][
      index % 5
    ],
    tags: [
      ["قرارداد", "امضا"],
      ["دعاوی", "فوری"],
      ["شرکتی"],
      ["مالی"],
      ["VIP"],
    ][index % 5],
    notes: "دارای دسترسی کنترل شده به اسناد و گردش کارهای مرتبط.",
    avatar: "",
    group: ["گروه قراردادها", "گروه دعاوی", "گروه شرکتی", "گروه امضای انبوه"][
      index % 4
    ],
  }),
);

const templateNames = [
  "قالب قرارداد پایه",
  "قرارداد استخدام",
  "توافق‌نامه مشارکت",
  "اجاره‌نامه ملک",
  "اظهارنامه رسمی",
  "وکالت‌نامه کاری",
  "قرارداد محرمانگی",
  "صورتجلسه شرکت",
  "دادخواست مطالبه وجه",
  "الحاقیه قرارداد",
];

export const templates: TemplateRecord[] = Array.from(
  { length: 25 },
  (_, index) => ({
    id: `template-${index + 1}`,
    title: templateNames[index % templateNames.length],
    category: categoryFa[categories[index % categories.length]],
    description: "قالب آماده با بندهای هوشمند، جایگاه امضا و متادیتای بایگانی.",
    usageCount: 18 + index * 7,
    lastUsed: dateFor(index + 4),
    status: (
      ["active", "active", "draft", "archived"] as TemplateRecord["status"][]
    )[index % 4],
  }),
);

const workflowNames = [
  "گردش تایید قرارداد",
  "گردش امضای دیجیتال",
  "گردش پذیرش موکل",
  "گردش بررسی پرونده",
];

export const workflows: WorkflowRecord[] = Array.from(
  { length: 20 },
  (_, index) => {
    const progress = [100, 78, 56, 34, 12][index % 5];
    return {
      id: `workflow-${index + 1}`,
      name: `${workflowNames[index % workflowNames.length]} ${toFaNumber(index + 1)}`,
      steps: [
        { title: "ثبت سند", status: "completed" },
        {
          title: "بررسی اولیه",
          status: progress > 30 ? "completed" : "active",
        },
        {
          title: "تایید نهایی",
          status: progress > 55 ? "completed" : "queued",
        },
        {
          title: "ارسال برای امضا",
          status: progress > 75 ? "completed" : "queued",
        },
        { title: "بایگانی", status: progress === 100 ? "completed" : "queued" },
      ],
      assignedRoles: [
        ["Admin", "Lawyer"],
        ["Lawyer", "Client"],
        ["Assistant"],
        ["Paralegal", "Lawyer"],
      ][index % 4],
      status: (
        [
          "completed",
          "active",
          "active",
          "paused",
        ] as WorkflowRecord["status"][]
      )[index % 4],
      progress,
    };
  },
);

export const signatureRequests: SignatureRequestRecord[] = Array.from(
  { length: 50 },
  (_, index) => ({
    id: `signature-${index + 1}`,
    documentId: legalDocuments[index].id,
    documentTitle: legalDocuments[index].title,
    signer: contacts[index % contacts.length].fullName,
    email: contacts[index % contacts.length].email,
    status: (
      [
        "pending",
        "signed",
        "pending",
        "rejected",
        "signed",
      ] as SignatureRequestRecord["status"][]
    )[index % 5],
    sentAt: dateFor(index + 9),
    dueAt: dateFor(index + 13),
  }),
);

export const archivedDocuments = legalDocuments
  .filter((document) => document.status === "archived")
  .slice(0, 20);

export const roles: RoleRecord[] = [
  {
    id: "role-admin",
    name: "Admin",
    permissions: ["مدیریت کامل", "حذف سند", "مدیریت سطح دسترسی", "گزارش‌گیری"],
    members: 3,
    lastAudit: "۲ ساعت پیش",
  },
  {
    id: "role-lawyer",
    name: "Lawyer",
    permissions: ["بررسی سند", "ارسال امضا", "مشاهده پرونده", "ویرایش قالب"],
    members: 12,
    lastAudit: "امروز",
  },
  {
    id: "role-paralegal",
    name: "Paralegal",
    permissions: ["آپلود سند", "برچسب‌گذاری", "آماده‌سازی قالب"],
    members: 7,
    lastAudit: "دیروز",
  },
  {
    id: "role-assistant",
    name: "Assistant",
    permissions: ["افزودن مخاطب", "پیگیری ارسال", "مشاهده گزارش محدود"],
    members: 9,
    lastAudit: "۳ روز پیش",
  },
  {
    id: "role-client",
    name: "Client",
    permissions: ["مشاهده اسناد خود", "امضا", "دانلود گواهی"],
    members: 248,
    lastAudit: "امروز",
  },
];

export const signatureProvider: SignatureProvider = {
  name: "LegalSignatureAdapter",
  capabilities: [
    "Envelope lifecycle",
    "Multi-signer routing",
    "Callback verification",
    "Certificate archival",
    "Provider swappable interface",
  ],
  createEnvelope: "createEnvelope(document, signers, fields)",
  verifyCallback: "verifyWebhookSignature(payload, signature)",
  archiveCertificate: "archiveSignedPdfAndCertificate(envelopeId)",
};

export const storageStats = {
  usedGb: 12.6,
  availableGb: 20,
  files: 854,
  documents: legalDocuments.length,
  percent: 63,
  breakdown: categories.slice(0, 6).map((category, index) => ({
    label: categoryFa[category],
    count: legalDocuments.filter((document) => document.category === category)
      .length,
    color: ["#0F766E", "#2563EB", "#16A34A", "#EF4444", "#7C3AED", "#F59E0B"][
      index
    ],
  })),
};

export const reportSeries = [
  {
    month: "فروردین",
    documents: 34,
    signatures: 24,
    downloads: 88,
    clients: 18,
  },
  {
    month: "اردیبهشت",
    documents: 48,
    signatures: 32,
    downloads: 126,
    clients: 24,
  },
  {
    month: "خرداد",
    documents: 42,
    signatures: 36,
    downloads: 118,
    clients: 27,
  },
  { month: "تیر", documents: 58, signatures: 45, downloads: 142, clients: 31 },
  {
    month: "مرداد",
    documents: 76,
    signatures: 61,
    downloads: 194,
    clients: 43,
  },
  {
    month: "شهریور",
    documents: 66,
    signatures: 54,
    downloads: 171,
    clients: 38,
  },
];

export const activityFeed = [
  "قرارداد اجاره ملک تجاری امضا شد",
  "پاسخ جدیدی به درخواست امضا ارسال شد",
  "فایل جدیدی در پرونده آپلود شد",
  "درخواست جدیدی ثبت شد",
  "سطح دسترسی کاربر ویرایش شد",
  "گواهی امضا در آرشیو ذخیره شد",
];

export const securityEvents = [
  {
    label: "ورود جدید به حساب کاربری",
    detail: "تهران، ایران - ۱۴۰۳/۰۳/۲۶",
    status: "warning",
  },
  {
    label: "امضای سند با موفقیت انجام شد",
    detail: "قرارداد اجاره ملک تجاری",
    status: "success",
  },
  {
    label: "فضای ذخیره‌سازی در حال پر شدن است",
    detail: "۶۳٪ از فضای موجود استفاده شده",
    status: "warning",
  },
];

export function getDashboardMetrics() {
  const pendingSignatures = signatureRequests.filter(
    (item) => item.status === "pending",
  ).length;
  const signedDocuments = legalDocuments.filter(
    (item) => item.status === "signed",
  ).length;
  const completionRate = Math.round(
    (signatureRequests.filter((item) => item.status === "signed").length /
      signatureRequests.length) *
      100,
  );

  return {
    totalDocuments: legalDocuments.length,
    pendingSignatures,
    signedDocuments,
    contacts: contacts.length,
    templates: templates.length,
    completionRate,
    todaySignatures: 18,
    monthSignatures: 147,
  };
}

export { categoryFa, toFaNumber };
