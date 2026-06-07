"use client";

import { Bold, Heading2, Italic, List, Quote, Undo2 } from "lucide-react";
import { useRef, useState } from "react";

export function RichTextEditor({ defaultValue = "", name = "content" }: { defaultValue?: string; name?: string }) {
  const [value, setValue] = useState(defaultValue);
  const editorRef = useRef<HTMLDivElement>(null);

  function run(command: string, arg?: string) {
    document.execCommand(command, false, arg);
    setValue(editorRef.current?.innerHTML ?? "");
    editorRef.current?.focus();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      <div className="flex flex-wrap gap-2 border-b border-border bg-slate-50 p-3">
        <button className="rounded-lg border border-border bg-white p-2 text-navy" onClick={() => run("bold")} type="button"><Bold className="size-4" /></button>
        <button className="rounded-lg border border-border bg-white p-2 text-navy" onClick={() => run("italic")} type="button"><Italic className="size-4" /></button>
        <button className="rounded-lg border border-border bg-white p-2 text-navy" onClick={() => run("formatBlock", "h2")} type="button"><Heading2 className="size-4" /></button>
        <button className="rounded-lg border border-border bg-white p-2 text-navy" onClick={() => run("insertUnorderedList")} type="button"><List className="size-4" /></button>
        <button className="rounded-lg border border-border bg-white p-2 text-navy" onClick={() => run("formatBlock", "blockquote")} type="button"><Quote className="size-4" /></button>
        <button className="rounded-lg border border-border bg-white p-2 text-navy" onClick={() => run("undo")} type="button"><Undo2 className="size-4" /></button>
      </div>
      <input name={name} type="hidden" value={value} />
      <div
        className="prose prose-slate min-h-[420px] max-w-none p-6 text-right font-body leading-9 outline-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: defaultValue }}
        dir="rtl"
        onInput={() => setValue(editorRef.current?.innerHTML ?? "")}
        ref={editorRef}
        suppressContentEditableWarning
      />
    </div>
  );
}
