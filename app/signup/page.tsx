import type { Metadata } from "next";
import { ClientAuthPage } from "@/components/auth/ClientAuthPage";

export const metadata: Metadata = { title: "ثبت نام مشتری" };

export default async function SignupPage({ searchParams }: { searchParams?: Promise<{ next?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  return <ClientAuthPage mode="signup" next={params?.next || "/dashboard"} />;
}
