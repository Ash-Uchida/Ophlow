"use client";

import { ArrowLeft, ArrowRight, Check, Copy, Lock, Mail, Plus, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { BackLink } from "@/components/back-link";
import { TimeZonePicker, useDetectedTimeZone } from "@/components/time-zone-picker";
import {
  CARE_TYPES,
  CONTACT_ROLES,
  CURRENT_OPTIONS,
  DEPARTMENTS,
  MENU_SOURCES,
  MODULES,
  ROLES,
  TOOLS,
  intakeText,
  type Intake,
} from "@/lib/intake";
import { SITE } from "@/lib/site";

export const STEPS = ["Your community", "How you work today", "Rooms & buildings", "Departments", "Team", "Make it yours"] as const;

const input =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-forest-400 focus:ring-2 focus:ring-forest-100";

type Props = {
  intake: Intake;
  setIntake: (next: Intake) => void;
  step: number;
  setStep: (n: number) => void;
};

/** Mail links get long; past this, the email says to paste the copied answers instead. */
const MAILTO_BODY_LIMIT = 1800;

export function IntakeWizard({ intake, setIntake, step, setStep }: Props) {
  const detected = useDetectedTimeZone();
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof Intake>(key: K, value: Intake[K]) => setIntake({ ...intake, [key]: value });
  const toggle = (key: "careTypes" | "tools" | "departments" | "modules", value: string) =>
    set(key, intake[key].includes(value) ? intake[key].filter((v) => v !== value) : [...intake[key], value]);

  const last = step === STEPS.length - 1;
  const firstStepDone = intake.community.trim() && intake.contactName.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(intake.email);

  // The site is static: answers go to us as a pre-filled email, with copy as the backup.
  const mailto = () => {
    const text = intakeText(intake);
    const body = text.length <= MAILTO_BODY_LIMIT ? `${text}\n` : "Paste your copied answers here.\n\n";
    return `mailto:${SITE.email}?subject=${encodeURIComponent(`Setup for ${intake.community}`)}&body=${encodeURIComponent(body)}`;
  };

  if (sent) {
    return (
      <div className="animate-rise rounded-3xl border border-ink-200 bg-paper p-7 text-center sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-100 text-forest-800">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-3xl font-semibold text-forest-950">Almost there.</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">
          Send the email that just opened to {SITE.email} — attach any checklists, schedules or spreadsheets you use today. If it didn&apos;t
          open, copy your answers and email them to us. We&apos;ll reply within one business day.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(intakeText(intake)).then(() => setCopied(true));
            }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-5 py-3 text-sm font-semibold text-forest-900 hover:border-forest-400"
          >
            <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy my answers"}
          </button>
          <a href={mailto()} className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-cream hover:bg-forest-900">
            <Mail className="h-4 w-4" /> Open email
          </a>
        </div>
        <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-ink-500 hover:text-forest-800">
          Edit my answers
        </button>
        <div className="mt-3">
          <BackLink label="Back to site" className="text-sm text-ink-500 hover:text-forest-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-paper">
      <div className="border-b border-ink-100 p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-rust-600">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-ink-500">
            <Lock className="h-3.5 w-3.5" /> No resident names or passwords here
          </p>
        </div>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-forest-950">{STEPS[step]}</h2>
        <div className="mt-4 flex gap-1.5">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              aria-label={`Go to ${s}`}
              onClick={() => (i === 0 || firstStepDone) && setStep(i)}
              className={`h-1.5 flex-1 rounded-full transition ${i <= step ? "bg-forest-700" : "bg-ink-200 hover:bg-ink-300"}`}
            />
          ))}
        </div>
      </div>

      <form
        className="p-5 sm:p-7"
        onSubmit={(e) => {
          e.preventDefault();
          if (!last) return setStep(step + 1);
          setSent(true);
          window.location.assign(mailto());
        }}
      >
        <div key={step} className="grid animate-rise gap-5 sm:grid-cols-2">
          {step === 0 ? (
            <>
              <Field label="Community or company *">
                <input required className={input} value={intake.community} onChange={(e) => set("community", e.target.value)} autoComplete="organization" />
              </Field>
              <Field label="Your name *">
                <input required className={input} value={intake.contactName} onChange={(e) => set("contactName", e.target.value)} autoComplete="name" />
              </Field>
              <Field label="Work email *">
                <input required type="email" className={input} value={intake.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
              </Field>
              <Field label="Phone">
                <input type="tel" className={input} value={intake.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
              </Field>
              <Field label="Your role">
                <select className={input} value={intake.role} onChange={(e) => set("role", e.target.value)}>
                  {CONTACT_ROLES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Time zone" hint="Detected from your device — type your state to change it.">
                <TimeZonePicker value={intake.timeZone} onChange={(tz) => set("timeZone", tz)} detected={detected} />
              </Field>
              <Field label="Number of buildings">
                <select className={input} value={intake.buildingCount} onChange={(e) => set("buildingCount", e.target.value)}>
                  {["1", "2", "3", "4–10", "10+"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Building names" hint="One per line, the way staff say them.">
                <textarea rows={2} className={input} value={intake.buildings} onChange={(e) => set("buildings", e.target.value)} placeholder={"e.g. Building 3\nSt. Anthony"} />
              </Field>
              <Choices label="Types of care" wide>
                {CARE_TYPES.map((x) => (
                  <Check2 key={x} checked={intake.careTypes.includes(x)} onChange={() => toggle("careTypes", x)} label={x} />
                ))}
              </Choices>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <Choices label="How does the floor run today?" wide>
                {CURRENT_OPTIONS.map((o) => (
                  <Radio key={o.value} name="current" checked={intake.current === o.value} onChange={() => set("current", o.value)} label={o.label} note={o.note} />
                ))}
              </Choices>
              <Choices label="Other systems you use (we work alongside them, not instead)" wide>
                {TOOLS.map((x) => (
                  <Check2 key={x} checked={intake.tools.includes(x)} onChange={() => toggle("tools", x)} label={x} />
                ))}
              </Choices>
              <Field label="Anything else? (optional)">
                <input className={input} value={intake.toolsOther} onChange={(e) => set("toolsOther", e.target.value)} />
              </Field>
              <Field label="Biggest headaches right now" wide>
                <textarea
                  rows={3}
                  className={input}
                  value={intake.pains}
                  onChange={(e) => set("pains", e.target.value)}
                  placeholder="e.g. rooms sit dirty after move-outs, nobody sees repair notes, the kitchen app stopped reporting…"
                />
              </Field>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <Field label="Rooms, roughly">
                <select className={input} value={intake.roomCount} onChange={(e) => set("roomCount", e.target.value)}>
                  {["Under 50", "50–100", "100–200", "200+"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Room numbers" hint="Ranges are fine. Room numbers only — never resident names.">
                <input className={input} value={intake.roomNumbers} onChange={(e) => set("roomNumbers", e.target.value)} placeholder="e.g. 101–148, 201–248" />
              </Field>
              <Field label="Common areas that need cleans or repairs" wide>
                <textarea rows={2} className={input} value={intake.commonAreas} onChange={(e) => set("commonAreas", e.target.value)} placeholder="e.g. dining room, lobby, salon, laundry" />
              </Field>
              <Note wide>
                We set up each building&apos;s rooms for you. Rooms hold occupancy and cleaning status only — the app never stores who lives where.
              </Note>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <Choices label="Which teams will use Ophlow?" wide>
                {DEPARTMENTS.map((x) => (
                  <Check2 key={x} checked={intake.departments.includes(x)} onChange={() => toggle("departments", x)} label={x} />
                ))}
              </Choices>
              {intake.departments.includes("Housekeeping") ? (
                <>
                  <Field label="Housekeepers on staff">
                    <input className={input} value={intake.housekeepers} onChange={(e) => set("housekeepers", e.target.value)} placeholder="e.g. 6" />
                  </Field>
                  <Field label="How cleans are scheduled">
                    <input className={input} value={intake.cleanSchedule} onChange={(e) => set("cleanSchedule", e.target.value)} placeholder="e.g. each room weekly, deep clean on move-out" />
                  </Field>
                </>
              ) : null}
              {intake.departments.includes("Dining / kitchen") ? (
                <>
                  <Field label="Meals a day">
                    <select className={input} value={intake.mealsPerDay} onChange={(e) => set("mealsPerDay", e.target.value)}>
                      {["2", "3", "3 + snacks"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Menus come from">
                    <select className={input} value={intake.menuSource} onChange={(e) => set("menuSource", e.target.value)}>
                      {MENU_SOURCES.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                </>
              ) : null}
              {intake.departments.includes("Maintenance") ? (
                <Field label="How repair requests reach maintenance today" wide>
                  <input className={input} value={intake.repairTracking} onChange={(e) => set("repairTracking", e.target.value)} placeholder="e.g. a paper log at the front desk, texts to the crew" />
                </Field>
              ) : null}
            </>
          ) : null}

          {step === 4 ? (
            <>
              <div className="space-y-3 sm:col-span-2">
                <p className="text-xs font-semibold text-ink-700">Who should get a login first?</p>
                {intake.members.map((m, n) => (
                  <div key={n} className="grid gap-2 rounded-2xl border border-ink-200 bg-white p-3 sm:grid-cols-[1fr_1.3fr_10rem_auto]">
                    <input
                      aria-label={`Person ${n + 1} name`}
                      className={input}
                      placeholder="Name"
                      value={m.name}
                      onChange={(e) => set("members", intake.members.map((x, i) => (i === n ? { ...x, name: e.target.value } : x)))}
                    />
                    <input
                      aria-label={`Person ${n + 1} email`}
                      type="email"
                      className={input}
                      placeholder="Email"
                      value={m.email}
                      onChange={(e) => set("members", intake.members.map((x, i) => (i === n ? { ...x, email: e.target.value } : x)))}
                    />
                    <select
                      aria-label={`Person ${n + 1} job`}
                      className={input}
                      value={m.role}
                      onChange={(e) => set("members", intake.members.map((x, i) => (i === n ? { ...x, role: e.target.value } : x)))}
                    >
                      {ROLES.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      aria-label={`Remove person ${n + 1}`}
                      disabled={intake.members.length === 1}
                      onClick={() => set("members", intake.members.filter((_, i) => i !== n))}
                      className="flex items-center justify-center rounded-xl px-3 text-ink-400 hover:bg-cream hover:text-rust-600 disabled:invisible"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => set("members", [...intake.members, { name: "", email: "", role: "Housekeeper" }])}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 hover:text-rust-600"
                >
                  <Plus className="h-4 w-4" /> Add a person
                </button>
              </div>
              <Choices label="Floor staff sign in with" wide>
                {["Work emails", "Personal emails", "Phone numbers", "Not sure yet"].map((o) => (
                  <Radio key={o} name="signIn" checked={intake.signIn === o} onChange={() => set("signIn", o)} label={o} />
                ))}
              </Choices>
              <Note wide>Each job only opens its own screens. The operations manager sees everything and decides who can see what.</Note>
            </>
          ) : null}

          {step === 5 ? (
            <>
              <Choices label="Features to turn on" wide>
                {MODULES.map((x) => (
                  <Check2 key={x} checked={intake.modules.includes(x)} onChange={() => toggle("modules", x)} label={x} />
                ))}
              </Choices>
              <Field label="What do you wish your tools did?" wide>
                <textarea rows={3} className={input} value={intake.wishes} onChange={(e) => set("wishes", e.target.value)} />
              </Field>
              <Field label="When would you like to go live?">
                <input className={input} value={intake.goLive} onChange={(e) => set("goLive", e.target.value)} placeholder="e.g. next month, before the new building opens" />
              </Field>
              <Field label="Anything else?">
                <input className={input} value={intake.notes} onChange={(e) => set("notes", e.target.value)} />
              </Field>
            </>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink-600 hover:bg-cream disabled:invisible"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-900"
          >
            {last ? <Send className="h-4 w-4" /> : null}
            {last ? "Send to the Ophlow team" : "Next"}
            {!last ? <ArrowRight className="h-4 w-4" /> : null}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, hint, wide = false, children }: { label: string; hint?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-semibold text-ink-700">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-ink-500">{hint}</span> : null}
    </label>
  );
}

function Choices({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <fieldset className={wide ? "sm:col-span-2" : ""}>
      <legend className="mb-2 text-xs font-semibold text-ink-700">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Radio({ name, checked, onChange, label, note }: { name: string; checked: boolean; onChange: () => void; label: string; note?: string }) {
  return (
    <label className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition ${checked ? "border-forest-400 bg-forest-50" : "border-ink-200 bg-white hover:border-ink-300"}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-0.5 accent-forest-700" />
      <span>
        <span className="block text-sm font-semibold text-forest-950">{label}</span>
        {note ? <span className="block text-xs text-ink-500">{note}</span> : null}
      </span>
    </label>
  );
}

function Check2({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${checked ? "border-forest-400 bg-forest-50" : "border-ink-200 bg-white hover:border-ink-300"}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="mt-0.5 accent-forest-700" />
      <span className="text-ink-800">{label}</span>
    </label>
  );
}

function Note({ wide = false, children }: { wide?: boolean; children: React.ReactNode }) {
  return <p className={`rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-ink-700 ${wide ? "sm:col-span-2" : ""}`}>{children}</p>;
}
