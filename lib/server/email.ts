
export type Attachment = { filename: string; content: string; contentType?: string };

type Mail = { to: string | string[]; subject: string; html: string; text: string; replyTo?: string; attachments?: Attachment[] };

export const NOTIFY_TO = process.env.NOTIFY_TO || "ophlow@gmail.com";

/**
 * Sends through Resend (https://resend.com). Without RESEND_API_KEY it reports `sent: false` and the page falls
 * back to a pre-filled email. Without a verified domain, Resend only delivers to the account's own address, so
 * sign up with the address in NOTIFY_TO.
 */
export async function sendEmail(mail: Mail): Promise<{ sent: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, error: "not-configured" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Ophlow <onboarding@resend.dev>",
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      reply_to: mail.replyTo,
      attachments: mail.attachments?.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.content).toString("base64"),
        content_type: a.contentType,
      })),
    }),
  });
  if (res.ok) return { sent: true };
  const error = await res.text().catch(() => res.statusText);
  console.error("resend failed", res.status, error);
  return { sent: false, error };
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** A plain two-column email table from label/value rows, with an optional heading per group. */
export function rowsToHtml(title: string, groups: { heading?: string; rows: [string, string][] }[]) {
  const body = groups
    .map(
      (g) =>
        (g.heading ? `<h3 style="margin:24px 0 8px;font:600 15px system-ui;color:#1f3c27">${escapeHtml(g.heading)}</h3>` : "") +
        `<table style="border-collapse:collapse;width:100%;font:14px system-ui">` +
        g.rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#5f564a;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
              `<td style="padding:6px 0;color:#25211c;white-space:pre-wrap">${escapeHtml(v || "—")}</td></tr>`,
          )
          .join("") +
        `</table>`,
    )
    .join("");
  return `<div style="max-width:640px"><h2 style="font:600 20px Georgia,serif;color:#b85a36">${escapeHtml(title)}</h2>${body}</div>`;
}

export function rowsToText(title: string, groups: { heading?: string; rows: [string, string][] }[]) {
  return [title, "", ...groups.flatMap((g) => [...(g.heading ? [`== ${g.heading}`] : []), ...g.rows.map(([k, v]) => `${k}: ${v || "—"}`), ""])].join("\n");
}
