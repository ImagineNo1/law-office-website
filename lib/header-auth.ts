import { getCurrentUser } from "@/lib/auth";
import { getCurrentClient } from "@/lib/client-auth";

export async function getHeaderAuthState() {
  const admin = await getCurrentUser();
  if (admin) return { href: "/admin", label: "داشبورد", type: "admin" as const };
  const client = await getCurrentClient();
  if (client) return { href: "/dashboard", label: "داشبورد", type: "client" as const };
  return { href: "/login", label: "ورود / ثبت نام", type: "guest" as const };
}
