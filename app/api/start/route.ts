import { signupRows, signupSubject, validSignup, type OwnerSignup } from "@/lib/owner-signup";
import { NOTIFY_TO, rowsToHtml, rowsToText, sendEmail } from "@/lib/server/email";
import { leadsConnected, saveSetup } from "@/lib/server/leads";

/** An owner's "Add your place" form: saved with the setup forms, then emailed to us. Without a database, the page falls back to a pre-filled email. */
export async function POST(request: Request) {
  const raw = (await request.json().catch(() => null)) as (Partial<OwnerSignup> & { website?: string }) | null;
  // A hidden field people never see: bots fill it in. Pretend it worked.
  if (!raw || raw.website) return Response.json(raw ? { ok: true } : { error: "Bad request" }, { status: raw ? 200 : 400 });
  const body = { ...raw };
  delete body.website;
  if (!validSignup(body)) {
    return Response.json({ error: "Add your name, email and place, check the calendar links, and tick “I agree”." }, { status: 400 });
  }
  if (!leadsConnected()) return Response.json({ ok: false, fallback: true });

  try {
    await saveSetup({ organization: body.place, contactName: body.name, email: body.email, answers: { kind: "owner-signup", ...body } });
  } catch (error) {
    console.error("saving the owner sign-up failed", error);
    return Response.json({ ok: false, fallback: true });
  }

  // It's saved; the email is a bonus.
  try {
    const title = signupSubject(body);
    const groups = [{ rows: signupRows(body) }];
    await sendEmail({ to: NOTIFY_TO, replyTo: body.email, subject: title, html: rowsToHtml(title, groups), text: rowsToText(title, groups) });
  } catch (error) {
    console.error("emailing the owner sign-up failed", error);
  }
  return Response.json({ ok: true });
}
