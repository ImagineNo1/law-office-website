import { Container } from "@/components/platform/layout/PageShell";
import { PublicPageHero, PublicShell } from "@/components/platform/layout/PublicShell";
import { ContractsExplorer } from "@/components/platform/contracts/ContractsExplorer";
import { fallbackContracts, type PlatformContract } from "@/lib/platform-db";

export function ContractsExperience({ contracts = fallbackContracts }: { contracts?: PlatformContract[] }) {
  return (
    <PublicShell>
      <PublicPageHero
        description="قالب‌های قراردادی منتشرشده را بر اساس دسته، عنوان و قیمت جست‌وجو کنید و برای تنظیم نهایی یا امضای دیجیتال درخواست ثبت کنید."
        eyebrow="بانک قراردادها"
        title="بانک قراردادهای حقوقی"
      />
      <section className="py-10">
        <Container>
          <ContractsExplorer contracts={contracts} />
        </Container>
      </section>
    </PublicShell>
  );
}
