"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { sendLead } from "@/app/actions";
import type { LeadFormState } from "@/types/content";

type LeadFormProps = {
  page: string;
};

const initialState: LeadFormState = {
  ok: false,
  message: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="primary-button w-full disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Отправляем..." : "Отправить заявку"}
    </button>
  );
}

export function LeadForm({ page }: LeadFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(sendLead, initialState);

  useEffect(() => {
    if (state.ok) {
      const timer = window.setTimeout(() => router.push("/thanks"), 700);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [router, state.ok]);

  return (
    <form action={formAction} className="surface-card relative p-6" noValidate>
      <input type="hidden" name="page" value={page} />
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink">
            Имя
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            className="mt-2 w-full rounded-md border border-line bg-paper/70 px-4 py-3 text-ink outline-none focus:border-moss focus:bg-white"
            placeholder="Как к вам обращаться"
          />
          {state.fieldErrors?.name && <p className="mt-2 text-sm text-coral">{state.fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-ink">
            Телефон
          </label>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            aria-invalid={Boolean(state.fieldErrors?.phone)}
            className="mt-2 w-full rounded-md border border-line bg-paper/70 px-4 py-3 text-ink outline-none focus:border-moss focus:bg-white"
            placeholder="+7 000 000-00-00"
          />
          {state.fieldErrors?.phone && <p className="mt-2 text-sm text-coral">{state.fieldErrors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            className="mt-2 w-full rounded-md border border-line bg-paper/70 px-4 py-3 text-ink outline-none focus:border-moss focus:bg-white"
            placeholder="name@company.ru"
          />
          {state.fieldErrors?.email && <p className="mt-2 text-sm text-coral">{state.fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-semibold text-ink">
            Компания
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className="mt-2 w-full rounded-md border border-line bg-paper/70 px-4 py-3 text-ink outline-none focus:border-moss focus:bg-white"
            placeholder="Название или ниша"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-semibold text-ink">
            Задача
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-2 w-full resize-y rounded-md border border-line bg-paper/70 px-4 py-3 text-ink outline-none focus:border-moss focus:bg-white"
            placeholder="Например: нужен бот в MAX для заявок и интеграции с CRM"
          />
        </div>
        <SubmitButton />
        {state.message && (
          <p className={state.ok ? "text-sm text-moss" : "text-sm text-coral"} role="status">
            {state.message}
          </p>
        )}
        <p className="text-xs leading-5 text-muted">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой данных для ответа на заявку.
        </p>
      </div>
    </form>
  );
}
