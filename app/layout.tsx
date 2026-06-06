import type { Metadata } from "next";
import { ThemeScript } from "@/components/site/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "موسسه حقوقی عدالت گستر",
    template: "%s | موسسه حقوقی عدالت گستر",
  },
  description:
    "پلتفرم حقوقی مدرن برای مشاوره، تنظیم قرارداد، پیگیری پرونده و مدیریت محتوای موسسه عدالت گستر.",
};

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
