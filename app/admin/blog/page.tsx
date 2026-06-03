import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { deletePostAction, savePostAction } from "@/lib/admin-actions";
import { getAllPosts } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت وبلاگ",
};

export default async function AdminBlogPage() {
  const posts = await getAllPosts();

  return (
    <AdminShell title="مدیریت وبلاگ" description="افزودن، ویرایش و انتشار مقاله ها">
      <div className="grid gap-6">
        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">افزودن مقاله</h2>
          <form action={savePostAction} className="grid gap-4">
            <Input label="عنوان مقاله" name="title" required />
            <div className="grid gap-4 md:grid-cols-3">
              <Input label="اسلاگ" name="slug" />
              <Input label="دسته بندی" name="category" required />
              <label className="grid gap-2 text-sm font-medium text-foreground">
                <span>وضعیت</span>
                <select className="h-11 rounded-xl border border-border bg-background px-3" name="status">
                  <option value="published">منتشر شده</option>
                  <option value="draft">پیش نویس</option>
                </select>
              </label>
            </div>
            <Input label="تصویر کاور" name="coverImage" />
            <Textarea label="خلاصه" name="excerpt" required />
            <Textarea label="محتوا" name="content" required />
            <Button type="submit">ذخیره مقاله</Button>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="mb-5 text-xl font-black text-foreground">فهرست مقاله ها</h2>
          <div className="grid gap-4">
            {posts.map((post) => (
              <details className="rounded-2xl border border-border bg-surface p-4" key={post.id}>
                <summary className="cursor-pointer font-black text-foreground">
                  {post.title} <span className="text-sm text-muted">({post.status})</span>
                </summary>
                <form action={savePostAction} className="mt-4 grid gap-4">
                  <input name="id" type="hidden" value={post.id} />
                  <Input defaultValue={post.title} label="عنوان" name="title" required />
                  <div className="grid gap-4 md:grid-cols-3">
                    <Input defaultValue={post.slug} label="اسلاگ" name="slug" />
                    <Input defaultValue={post.category} label="دسته بندی" name="category" required />
                    <label className="grid gap-2 text-sm font-medium text-foreground">
                      <span>وضعیت</span>
                      <select className="h-11 rounded-xl border border-border bg-background px-3" defaultValue={post.status} name="status">
                        <option value="published">منتشر شده</option>
                        <option value="draft">پیش نویس</option>
                      </select>
                    </label>
                  </div>
                  <Input defaultValue={post.coverImage} label="تصویر کاور" name="coverImage" />
                  <Textarea defaultValue={post.excerpt} label="خلاصه" name="excerpt" required />
                  <Textarea defaultValue={post.content} label="محتوا" name="content" required />
                  <div className="flex flex-wrap gap-3">
                    <Button type="submit">ذخیره تغییرات</Button>
                  </div>
                </form>
                <form action={deletePostAction} className="mt-3">
                  <input name="id" type="hidden" value={post.id} />
                  <Button type="submit" variant="outline">حذف مقاله</Button>
                </form>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
