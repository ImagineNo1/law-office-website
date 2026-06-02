import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactInfo } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "ارتباط با ما",
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold text-gold">ارتباط با ما</p>
          <h1 className="mt-3 text-4xl font-black text-foreground">ثبت درخواست مشاوره</h1>
          <div className="mt-8 grid gap-4">
            {Object.entries(contactInfo).map(([key, value]) => (
              <Card className="p-5" key={key}>
                <p className="text-sm text-gold">{key === "phone" ? "تلفن" : key === "email" ? "ایمیل" : key === "address" ? "نشانی" : "ساعات کاری"}</p>
                <p className="mt-2 text-foreground">{value}</p>
              </Card>
            ))}
            <div className="min-h-56 rounded-lg border border-gold/15 bg-[linear-gradient(135deg,rgba(199,151,65,0.16),rgba(13,24,36,0.92))] p-5 text-muted">محدوده نقشه دفتر موسسه</div>
          </div>
        </div>
        <Card className="p-6">
          <form className="grid gap-4">
            <Input label="نام و نام خانوادگی" placeholder="نام شما" />
            <Input label="شماره تماس" placeholder="۰۹۱۲..." />
            <Input label="ایمیل" placeholder="name@example.com" type="email" />
            <Input label="موضوع" placeholder="موضوع درخواست" />
            <Textarea label="شرح درخواست" placeholder="خلاصه موضوع حقوقی خود را بنویسید" />
            <Button type="submit">ارسال پیام</Button>
          </form>
        </Card>
      </section>
      <SiteFooter />
    </main>
  );
}
