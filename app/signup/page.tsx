import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClientAuthPage } from "@/components/auth/ClientAuthPage";
import { getCurrentClient } from "@/lib/client-auth";

export const metadata: Metadata = { title: "ثبت‌نام مشتری" };

export default async function SignupPage({ searchParams }: { searchParams?: Promise<{ error?: string; next?: string }> }) {
  const client = await getCurrentClient();
  if (client) redirect("/dashboard");
  const params = searchParams ? await searchParams : undefined;
  return <ClientAuthPage error={params?.error} mode="signup" next={params?.next || "/dashboard"} />;
}
