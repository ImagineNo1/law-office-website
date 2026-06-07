import "server-only";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";

const DEFAULT_ADMIN_EMAIL = "admin@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "admin";
const DEFAULT_ADMIN_NAME = "مدیر ارشد سیستم";

let ensurePromise: Promise<void> | null = null;

async function createDefaultAdminIfNeeded() {
  await connectDb();

  const existingSuperAdmin = await User.exists({
    role: "super_admin",
    status: "active",
  });

  if (existingSuperAdmin) {
    return;
  }

  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);

  await User.findOneAndUpdate(
    { email: DEFAULT_ADMIN_EMAIL },
    {
      fullName: DEFAULT_ADMIN_NAME,
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash,
      role: "super_admin",
      status: "active",
    },
    { upsert: true, runValidators: true },
  );

  console.warn(
    "Default super admin user is ready: admin@gmail.com / admin. Please change this password after first login.",
  );
}

export async function ensureDefaultAdmin() {
  ensurePromise ??= createDefaultAdminIfNeeded().finally(() => {
    ensurePromise = null;
  });

  return ensurePromise;
}
