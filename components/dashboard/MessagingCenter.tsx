"use client";

import { useMemo, useState, type ReactNode } from "react";
import { MessageSquare, Send, UserRound, type LucideIcon } from "lucide-react";
import { sendClientMessageAction } from "@/app/dashboard/actions";
import type {
  ClientMessageContact,
  ClientMessageRecord,
} from "@/lib/client-portal-db";

function PortalCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function EmptyState({
  description,
  icon: Icon = MessageSquare,
  title,
}: {
  description: string;
  icon?: LucideIcon;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center">
      <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-accent/10 text-accent">
        <Icon aria-hidden="true" className="size-7" />
      </span>
      <h3 className="font-heading text-lg font-extrabold text-primary">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

type Conversation = {
  threadId: string;
  title: string;
  recipientId: string;
  recipientType: "admin" | "lawyer" | "";
  recipientName: string;
  messages: ClientMessageRecord[];
  lastAt: string;
  contact?: ClientMessageContact;
};

function initialOf(value: string) {
  return value.trim().slice(0, 1) || "؟";
}

function contactTitle(contact: ClientMessageContact) {
  return contact.type === "admin" ? `${contact.name} · مدیر` : contact.name;
}

export function MessagingCenter({
  contacts,
  messages,
}: {
  contacts: ClientMessageContact[];
  messages: ClientMessageRecord[];
}) {
  const conversations = useMemo(() => {
    const groups = new Map<string, Conversation>();

    for (const contact of contacts) {
      groups.set(contact.threadId, {
        threadId: contact.threadId,
        title: contactTitle(contact),
        recipientId: contact.id,
        recipientType: contact.type,
        recipientName: contact.name,
        messages: [],
        lastAt: "شروع گفتگو",
        contact,
      });
    }

    for (const message of messages) {
      const threadId = message.threadId;
      const existing = groups.get(threadId);
      if (existing) {
        existing.messages.push(message);
        existing.lastAt = message.timestamp;
        continue;
      }
      groups.set(threadId, {
        threadId,
        title: message.threadTitle,
        recipientId: message.recipientId,
        recipientType: message.recipientType,
        recipientName: message.recipientName || message.threadTitle,
        messages: [message],
        lastAt: message.timestamp,
      });
    }

    return Array.from(groups.values()).sort((a, b) => {
      const aHasMessages = a.messages.length > 0;
      const bHasMessages = b.messages.length > 0;
      if (aHasMessages !== bHasMessages) return aHasMessages ? -1 : 1;
      return a.title.localeCompare(b.title, "fa");
    });
  }, [contacts, messages]);

  const [activeThreadId, setActiveThreadId] = useState(
    conversations[0]?.threadId ?? "",
  );
  const activeConversation =
    conversations.find((conversation) => conversation.threadId === activeThreadId) ??
    conversations[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <PortalCard className="p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="font-heading text-xl font-extrabold text-primary">
            مخاطبین گفتگو
          </h2>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-white">
            وکلا و مدیر
          </span>
        </div>
        {conversations.length ? (
          <div className="grid gap-2">
            {conversations.map((conversation) => {
              const isActive = conversation.threadId === activeConversation?.threadId;
              return (
                <button
                  className={`rounded-lg border p-4 text-right transition ${isActive ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/40"}`}
                  key={conversation.threadId}
                  onClick={() => setActiveThreadId(conversation.threadId)}
                  type="button"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-sm font-extrabold text-primary-foreground">
                      {initialOf(conversation.recipientName || conversation.title)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-sm text-primary">
                        {conversation.title}
                      </strong>
                      <span className="mt-1 block truncate text-xs font-bold text-muted-foreground">
                        {conversation.contact?.label ?? "گفتگوی فعال"}
                      </span>
                      <span className="mt-2 block text-xs font-bold text-muted-foreground">
                        {conversation.messages.length
                          ? `${conversation.messages.length} پیام · ${conversation.lastAt}`
                          : "برای شروع انتخاب کنید"}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <EmptyState
            description="پس از ثبت وکلا یا مدیر فعال، امکان شروع گفتگو در همین بخش نمایش داده می‌شود."
            title="مخاطبی برای گفتگو وجود ندارد"
          />
        )}
      </PortalCard>
      <PortalCard className="p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate font-heading text-xl font-extrabold text-primary">
              {activeConversation?.title ?? "گفتگوی جدید"}
            </h2>
            <p className="mt-1 truncate text-xs font-bold text-muted-foreground">
              {activeConversation?.contact?.description ??
                "مخاطب را از لیست سمت راست انتخاب کنید."}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold text-emerald-700">
            <UserRound aria-hidden="true" className="size-4" />
            آماده گفتگو
          </span>
        </div>
        {activeConversation ? (
          activeConversation.messages.length ? (
            <div className="grid max-h-[560px] gap-4 overflow-y-auto rounded-lg border border-border bg-white p-4">
              {activeConversation.messages.map((message) => (
                <div
                  className={`flex ${message.sender === "client" ? "justify-start" : "justify-end"}`}
                  key={message.id}
                >
                  <div
                    className={`max-w-[78%] rounded-lg border border-border bg-card p-4 shadow-sm ${message.sender === "admin" ? "border-accent/40" : ""}`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-extrabold text-primary-foreground">
                        {initialOf(message.senderName)}
                      </span>
                      <strong className="text-xs text-primary">
                        {message.senderName}
                      </strong>
                      <span className="text-xs font-bold text-muted-foreground">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-8 text-muted-foreground">
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid min-h-[320px] place-items-center rounded-lg border border-dashed border-border bg-white p-6 text-center">
              <div>
                <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <MessageSquare aria-hidden="true" className="size-7" />
                </span>
                <h3 className="font-heading text-lg font-extrabold text-primary">
                  چت با {activeConversation.recipientName || activeConversation.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-7 text-muted-foreground">
                  پیام خود را در کادر پایین بنویسید تا این گفتگو شروع شود.
                </p>
              </div>
            </div>
          )
        ) : (
          <EmptyState
            description="از لیست وکلا یا مدیر یک مخاطب انتخاب کنید تا پنجره چت باز شود."
            title="گفتگویی انتخاب نشده است"
          />
        )}
        <form
          action={sendClientMessageAction}
          className="mt-4 flex gap-2 rounded-lg border border-border p-3"
        >
          <input
            name="threadId"
            type="hidden"
            value={activeConversation?.threadId ?? ""}
          />
          <input
            name="threadTitle"
            type="hidden"
            value={activeConversation?.title ?? "گفتگوی پشتیبانی"}
          />
          <input
            name="recipientId"
            type="hidden"
            value={activeConversation?.recipientId ?? ""}
          />
          <input
            name="recipientType"
            type="hidden"
            value={activeConversation?.recipientType ?? ""}
          />
          <input
            name="recipientName"
            type="hidden"
            value={activeConversation?.recipientName ?? ""}
          />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!activeConversation}
            name="message"
            placeholder="ارسال پیام..."
            required
          />
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!activeConversation}
            type="submit"
          >
            <Send aria-hidden="true" className="size-4" />
            ارسال
          </button>
        </form>
      </PortalCard>
    </div>
  );
}
