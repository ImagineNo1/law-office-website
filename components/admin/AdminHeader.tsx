import { ThemeToggle } from "@/components/site/ThemeToggle";
import { logoutAction } from "@/lib/admin-actions";

export function AdminHeader({
  description,
  title,
  userName,
}: {
  title: string;
  description?: string;
  userName: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-black text-[#C9973F]">Admin CMS</p>
        <h1 className="mt-1 font-heading text-2xl font-black text-slate-950">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <label className="hidden h-11 w-72 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 md:flex">
          <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
            <path
              d="m21 21-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
          <input className="w-full bg-transparent outline-none placeholder:text-slate-400" placeholder="جستجو..." />
        </label>
        <form action={logoutAction}>
          <button
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
            type="submit"
          >
            خروج
          </button>
        </form>
        <ThemeToggle />
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1 pr-1 pl-4 text-sm font-bold text-slate-950 shadow-sm">
          <span className="grid size-9 place-items-center rounded-full bg-[#C9973F] text-[#1b1305]">
            {userName.slice(0, 1)}
          </span>
          {userName}
        </div>
      </div>
    </header>
  );
}
