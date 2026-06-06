import { redirect } from "next/navigation";

export default function DashboardCasesRedirectPage() {
  redirect("/dashboard/requests");
}
