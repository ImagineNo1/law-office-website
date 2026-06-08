import { PageShell, Container } from "@/components/platform/layout/PageShell";
import { PublicHeader } from "@/components/platform/layout/PublicHeader";
import { PublicFooter } from "@/components/platform/layout/PublicFooter";
import { ContractsExplorer } from "@/components/platform/contracts/ContractsExplorer";
import { fallbackContracts, type PlatformContract } from "@/lib/platform-db";

export function ContractsExperience({ contracts = fallbackContracts }: { contracts?: PlatformContract[] }) {
  return (
    <PageShell>
      <PublicHeader />
      <section className="bg-[#0B172A] py-10 text-white">
        <Container>
          <span className="text-sm font-black text-[#D4A64A]">Contract Bank</span>
          <h1 className="mt-3 text-4xl font-black">بانک قراردادهای هوشمند و قابل امضا</h1>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-8 text-slate-200">
            قراردادهای CMS-backed با کارت های متراکم، فیلتر، قیمت، دانلود و مسیر ارسال برای امضای دیجیتال.
          </p>
        </Container>
      </section>
      <section className="py-8">
        <Container>
          <ContractsExplorer contracts={contracts} />
        </Container>
      </section>
      <PublicFooter />
    </PageShell>
  );
}
