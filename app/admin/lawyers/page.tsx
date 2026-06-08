import type { Metadata } from "next";
import { saveLawyerAction } from "@/lib/admin-actions";
import { getAdminLawyers } from "@/lib/admin-db";
import { lawyerLicenseLabels, lawyerLicenseTypes } from "@/lib/lawyers";
import { AdminDataTable, AdminEmptyState, AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "وکلا" };

export default async function AdminLawyersPage() {
  const users = await getAdminLawyers();

  return (
    <AdminShell
      title="وکلا"
      description="انتخاب کاربران سایت یا پنل مدیریت به‌عنوان وکیل"
    >
      <div className="grid gap-6">
        <AdminPageHeader title="وکلا" />
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-8 text-emerald-900">
          انواع قابل ثبت شامل وکیل پایه یک، پایه دو، کارآموز وکالت، وکیل/مشاور
          ماده ۱۸۷، مشاور حقوقی، تسخیری، معاضدتی، تعیینی و اتفاقی است.
        </div>
        {users.length ? (
          <AdminDataTable
            headers={[
              "نام",
              "منبع",
              "تماس",
              "وکیل",
              "نوع",
              "تخصص‌ها",
              "عملیات",
            ]}
          >
            {users.map((user) => (
              <tr className="border-t border-border align-top" key={`${user.source}:${user.id}`}>
                <td className="px-5 py-4">
                  <p className="font-black text-navy">{user.fullName}</p>
                  <p className="mt-1 text-xs font-bold text-muted">
                    {user.role || user.status}
                  </p>
                </td>
                <td className="px-5 py-4 text-sm font-bold text-muted">
                  {user.source === "client" ? "کاربر سایت" : "کاربر ادمین"}
                </td>
                <td className="px-5 py-4 text-sm font-bold leading-7 text-muted">
                  <p>{user.phone || "تلفن ثبت نشده"}</p>
                  <p>{user.email || "ایمیل ثبت نشده"}</p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      user.isLawyer
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {user.isLawyer ? "فعال" : "غیرفعال"}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm font-bold text-muted">
                  {user.lawyerLicenseLabel}
                </td>
                <td className="px-5 py-4 text-sm font-bold leading-7 text-muted">
                  {user.lawyerSpecialties.length
                    ? user.lawyerSpecialties.join("، ")
                    : "ثبت نشده"}
                </td>
                <td className="px-5 py-4">
                  <form action={saveLawyerAction} className="grid min-w-72 gap-3">
                    <input name="id" type="hidden" value={user.id} />
                    <input name="source" type="hidden" value={user.source} />
                    <label className="flex items-center justify-between rounded-xl border border-border bg-white px-3 py-2 text-sm font-black text-navy">
                      وکیل باشد
                      <input
                        defaultChecked={user.isLawyer}
                        name="isLawyer"
                        type="checkbox"
                      />
                    </label>
                    <select
                      className="service-input"
                      defaultValue={user.lawyerLicenseType}
                      name="lawyerLicenseType"
                    >
                      {lawyerLicenseTypes.map((type) => (
                        <option key={type} value={type}>
                          {lawyerLicenseLabels[type]}
                        </option>
                      ))}
                    </select>
                    <input
                      className="service-input"
                      defaultValue={user.lawyerSpecialties.join(", ")}
                      name="lawyerSpecialties"
                      placeholder="تخصص‌ها با ویرگول"
                    />
                    <textarea
                      className="service-input min-h-20 py-3"
                      defaultValue={user.lawyerBio}
                      name="lawyerBio"
                      placeholder="توضیح کوتاه"
                    />
                    <button
                      className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-black text-white"
                      type="submit"
                    >
                      ذخیره
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </AdminDataTable>
        ) : (
          <AdminEmptyState
            title="کاربری ثبت نشده است"
            description="پس از ایجاد کاربر در بخش کاربران، اینجا می‌توانید او را به‌عنوان وکیل فعال کنید."
          />
        )}
      </div>
    </AdminShell>
  );
}
