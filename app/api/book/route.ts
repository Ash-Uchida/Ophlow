import { bookingRows, bookingSummary, validBooking, type Booking } from "@/lib/booking";
import { NOTIFY_TO, rowsToHtml, rowsToText, sendEmail } from "@/lib/server/email";
import { LeadError, leadsConnected, saveBooking } from "@/lib/server/leads";
import { openSlots } from "@/lib/slots";

/**
 * Books a demo: checks the slot is one of ours, saves it (the database refuses a slot that's already taken), and
 * emails us when Resend is set up. With no database connected it answers `fallback: true` and the page opens a
 * pre-filled email instead.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as (Partial<Booking> & { website?: string }) | null;
  // A hidden field people never see: bots fill it in. Pretend it worked.
  if (body?.website) return Response.json({ ok: true });
  if (!validBooking(body)) return Response.json({ error: "Fill in your name, email and community, and pick a time." }, { status: 400 });
  const b = body;
  if (!openSlots([]).some((s) => s.start === b.start && s.end === b.end)) {
    return Response.json({ error: "That time isn't available any more. Please pick another." }, { status: 409 });
  }
  if (!leadsConnected()) return Response.json({ ok: false, fallback: true });

  try {
    await saveBooking({
      start: b.start,
      end: b.end,
      timeZone: b.timeZone,
      name: b.name,
      email: b.email,
      phone: b.phone,
      organization: b.community,
      details: { role: b.role, buildings: b.buildings, current: b.current, features: b.features },
      notes: b.notes,
    });
  } catch (error) {
    if (error instanceof LeadError && error.message === "slot_taken") {
      return Response.json({ error: "Someone just booked that time. Please pick another.", taken: true }, { status: 409 });
    }
    console.error("saving the booking failed", error);
    return Response.json({ ok: false, fallback: true });
  }

  // It's booked; the email is a bonus.
  try {
    const title = `New demo booked: ${b.community}`;
    const groups = [{ rows: bookingRows(b) }];
    await sendEmail({ to: NOTIFY_TO, replyTo: b.email, subject: title, html: rowsToHtml(title, groups), text: rowsToText(bookingSummary(b), groups) });
  } catch (error) {
    console.error("emailing the booking failed", error);
  }
  return Response.json({ ok: true });
}
