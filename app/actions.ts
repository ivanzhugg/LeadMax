"use server";

import { submitLeadToBackend } from "@/lib/api";
import type { LeadFormState, LeadPayload } from "@/types/content";

const phonePattern = /^[+0-9()\-\s]{7,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function sendLead(
  _previousState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const payload: LeadPayload = {
    name: getValue(formData, "name"),
    phone: getValue(formData, "phone"),
    email: getValue(formData, "email"),
    company: getValue(formData, "company"),
    message: getValue(formData, "message"),
    page: getValue(formData, "page")
  };

  const fieldErrors: Record<string, string> = {};

  if (payload.name.length < 2) {
    fieldErrors.name = "Укажите имя, чтобы мы понимали, как к вам обращаться.";
  }

  if (!phonePattern.test(payload.phone)) {
    fieldErrors.phone = "Укажите телефон в рабочем формате.";
  }

  if (payload.email && !emailPattern.test(payload.email)) {
    fieldErrors.email = "Проверьте формат email.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Проверьте поля формы.",
      fieldErrors
    };
  }

  const result = await submitLeadToBackend(payload);

  if (!result.ok) {
    return {
      ok: false,
      message:
        "Не удалось отправить заявку в API. Попробуйте еще раз или напишите на email из контактов."
    };
  }

  return {
    ok: true,
    message: result.fallback
      ? "Заявка принята в демо-режиме. После подключения FastAPI она будет уходить в backend."
      : "Спасибо, заявка отправлена. Мы свяжемся с вами в рабочее время."
  };
}
