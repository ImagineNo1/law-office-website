"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminCookie, requireAdmin, setAdminCookie, signJwt } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { ensureDefaultAdmin } from "@/lib/ensure-default-admin";
import { slugFromTitle } from "@/lib/slug";
import { HomeContent } from "@/models/HomeContent";
import { Message } from "@/models/Message";
import { News } from "@/models/News";
import { PageContent } from "@/models/PageContent";
import { Post } from "@/models/Post";
import { Service } from "@/models/Service";
import { SiteSettings } from "@/models/SiteSettings";
import { User } from "@/models/User";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalDate(value: string) {
  return value ? new Date(value) : new Date();
}

function publishedStatus(value: string): "draft" | "published" {
  return value === "published" ? "published" : "draft";
}

function userRole(value: string): "admin" | "editor" {
  return value === "admin" ? "admin" : "editor";
}

function userStatus(value: string): "active" | "disabled" {
  return value === "disabled" ? "disabled" : "active";
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
      const [valueText = "", label = "", icon = "scale", order = String(index)] =
        line.split("|").map((part) => part.trim());
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
      const [question = "", answer = ""] = line.split("|").map((part) => part.trim());
      return { question, answer };
    })
    .filter((item) => item.question && item.answer);
}

function revalidatePublicContent() {
  [
    "/",
    "/about",
    "/institute",
    "/contact",
    "/services",
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
    coverImage: text(formData, "coverImage"),
    category: text(formData, "category") || "عمومی",
    status: publishedStatus(text(formData, "status")),
    publishedAt: optionalDate(text(formData, "publishedAt")),
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
    coverImage: text(formData, "coverImage"),
    status: publishedStatus(text(formData, "status")),
    publishedAt: optionalDate(text(formData, "publishedAt")),
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
}

export async function deleteNewsAction(formData: FormData) {
  await requireAdmin();
  await connectDb();
  await News.findByIdAndDelete(text(formData, "id"));
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();
  await connectDb();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const payload = {
    title,
    slug: text(formData, "slug") || slugFromTitle(title),
    excerpt: text(formData, "excerpt"),
    content: text(formData, "content"),
    category: text(formData, "category") || "همه خدمات",
    benefits: parseLines(text(formData, "benefits")),
    processSteps: parseLines(text(formData, "processSteps")),
    requiredDocuments: parseLines(text(formData, "requiredDocuments")),
    faqItems: parseFaqItems(text(formData, "faqItems")),
    priceLabel: text(formData, "priceLabel"),
    heroDescription: text(formData, "heroDescription"),
    heroFeatures: parseLines(text(formData, "heroFeatures")),
    icon: text(formData, "icon") || "scale",
    order: Number(text(formData, "order")) || 0,
    status: publishedStatus(text(formData, "status")),
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

  if (!payload.fullName || !payload.phone || !payload.subject || !payload.message) {
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
