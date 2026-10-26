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

export const ROLE_OPTIONS = ["Executive director", "Operations / admin", "Department head", "Owner / investor", "Something else"];

export const CURRENT_TOOLS = ["Paper and clipboards", "Group texts / whiteboards", "Spreadsheets", "Software that isn't working", "Something else"];

export const bookingSummary = (b: Booking) => `Demo: ${b.community} (${b.name})`;

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

/** The site is static, so a booking is a pre-filled email to us. */
export function bookingMailto(b: Booking) {
  const body = bookingRows(b)
    .map(([k, v]) => `${k}: ${v || "—"}`)
    .join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(bookingSummary(b))}&body=${encodeURIComponent(body)}`;
}
