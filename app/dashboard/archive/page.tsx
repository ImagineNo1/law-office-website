import { redirect } from "next/navigation";

export default function DashboardArchiveRedirectPage() {
  redirect("/dashboard/files");
}
