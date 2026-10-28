import type { Interval } from "@/lib/slots";

/**
 * Saves bookings and setup forms in Supabase, through the three functions in `supabase/leads.sql`. Uses the
 * publishable key: the functions are the only thing it can reach, and nobody can read the rows back from the API.
 * Without SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY nothing is saved and the page falls back to a pre-filled email.
 */
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_PUBLISHABLE_KEY;

export const leadsConnected = () => Boolean(url && key);

export class LeadError extends Error {}

async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: key!, "content-type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  const body = await res.json().catch(() => null);
  if (res.ok) return body as T;
  // The database's own checks ("slot_taken", "invalid_booking"…) come back as the error message.
  throw new LeadError(typeof body?.message === "string" ? body.message : `supabase ${res.status}`);
}

/** Booked demos in a window, as busy intervals for the calendar. Start times only: no names or emails. */
export async function takenSlots(from: string, to: string, slotMinutes: number): Promise<Interval[]> {
  const starts = await rpc<string[]>("taken_demo_slots", { from_time: from, to_time: to });
  return starts.map((s) => ({ start: new Date(s).toISOString(), end: new Date(Date.parse(s) + slotMinutes * 60_000).toISOString() }));
}

export const saveBooking = (booking: {
  start: string;
  end: string;
  timeZone: string;
  name: string;
  email: string;
  phone?: string;
  organization: string;
  details: Record<string, unknown>;
  notes?: string;
}) => rpc<string>("book_demo", { booking });

export const saveSetup = (request: { organization: string; contactName: string; email: string; answers: unknown }) =>
  rpc<string>("submit_setup", { request });
