import type {
  Plan,
  DashboardData,
  ChatMessage,
  GeneratePlanResponse,
  WaitlistResponse,
  Narrative,
} from './types';

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Data could not be loaded');
  return res.json() as Promise<T>;
}

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data as unknown as T;
}

export const api = {
  narrative: () => getJSON<Narrative>('/api/narrative'),
  plans: () => getJSON<Plan[]>('/api/plans'),
  dashboard: () => getJSON<DashboardData>('/api/dashboard'),
  chatHistory: (sessionId: string) =>
    getJSON<ChatMessage[]>(`/api/chat?session_id=${encodeURIComponent(sessionId)}`),
  sendChat: (sessionId: string, message: string) =>
    postJSON<ChatMessage>('/api/chat', { session_id: sessionId, message }),
  joinWaitlist: (email: string) => postJSON<WaitlistResponse>('/api/waitlist', { email }),
  generatePlan: (payload: { goal: string; level: string; days: number; weight: number | null }) =>
    postJSON<GeneratePlanResponse>('/api/generate-plan', payload),
};
