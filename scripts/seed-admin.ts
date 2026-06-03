import bcrypt from "bcryptjs";
import { connectDb } from "../lib/db";
import { User } from "../models/User";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const fullName = process.env.ADMIN_NAME?.trim() || "مدیر سایت";

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required for seed:admin.");
  }

  await connectDb();
  const passwordHash = await bcrypt.hash(password, 12);

  await User.findOneAndUpdate(
    { email },
    {
      fullName,
      email,
      passwordHash,
      role: "admin",
      status: "active",
    },
    { upsert: true, runValidators: true },
  );

  console.log(`Admin user is ready: ${email}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
