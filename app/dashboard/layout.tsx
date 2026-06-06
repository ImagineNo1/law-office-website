import type { Metadata } from "next";
import { headers } from "next/headers";
import { requireClientSession } from "@/lib/client-auth";

export const metadata: Metadata = {
  title: "داشبورد مشتری",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "/dashboard";
  await requireClientSession(pathname);
  return children;
}
