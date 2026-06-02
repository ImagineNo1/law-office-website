import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "موسسه حقوقی عدالت گستر",
    template: "%s | موسسه حقوقی عدالت گستر",
  },
  description: "وب سایت و پنل مدیریت موسسه حقوقی عدالت گستر با خدمات تخصصی و مشاوره حقوقی.",
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
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
