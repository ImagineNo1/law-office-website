type FieldHelpProps = {
  children: React.ReactNode;
};

export function FieldHelp({ children }: FieldHelpProps) {
  return (
    <span className="text-xs font-bold leading-6 text-muted">{children}</span>
  );
}

export function AdminSubmitButton({
  children = "ذخیره",
}: {
  children?: React.ReactNode;
}) {
  return (
    <button
      className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white shadow-card transition hover:bg-emerald-800"
      type="submit"
    >
      {children}
    </button>
  );
}

export function SlugField({
  defaultValue,
  name = "slug",
}: {
  defaultValue?: string;
  name?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>آدرس صفحه (Slug)</span>
      <input
        className="service-input"
        defaultValue={defaultValue}
        name={name}
        placeholder="اگر خالی بماند، از روی عنوان ساخته می‌شود"
      />
      <FieldHelp>
        این مقدار آدرس صفحه را می‌سازد. اگر مطمئن نیستید خالی بگذارید تا سیستم
        خودش تنظیم کند.
      </FieldHelp>
    </label>
  );
}

export function OrderField({
  defaultValue,
  name = "order",
}: {
  defaultValue?: number;
  name?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>اولویت نمایش</span>
      <input
        className="service-input"
        defaultValue={defaultValue ?? 0}
        name={name}
        type="number"
      />
      <FieldHelp>
        عدد کوچک‌تر بالاتر نمایش داده می‌شود؛ اگر مهم نیست روی ۰ بگذارید.
      </FieldHelp>
    </label>
  );
}

export function CategoryField({
  categories,
  defaultValue,
  label = "دسته‌بندی",
  name = "category",
}: {
  categories: string[];
  defaultValue?: string;
  label?: string;
  name?: string;
}) {
  const cleanCategories = Array.from(new Set(categories.filter(Boolean)));
  const selected =
    defaultValue && cleanCategories.includes(defaultValue) ? defaultValue : "";
  const customDefault =
    defaultValue && !cleanCategories.includes(defaultValue) ? defaultValue : "";

  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>{label}</span>
      <select
        className="service-input"
        defaultValue={selected}
        name={`${name}Preset`}
      >
        <option value="">انتخاب دسته یا افزودن دسته جدید</option>
        {cleanCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        className="service-input"
        defaultValue={customDefault}
        name={name}
        placeholder="برای دسته جدید، نام را اینجا تایپ کنید"
      />
      <FieldHelp>
        از فهرست انتخاب کنید یا برای افزودن دسته جدید، فیلد دوم را پر کنید.
      </FieldHelp>
    </label>
  );
}

export function UploadField({
  defaultValue,
  fileName,
  label,
  name,
}: {
  defaultValue?: string | null;
  fileName: string;
  label: string;
  name: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-navy">
      <span>{label}</span>
      <input
        className="service-input"
        defaultValue={defaultValue ?? ""}
        name={name}
        placeholder="آدرس فایل/تصویر یا خروجی آپلود"
      />
      <input
        accept="image/*"
        className="service-input py-2"
        name={fileName}
        type="file"
      />
      <FieldHelp>
        می‌توانید آدرس تصویر را وارد کنید یا از سیستم خود فایل تصویر آپلود کنید.
      </FieldHelp>
    </label>
  );
}
