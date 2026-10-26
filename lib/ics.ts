const stamp = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** A Google Calendar "add event" link, for the visitor's own calendar. */
export function googleCalendarLink(e: { start: string; end: string; summary: string; details: string }) {
  const params = new URLSearchParams({ action: "TEMPLATE", text: e.summary, dates: `${stamp(e.start)}/${stamp(e.end)}`, details: e.details });
  return `https://calendar.google.com/calendar/render?${params}`;
}
