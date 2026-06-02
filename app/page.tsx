const services = ['دعاوی ملکی', 'قراردادها', 'امور شرکت‌ها', 'دعاوی خانواده'];

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#07080c] text-[#f8efe0]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="text-2xl font-bold text-[#d7b45d]">موسسه حقوقی</div>
        <nav className="hidden gap-8 text-sm text-[#b9ad99] md:flex">
          <a href="#about">معرفی موسسه</a>
          <a href="#services">خدمات</a>
          <a href="#contact">تماس</a>
        </nav>
        <a className="rounded-full border border-[#d7b45d]/40 px-5 py-2 text-sm text-[#d7b45d]" href="/admin">پنل مدیریت</a>
      </header>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-5 text-sm tracking-[0.35em] text-[#d7b45d]">LAW OFFICE</p>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.25] md:text-7xl">همراه حقوقی مطمئن برای تصمیم‌های مهم شما</h1>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-[#b9ad99]">ارائه خدمات تخصصی حقوقی، تنظیم قرارداد، پیگیری پرونده‌ها و مشاوره حرفه‌ای برای اشخاص، شرکت‌ها و سازمان‌ها.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="rounded-full bg-[#d7b45d] px-7 py-3 font-bold text-[#07080c]" href="#contact">درخواست مشاوره</a>
            <a className="rounded-full border border-[#d7b45d]/30 px-7 py-3 text-[#d7b45d]" href="#services">مشاهده خدمات</a>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#d7b45d]/20 bg-[#10131a] p-6 shadow-2xl">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#211b10] to-[#0d1017] p-8">
            <div className="mb-10 h-20 w-20 rounded-full border border-[#d7b45d]/40" />
            <h2 className="text-3xl font-bold text-[#d7b45d]">عدالت، دقت، اعتماد</h2>
            <p className="mt-5 leading-8 text-[#b9ad99]">پرونده‌های حقوقی نیازمند تحلیل دقیق، تجربه عملی و پیگیری منظم هستند. ما این مسیر را شفاف و حرفه‌ای پیش می‌بریم.</p>
          </div>
        </div>
      </section>
      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-[#d7b45d]">حوزه‌های تخصصی</p>
        <h2 className="mt-3 text-4xl font-black">خدمات حقوقی موسسه</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {services.map((service) => (
            <article key={service} className="rounded-3xl border border-[#d7b45d]/20 bg-[#10131a] p-7">
              <h3 className="text-xl font-bold text-[#f2d98f]">{service}</h3>
              <p className="mt-4 leading-7 text-[#b9ad99]">مشاوره، بررسی مدارک، تدوین راهبرد و پیگیری پرونده با گزارش‌دهی منظم.</p>
            </article>
          ))}
        </div>
      </section>
      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-[#d7b45d]/20 bg-[#10131a] p-8 md:p-12">
          <p className="text-[#d7b45d]">معرفی موسسه</p>
          <h2 className="mt-3 text-4xl font-black">تجربه حقوقی در کنار نگاه مدرن</h2>
          <p className="mt-6 max-w-4xl leading-9 text-[#b9ad99]">تمام بخش‌های معرفی موسسه، اخبار، مقالات، صفحات محتوایی و اطلاعات تماس از طریق پنل مدیریت قابل کنترل خواهند بود.</p>
        </div>
      </section>
      <footer id="contact" className="border-t border-[#d7b45d]/20 px-6 py-12 text-center text-[#b9ad99]">
        <p className="text-2xl font-bold text-[#d7b45d]">موسسه حقوقی</p>
        <p className="mt-4">تهران، خیابان نمونه | ۰۲۱-۰۰۰۰۰۰۰۰</p>
      </footer>
    </main>
  );
}
