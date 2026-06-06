import Link from "next/link";
import { crmRequests, fa, legalForms, recoveryContracts, recoveryFaqs, recoveryServices } from "@/lib/platform-recovery-data";

export function IconBox({ children }: { children: React.ReactNode }) {
  return <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#F4E9D3] text-[#C9973F]">{children}</span>;
}

export function PageShell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <main className={dark ? "min-h-screen bg-[#071225] text-white" : "min-h-screen bg-[#F7F3EA] text-[#0B172A]"} dir="rtl">{children}</main>;
}

export function PublicHeader() {
  const links = [["خدمات", "/services"], ["بانک قرارداد", "/contracts"], ["فرم‌های حقوقی", "/legal-forms"], ["ثبت درخواست", "/requests/new"], ["داشبورد", "/dashboard"]];
  return (
    <header className="sticky top-0 z-30 border-b border-[#eadfce] bg-white/92 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-[min(1400px,calc(100%-32px))] items-center justify-between gap-4">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#0B172A] text-[#D4A64A]">⚖</span>
          <span><strong className="block text-xl font-black">وکیل یار</strong><span className="text-xs font-bold text-[#66758A]">پلتفرم حقوقی، قرارداد و امضا</span></span>
        </Link>
        <nav className="hidden items-center gap-2 lg:flex">
          {links.map(([label, href]) => <Link className="rounded-xl px-4 py-3 text-sm font-black text-[#17213A] hover:bg-[#F7F3EA] hover:text-[#C9973F]" href={href} key={href}>{label}</Link>)}
        </nav>
        <Link className="rounded-xl bg-[#0B172A] px-5 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(11,23,42,.18)]" href="/requests/new">شروع درخواست</Link>
      </div>
    </header>
  );
}

