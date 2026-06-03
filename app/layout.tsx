import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ThemeScript } from "@/components/site/ThemeScript";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "موسسه حقوقی عدالت گستر",
    template: "%s | موسسه حقوقی عدالت گستر",
  },
  description: "پلتفرم حقوقی مدرن برای مشاوره، پیگیری پرونده و مدیریت محتوای موسسه عدالت گستر.",
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
      className={`${vazirmatn.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
