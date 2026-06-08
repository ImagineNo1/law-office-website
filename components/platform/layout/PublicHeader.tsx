import { PublicHeaderClient } from "@/components/platform/layout/PublicHeaderClient";
import { getHeaderAuthState } from "@/lib/header-auth";

export async function PublicHeader() {
  const auth = await getHeaderAuthState();
  return (
    <PublicHeaderClient
      dashboardHref={auth.href}
      isLoggedIn={auth.type !== "guest"}
    />
  );
}
