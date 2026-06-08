import type { Metadata } from "next";
import { ThemeScript } from "@/components/site/ThemeScript";
import { getSiteSettings } from "@/lib/cms";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.siteTitle || settings.logoText;
  const description = settings.seoDescription || settings.detailedDescription;

  return {
    title: {
      default: title,
      template: `%s | ${settings.logoText || title}`,
    },
    description,
    icons: settings.siteIcon
      ? {
          icon: [{ url: settings.siteIcon }],
          shortcut: [{ url: settings.siteIcon }],
          apple: [{ url: settings.siteIcon }],
        }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
