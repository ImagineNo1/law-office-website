import "server-only";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";

const DEFAULT_ADMIN_EMAIL = "admin@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "admin";

let ensurePromise: Promise<void> | null = null;

async function createDefaultAdminIfNeeded() {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  await connectDb();

  const existingAdmin = await User.exists({ role: "admin" });
  if (existingAdmin) {
    return;
  }

  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);

  await User.create({
    fullName: "مدیر سیستم",
    email: DEFAULT_ADMIN_EMAIL,
    passwordHash,
    role: "admin",
    status: "active",
  });

  console.warn(
    "Default admin user created: admin@gmail.com / admin. Please change this password.",
  );
}

export async function ensureDefaultAdmin() {
  ensurePromise ??= createDefaultAdminIfNeeded().finally(() => {
    ensurePromise = null;
  });

  return ensurePromise;
}
