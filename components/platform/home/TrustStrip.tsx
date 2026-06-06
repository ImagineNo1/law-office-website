export function TrustStrip() {
  return (
    <div className="bg-white py-6 text-[#0B172A]">
      <div className="mx-auto grid w-[min(1440px,calc(100%-32px))] overflow-hidden rounded-2xl border border-slate-200 md:grid-cols-5">
        {["رمزنگاری اسناد", "سطوح دسترسی", "گزارش ممیزی", "پشتیبانی حقوقی", "گواهی امضا"].map((item) => (
          <div className="border-slate-200 p-5 text-center font-black md:border-l last:border-l-0" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
