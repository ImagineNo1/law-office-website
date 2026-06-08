"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { connectDb } from "@/lib/db";
import { createClientSession, safeClientNext } from "@/lib/client-auth";
import { ClientProfile } from "@/models/ClientProfile";
import { ClientUser } from "@/models/ClientUser";

function normalizePhone(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/\s+/g, "")
    .trim();
}

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function errorRedirect(path: string, message: string, next: string): never {
  redirect(
    `${path}?error=${encodeURIComponent(message)}&next=${encodeURIComponent(next)}`,
  );
}

function validEmail(email: string) {
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function loginClientAction(formData: FormData) {
  const identifier = String(formData.get("identifier") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeClientNext(formData.get("next"));

  if (!identifier || !password) {
    errorRedirect("/login", "اطلاعات وارد شده معتبر نیست", next);
  }

  await connectDb();
  const query = identifier.includes("@")
    ? { email: identifier }
    : { phone: identifier.replace(/\s+/g, "") };

  const user = await ClientUser.findOne(query);
  if (!user || !["client", "user"].includes(user.role)) {
    errorRedirect("/login", "اطلاعات وارد شده معتبر نیست", next);
  }

  if (user.status !== "active") {
    errorRedirect("/login", "حساب کاربری شما غیرفعال است", next);
  }

  const passwordOk = await bcrypt.compare(password, user.passwordHash);
  if (!passwordOk) {
    errorRedirect("/login", "اطلاعات وارد شده معتبر نیست", next);
  }

  user.lastLoginAt = new Date();
  await user.save();
  await createClientSession(String(user._id));
  redirect(next);
}

export async function signupClientAction(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = normalizePhone(formData.get("phone"));
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const next = safeClientNext(formData.get("next"));

  if (
    fullName.length < 3 ||
    phone.length < 8 ||
    !validEmail(email) ||
    password !== confirmPassword
  ) {
    errorRedirect("/signup", "اطلاعات وارد شده معتبر نیست", next);
  }

  if (password.length < 8) {
    errorRedirect("/signup", "رمز عبور باید حداقل ۸ کاراکتر باشد", next);
  }

  await connectDb();

  const duplicatePhone = await ClientUser.exists({ phone });
  if (duplicatePhone) {
    errorRedirect("/signup", "شماره تماس قبلاً ثبت شده است", next);
  }

  if (email) {
    const duplicateEmail = await ClientUser.exists({ email });
    if (duplicateEmail) {
      errorRedirect("/signup", "ایمیل قبلاً ثبت شده است", next);
    }
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await ClientUser.create({
    fullName,
    phone,
    email,
    passwordHash,
    role: "client",
    status: "active",
  });

  await ClientProfile.findOneAndUpdate(
    { clientId: String(user._id) },
    {
      clientId: String(user._id),
      fullName,
      phone,
      email,
      nationalCode: "",
      address: "",
      avatar: "",
    },
    { upsert: true, runValidators: true },
  );

  await createClientSession(String(user._id));
  redirect(next);
}
