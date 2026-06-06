import { redirect } from "next/navigation";

export default function DashboardTemplatesRedirectPage() {
  redirect("/dashboard/contracts");
}
