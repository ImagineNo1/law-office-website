"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminCookie,
  requireAdmin,
  setAdminCookie,
  signJwt,
} from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { ensureDefaultAdmin } from "@/lib/ensure-default-admin";
import { slugFromTitle } from "@/lib/slug";
import { ContractTemplate } from "@/models/ContractTemplate";
import { FAQ } from "@/models/FAQ";
import { HomeContent } from "@/models/HomeContent";
import { LegalFormTemplate } from "@/models/LegalFormTemplate";
import { Message } from "@/models/Message";
import { News } from "@/models/News";
import { PageContent } from "@/models/PageContent";
import { Post } from "@/models/Post";
import { Service } from "@/models/Service";
import { SiteSettings } from "@/models/SiteSettings";
import { User } from "@/models/User";
import { ClientUser } from "@/models/ClientUser";
import { ClientMessage } from "@/models/ClientMessage";
import { ServiceRequest } from "@/models/ServiceRequest";
import { SEOSettings } from "@/models/SEOSettings";
import { SEORedirect } from "@/models/SEORedirect";
import { scoreSeo } from "@/lib/seo";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function categoryValue(formData: FormData, fallback: string) {
  return (
    text(formData, "category") || text(formData, "categoryPreset") || fallback
  );
}

async function uploadedImageDataUrl(formData: FormData, key: string) {
  const file = formData.get(key);
  if (!(file instanceof File) || !file.name || file.size === 0) return "";
  if (!file.type.startsWith("image/")) return "";
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

async function imageValue(
  formData: FormData,
  textKey: string,
  fileKey: string,
) {
  return (
    (await uploadedImageDataUrl(formData, fileKey)) || text(formData, textKey)
  );
}

function optionalDate(value: string) {
  return value ? new Date(value) : new Date();
}

function publishedStatus(value: string): "draft" | "published" {
  return value === "published" ? "published" : "draft";
}

function userRole(value: string): "super_admin" | "admin" | "user" {
  if (value === "super_admin" || value === "admin") return value;
  return "user";
}

function userStatus(value: string): "active" | "disabled" {
  return value === "disabled" ? "disabled" : "active";
}

function clientStatus(value: string): "active" | "blocked" {
  return value === "blocked" ? "blocked" : "active";
}

function messageStatus(value: string): "unread" | "read" | "archived" {
  if (value === "read" || value === "archived") {
    return value;
  }
  return "unread";
}

function parseFeatures(value: string) {
  return value
    .split("\n")
    .map((line, index) => {
      const [title = "", excerpt = "", icon = "shield", order = String(index)] =
        line.split("|").map((part) => part.trim());
      return { title, excerpt, icon, order: Number(order) || index };
    })
    .filter((item) => item.title);
}

function parseStats(value: string) {
  return value
    .split("\n")
    .map((line, index) => {
      const [
        valueText = "",
        label = "",
        icon = "scale",
        order = String(index),
      ] = line.split("|").map((part) => part.trim());
      return { value: valueText, label, icon, order: Number(order) || index };
    })
    .filter((item) => item.value && item.label);
}

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseFaqItems(value: string) {
  return value
    .split("\n")
    .map((line) => {
      const [question = "", answer = ""] = line
        .split("|")
        .map((part) => part.trim());
      return { question, answer };
    })
    .filter((item) => item.question && item.answer);
}

function parseCsv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseJsonObject(value: string) {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function boolValue(formData: FormData, key: string, fallback = false) {
  const value = formData.get(key);
  if (value === null) return fallback;
  return value === "on" || value === "true" || value === "1";
}

const sitemapFrequencies = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
] as const;

function sitemapFrequency(
  value: string,
  fallback: (typeof sitemapFrequencies)[number],
) {
  return sitemapFrequencies.includes(
    value as (typeof sitemapFrequencies)[number],
  )
    ? (value as (typeof sitemapFrequencies)[number])
    : fallback;
}

function seoPayload(formData: FormData) {
  const seo = {
    metaTitle: text(formData, "seo.metaTitle"),
    metaDescription: text(formData, "seo.metaDescription"),
    keywords: parseCsv(text(formData, "seo.keywords")),
    focusKeyword: text(formData, "seo.focusKeyword"),
    canonicalUrl: text(formData, "seo.canonicalUrl"),
    robotsIndex: boolValue(formData, "seo.robotsIndex", true),
    robotsFollow: boolValue(formData, "seo.robotsFollow", true),
    ogTitle: text(formData, "seo.ogTitle"),
    ogDescription: text(formData, "seo.ogDescription"),
    ogImage: text(formData, "seo.ogImage"),
    twitterTitle: text(formData, "seo.twitterTitle"),
    twitterDescription: text(formData, "seo.twitterDescription"),
    twitterImage: text(formData, "seo.twitterImage"),
    imageAlt: text(formData, "seo.imageAlt"),
    schemaType: text(formData, "seo.schemaType"),
    schemaJson: parseJsonObject(text(formData, "seo.schemaJson")),
    sitemapInclude: boolValue(formData, "seo.sitemapInclude", true),
    sitemapPriority: Math.max(
      0,
      Math.min(1, Number(text(formData, "seo.sitemapPriority")) || 0.7),
    ),
    sitemapChangeFrequency: sitemapFrequency(
      text(formData, "seo.sitemapChangeFrequency"),
      "weekly",
    ),
  };
  const { score, issues } = scoreSeo(
    seo,
    text(formData, "path"),
    text(formData, "title"),
  );
  return { ...seo, seoScore: score, seoNotes: issues };
}

function revalidatePublicContent() {
  [
    "/",
    "/about",
    "/institute",
    "/contact",
    "/services",
    "/contracts",
    "/blog",
    "/news",
  ].forEach((path) => revalidatePath(path));
}

export async function loginAction(formData: FormData) {
  await ensureDefaultAdmin();

  const email = text(formData, "email").toLowerCase();
  const password = text(formData, "password");

  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  await connectDb();
  const user = await User.findOne({ email });

  if (!user || user.status !== "active") {
    redirect("/admin/login?error=invalid");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    redirect("/admin/login?error=invalid");
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = signJwt({
    userId: String(user._id),
    email: user.email,
    role: user.role,
  });
  await setAdminCookie(token);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function savePostAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugFromTitle(title);

  const payload = {
    title,
    slug,
    excerpt: text(formData, "excerpt"),
    content: text(formData, "content"),
    coverImage: await imageValue(formData, "coverImage", "coverImageFile"),
    category: categoryValue(formData, "عمومی"),
    status: publishedStatus(text(formData, "status")),
    publishedAt: optionalDate(text(formData, "publishedAt")),
    seo: seoPayload(formData),
  };

  if (!payload.title || !payload.excerpt || !payload.content) {
    throw new Error("عنوان، خلاصه و محتوا الزامی است.");
  }

  if (id) {
    await Post.findByIdAndUpdate(id, payload, { runValidators: true });
  } else {
    await Post.create(payload);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await Post.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function saveNewsAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugFromTitle(title);
  const payload = {
    title,
    slug,
    excerpt: text(formData, "excerpt"),
    content: text(formData, "content"),
    coverImage: await imageValue(formData, "coverImage", "coverImageFile"),
    category: categoryValue(formData, "عمومی"),
    status: publishedStatus(text(formData, "status")),
    publishedAt: optionalDate(text(formData, "publishedAt")),
    seo: seoPayload(formData),
  };

  if (!payload.title || !payload.excerpt || !payload.content) {
    throw new Error("عنوان، خلاصه و محتوا الزامی است.");
  }

  if (id) {
    await News.findByIdAndUpdate(id, payload, { runValidators: true });
  } else {
    await News.create(payload);
  }

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNewsAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await News.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function saveContractAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const seo = seoPayload(formData);
  const payload = {
    title,
    slug: text(formData, "slug") || slugFromTitle(title),
    category: categoryValue(formData, "ملکی"),
    excerpt: text(formData, "excerpt"),
    content: text(formData, "content"),
    heroImage: text(formData, "heroImage"),
    priceLabel: text(formData, "priceLabel"),
    sampleFileUrl: await imageValue(
      formData,
      "sampleFileUrl",
      "sampleFileUrlFile",
    ),
    useCases: parseLines(text(formData, "useCases")),
    benefits: parseLines(text(formData, "benefits")),
    requiredDocuments: parseLines(text(formData, "requiredDocuments")),
    faqItems: parseFaqItems(text(formData, "faqItems")),
    relatedContracts: parseLines(text(formData, "relatedContracts")),
    status: publishedStatus(text(formData, "status")),
    order: Number(text(formData, "order")) || 0,
    seoTitle: text(formData, "seoTitle") || seo.metaTitle,
    seoDescription: text(formData, "seoDescription") || seo.metaDescription,
    seo,
  };

  if (!payload.title || !payload.excerpt || !payload.category) {
    throw new Error("عنوان، دسته‌بندی و خلاصه قرارداد الزامی است.");
  }

  if (id) {
    await ContractTemplate.findByIdAndUpdate(id, payload, {
      runValidators: true,
    });
  } else {
    await ContractTemplate.create(payload);
  }

  revalidatePath("/admin/contracts");
  revalidatePath("/contracts");
  revalidatePath(`/contracts/${payload.category}/${payload.slug}`);
  revalidatePath("/");
}

export async function deleteContractAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await ContractTemplate.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/contracts");
  revalidatePath("/contracts");
  revalidatePath("/");
}

export async function archiveContractAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await ContractTemplate.findByIdAndUpdate(
    text(formData, "id"),
    { status: "draft" },
    { runValidators: true },
  );
  revalidatePath("/admin/contracts");
  revalidatePath("/contracts");
}

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const seo = seoPayload(formData);
  const payload = {
    title,
    slug: text(formData, "slug") || slugFromTitle(title),
    excerpt: text(formData, "excerpt"),
    content: text(formData, "content"),
    category: categoryValue(formData, "همه خدمات"),
    benefits: parseLines(text(formData, "benefits")),
    processSteps: parseLines(text(formData, "processSteps")),
    requiredDocuments: parseLines(text(formData, "requiredDocuments")),
    faqItems: parseFaqItems(text(formData, "faqItems")),
    priceLabel: text(formData, "priceLabel"),
    heroDescription: text(formData, "heroDescription"),
    heroFeatures: parseLines(text(formData, "heroFeatures")),
    icon: (await imageValue(formData, "icon", "iconFile")) || "scale",
    order: Number(text(formData, "order")) || 0,
    status: publishedStatus(text(formData, "status")),
    seo,
  };

  if (!payload.title || !payload.excerpt) {
    throw new Error("عنوان و خلاصه خدمت الزامی است.");
  }

  if (id) {
    await Service.findByIdAndUpdate(id, payload, { runValidators: true });
  } else {
    await Service.create(payload);
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${payload.slug}`);
  revalidatePath("/institute");
  revalidatePath("/");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await Service.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function archiveServiceAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await Service.findByIdAndUpdate(
    text(formData, "id"),
    { status: "draft" },
    { runValidators: true },
  );
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  await SiteSettings.findOneAndUpdate(
    { key: "site" },
    {
      key: "site",
      siteTitle: text(formData, "siteTitle"),
      siteDescription: text(formData, "siteDescription"),
      logoText: text(formData, "logoText"),
      phone: text(formData, "phone"),
      email: text(formData, "email"),
      address: text(formData, "address"),
      workingHours: text(formData, "workingHours"),
      socialLinks: {
        instagram: text(formData, "instagram"),
        linkedin: text(formData, "linkedin"),
        telegram: text(formData, "telegram"),
      },
      seoTitle: text(formData, "seoTitle"),
      seoDescription: text(formData, "seoDescription"),
    },
    { upsert: true, runValidators: true },
  );

  revalidatePublicContent();
  revalidatePath("/admin/settings");
}

export async function saveSeoAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  const id = text(formData, "id");
  const model = text(formData, "model");
  const type = text(formData, "type");
  const path = text(formData, "path");
  const title = text(formData, "title");
  const seo = seoPayload(formData);

  if (model === "Service") {
    await Service.findByIdAndUpdate(id, { seo }, { runValidators: true });
  } else if (model === "ContractTemplate") {
    await ContractTemplate.findByIdAndUpdate(
      id,
      { seo, seoTitle: seo.metaTitle, seoDescription: seo.metaDescription },
      { runValidators: true },
    );
  } else if (model === "LegalFormTemplate") {
    await LegalFormTemplate.findByIdAndUpdate(
      id,
      { seo },
      { runValidators: true },
    );
  } else if (model === "Post") {
    await Post.findByIdAndUpdate(id, { seo }, { runValidators: true });
  } else if (model === "News") {
    await News.findByIdAndUpdate(id, { seo }, { runValidators: true });
  } else if (model === "FAQ") {
    await FAQ.findByIdAndUpdate(id, { seo }, { runValidators: true });
  } else {
    const key = type === "home" ? "home" : id;
    await PageContent.findOneAndUpdate(
      { key },
      { key, title: title || key, seo },
      { upsert: true, runValidators: true },
    );
  }

  revalidatePublicContent();
  revalidatePath(path || "/");
  revalidatePath("/admin/seo");
}

export async function saveSeoSettingsAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  await SEOSettings.findOneAndUpdate(
    { key: "seo" },
    {
      key: "seo",
      siteName: text(formData, "siteName"),
      defaultMetaTitle: text(formData, "defaultMetaTitle"),
      defaultMetaDescription: text(formData, "defaultMetaDescription"),
      defaultOgImage: text(formData, "defaultOgImage"),
      canonicalBaseUrl:
        text(formData, "canonicalBaseUrl") || "https://vakilyar.vercel.app",
      robotsTxt: text(formData, "robotsTxt"),
      googleSearchConsoleVerification: text(
        formData,
        "googleSearchConsoleVerification",
      ),
      organizationName: text(formData, "organizationName"),
      phone: text(formData, "phone"),
      address: text(formData, "address"),
      logo: text(formData, "logo"),
      socialProfiles: parseLines(text(formData, "socialProfiles")),
      organizationSchema: parseJsonObject(text(formData, "organizationSchema")),
      localBusinessSchema: parseJsonObject(
        text(formData, "localBusinessSchema"),
      ),
    },
    { upsert: true, runValidators: true },
  );

  revalidatePublicContent();
  revalidatePath("/admin/seo");
}

export async function saveSeoRedirectAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const id = text(formData, "id");
  const sourcePath = text(formData, "sourcePath");
  const targetPath = text(formData, "targetPath");
  const statusCode = Number(text(formData, "statusCode")) || 301;

  if (
    !sourcePath.startsWith("/") ||
    (!targetPath.startsWith("/") && !targetPath.startsWith("https://")) ||
    sourcePath === targetPath
  ) {
    throw new Error("مسیر ریدایرکت معتبر نیست.");
  }

  const payload = {
    sourcePath,
    targetPath,
    statusCode,
    enabled: boolValue(formData, "enabled", true),
  };

  if (id) {
    await SEORedirect.findByIdAndUpdate(id, payload, { runValidators: true });
  } else {
    await SEORedirect.findOneAndUpdate({ sourcePath }, payload, {
      upsert: true,
      runValidators: true,
    });
  }

  revalidatePath("/admin/seo");
}

export async function deleteSeoRedirectAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await SEORedirect.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/seo");
}

export async function saveHomeContentAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  await HomeContent.findOneAndUpdate(
    { key: "home" },
    {
      key: "home",
      hero: {
        eyebrow: text(formData, "heroEyebrow"),
        title: text(formData, "heroTitle"),
        description: text(formData, "heroDescription"),
        primaryCtaLabel: text(formData, "primaryCtaLabel"),
        primaryCtaHref: text(formData, "primaryCtaHref"),
        secondaryCtaLabel: text(formData, "secondaryCtaLabel"),
        secondaryCtaHref: text(formData, "secondaryCtaHref"),
        consultationTitle: text(formData, "consultationTitle"),
        consultationText: text(formData, "consultationText"),
      },
      trustFeatures: parseFeatures(text(formData, "trustFeatures")),
      stats: parseStats(text(formData, "stats")),
      contactCta: {
        eyebrow: text(formData, "contactEyebrow"),
        title: text(formData, "contactTitle"),
        description: text(formData, "contactDescription"),
        primaryLabel: text(formData, "contactPrimaryLabel"),
        primaryHref: text(formData, "contactPrimaryHref"),
        secondaryLabel: text(formData, "contactSecondaryLabel"),
        secondaryHref: text(formData, "contactSecondaryHref"),
      },
    },
    { upsert: true, runValidators: true },
  );

  revalidatePath("/");
  revalidatePath("/admin/pages");
}

export async function savePageContentAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  await PageContent.findOneAndUpdate(
    { key: text(formData, "key") },
    {
      key: text(formData, "key"),
      title: text(formData, "title"),
      subtitle: text(formData, "subtitle"),
      content: text(formData, "content"),
      metadata: {},
      seo: seoPayload(formData),
    },
    { upsert: true, runValidators: true },
  );

  revalidatePublicContent();
  revalidatePath("/admin/pages");
}

export async function submitContactMessageAction(formData: FormData) {
  await connectDb();

  const payload = {
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
  };

  if (
    !payload.fullName ||
    !payload.phone ||
    !payload.subject ||
    !payload.message
  ) {
    throw new Error("نام، تلفن، موضوع و پیام الزامی است.");
  }

  await Message.create(payload);
  revalidatePath("/admin/messages");
  redirect("/contact?sent=1");
}

export async function updateMessageStatusAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await Message.findByIdAndUpdate(text(formData, "id"), {
    status: messageStatus(text(formData, "status")),
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessageAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await Message.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function sendAdminClientMessageAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  const clientId = text(formData, "clientId");
  const message = text(formData, "message");
  if (!clientId || !message) return;
  await ClientMessage.create({
    clientId,
    senderType: "admin",
    sender: "admin",
    message,
    threadId: text(formData, "threadId") || "general",
    threadTitle: text(formData, "threadTitle") || "گفتگوی پشتیبانی",
  });
  revalidatePath("/admin/messages");
  revalidatePath("/dashboard/messages");
}

export async function saveUserAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  const id = text(formData, "id");
  const password = text(formData, "password");
  const payload: Record<string, unknown> = {
    fullName: text(formData, "fullName"),
    email: text(formData, "email").toLowerCase(),
    role: userRole(text(formData, "role")),
    status: userStatus(text(formData, "status")),
  };

  if (!payload.fullName || !payload.email) {
    throw new Error("نام و ایمیل الزامی است.");
  }

  if (password) {
    payload.passwordHash = await bcrypt.hash(password, 12);
  }

  if (id) {
    await User.findByIdAndUpdate(id, payload, { runValidators: true });
  } else {
    if (!password) {
      throw new Error("رمز عبور برای کاربر جدید الزامی است.");
    }
    await User.create(payload);
  }

  revalidatePath("/admin/users");
}

export async function saveClientUserAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  const id = text(formData, "id");
  const password = text(formData, "password");
  const payload: Record<string, unknown> = {
    fullName: text(formData, "fullName"),
    phone: text(formData, "phone"),
    email: text(formData, "email").toLowerCase(),
    nationalCode: text(formData, "nationalCode"),
    status: clientStatus(text(formData, "status")),
    role: userRole(text(formData, "role")),
  };
  if (password) payload.passwordHash = await bcrypt.hash(password, 12);
  if (id) {
    await ClientUser.findByIdAndUpdate(id, payload, { runValidators: true });
  } else {
    if (!password) throw new Error("رمز عبور برای کاربر جدید الزامی است.");
    await ClientUser.create(payload);
  }
  revalidatePath("/admin/users");
}

export async function deleteUserAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await User.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/users");
}

export async function deleteClientUserAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await ClientUser.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/users");
}

export async function updateRequestAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await ServiceRequest.findByIdAndUpdate(
    text(formData, "id"),
    {
      status: text(formData, "status"),
      priority: text(formData, "priority"),
      assignedTo: text(formData, "assignedTo"),
    },
    { runValidators: true },
  );
  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${text(formData, "id")}`);
}

export async function addRequestNoteAction(formData: FormData) {
  const user = await requireAdmin();
  await connectDb();
  await ServiceRequest.findByIdAndUpdate(text(formData, "id"), {
    $push: {
      adminNotes: {
        author: user.fullName,
        message: text(formData, "message"),
      },
    },
  });
  revalidatePath(`/admin/requests/${text(formData, "id")}`);
}

export async function addRequestAdminMessageAction(formData: FormData) {
  const user = await requireAdmin();
  await connectDb();
  await ServiceRequest.findByIdAndUpdate(text(formData, "id"), {
    $push: {
      messages: {
        sender: "admin",
        senderName: user.fullName,
        message: text(formData, "message"),
      },
    },
  });
  revalidatePath(`/admin/requests/${text(formData, "id")}`);
}
