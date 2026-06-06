import Link from "next/link";
import { fallbackContracts, type PlatformContract } from "@/lib/platform-db";

function FileIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l5 5v13H7V3Zm7 0v6h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg aria-hidden="true" className="size-2.5" viewBox="0 0 24 24" fill="none">
      <path d="M20 12 12 20 4 12V4h8l8 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function ContractPreview({ contracts = fallbackContracts }: { contracts?: PlatformContract[] }) {
  return (
    <section id="contracts" className="bg-muted/30 py-24" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="mb-3 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              بانک قرارداد
            </span>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              قراردادهای آماده، قابل ویرایش و قابل امضا
            </h2>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold transition hover:bg-muted/50" href="/contracts">
            مشاهده همه
            <span aria-hidden="true">←</span>
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contracts.slice(0, 6).map((contract) => (
            <Link
              className="group rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-accent/20 hover:shadow-lg"
              href={`/contracts/${contract.category}/${contract.slug}`}
              key={contract.id}
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileIcon />
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-secondary-foreground">{contract.category}</span>
              </div>
              <h3 className="mb-2 text-sm font-bold">{contract.title}</h3>
              <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {contract.description || "قالب حقوقی آماده با بندهای ضروری، چک‌لیست مدارک، امکان سفارشی‌سازی و مسیر امضای دیجیتال."}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    <TagIcon />
                    {contract.category || "پیشنهادی"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{contract.price || "رایگان"}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
