import { emptyIntake, intakeGroups, validIntake, type Intake } from "@/lib/intake";
import { NOTIFY_TO, rowsToHtml, rowsToText, sendEmail } from "@/lib/server/email";
import { leadsConnected, saveSetup } from "@/lib/server/leads";

/** A new community's setup form: saved, then emailed to us when Resend is set up. Without a database, the page offers copy / email instead. */
export async function POST(request: Request) {
  const raw = (await request.json().catch(() => null)) as (Partial<Intake> & { website?: string }) | null;
  // A hidden field people never see: bots fill it in. Pretend it worked.
  if (!raw || raw.website) return Response.json(raw ? { ok: true } : { error: "Bad request" }, { status: raw ? 200 : 400 });
  const body = { ...raw };
  delete body.website;
  if (!validIntake(body)) return Response.json({ error: "Add your community's name, your name and your email." }, { status: 400 });
  if (!leadsConnected()) return Response.json({ ok: false, fallback: true });

  try {
    await saveSetup({ organization: body.community, contactName: body.contactName, email: body.email, answers: body });
  } catch (error) {
    console.error("saving the setup form failed", error);
    return Response.json({ ok: false, fallback: true });
  }

  // It's saved; the email is a bonus. Missing answers become blanks so the email can't fail on them.
  try {
    const title = `New setup form: ${body.community}`;
    const groups = intakeGroups({ ...emptyIntake(), ...body });
    await sendEmail({ to: NOTIFY_TO, replyTo: body.email, subject: title, html: rowsToHtml(title, groups), text: rowsToText(title, groups) });
  } catch (error) {
    console.error("emailing the setup form failed", error);
  }
  return Response.json({ ok: true });
}
