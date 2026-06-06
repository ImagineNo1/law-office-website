import type { Metadata } from "next";
import { ClientAuthPage } from "@/components/auth/ClientAuthPage";

export const metadata: Metadata = { title: "ورود مشتری" };

export default async function LoginPage({ searchParams }: { searchParams?: Promise<{ next?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  return <ClientAuthPage mode="login" next={params?.next || "/dashboard"} />;
}
