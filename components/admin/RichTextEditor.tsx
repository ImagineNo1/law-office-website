"use client";

import {
  AlignCenter,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Underline,
  Undo2,
} from "lucide-react";
import { useRef, useState } from "react";

export function RichTextEditor({
  defaultValue = "",
  name = "content",
}: {
  defaultValue?: string;
  name?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const editorRef = useRef<HTMLDivElement>(null);

  function sync() {
    setValue(editorRef.current?.innerHTML ?? "");
  }

  function run(command: string, arg?: string) {
    document.execCommand(command, false, arg);
    sync();
    editorRef.current?.focus();
  }

  function addLink() {
    const url = window.prompt("آدرس لینک را وارد کنید:");
    if (url) run("createLink", url);
  }

  const toolClass =
    "inline-flex items-center gap-1 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-xs font-black text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-50";

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-card">
      <div className="sticky top-0 z-10 flex flex-wrap gap-2 border-b border-emerald-100 bg-emerald-50 p-3">
        <button className={toolClass} onClick={() => run("bold")} type="button">
          <Bold className="size-4" />
          درشت
        </button>
        <button
          className={toolClass}
          onClick={() => run("italic")}
          type="button"
        >
          <Italic className="size-4" />
          کج
        </button>
        <button
          className={toolClass}
          onClick={() => run("underline")}
          type="button"
        >
          <Underline className="size-4" />
          زیرخط
        </button>
        <button
          className={toolClass}
          onClick={() => run("formatBlock", "h2")}
          type="button"
        >
          <Heading2 className="size-4" />
          تیتر ۲
        </button>
        <button
          className={toolClass}
          onClick={() => run("formatBlock", "h3")}
          type="button"
        >
          <Heading3 className="size-4" />
          تیتر ۳
        </button>
        <button
          className={toolClass}
          onClick={() => run("insertUnorderedList")}
          type="button"
        >
          <List className="size-4" />
          لیست
        </button>
        <button
          className={toolClass}
          onClick={() => run("insertOrderedList")}
          type="button"
        >
          <ListOrdered className="size-4" />
          شماره‌ای
        </button>
        <button
          className={toolClass}
          onClick={() => run("formatBlock", "blockquote")}
          type="button"
        >
          <Quote className="size-4" />
          نقل‌قول
        </button>
        <button className={toolClass} onClick={addLink} type="button">
          <LinkIcon className="size-4" />
          لینک
        </button>
        <button
          className={toolClass}
          onClick={() => run("justifyRight")}
          type="button"
        >
          <AlignRight className="size-4" />
          راست
        </button>
        <button
          className={toolClass}
          onClick={() => run("justifyCenter")}
          type="button"
        >
          <AlignCenter className="size-4" />
          وسط
        </button>
        <button
          className={toolClass}
          onClick={() => run("removeFormat")}
          type="button"
        >
          <RemoveFormatting className="size-4" />
          پاک‌سازی
        </button>
        <button className={toolClass} onClick={() => run("undo")} type="button">
          <Undo2 className="size-4" />
          برگشت
        </button>
        <button className={toolClass} onClick={() => run("redo")} type="button">
          <Redo2 className="size-4" />
          جلو
        </button>
      </div>
      <input name={name} type="hidden" value={value} />
      <div
        className="prose prose-slate min-h-[460px] max-w-none p-6 text-right font-body leading-9 outline-none focus:ring-4 focus:ring-emerald-500/15"
        contentEditable
        dangerouslySetInnerHTML={{ __html: defaultValue }}
        dir="rtl"
        onBlur={sync}
        onInput={sync}
        ref={editorRef}
        suppressContentEditableWarning
      />
    </div>
  );
}
