import { SITE } from "./site";

/** An owner's "Add your place" form (/start). Saved like the setup form, through `submit_setup`. No payment yet. */
export type OwnerSignup = {
  name: string;
  email: string;
  phone: string;
  /** The place's address or town. Also what the saved row is filed under. */
  place: string;
  sleeps: string;
  checkOut: string;
  checkIn: string;
  airbnbCalendar: string;
  vrboCalendar: string;
  /** Dollars. Repairs under it just get done; over it, we ask first. */
  repairLimit: string;
  cleaningNotes: string;
  /** Ticked "I agree" to the offer, terms and privacy policy. */
  agreed: boolean;
};

export const emptySignup = (): OwnerSignup => ({
  name: "",
  email: "",
  phone: "",
  place: "",
  sleeps: "",
  checkOut: "10:00",
  checkIn: "16:00",
  airbnbCalendar: "",
  vrboCalendar: "",
  repairLimit: "200",
  cleaningNotes: "",
  agreed: false,
});

/** The Cabin Care offer, as the pricing section and FAQ on the home page put it. */
export const OFFER = [
  "Our fee is 10% of your payout, billed monthly.",
  "Cleaning is paid per clean, straight to the cleaner.",
  "Repairs are the pro's price with no markup. Anything over your repair limit needs your OK first.",
  "Supplies are what we paid, shown on your monthly summary.",
  "No long-term contract: cancel with 30 days' notice.",
];

export const signupSubject = (s: OwnerSignup) => `New owner sign-up: ${s.place}`;

/** Label/value rows for the email to us and the fallback email. */
export function signupRows(s: OwnerSignup): [string, string][] {
  return [
    ["Name", s.name],
    ["Email", s.email],
    ["Phone", s.phone],
    ["Place", s.place],
    ["Sleeps", s.sleeps],
    ["Check-out", s.checkOut],
    ["Check-in", s.checkIn],
    ["Airbnb calendar", s.airbnbCalendar],
    ["VRBO calendar", s.vrboCalendar],
    ["Repair limit", s.repairLimit ? `$${s.repairLimit}` : ""],
    ["Cleaning notes", s.cleaningNotes],
    ["Agreed to the offer and terms", s.agreed ? "Yes" : "No"],
  ];
}

/** The fallback when the database isn't connected: a pre-filled email to us. */
export function signupMailto(s: OwnerSignup) {
  const body = signupRows(s)
    .map(([k, v]) => `${k}: ${v || "—"}`)
    .join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(signupSubject(s))}&body=${encodeURIComponent(body)}`;
}

const calendarLink = (v: string) => v === "" || /^(https?|webcal):\/\/\S+$/i.test(v);

/** Server-side check: everything required is there and looks like what it should be. */
export function validSignup(s: Partial<OwnerSignup> | null): s is OwnerSignup {
  if (!s) return false;
  const str = (v: unknown, max = 200) => typeof v === "string" && v.length <= max;
  const filled = (v: unknown, max = 200) => str(v, max) && (v as string).trim().length > 0;
  return (
    filled(s.name, 120) &&
    filled(s.email, 200) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email!) &&
    str(s.phone, 40) &&
    filled(s.place, 160) &&
    str(s.sleeps, 10) &&
    str(s.checkOut, 10) &&
    str(s.checkIn, 10) &&
    str(s.airbnbCalendar, 1000) &&
    calendarLink(s.airbnbCalendar!.trim()) &&
    str(s.vrboCalendar, 1000) &&
    calendarLink(s.vrboCalendar!.trim()) &&
    str(s.repairLimit, 10) &&
    /^\d{0,6}$/.test(s.repairLimit!) &&
    str(s.cleaningNotes, 2000) &&
    s.agreed === true
  );
}