export function HeroDashboardPreview() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/10 p-4 shadow-[0_30px_90px_rgba(0,0,0,.28)] backdrop-blur">
      <div className="grid gap-3 md:grid-cols-3">
        {["اسناد فعال", "در انتظار امضا", "درخواست‌های CRM"].map((label, index) => (
          <div className="rounded-2xl bg-white p-4 text-[#0B172A]" key={label}>
            <p className="text-xs font-black text-[#66758A]">{label}</p>
            <strong className="mt-3 block text-3xl font-black">{fa([854, 23, 50][index])}</strong>
            <span className="mt-2 block text-xs font-bold text-emerald-600">+{fa(12 + index)}٪ این ماه</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-white p-4 text-[#0B172A]">
        <div className="mb-3 flex items-center justify-between"><strong>اسناد اخیر</strong><span className="text-xs font-black text-[#C9973F]">مشاهده همه</span></div>
        {["قرارداد اجاره ملک تجاری", "قرارداد استخدام کارمند", "اظهارنامه رسمی مالیاتی"].map((item, index) => (
          <div className="grid grid-cols-[1fr_100px_90px] gap-3 border-t border-[#eadfce] py-3 text-sm" key={item}>
            <span className="font-black">{item}</span>
            <span className="font-bold text-[#66758A]">۱۴۰۳/۰۳/{fa(20 + index)}</span>
            <span className="rounded-lg bg-emerald-50 px-2 py-1 text-center text-xs font-black text-emerald-700">امضا شده</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeExperience() {
  return (
    <PageShell dark>
      <PublicHeader />
      <section className="bg-[radial-gradient(circle_at_20%_10%,rgba(212,166,74,.22),transparent_34rem),linear-gradient(135deg,#071225,#0B172A_48%,#17213A)] py-10 lg:py-16">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-[#C9973F]/40 bg-[#C9973F]/15 px-4 py-2 text-sm font-black text-[#D4A64A]">VakilBashi + Daftarkhoone + DocuSign</span>
            <h1 className="mt-6 text-balance text-4xl font-black leading-[1.25] text-white md:text-6xl">پلتفرم کامل خدمات حقوقی، بانک قرارداد و امضای دیجیتال</h1>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-9 text-slate-200">از انتخاب خدمت تا تنظیم قرارداد، ثبت درخواست، مدیریت CRM، پورتال موکل، آرشیو اسناد و ارسال گروهی امضا در یک سامانه حرفه‌ای و فارسی.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link className="rounded-xl bg-[#C9973F] px-6 py-4 text-sm font-black text-white" href="/requests/new">ثبت درخواست جدید</Link><Link className="rounded-xl border border-white/20 px-6 py-4 text-sm font-black text-white" href="/dashboard">ورود به داشبورد</Link></div>
          </div>
          <HeroDashboardPreview />
        </div>
      </section>
      <section className="bg-[#F7F3EA] py-10 text-[#0B172A]">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.07)]">
            <h2 className="text-lg font-black">مسیرهای اصلی</h2>
            <div className="mt-4 grid gap-2">{["خدمات حقوقی", "بانک قرارداد", "فرم‌های حقوقی", "امضای دیجیتال", "پورتال موکل"].map((item) => <span className="rounded-xl border border-[#eadfce] px-4 py-3 text-sm font-black" key={item}>{item}</span>)}</div>
          </aside>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{recoveryServices.map(([title, slug, desc, tag, sla]) => <ServiceTile key={slug} title={title} slug={slug} desc={desc} tag={tag} sla={sla} />)}</div>
        </div>
      </section>
    </PageShell>
  );
}

export function ServiceTile({ title, slug, desc, tag, sla }: { title: string; slug: string; desc: string; tag: string; sla: string }) {
  return (
    <Link className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] transition hover:-translate-y-1 hover:border-[#C9973F]" href={`/services/${slug}`}>
      <div className="flex items-center justify-between"><IconBox>§</IconBox><span className="rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-black text-[#C9973F]">{tag}</span></div>
      <h3 className="mt-5 text-xl font-black">{title}</h3>
      <p className="mt-3 min-h-20 text-sm font-bold leading-7 text-[#66758A]">{desc}</p>
      <div className="mt-5 flex items-center justify-between border-t border-[#eadfce] pt-4 text-xs font-black"><span>{sla}</span><span className="text-[#C9973F]">جزئیات</span></div>
    </Link>
  );
}

export function ServicesExperience({ detailSlug }: { detailSlug?: string }) {
  const service = recoveryServices.find((item) => item[1] === detailSlug) ?? recoveryServices[0];
  return (
    <PageShell>
      <PublicHeader />
      <section className="bg-[#0B172A] py-10 text-white">
        <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 lg:grid-cols-[1fr_360px]">
          <div><span className="text-sm font-black text-[#D4A64A]">مرکز خدمات حقوقی</span><h1 className="mt-3 text-4xl font-black">{detailSlug ? service[0] : "خدمات حقوقی تخصصی"}</h1><p className="mt-4 max-w-2xl text-sm font-bold leading-8 text-slate-200">{detailSlug ? service[2] : "انتخاب، ثبت درخواست، بارگذاری مدارک و پیگیری مرحله‌ای خدمات حقوقی در یک تجربه SaaS فارسی."}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/8 p-5"><h2 className="font-black">وضعیت ظرفیت امروز</h2><div className="mt-4 grid gap-3">{["وکلای آماده پاسخ", "پرونده‌های در صف", "میانگین پاسخ"].map((x, i) => <div className="flex justify-between rounded-xl bg-white/10 p-3 text-sm font-black" key={x}><span>{x}</span><span className="text-[#D4A64A]">{[12, 34, "۲۴ساعت"][i]}</span></div>)}</div></div>
        </div>
      </section>
      <section className="py-8"><div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 lg:grid-cols-[290px_1fr]"><Filters /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{recoveryServices.map(([title, slug, desc, tag, sla]) => <ServiceTile key={slug} title={title} slug={slug} desc={desc} tag={tag} sla={sla} />)}</div></div></section>
      {detailSlug ? <DetailPanels title={service[0]} /> : null}
    </PageShell>
  );
}

function Filters() {
  return <aside className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]"><input className="h-12 w-full rounded-xl border border-[#eadfce] px-4 text-sm font-bold" placeholder="جستجوی خدمت..." /><div className="mt-4 grid gap-2">{["همه خدمات", "قرارداد", "دعاوی", "کیفری", "امضا", "پرونده"].map((item) => <button className="rounded-xl bg-[#F7F3EA] px-4 py-3 text-right text-sm font-black" key={item}>{item}</button>)}</div></aside>;
}

function DetailPanels({ title }: { title: string }) {
  return <section className="pb-10"><div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 lg:grid-cols-[1fr_360px]"><div className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]"><h2 className="text-2xl font-black">فرآیند اجرای {title}</h2><div className="mt-6 grid gap-4">{["ثبت درخواست", "بررسی مدارک", "تهیه پیش‌نویس", "بازبینی موکل", "تحویل و بایگانی"].map((step, index) => <div className="grid grid-cols-[42px_1fr] gap-3" key={step}><span className="grid size-10 place-items-center rounded-full bg-[#C9973F] text-sm font-black text-white">{fa(index + 1)}</span><div className="border-b border-[#eadfce] pb-4"><h3 className="font-black">{step}</h3><p className="mt-1 text-sm font-bold text-[#66758A]">با ثبت وضعیت در کارتابل و اعلان به موکل.</p></div></div>)}</div></div><div className="rounded-2xl bg-[#0B172A] p-6 text-white"><h2 className="text-xl font-black">ثبت سریع درخواست</h2><p className="mt-3 text-sm font-bold leading-7 text-slate-300">مدارک را بارگذاری کنید و مسیر پیگیری را در داشبورد ببینید.</p><Link className="mt-6 flex h-12 items-center justify-center rounded-xl bg-[#C9973F] text-sm font-black" href="/requests/new">شروع ثبت</Link></div></div></section>;
}

export function ContractsExperience() {
  return <PageShell><PublicHeader /><section className="bg-[#0B172A] py-10 text-white"><div className="mx-auto w-[min(1400px,calc(100%-32px))]"><span className="text-sm font-black text-[#D4A64A]">Contract Bank</span><h1 className="mt-3 text-4xl font-black">بانک قراردادهای هوشمند و قابل امضا</h1><p className="mt-4 max-w-2xl text-sm font-bold leading-8 text-slate-200">۲۴ نمونه قرارداد route-backed با کارت‌های متراکم، فیلتر، قیمت، دانلود و مسیر ارسال برای امضای دیجیتال.</p></div></section><section className="py-8"><div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 lg:grid-cols-[280px_1fr]"><Filters /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{recoveryContracts.map((contract) => <ContractCard key={contract.id} contract={contract} />)}</div></div></section></PageShell>;
}

export function ContractCard({ contract }: { contract: (typeof recoveryContracts)[number] }) {
  return <Link className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)] transition hover:-translate-y-1 hover:border-[#C9973F]" href={`/contracts/${contract.category}/${contract.slug}`}><div className="flex items-center justify-between"><IconBox>□</IconBox><span className="rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-black">{contract.category}</span></div><h3 className="mt-5 text-lg font-black">{contract.title}</h3><p className="mt-3 text-sm font-bold leading-7 text-[#66758A]">{contract.description}</p><div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#eadfce] pt-4 text-center text-xs font-black"><span>{contract.price}</span><span>{fa(contract.downloads)} دانلود</span><span>امضا</span></div></Link>;
}

export function LegalFormsExperience({ admin = false }: { admin?: boolean }) {
  return <PageShell><PublicHeader /><section className="py-8"><div className="mx-auto w-[min(1400px,calc(100%-32px))]"><div className="rounded-2xl bg-[#0B172A] p-7 text-white"><h1 className="text-3xl font-black">{admin ? "مدیریت فرم‌های حقوقی" : "فرم‌های حقوقی آماده"}</h1><p className="mt-3 text-sm font-bold text-slate-300">۸ فرم route-backed برای تکمیل، امضا، آرشیو و مدیریت در سامانه.</p></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{legalForms.map((form) => <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={form.id}><IconBox>F</IconBox><h2 className="mt-5 font-black">{form.title}</h2><p className="mt-2 min-h-14 text-sm font-bold leading-7 text-[#66758A]">{form.description}</p><div className="mt-4 flex justify-between text-xs font-black"><span>{fa(form.fields)} فیلد</span><span>{fa(form.usage)} استفاده</span></div></div>)}</div></div></section></PageShell>;
}

export function AdminRequestsExperience() {
  return <PageShell><div className="lg:flex lg:flex-row-reverse"><AdminCrmSidebar /><main className="min-w-0 flex-1 p-5 lg:p-8"><h1 className="text-3xl font-black">CRM حقوقی و مدیریت درخواست‌ها</h1><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{["کل درخواست‌ها", "در بررسی", "در انجام", "در انتظار موکل", "تکمیل شده"].map((label, index) => <div className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={label}><p className="text-sm font-black text-[#66758A]">{label}</p><strong className="mt-3 block text-3xl font-black">{fa([50, 11, 14, 9, 16][index])}</strong></div>)}</div><div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-[0_18px_45px_rgba(11,23,42,.06)]"><div className="flex flex-col gap-3 border-b border-[#eadfce] p-5 lg:flex-row lg:items-center lg:justify-between"><h2 className="text-xl font-black">جدول درخواست‌ها</h2><input className="h-11 rounded-xl border border-[#eadfce] px-4 text-sm font-bold" placeholder="جستجو..." /></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-sm"><thead className="bg-[#fbf7ef] text-[#66758A]"><tr>{["شماره", "موکل", "خدمت", "وضعیت", "اولویت", "تاریخ", "عملیات"].map((h) => <th className="px-5 py-4 text-right font-black" key={h}>{h}</th>)}</tr></thead><tbody>{crmRequests.slice(0, 14).map((r) => <tr className="border-t border-[#eadfce]" key={r.id}><td className="px-5 py-4 font-black">{r.number}</td><td className="px-5 py-4 font-bold">{r.client}</td><td className="px-5 py-4 text-[#66758A]">{r.service}</td><td className="px-5 py-4"><span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{r.status}</span></td><td className="px-5 py-4">{r.priority}</td><td className="px-5 py-4">{r.date}</td><td className="px-5 py-4"><Link className="rounded-lg border border-[#eadfce] px-3 py-2 font-black" href={`/admin/requests/${r.id}`}>مشاهده</Link></td></tr>)}</tbody></table></div></div></main></div></PageShell>;
}

export function AdminCrmSidebar() {
  return <aside className="bg-[#071225] p-5 text-white lg:min-h-screen lg:w-[290px]"><h2 className="text-2xl font-black">Legal CRM</h2><nav className="mt-8 grid gap-2">{["درخواست‌ها", "قراردادها", "فرم‌ها", "سوالات متداول", "گزارش‌ها"].map((item) => <span className="rounded-xl px-4 py-3 text-sm font-black hover:bg-white/10" key={item}>{item}</span>)}</nav></aside>;
}

export function FaqAdminExperience() {
  return <PageShell><div className="lg:flex lg:flex-row-reverse"><AdminCrmSidebar /><main className="min-w-0 flex-1 p-5 lg:p-8"><h1 className="text-3xl font-black">مدیریت سوالات متداول</h1><div className="mt-6 grid gap-4">{recoveryFaqs.map(([q, a], index) => <div className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(11,23,42,.06)]" key={q}><div className="flex items-center justify-between"><h2 className="font-black">{q}</h2><span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">منتشر شده</span></div><p className="mt-3 text-sm font-bold leading-7 text-[#66758A]">{a}</p><p className="mt-3 text-xs font-black text-[#C9973F]">ترتیب نمایش: {fa(index + 1)}</p></div>)}</div></main></div></PageShell>;
}

export function RequestFormExperience() {
  return <PageShell><PublicHeader /><section className="py-8"><div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 lg:grid-cols-[340px_1fr]"><aside className="rounded-2xl bg-[#0B172A] p-6 text-white"><h1 className="text-3xl font-black">ثبت درخواست حقوقی</h1><p className="mt-4 text-sm font-bold leading-8 text-slate-300">اطلاعات اولیه، خدمت، مدارک و فوریت را وارد کنید تا پرونده وارد CRM شود.</p><div className="mt-6 grid gap-3">{["بررسی اولیه", "تخصیص وکیل", "پیگیری در داشبورد", "تحویل سند"].map((step, i) => <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3" key={step}><span className="grid size-8 place-items-center rounded-full bg-[#C9973F] text-xs font-black">{fa(i + 1)}</span><span className="font-black">{step}</span></div>)}</div></aside><form className="rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(11,23,42,.06)]"><div className="grid gap-4 md:grid-cols-2">{["نام و نام خانوادگی", "شماره تماس", "ایمیل", "موضوع درخواست"].map((label) => <label className="grid gap-2 text-sm font-black" key={label}>{label}<input className="h-12 rounded-xl border border-[#eadfce] px-4" /></label>)}<label className="grid gap-2 text-sm font-black"><span>نوع خدمت</span><select className="h-12 rounded-xl border border-[#eadfce] px-4">{recoveryServices.map(([title, slug]) => <option key={slug}>{title}</option>)}</select></label><label className="grid gap-2 text-sm font-black"><span>فوریت</span><select className="h-12 rounded-xl border border-[#eadfce] px-4"><option>عادی</option><option>فوری</option></select></label><label className="grid gap-2 text-sm font-black md:col-span-2">شرح درخواست<textarea className="min-h-36 rounded-xl border border-[#eadfce] p-4" /></label></div><button className="mt-6 h-12 rounded-xl bg-[#C9973F] px-8 text-sm font-black text-white">ارسال درخواست</button></form></div></section></PageShell>;
}
