import { describe } from "./slots";
import { AVAILABILITY, SITE } from "./site";

export type Booking = {
  start: string;
  end: string;
  /** The visitor's time zone, as they had it set on the page. */
  timeZone: string;
  name: string;
  email: string;
  phone: string;
  community: string;
  role: string;
  buildings: string;
  /** How the floor runs today. */
  current: string;
  /** Feature names picked in the home page's builder. */
  features: string[];
  notes: string;
};

// Senior living options were: Executive director, Operations / admin, Department head, Owner / investor.
export const ROLE_OPTIONS = ["I own the place", "I co-host or manage it for someone", "I clean or fix rentals", "Something else"];

// Senior living options were: Paper and clipboards, Group texts / whiteboards, Spreadsheets, Software that isn't working.
export const CURRENT_TOOLS = ["I do it myself", "I have a cleaner I text", "A management company", "Something else"];

export const bookingSummary = (b: Booking) => `Call: ${b.community} (${b.name})`;

/** Label/value rows for the email to us, with the time in both our zone and theirs. */
export function bookingRows(b: Booking): [string, string][] {
  return [
    ["When (team)", describe(b.start, AVAILABILITY.timeZone)],
    ["When (theirs)", `${describe(b.start, b.timeZone)} — ${b.timeZone}`],
    ["Name", b.name],
    ["Email", b.email],
    ["Phone", b.phone],
    ["Community", b.community],
    ["Role", b.role],
    ["Buildings", b.buildings],
    ["Runs the floor with", b.current],
    ["Features they picked", b.features.join(", ")],
    ["Wants to see", b.notes],
  ];
}

/** The fallback when the database isn't connected: a pre-filled email to us. */
export function bookingMailto(b: Booking) {
  const body = bookingRows(b)
    .map(([k, v]) => `${k}: ${v || "—"}`)
    .join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(bookingSummary(b))}&body=${encodeURIComponent(body)}`;
}

/** Server-side check: everything required is there and looks like what it should be. */
export function validBooking(b: Partial<Booking> | null): b is Booking {
  if (!b) return false;
  const str = (v: unknown, max = 500) => typeof v === "string" && v.length <= max;
  return (
    str(b.start, 40) &&
    str(b.end, 40) &&
    !Number.isNaN(Date.parse(b.start!)) &&
    str(b.timeZone, 80) &&
    str(b.name, 120) &&
    b.name!.trim().length > 0 &&
    str(b.email, 200) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email!) &&
    str(b.community, 160) &&
    b.community!.trim().length > 0 &&
    str(b.phone ?? "", 40) &&
    str(b.role ?? "", 80) &&
    str(b.buildings ?? "", 40) &&
    str(b.current ?? "", 80) &&
    Array.isArray(b.features) &&
    b.features.length <= 30 &&
    b.features.every((f) => str(f, 80)) &&
    str(b.notes ?? "", 2000)
  );
}
