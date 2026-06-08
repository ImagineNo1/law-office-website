import { PublicHeaderClient } from "@/components/platform/layout/PublicHeaderClient";
import { getHeaderAuthState } from "@/lib/header-auth";
import { getSiteSettings } from "@/lib/cms";

export async function PublicHeader() {
  const [auth, settings] = await Promise.all([
    getHeaderAuthState(),
    getSiteSettings(),
  ]);
  return (
    <PublicHeaderClient
      dashboardHref={auth.href}
      isLoggedIn={auth.type !== "guest"}
      logoText={settings.logoText}
      siteIcon={settings.siteIcon}
    />
  );
}
