"use client";

import { CalendarDays, Check, CircleCheck, Loader2, Mail } from "lucide-react";
import { track } from "@vercel/analytics";
import Link from "next/link";
import { useState } from "react";
import { OFFER, emptySignup, signupMailto, type OwnerSignup } from "@/lib/owner-signup";
import { SITE } from "@/lib/site";

const input =
  "w-full rounded-xl border border-ink-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-forest-500 focus:ring-2 focus:ring-forest-100";

const NEXT_STEPS = [
  "We call you within one business day to go over your place and answer questions.",
  "We walk the place with you and make its cleaning checklist.",
  "You add Ophlow as a co-host on Airbnb, so we can answer guests and see bookings.",
  "We handle your next guest from checkout to check-in, and you watch it on your dashboard.",
];

/** The "Add your place" form at /start: saved through /api/start, with a pre-filled email if the database can't be reached. */
export function OwnerSignupForm() {
  const [form, setForm] = useState<OwnerSignup>(emptySignup);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ kind: "sent" } | { kind: "fallback"; mailto: string } | null>(null);
  const set = <K extends keyof OwnerSignup>(key: K, value: OwnerSignup[K]) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/start", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...form, website }) });
      const reply = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(reply.error);
      if (reply.ok) {
        track("Owner signed up");
        window.scrollTo({ top: 0 });
        return setDone({ kind: "sent" });
      }
      throw new Error();
    } catch (problem) {
      if (problem instanceof Error && problem.message) return setError(problem.message);
      // Server or database unreachable: fall back to a pre-filled email so the sign-up isn't lost.
      const link = signupMailto(form);
      setDone({ kind: "fallback", mailto: link });
      window.location.assign(link);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl animate-rise rounded-[2rem] border border-ink-200 bg-paper p-8 shadow-xl shadow-forest-900/5 sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-100 text-forest-800">
          {done.kind === "sent" ? <CircleCheck className="h-7 w-7" /> : <Mail className="h-7 w-7" />}
        </span>
        <h2 className="mt-5 text-3xl font-semibold text-forest-950">{done.kind === "sent" ? "You're set." : "One last step."}</h2>
        {done.kind === "sent" ? (
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            We&apos;ll call you within one business day to finish setup. No charge until work is done.
          </p>
        ) : (
          <>
            <p className="mt-3 text-lg leading-relaxed text-ink-700">
              Send us the pre-filled email so we get your details. If your email app didn&apos;t open, use the button below.
            </p>
            <a
              href={done.mailto}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-sm font-semibold text-cream hover:bg-forest-900"
            >
              <Mail className="h-4 w-4" /> Send my details
            </a>
          </>
        )}
        <h3 className="mt-8 text-lg font-semibold text-forest-950">What happens next</h3>
        <ol className="mt-3 space-y-3">
          {NEXT_STEPS.map((step, i) => (
            <li key={step} className="flex gap-3 leading-relaxed text-ink-700">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-100 text-sm font-semibold text-forest-800">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-ink-600">
          Questions before then? Email{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-forest-800 underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      className="overflow-hidden rounded-[2rem] border border-ink-200 bg-paper shadow-xl shadow-forest-900/5"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      <div className="grid lg:grid-cols-[1fr_19rem]">
        <div className="space-y-10 p-6 sm:p-8">
          <p className="text-sm text-ink-600">Fields marked * are required.</p>

          <fieldset>
            <legend className="font-serif text-xl font-semibold text-forest-950">About you</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Your name *">
                <input required className={input} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
              </Field>
              <Field label="Email *">
                <input required type="email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
              </Field>
              <Field label="Phone">
                <input type="tel" className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-serif text-xl font-semibold text-forest-950">Your place</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Address or town *" wide>
                <input
                  required
                  className={input}
                  value={form.place}
                  onChange={(e) => set("place", e.target.value)}
                  autoComplete="street-address"
                  placeholder="e.g. 12 Elk Ridge Rd, Island Park"
                />
              </Field>
              <Field label="How many it sleeps">
                <input type="number" min={1} max={99} inputMode="numeric" className={input} value={form.sleeps} onChange={(e) => set("sleeps", e.target.value)} />
              </Field>
              <Field label="Repair limit ($)" hint="Repairs under this just get done. Over it, we ask you first.">
                <input
                  type="number"
                  min={0}
                  step={25}
                  inputMode="numeric"
                  className={input}
                  value={form.repairLimit}
                  onChange={(e) => set("repairLimit", e.target.value)}
                />
              </Field>
              <Field label="Guest check-out time">
                <input type="time" className={input} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} />
              </Field>
              <Field label="Guest check-in time">
                <input type="time" className={input} value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} />
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-serif text-xl font-semibold text-forest-950">Calendars</legend>
            <p className="mt-1 text-sm leading-relaxed text-ink-600">
              Optional. They let us see every check-in and checkout. You can add them on our call instead.
            </p>
            <div className="mt-4 grid gap-4">
              <Field label="Airbnb calendar link" hint="In Airbnb, open your listing’s calendar settings and look for Export calendar. Copy the link it shows.">
                <input
                  type="url"
                  className={input}
                  value={form.airbnbCalendar}
                  onChange={(e) => set("airbnbCalendar", e.target.value)}
                  placeholder="https://www.airbnb.com/calendar/ical/…"
                />
              </Field>
              <Field label="VRBO calendar link" hint="In VRBO, open your calendar and look for Import/export, then Export. Copy the link it shows.">
                <input
                  type="url"
                  className={input}
                  value={form.vrboCalendar}
                  onChange={(e) => set("vrboCalendar", e.target.value)}
                  placeholder="https://www.vrbo.com/icalendar/…"
                />
              </Field>
              <Field label="Cleaning notes" hint="Optional. Anything a cleaner should know: hot tub, linens, lockbox, pets.">
                <textarea rows={3} className={input} value={form.cleaningNotes} onChange={(e) => set("cleaningNotes", e.target.value)} />
              </Field>
            </div>
          </fieldset>
        </div>

        <aside className="border-t border-ink-200 bg-forest-950 p-6 text-cream sm:p-8 lg:border-l lg:border-t-0">
          <p className="text-sm font-semibold uppercase tracking-wider text-rust-200">Cabin Care</p>
          <h2 className="mt-3 text-2xl font-semibold">What you&apos;re signing up for</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-forest-100">
            {OFFER.map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-rust-200" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-2xl bg-forest-900/70 p-4 text-sm leading-relaxed text-forest-100">
            Nothing is charged today. We&apos;ll call you to finish setup before any work starts.
          </p>
        </aside>
      </div>

      <div className="border-t border-ink-200 p-6 sm:p-8">
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-ink-800">
          <input
            required
            type="checkbox"
            checked={form.agreed}
            onChange={(e) => set("agreed", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-forest-800"
          />
          <span>
            I agree to the Cabin Care terms above, the{" "}
            <Link href="/terms" target="_blank" className="font-semibold text-forest-800 underline underline-offset-4">
              terms of use
            </Link>{" "}
            and the{" "}
            <Link href="/privacy" target="_blank" className="font-semibold text-forest-800 underline underline-offset-4">
              privacy policy
            </Link>
            . *
          </span>
        </label>

        {/* Hidden from people; bots that fill every field get politely ignored. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        {error ? (
          <p role="alert" className="mt-4 rounded-2xl bg-rust-50 p-4 text-sm font-semibold text-rust-700">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-forest-900/20 transition hover:bg-forest-900 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {busy ? "Sending…" : "Add my place"}
          </button>
          <Link href="/book" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-forest-800">
            <CalendarDays className="h-4 w-4" /> Rather talk first? Book a call
          </Link>
        </div>
      </div>
    </form>
  );
}

function Field({ label, hint, wide = false, children }: { label: string; hint?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-ink-800">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-sm leading-snug text-ink-600">{hint}</span> : null}
    </label>
  );
}
