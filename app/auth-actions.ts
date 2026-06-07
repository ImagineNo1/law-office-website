"use server";

import { redirect } from "next/navigation";
import { clearClientSession } from "@/lib/client-auth";

export async function clientLogoutAction() {
  await clearClientSession();
  redirect("/login");
}
