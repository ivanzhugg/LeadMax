import type { LeadPayload } from "@/types/content";

type LeadResponse = {
  ok: boolean;
  status?: number;
  fallback?: boolean;
};

const LEAD_ENDPOINT = "/leads";

export async function submitLeadToBackend(payload: LeadPayload): Promise<LeadResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_API_BASE_URL is not configured. Lead was not sent.");
    return { ok: true, fallback: true };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${baseUrl}${LEAD_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store"
    });

    return { ok: response.ok, status: response.status };
  } catch (error) {
    console.error("Failed to send lead to backend", error);
    return { ok: false, fallback: true };
  } finally {
    clearTimeout(timeout);
  }
}
