import bcrypt from "bcryptjs";
import { loadEnvConfig } from "@next/env";
import { connectDb } from "../lib/db";
import { ClientContract } from "../models/ClientContract";
import { ClientFile } from "../models/ClientFile";
import { ClientMessage } from "../models/ClientMessage";
import { ClientProfile } from "../models/ClientProfile";
import { ClientUser } from "../models/ClientUser";
import { Payment } from "../models/Payment";
import { ServiceRequest } from "../models/ServiceRequest";

loadEnvConfig(process.cwd());

async function main() {
  await connectDb();

  const passwordHash = await bcrypt.hash("12345678", 12);
  const user = await ClientUser.findOneAndUpdate(
    { phone: "09123456789" },
    {
      fullName: "علی محمدی",
      phone: "09123456789",
      email: "client@example.com",
      passwordHash,
      role: "client",
      status: "active",
      nationalCode: "0012345678",
      avatar: "",
    },
    { upsert: true, new: true, runValidators: true },
  );

  const clientId = String(user._id);

  await Promise.all([
    ClientProfile.findOneAndUpdate(
      { clientId },
      {
        clientId,
        fullName: "علی محمدی",
        phone: "09123456789",
        email: "client@example.com",
        nationalCode: "0012345678",
        address: "تهران، خیابان ولیعصر، پلاک ۱۲",
        avatar: "",
      },
      { upsert: true, runValidators: true },
    ),
    ServiceRequest.deleteMany({ clientId }),
    ClientContract.deleteMany({ clientId }),
    ClientFile.deleteMany({ clientId }),
    ClientMessage.deleteMany({ clientId }),
    Payment.deleteMany({ clientId }),
  ]);

  const now = Date.now();

  await ServiceRequest.insertMany(
    Array.from({ length: 5 }, (_, index) => ({
      clientId,
      requestNumber: `REQ-DEMO-${String(index + 1).padStart(4, "0")}`,
      fullName: "علی محمدی",
      phone: "09123456789",
      email: "client@example.com",
      serviceSlug: ["family", "contracts", "company", "property", "criminal"][index],
      serviceTitle: ["مشاوره خانواده", "تنظیم قرارداد", "امور شرکت‌ها", "دعاوی ملکی", "دفاع کیفری"][index],
      subject: `درخواست حقوقی شماره ${index + 1}`,
      description: "این رکورد فقط برای تست توسعه ایجاد شده و مالک آن کاربر دمو است.",
      priority: (["medium", "high", "urgent", "low", "medium"] as const)[index],
      status: (["new", "reviewing", "in_progress", "waiting_for_client", "completed"] as const)[index],
      assignedTo: index === 0 ? "در انتظار تخصیص" : "تیم حقوقی وکیل‌یار",
      messages: [
        {
          sender: "client",
          senderName: "علی محمدی",
          message: "لطفاً وضعیت این درخواست را بررسی کنید.",
          createdAt: new Date(now - index * 86400000),
        },
      ],
      attachments: index % 2 === 0 ? [{ filename: "مدارک-پرونده.pdf", size: "۲.۱ مگابایت", uploadedBy: "client" }] : [],
    })),
  );

  await ClientContract.insertMany(
    ["قرارداد اجاره ملک", "قرارداد استخدام", "قرارداد محرمانگی اطلاعات"].map((title, index) => ({
      clientId,
      contractTemplateId: `demo-template-${index + 1}`,
      title,
      category: index === 0 ? "ملکی" : "تجاری",
      status: (["ready", "active", "draft"] as const)[index],
      purchasedAt: new Date(now - index * 86400000),
      fileUrl: index < 2 ? `/demo/contracts/${index + 1}.pdf` : "",
    })),
  );

  await ClientFile.insertMany(
    [
      ["کارت-ملی.pdf", "PDF", "۴۲۰ کیلوبایت"],
      ["قرارداد-امضا-شده.pdf", "PDF", "۱.۸ مگابایت"],
      ["رسید-پرداخت.jpg", "JPG", "۹۸۰ کیلوبایت"],
      ["مدارک-مالکیت.zip", "ZIP", "۴.۸ مگابایت"],
    ].map(([fileName, fileType, fileSize], index) => ({
      clientId,
      fileName,
      fileType,
      fileSize,
      fileUrl: `/demo/files/${index + 1}`,
      previewUrl: fileType === "ZIP" ? "" : `/demo/files/${index + 1}/preview`,
    })),
  );

  await ClientMessage.insertMany(
    Array.from({ length: 6 }, (_, index) => ({
      clientId,
      senderType: index % 2 === 0 ? "admin" : "client",
      sender: index % 2 === 0 ? "admin" : "client",
      message: index % 2 === 0 ? "پیام شما دریافت شد و در حال بررسی است." : "سپاس، مدارک تکمیلی ارسال شد.",
      createdAt: new Date(now - (6 - index) * 3600000),
    })),
  );

  await Payment.insertMany(
    Array.from({ length: 4 }, (_, index) => ({
      clientId,
      invoiceNumber: `INV-DEMO-${String(index + 1).padStart(4, "0")}`,
      amount: (index + 2) * 750000,
      status: (["paid", "pending", "paid", "failed"] as const)[index],
      paidAt: index === 1 ? undefined : new Date(now - index * 86400000),
    })),
  );

  console.log("Demo client seeded: client@example.com / 09123456789 / 12345678");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
